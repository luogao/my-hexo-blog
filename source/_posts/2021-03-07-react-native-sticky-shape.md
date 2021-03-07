---
title: 用React Native 实现一个SVG动画
date: 2021-03-07 18:33:54
tags: react-native, reanimated, react-native-svg, react-native-gesture-handler, animation
---

在 YouTube 上有位大神[William Candillon](https://www.youtube.com/user/wcandill) 他做了一系列的视频关于如何用 React Native 来实现一些 App 上优秀的动画交互效果，前段时间我跟着他的这个视频[《React Native Sticky Shapes》](https://www.youtube.com/watch?v=7j4Av7rfl9k) 来实现了一个使用SVG 的动画效果，下面我来记录一下实现过程。

<!-- more -->

## 效果

{% asset_img demo.gif demo %}

语言描述下这个效果就是，一个方块吸在顶部，然后用手指拖动方块时，方块会粘滞在顶部，直到超过一定的范围，方块会被拽下来，弹回成一个方块，或者在范围内松开手指，方块也会弹回去。

## 准备

首先这种形状的变化需要用到 SVG，这里用的是[`react-native-svg`](https://github.com/react-native-svg/react-native-svg)

为了实行跟手要用到手势库[`react-native-gesture-handler`](https://github.com/software-mansion/react-native-gesture-handler)

为了实行 60FPS 的动画要用到[`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated)

为了方便使用 reanimated 这里还要用的[ `react-native-redash`](https://github.com/wcandillon/react-native-redash)

准备工作好了之后就开始来分析这个效果如何实现

## 分析

这里介绍两个工具[figma](https://www.figma.com/), [svg-path-editor](https://yqnn.github.io/svg-path-editor/)

首先我们要用 figma 来画图

[![6M2TK0.png](https://s3.ax1x.com/2021/03/07/6M2TK0.png)](https://imgtu.com/i/6M2TK0)

选中这个倒梯形，右键选择 Copy as SVG 例如：`M0 0H180L126 174H56L0 0Z`

[![6M2qVU.png](https://s3.ax1x.com/2021/03/07/6M2qVU.png)](https://imgtu.com/i/6M2qVU)

然后复制到 svg-path-editor 中， 我们只需要它的 path 的 d 的值

[![6M2LaF.png](https://s3.ax1x.com/2021/03/07/6M2LaF.png)](https://imgtu.com/i/6M2LaF)

上图中我已经把它拖动成一个矩形，下面我会用一个动图来展示 svg 从一个方块变成一个梯形

{% asset_img change1.gif change1 %}

这里我们标出四个关键点，p1, p2, p3, p4

[![6M2O54.png](https://s3.ax1x.com/2021/03/07/6M2O54.png)](https://imgtu.com/i/6M2O54)

从动图中可以看出，通过控制 p3, p4 的横坐标位置我们就可以将矩形变成一个梯形。

为了实现手指向下拖动方块来实现方块被拉长，那我们就需要根据手指移动的位置来同时改变 p3, p4 的横坐标和纵坐标

{% asset_img change2.gif change2 %}


那如何把梯形的两边变成平滑的曲线呢，我们来看看下面这个动图

{% asset_img lineToCurve.gif lineToCurve %}

通过 svg-path-editor 我们可以把 lineTo 转换成 curve to 这样就会把它变成一个拥有两个控制点的贝塞尔曲线

这里我们将左右两边都变成贝塞尔曲线，这样我们的梯形就变成了两边圆滑曲线的形状

我们把四个控制点分别标成 c1,c2,c3,c4

[![6M2jPJ.png](https://s3.ax1x.com/2021/03/07/6M2jPJ.png)](https://imgtu.com/i/6M2jPJ)

可以从上面视频中看到，我们要改变曲线的弯曲程度就需要去横向移动 c1,c2。同时，c3,c4 要跟着 p3,p4 移动，这样就能实现一个跟手的形变动画效果。

分析完这个形变动画的实现过程之后，我们就需要开始写代码了。利用`react-native-gesture-handler`和 `reanimated` 我们可以实现根据手指移动的距离来改变 path 的 d 属性的值。

### 如何Q 弹

这里我们注意到，在手指松开方块后，方块会缩回去。那么我们只要判断手势的状态，在手势结束的时候把动画的值通过一个`spring` 函数恢复到初始值，就可以实现Q弹的效果了。

以上就是整个动画效果的分析过程，代码有点长，就附上个 github 地址。

[William Candillon ](https://github.com/wcandillon) 的源码：https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/reanimated-2/src/StickyShapes

[William Candillon](https://github.com/wcandillon) 的源码是使用 reanimated 2 来实现的。

我的源码：https://github.com/luogao/test-project/tree/master/src/StickyShape

我的源码是 reanimated 1 来实现的。

## 最后

William Candillon 大神的视频很有启发性，跟着他的视频学习一边之后，我发现原来实现一些看起来复杂的动画，比如 svg 动画其实也是在每帧去修改他的路径属性来实现的。这让我觉得，其实我也可以实现一些看起来很难得动画。并且利用 Reanimated， 我可以在React Native 上把动画性能拉满。

大家如果对 React Native 感兴趣的话可以多去看看他的视频。里面有很多炫酷的动画效果 React Native 实现。

## 参考

- [William Candillon](https://www.youtube.com/user/wcandill)
- [《React Native Sticky Shapes》](https://www.youtube.com/watch?v=7j4Av7rfl9k)
- https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/reanimated-2/src/StickyShapes