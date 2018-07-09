---
title: addEventListener中的EventListener接口对象
date: 2018-07-09 10:46:24
tags:
---



遗漏的知识点：addEventListener的第二个参数不光可以传入一个函数，还可以传入一个实现了[`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口的对象。

<!-- more -->

## 文档中的描述

> `listener`
>
> 当所监听的事件类型触发时，会接收到一个事件通知（实现了 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的对象）对象。`listener` 必须是一个实现了 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口的对象，或者是一个[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)

摘自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

我一直都是在`listener`中传入一个函数，通过监听事件发生来实现一些逻辑。然而看到文档描述中先提到了“一个实现了EventListener接口的对象”通过进一步查看文档了解到，这个对象指的就是一个含有`handleEvent`方法的对象。

```javascript
var obj = {
   // ...
    handleEvent: function(event) {
        // ...
        console.log('event', event)
    }
}
document.body.addEventListener('click', obj, false)
```



当`EventListener`所注册的事件发生时，该方法就会被调用，同时会有一个event参数传入到方法中。

了解了概念之后就要看这个知识点能为实际开发带来什么好处了



## 开发中的应用

举个🌰

```javascript
var obj = {
    a: 1,
    handleEvent: function(event) {
        alert(this.a)
    }
}
document.body.addEventListener('click', obj, false) // 1
document.body.addEventListener('click', obj.handleEvent, false) // undefined
```

从例子中可以看出，这种绑定`obj`会影响this的指向。也就是说我们可以利用这种特点，在处理事件时使用`obj`中的私有属性或方法

再举个🌰

```javascript
var obj = {
    a: 1,
    handleEvent: function(event) {
        alert(this.a)
    }
}
var anotherHandler = function(event) {
    alert('hello world')
}
document.body.addEventListener('click', obj, false) // 1
setTimeout(function(){
    obj.handleEvent = anotherHandler // hello world
},2000)

```

从这个例子中可以看出，这种形式的事件绑定，很方便就能动态改变处理事件的逻辑。不需要先remove再add。

## 写在最后

这种绑定方式的缺点不在于兼容性方面，应该是可读性方面的缺陷。我在看别人的源码时看到这个时非常疑惑（个人水平有限也占一定的原因），直到查阅了资料之后才知道有这样的一种绑定事件的写法。

所以，日常工作开发中要使用这样的写法时，最好确定一下一起开发的小伙伴是不是也清楚这种方式，避免协作时的冲突。



## 参考

[MDN EventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)

[MDN EventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

[handleEvent与addEventListener](http://www.ayqy.net/blog/handleevent%E4%B8%8Eaddeventlistener/)

