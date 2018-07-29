---
title: 微信小程序iOS端如何暂停animated动画
date: 2018-07-29 18:23:20
tags: wxapp
---

在知道有`animation-play-state`这个animation的参数时，我内心是激动的。在得知iOS端并不支持时，一股凉意袭来
<!-- more -->

## animation-play-state

先来介绍一下今天的主角`animation-play-state`

> **animation-play-state** [CSS](https://developer.mozilla.org/en-US/docs/CSS) 属性定义一个动画是否运行或者暂停。可以通过查询它来确定动画是否正在运行。另外，它的值可以被设置为暂停和恢复的动画的重放。
>
> 恢复一个已暂停的动画，将从它开始暂停的时候，而不是从动画序列的起点开始在动画。

在MDN文档中了解到，这是一个实验中的功能，但是其作用还是强大的。既可以控制/获取元素的动画状态（paused，running）

所以，这个animation的参数用来控制动画的播放状态再合适不过了。画外音：你还没考虑兼容性呢！对！就是这个兼容性问题。在chrome上这个参数是可以支持的，但是iOS设备上就不支持了...叹息。

## 在iOS上的处理

当然不能因为兼容性问题就不用这个参数了，当然不能让每个iOS用户去下载一个chrome浏览器，当然...

那我们怎么解决呢？？？用JS

通过`Window.getComputedStyle()`方法，我们可以获取元素实时的`style`的`CSSStyleDeclaration`对象，这个对象表示CSS属性键值对的集合。也就是说我们使用这个方法可以获取一个正在进行动画的元素当前的`style`值。

PS:关于`Window.getComputedStyle()`方法的值可以在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)上了解到，这里不展开叙述。给出一个语法的例子（摘自MDN）

```javascript
 let style = window.getComputedStyle(element, [pseudoElt]);
```

那么具体要怎么做呢？

## 实现

<p data-height="417" data-theme-id="light" data-slug-hash="ejeLJm" data-default-tab="js,result" data-user="luogao" data-pen-title="animation-play-state" class="codepen">See the Pen <a href="https://codepen.io/luogao/pen/ejeLJm/">animation-play-state</a> by luogao (<a href="https://codepen.io/luogao">@luogao</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

代码已经在上面的codepen预览中展示啦，如果现实不来请点这里👉[Roy Luo's codepen](https://codepen.io/luogao/pen/ejeLJm?editors=1010)

大致解释一下就是：

在元素的外层的包裹元素上添加获取到的执行动画的元素的`style`计算属性，从而让执行动画的元素暂停下来。

## 那么在微信小程序中又是如何呢？

其实，最先遇到这个问题是在做小程序的时候。一个播放器的界面，中间一张专辑图片。在圆形的黑胶唱片边框中旋转。当播放停止，图片也同时停止旋转。**停在当前旋转的位置**

当时看似简单的一个需求，使用了`animation-play-state`并且与预期一样达到了效果，**在模拟器中**。

没错，洋洋得意的以为完成了需求，结果真机（iOS）上一测试，原形毕露。

当时看到小程序的官方社区中提到说iOS不支持这个`animation-play-state`🤦‍♂️🤦‍♂️🤦‍♂️🤦‍

幸得[残阳映枫红](https://segmentfault.com/u/haoycn)在sf的一个问题中的回答让我找到了方向。感谢之～

## 值得在最后前一提的是

这里有三个小程序的坑要提一下

- nodesRef.fields(fields, [callback])这个方法需要在**基本库**[2.1.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)（个人感觉不是个该着重考虑的问题）
- 这个方法是异步的（自行感受）
- 应该区分iOS和安卓设备，进行不同的处理。能不用这个nodesRef.fields方法尽量不要用～

## 参考

- [animation-play-state](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state#Browser_compatibility)
- [Window.getComputedStyle()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)
- [[移动端css动画播放状态暂停在ios不起作用 animation-play-state](https://segmentfault.com/q/1010000009884033)]

