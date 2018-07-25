---
title: JS 自定义方法实现new操作符
date: 2018-07-25 22:01:38
tags: JS
---

前段时间跟一位即将离职的同事聊天，他提到面试新东家的时候，被问到如何实现一个方法来模拟new操作符。当时他没有告诉我怎么实现的。

于是便查找资料，了解到具体的实现方法。

于此记录之

<!-- more -->

## 写在最前

本文参考[mqyqingfeng](https://github.com/mqyqingfeng)博客的[JavaScript深入之new的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13)

本人在自己参考大佬文中提到的方法实现之后，于此记录

## 实现方法

——先记录具体的实现方法，再来记录原理

```javascript
function objectFactory(){
    // 新建一个对象obj
    var obj = new Object()
    // 获取构造器
    var Constructor = [].shift.call(arguments)
    // ！！将obj的__proto__和构造器的prototype连接在一起
    obj.__proto__ = Constructor.prototype
    // 执行构造器中的构造方法，利用apply将this指向obj
    var ret = Constructor.apply(obj, arguments)
    // 判断ret是否为object并且不为null
    if (typeof ret === 'object' && ret) {
        // 返回当构造函数中return 的值
        return ret
    }
    // 返回obj
    return obj
}

```

我的[codepen](https://codepen.io/luogao/pen/JBNBYJ?editors=0010)中写了个具体的例子，可供测试。

所以实现方法给出来了，那么new操作符到底是怎么模拟实现的呢

## 实现思路

- 对象能访问到构造对象中的prototype中的方法，主要是因为对象的`__proto__`等于构造函数的`prototype` 
- 通过`apply`改变`this`的指向，从而到达新建的对象能够访问构造函数中的属性
- 在定义构造函数的时候，如果函数有返回值，新建的对象只会指向返回的对象，所以要判断构造函数的返回值，如果是一个`object`并且不为`null`的话，则返回这个`object`

```javascript
function Fatty () {
    this.name = 'fatty'
    this.weight = '200kg'
    return {
        name: 'fatty'
    }
}

const fatty = new Fatty()
console.log(fatty.name) // fatty
console.log(fatty.weight) // undefined
```

- 如果返回值不是一个`object`或者是`null`的话，则返回的还是新建的对象`obj`

到此已经把`objectFactory`内部的实现思路理了一遍。增强一下自己的记忆

## 参考

[JavaScript深入之new的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13) 

