---
title: js代理模式《JavaScript设计模式与开发实践》阅读笔记
date: 2018-05-26 17:29:09
tags:
---

> 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

<!-- more -->

*此文仅记录本人阅读《JavaScript设计模式与开发实践》这个本时的感受，感谢作者曾探写出这么好的一本书。如有冒犯，如有错误，请联系[本人](mailto:luogao_lg@sina.com)处理。*

## 保护代理和虚拟代理

**保护代理**：当有许多需求要向某对象发出一些请求时，可以设置保护代理，通过一些条件判断对请求进行过滤。
**虚拟代理**：在程序中可以能有一些代价昂贵的操作。此时可以设置虚拟代理去代为执行，这里的虚拟代理便会在适合的时候（需要用到的时候）才去执行。
> 保护代理用于控制不同权限的对象对目标对象的访问，但在JavaScript并不容易实现保护代理，因为我们无法判断谁访问了某个对象。而虚拟代理是最常用的一种代理模式。

## 虚拟代理实现图片预加载
预加载图片在Web开发中十分常用，其通过异步的方式加载图片，利用一张loading图片占位。等图片加载好之后把图片填充到img节点中。
``` javascript
var myImage = (function(){
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src){
      imgNode.src = src
    }
  }
})()

var proxyImage = (function(){
  var img = new Image()
  img.onload = function(){
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src){ 
      myImage.setSrc('loading.gif')
      img.src = src
    }
  }
})()

proxyImage.setSrc('realImage.jpg')
```

> 通过`proxyImage`间接的访问了`MyImage`。`proxyImage`控制了客户对`MyImage`的访问，并且在此过程中加入了一些额外的操作，比如在真正的图片加载好之前，先把img节点的src设置为一张loading图片。



## 代理的意义

> 面向对象设计原则——单一职责原则。单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因会有多个。面向对象设计鼓励将行为分布到细粒度的对象之中，如果一个对象承担的职责过多，等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的设计，带变化发生时，设计可能会遭到意外的破坏。

虚拟代理例子中，代理模式给系统添加了额外的功能，预加载图片。而我们实际需要的只是`MyImage`的`setImage`方法。预加载只是一个锦上添花的功能。通过代理模式使得这两个功能独立开来，遵循了开放-封闭原则。

## 缓存代理

> 缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。

**乘积运算的例子**
```javascript
/*******计算乘积******/
var mult = function(){
  console.log('开始计算乘积')
  var a = 1 
  for (var i = 0,l = arguments.length;i<l;i++){
    a = a*arguments[i]
  }
  return a
}
/********乘积代理函数********/
var proxyMult = (function(){
  var cache = {} // 缓存对象
  return function(){
    var args = Array.prototype.join.call(arguments,',') // 将参数转化成字符串作为cache的key
    if (args in cache){
        // 如果cache对象中存储了同样的参数，直接返回对应的运算结果
        console.log('缓存结果：')
      return cache[args]
    }
      // 如果没有该运算参数，保存新的参数和结果，并调用mult方法返回运算结果。
    return cache[args] = mult.apply(this, arguments)
  }
})()
console.clear()
console.log(proxyMult(1,2,3,4,5)) // mult运算
console.log(proxyMult(1,2,3,4,5)) // 读取缓存结果
/*******创建缓存代理的工厂函数*******/
var createProxyFactory = function(fn){
  var cache = {}
  return function(){
    var args = Array.prototype.join.call(arguments,',')
    if(args in cache){
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}
var proxyMult = createProxyFactory(mult)
console.log(proxyMult(12,3,4,5,6))
console.log(proxyMult(12,3,4,5,6))
```
## 最后

代理模式是一种很实用的设计模式，很好的诠释了面向对象中的单一职责原则和开放-封闭原则。在实际开发的时候往往会迫于进度压力或者实现了再说的态度忽略了一些必要的代码的可维护性，我觉得在一些简单的地方去试着遵循一些设计理念是对自己代码能力的提升。当然不要为了设计而设计啦。
**Done is better than perfect**