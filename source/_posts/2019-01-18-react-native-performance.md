---
title: React Native 性能优化 （官网指南搬运）
date: 2019-01-18 17:08:39
tags:
---

最近在写React-Native 趁着这两天需求差不多完成了，实践了一些优化项。

记录于此

<!-- more -->

## Life sucks

Performance

参考 [React native Performance](https://facebook.github.io/react-native/docs/performance)


## 查看性能

打开开发者菜单（摇晃手机打开）👉 打开`Show Perf Monitor` 可以看到下图显示框

![img](https://facebook.github.io/react-native/docs/assets/PerfUtil.png)

UI 和 JS 的帧数都稳定保持在60 为最优情况。



## JS 的单线程

所有的事件处理，API请求，等操作都在这个线程上，在`this.setState`大量数据时，状态的变动会导致**re-render**，这期间所有由JavaScript 控制的动画都会出现卡顿掉帧

比如在切换路由时，帧数会有明显抖动。此时如果有一些在`componentDidMount` 执行的操作就会使得路由过渡动画非常卡顿。（后面会介绍一些可以尝试的解决方案



## 开发环境性能比生产环境差

开发环境下框架会有很多别的操作比如warning error 的输出，类型检测等等。

如果要测试性能，最好在`release` 包测试。这样更加精准。



## 生产环境移除console.*

开发时，会有很多`console.*` 指令来帮助调试。并且一些依赖库也会有`console.*` 这些语句对JavaScript 线程来说是一个极大的消耗。可以通过Babel 在生产环境中移除掉`console.*`。

- 安装插件

  `npm i babel-plugin-transform-remove-console --save-dev`

- 配置`.babelrc ` 文件

  ```json
  {
    "env": {
      "production": {
        "plugins": ["transform-remove-console"]
      }
    }
  }
  ```



## 处理大量数据列表时使用`<FlatList />`

`FlatList` 组件更加适合来展示长列表，并且指定合适的 [`getItemLayout`](https://facebook.github.io/react-native/docs/flatlist.html#getitemlayout) 方法， [`getItemLayout`](https://facebook.github.io/react-native/docs/flatlist.html#getitemlayout) 会跳过渲染Item 时的布局计算，直接使用给定的配置（详情查看链接☝️）



## 依赖懒加载

在框架执行编写好的业务代码前，需要把在内存中加载并解析代码，代码量越大这个过程就更耗时，导致首屏渲染速度过慢。而且往往会出现一些页面或者组件根本不会被用户访问到。这时可以通过懒加载来优化。

[官网](https://facebook.github.io/react-native/docs/performance#inline-requires)有给出例子

**VeryExpensive.js**

```javascript
import React, { Component } from 'react';
import { Text } from 'react-native';
// ... import some very expensive modules

// You may want to log at the file level to verify when this is happening
console.log('VeryExpensive component loaded');

export default class VeryExpensive extends Component {
  // lots and lots of code
  render() {
    return <Text>Very Expensive Component</Text>;
  }
}
```

**Optimized.js**

```javascript
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

let VeryExpensive = null; //定义变量

export default class Optimized extends Component {
  state = { needsExpensive: false }; // 定义内部状态来控制组件是否需要加载

  didPress = () => {
    // 在触发需要加载组件的事件时
    if (VeryExpensive == null) { // 不重复引用
      VeryExpensive = require('./VeryExpensive').default;  // 把组件的引用赋给定义好的变量
    }

    this.setState(() => ({
      needsExpensive: true, // 更改控制的状态，触发组件re-render
    }));
  };

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={this.didPress}>
          <Text>Load</Text>
        </TouchableOpacity>
        {this.state.needsExpensive ? <VeryExpensive /> : null}
      </View>
    );
  }
}
```



## 优化组件渲染次数

React 在内部`state ` 或者外部传入的`props ` 发生改变时，会重新渲染组件。如果在短时间内有大量的组件要重新渲染就会造成严重的性能问题。这里有一个可以优化的点。

- 使用`PureComponent`  让组件自己比较`props` 的变化来控制渲染次数，实践下来这种可控的方式比纯函数组件要靠谱。或者在`Component  `  中使用 `shouldComponentUpdate`  方法，通过条件判断来控制组件的更新/重新渲染。
- 使用`PureComponent`  时要注意这个组件内部是浅比较状态，如果`props`  的有大量引用类型对象，则这些对象的内部变化不会被比较出来。所以在编写代码时尽量避免复杂的数据结构
- 细粒度组件，拆分动态/静态组件。需要在项目稳定并有一定规模后来统一规划。
- 学习[ **immutable-js **](https://github.com/facebook/immutable-js) 



## 异步，回调

JavaScript 单线程，要利用好它的**异步**特性，和一些钩子回调。



比如上面提到路由切换时`componentDidMount`  中的操作会导致卡顿，这里可以使用 `InteractionManager.runAfterInteractions()`  将需要执行的操作放到`runAfterInteractions`  的回调中执行。

```javascript
componentDidMount() {
	InteractionManager.runAfterInteractions(() => {
        // your actions
	})
}
```

**需要注意的是** `InteractionManager`  是监听所有的动画/交互 完成之后才会触发 `runAfterInteractions`  中的回调，如果项目中有一些长时间动画或者交互，可能会出现长时间等待。所以 由于 `InteractionManager`  的不可控性，使用的时候要根据实际情况调整。

在react-native 中的一些动画反馈，比如`TouchableOpacity`  在触摸时会响应 `onPress`  并且 自身的透明度会发生变化，这个过程中如果 `onPress`  中有复杂的操作，很可能会导致组件的透明反馈卡顿，这时可以将`onPress`  中的操作包裹在 `requestAnimationFrame`  中。这里给出一个我的实践（利用styled-component）

``` javascript
import styled from 'styled-components'

export const TouchableOpacity = styled.TouchableOpacity.attrs({
  onPress: props => () => {
    requestAnimationFrame(() => {
      props.onPressAsync && props.onPressAsync()
    }, 0)
  }
})``
```

这里把`onPress`  改成在 `requestAnimationFrame`  的回调中执行`onPressAsync`  传入的操作。

同理，还在`FlatList`  的`onReachEnd`实践了这个操作，来避免iOS 中滚动回弹时执行操作的卡顿。


以上，记录了近期写React-Native 的一些实践过的优化项。

## 最后

路漫漫其修远兮，吾将上下而求索

May love & peace be with you 


## 参考

- [React native Performance](https://facebook.github.io/react-native/docs/performance)


