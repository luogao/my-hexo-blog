---
title: react-native-reanimated 与react-native-svg 使用中的一个小问题
date: 2020-12-12 15:46:22
desc: react-native-reanimated , react-native-svg, react-native, 60FPS
tags: react-native , reanimated
---


> 使用react-native-reanimated 可以在使RN 上的动画更加流畅。使用它的陈述式的api 将动画预先定义好。并在UI 线程中运行，避免了js 与native 的交互。实现了60FPS 的动画效果。


本文记录一次在使用reanimated 和 react-native-svg 中遇到的一个问题已经解决方案。

<!-- more -->

## 遇到的问题

最近一个需求中，遇到需要利用svg 来实现一个绳子弹动的动画。

在做demo 时，效果符合预期。

但当放到真实的页面中，并存在大量组件渲染时，通过`Animated.createAnimatedComponent(Path)` 创建的`<Path />` 组件在执行动画时存在卡顿的情况（并不符合预期）。


## 解决方式

最终一番排查问题之后，找到问题所在。感谢这个[issue - Animating SVGs with reanimated are not native animations](https://github.com/software-mansion/react-native-reanimated/issues/537)

reanimated 默认只对存在[白名单中的props](https://github.com/software-mansion/react-native-reanimated/blob/master/src/ConfigHelper.js#L31) 处理成native 端执行动画

而在svg 中，想要修改`<Path />`上的props 来实现动画，比如`d` 这种，默认是不在native 端执行

所以需要把`d` 这个prop 加到reanimated 的白名单中，使用下面两行代码：

```javascript

Animated.addWhitelistedNativeProps({ d: true })
Animated.addWhitelistedUIProps({ d: true })

```

当然除了`<Path />` 的`d` prop，别的组件上的prop 都能用这种方式添加到reanimated 的白名单中

## 最后

最终通过上文提到的issue 我的问题得到了解决，reanimated 的维护者也将上述两个方法添加到了reanimated v1.x.x 的[文档](https://docs.swmansion.com/react-native-reanimated/docs/1.x.x/config)中。

