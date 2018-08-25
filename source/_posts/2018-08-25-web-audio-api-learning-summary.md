---
title: 利用 web audio api 实现音频可视化
date: 2018-08-25 22:57:17
desc: Web Audio Api, Demo, Learning, Canvas,JavaScript
tags: 
---

音频可视化实现之后真的很酷，虽然这次只是跟着[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)上的教程学习了一下，照着[Demo](https://github.com/mdn/voice-change-o-matic)敲了一遍而已。但收获颇多，记录于此。

<!--more-->

## web audio api

先来感受一下 web audio api 的基础概念，下面截取一段MDN上的介绍。具体的请移步[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)

> ### Web audio 概念与使用
>
> Web Audio API使用户可以在音频上下文(AudioContext)中进行音频操作，具有模块化路由的特点。在音频节点上操作进行基础的音频， 它们连接在一起构成音频路由图。即使在单个上下文中也支持多源，尽管这些音频源具有多种不同类型通道布局。这种模块化设计提供了灵活创建动态效果的复合音频的方法。

在跟着文档和Demo走了一遍之后，我自己的理解就是，我们可以通过`const audioCtx = new (window.AudioContext || window.webkitAudioContext)()`这样的形式来获取/创建一个音频上下文，这个`audioCtx`中有许多可供使用的属性方法。这里只会稍微描述一下实现音频可视化要用的属性。具体的可以参考文档。

其实这个AudioContext能做的事不光是音频可视化。首先它支持获取音频的输入，也就是接下来会提到的*定义音频源*。然后它能够*定义音效*，或许你要是知道怎么把一段声音做成电音的算法，那你可以试试，然后教教我。哈哈哈，当然一些基础的控制音频源的输出音量这些都是有的。

接下来就继续谈音频可是化啦

## 音频可视化

首页我们需要选择一个用来展示音频的工具，这里其实用的就是Canvas，当然如果你会用Svg也可以尝试着做一下。这里我不会svg，嗯。打算学（but, who knows when）。

那么这里就只剩下用来显示的数据了。

前面提到过，AudioContext中有许多属性和方法，其中就有`createAnalyser()`方法，可以供我们获取[AnalyserNode](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode)这个对象。这个对象会提供给我们用来显示（可以被我们处理成用来显示的）的所需要的数据。

## [AnalyserNode](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode)

这里还是得简单提一下AnalyserNode，我们接下来需要用到它的几个属性和方法

- [`AnalyserNode.fftSize`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/fftSize)

  > 一个无符号长整形(unsigned long)的值, 用于确定频域的 FFT ([快速傅里叶变换](https://zh.wikipedia.org/zh-cn/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2)) 的大小。

- [`AnalyserNode.getByteFrequencyData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteFrequencyData)

  > 将当前频域数据拷贝进[`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/API/Uint8Array)数组（无符号字节数组）。

- [`AnalyserNode.getByteTimeDomainData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData)

  > 将当前波形，或者时域数据拷贝进 [`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/API/Uint8Array)数组（无符号字节数组）。

这里直接copy了[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode)的内容。然后我再根据自己的理解来描述一下。

- [`AnalyserNode.fftSize`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/fftSize)

  首先我们可以通过设置[`AnalyserNode.fftSize`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/fftSize)来控制将要用来显示的数据（数组，这里后面会处理成数组）的个数（长度），简单点说就是，如果我们想用柱状图来显示数据，fftSize设置的越大，那我们显示的柱子的数量就会越多。反之同理。不过这个值是有范围的，并且必须是2的n次幂。范围：[32, 32768]，超出或小于会报错。

- [`AnalyserNode.getByteFrequencyData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteFrequencyData)

  这个在文档中描述是获取当前频域的数据，我理解成就是如果要显示成柱状图的形式，那么就用这个。因为我试过了用`getByteTimeDomainData`结果并不是很好。因为`getByteTimeDomainData`是用用来展示波形的，这里我理解的就是文档的字面意思。不展开描述

好的，这里要用到的关键的基础知识介绍完毕。接下来就是要做事了，直接上代码了。

## 实现一下

接下来是一些供描述的代码，具体的代码在我的[Github](https://github.com/luogao/canvas-learning/tree/master/audio-wave)上，其实直接看MDN提供的Demo的[源代码](https://github.com/mdn/voice-change-o-matic)也行。

```javascript
// 获取页面中的audio对象
const myAudio = document.querySelector('audio')
// 获取web audio 上下文对象
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
// 获取声音源
const source = audioCtx.createMediaElementSource(myAudio)
// 获取分析对象
const analyser = audioCtx.createAnalyser()
// 设置fftSize
analyser.fftSize = 1024
const bufferLength = analyser.fftSize
// 因为这里analyser返回的数据js不能直接使用，所以要通过Uint8Array来转换一下，让js认识一下
const dataArray = new Uint8Array(bufferLength)
// 连接解析器
source.connect(analyser)
// 输出音频
source.connect(audioCtx.destination)
```

以上就已经可以获取当前audio对象所播放音频的可供我们js使用的数据了，话有点绕，其实这里要用到的就是这个`daraArray`，我们需要在接下来编写canvas的代码中用到这个数组中的数据。

### 画重点

这里我踩了个坑，我一开始没写`source.connect(audioCtx.destination)`便运行了上面剩余的代码，发现页面没有声音，但是我如果不写这些代码。直接用audio标签autoplay，声音是很洪亮的。但是用了上面的代码就是没声音。

然后我注意到Demo中还有一句`source.connect(audioCtx.destination)`我没写。加上之后，确实出了声音。于是我看了一下文档得知，这个是用来定义音频目的地的。也就是说，在我们把音频源传入AudioContext之后，这个音频源就被AudioContext托管了。然后AudioContext并不会自动播放声音，这里需要手动设置一下音频的归属地（通常是输出到你的扬声器）

那么接下来就是把数据显示出来了，这里我直接粘贴处理canvas的代码了（困了，现在半夜12:13）

```javascript
const draw = () => {
  // 获取当前声音的波形；将当前波形，或者时域数据拷贝进 Uint8Array数组（无符号字节数组）
  analyser.getByteTimeDomainData(dataArray)
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgb(200,200,200)'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgb(0,0,0)'
  ctx.beginPath()
  const sliceWidth = W * 1.0 / bufferLength
  let x = 0
  for (let i = 0; i < bufferLength; i++) {
    let v = dataArray[i] / 128.0
    let y = v * H / 2
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
    x += sliceWidth
  }
  ctx.lineTo(W, H / 2)
  ctx.stroke()
  requestAnimationFrame(draw)
}

const draw2 = () => {
  // 获取当前频域数据；将当前频域数据拷贝进Uint8Array数组（无符号字节数组）
  analyser.getByteTimeDomainData(dataArray)
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillRect(0, 0, W, H)

  const barWidth = (W / bufferLength) * 2.5
  let barHeight
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2
    ctx.fillStyle = `rgb(${barHeight + 100},50,50)`
    ctx.fillRect(x, H - barHeight, barWidth, barHeight)
    x += barWidth + 1
  }

  requestAnimationFrame(draw2)
}
```

这里有两个方法，分别：`draw`是用来显示波形的，`draw2`是可以显示成柱状图的样子，我个人更喜欢`draw2`画出来的样子。

因为这次是分享web audio api，而且上面canvas的代码比较简单，看看就好了。就不展开讲了。

## 最后

BB了好久，就总结一下了，希望有人能看到这里。

这次知道写web audio api 也其实就是简单的介绍了一下这个强大的api能支持网页对音频作出来的各种骚操作。不光光是可视化，变声，换成立体环绕啥的都是不在话下的。有兴趣的同学可以了解一下。嗯，了解一下，然后教教我。

其实这次写博客之前还完善了一下，给加上了通过设备的麦克风获取音频并可视化的方法。挺简单的，看看[源码]((https://github.com/luogao/canvas-learning/tree/master/audio-wave)就知道了。

或许过两天会给这篇加上点图片，放个demo的地址吧。

不早了 睡了。世界晚安

## 参考

  \- [基于Web Audio API实现音频可视化效果](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)

  \- [HTML5 Audio: createMediaElementSource breaks audio output](https://stackoverflow.com/questions/39187924/html5-audio-createmediaelementsource-breaks-audio-output/39192187#39192187)

  \- [AnalyserNode](https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode)

  \- [web audio api](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)

