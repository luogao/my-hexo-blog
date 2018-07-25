---
title: 前端程序员的一些有学习借鉴作用的网站
date: 2018-04-10 15:55:58
tags: 前端
---

> *记录并分享自己收藏夹中的一些网页*
<!-- more -->

*2017-01-22*

## 01. vue-google-map
https://github.com/GuillaumeLeclerc/vue-google-maps

这个网址陪伴了我一个月左右的时间啊，工作以来，第一块难啃的骨头。原因大概是：之前没有接触过vue.js加上全英文..算是翻山越岭的一次learning。最后老大来了一句：“everything should be English” ... that TRUE ！所以啊，英语很关键~

## 02. Vue.js
https://cn.vuejs.org/

目前看来，带给我的感受就是，易学，易懂，以及轻量。开源啥的都不说了。想学的同学上网搜，或者GitHub上，很多资源啦。晚些时候会把自己做的一个todolist demo 发上来啊。都是跟着教程学的，但是vue.js真的教会我不少啦。还在慢慢爬坑中~

## 03. Baidu Map
http://lbsyun.baidu.com/

不知道多少程序员第一次上手项目时要的功能就是地图啊。反正我是一开始就弄了两个地图啊，每天就是R&D（research and develop）我大概理解是（research and die）。 其实真的说这些开源的API 都是有demo有资源可查的，但是我这根骨头是把Baidu map 与Vue 结合。 当时刚弄好 vue-google-map，所以觉得会有个vue-baidu-map。吼吼，事实证明，是我想太多。总之最后还是在老大的帮助下实现了功能啊，后来有一天问老大，既然之前没人弄过vue-baidu-map，要不咱弄一个...然后就没有然后了啊。老大当时大概的反应就是，what？？？？？

## 04. dropzone
http://www.dropzonejs.com/#installation

可拖拽文件上传api..具体功能就是上传文件不用通过系统的上传工具啊，直接把想要上穿的文件拖拽到指定区域就行了。。这个也是老大交代下来的R&D啊。看的时候就觉得自己的头发一根根往下掉？？？爬坑过程真的是困难，话说回来，单单拿这个插件使用起来是不错的，除了拖拽，还有预览，有上传，删除功能。但是公司项目需求只是要一个拖拽啊，然后呢，遇到了各种坑，还是没把这个功能融入到项目中去，最终与之代替的是Reading files in JavaScript using the File APIs 接下来就介绍这个啦。

## 05. Reading files in JavaScript using the File APIs
https://www.html5rocks.com/en/tutorials/file/dndfiles/

这个说实在我也不太懂的。"HTML5 finally provides a standard way to interact with local files, via the File APIspecification. As example of its capabilities, the File API could be used to create a thumbnail preview of images as they're being sent to the server, or allow an app to save a file reference while the user is offline."——从网站上copy下来的一段话。大概意思是HTML5终于提供了一个file api 通过这个能实现文件（图片）上传预览功能啦。具体我也不太懂啦。这个是当时老大实现的，因为是全英文啦。如果感兴趣的可以去找找中文介绍啦。

## 06.富文本编辑器
项目现在在用的是[summernote][1]——一个UI 友好、开源、免费的，富文本编辑器 。基本满足基本的编辑功能，主要是summernote与Vue 结合起来很方便啊，文档也写得比较易懂，但是需求可能是要我们用一个类似office Word的编辑器？？？ 那就找更符合需求的咯。那我也来分享一下自己的R&D的结果。

- [UEditor][2]  百度出的一款编辑器。免费，开源。中文支持良好。目前也做了英文支持。具体操作官网文档上有的。 个人觉得，界面不是很友好啊，但是功能确实多。

- [wangEditor][3] 基于javascript和css开发的 Web富文本编辑器， 轻量、简洁、易用、开源免费 ——摘自官网的一句话，网上评价还是不错的，但是由于需求不对应，所以没有具体了解啊，喜欢的同学可以试试~

- [Tinymce][4] 目前最优秀的 开源免费编辑器之一，这个是我个人最喜欢的编辑器了啊，界面很友好啊，功能都满足了需求，唯一不尽人意的就是，与Vue结合起来有点困难（对于我来说），因此跟项目的timeline比起来还是timeline更重要啦。感兴趣的同学可以试试。

- [Froala][5] 这个编辑器是收费的啦，但是也提供了免费版本，当然是功能阉割版啦。不过要是项目能支持的话，用这个是再好不过啦，界面很友好，功能也丰富（付费版），但是与vue结合的时候遇到了一些问题啦，不过因为收费，最终还是没使用。

（就介绍这几个我了解过的啦。网上还有很多开源免费的富文本编辑器啦。ps：以上顺序不代表排名。博主随意标注的啦~）

## 07. vue-router
https://router.vuejs.org/en/essentials/getting-started.html

知道vue.js的同学肯定要知道vue-router啦。是vue2提供的一个路由插件啦。很好用的。主要是实现几个组件之前的切换啦。可以看看网上的demo，给我的感觉就是像过气的iframe？但是比iframe肯定好用很多啦。不得不多吹一下vue，毕竟是我学会的第一个框架。:-)   vue里面还有很多很好用的功能，文档里都有，感兴趣的同学可以去查看。

## 08. Animate.css
https://daneden.github.io/animate.css/

前端的同学必须要看看啦。不知道怎么解释啦，看了就知道！！

## 09.firebase
https://firebase.google.com/?hl=zh-TW

firesbase 一个online database，有免费和收费版，意在帮助开发者，快速搭建app提供数据库支持，因为是online 的啊  基本不用怎么配置，只要知道怎么把它引入到自己的项目中就行了。支持Android iOS Web。博主目前准备爬这个坑啦，有同学一起嘛~

----------

*2017-12-26*

 
## 10.vivify
http://vivify.mkcreative.cz/

vivifyshi是一个css动画库，其中动画相较[Animate.css][6] 更加丰富，个人觉得两个可以互相弥补。



## 11.YOU MIGHT NOT NEED JQUERY
http://youmightnotneedjquery.com/

这个厉害了，大家都知道JQuery是一个特别方便的框架，但是毕竟是需要加载或引入的资源。所以，这个网站就像它名字一样——“你或许并不需要JQuery”，这里面提供了大部分常用的JQuery 方法的JavaScript 版，并且提供了针对IE的兼容解决方法。如果您的项目或者网页只有几个小小的特效，不妨试试参考这个网站吧。



## 12.Iconfont-阿里巴巴矢量图标库
http://www.iconfont.cn/

这个是阿里巴巴做的一个icon网站，里面的图标类别特别多，网站同时提供不同色彩，不同文件类型的选择下载。平时喜欢找素材的同学不妨收藏啦~



## 13.cubic-bezier
http://cubic-bezier.com

看到这两个单词相信经常写复杂过度效果或者动画的同学不会陌生。于是，我们需要知道贝塞尔曲线的值是多少并实时预览效果咋整呢！于是这个网站提供了这个功能。

## 14.You-Dont-Need-JavaScript
https://github.com/you-dont-need/You-Dont-Need-JavaScript

You Dont Need 系列，相信许多同学都希望项目里面，能用css解决的效果，坚决不用JS，于是就有了这个啦，有同样想法的同学不妨学习学习哦。

## 15.React 入门实例（阮一峰著）
http://www.ruanyifeng.com/blog/2015/03/react

学习新知识就找阮老师的博客，不知道大家伙是不是都这样，至少我是的。最近算是把React的基础学了一遍，阮老师这篇博客虽然是几年前的，但是现在学起来依旧受益匪浅，想要入门React.js的同学可以去看看，里面的例子也很详细。

## 16.Sass用法指南（阮一峰著）
http://www.ruanyifeng.com/blog/2012/06/sass.html

同样的，阮老师写的这篇介绍Sass的博客，把Sass的特性讲的很好，可以跟着学习。



## 17.Simple CSS Spinners
http://tobiasahlin.com/spinkit/

这里展示了12个纯css写的loading. 还在用gif做loading的同学不妨看看有没有满足您需求的哦！

## 18.JavaScript Promise 迷你书
http://liubin.org/promises-book

这本电子书，比较详细讲述了JS中Promise的知识点，知道JS的异步编程以及回调地狱的同学不妨试试学习这个哦。



## 19.面试相关

[1.流形：我是如何面试一位前端工程师][7]

[2.最新前端面试题][8]

[3.阿里、网易、滴滴共十次前端面试碰到的问题][9]

[4.破解前端面试（80% 应聘者不及格系列）：从 闭包说起][10]

[5.markyun My-blog/Front-end-Developer-Questions/Questions-and-Answers/][11]

----------

*2017-12-29*

## 20.PACE 页面加载loading
http://github.hubspot.com/pace/docs/welcome/
这是一个每次页面加载时会出现的loading插件,用法很简单,在页面引入插件库中的代码即可,有兴趣的同学可以看看.

## 21.关于JavaScript Tips
http://www.jstips.co/zh_CN/javascript/
看名字就知道了 这是一个传授小技巧的网站, 内容不算太多吧(个人感觉).搬砖累了可以去看看.

## 22.Mock.js
http://mockjs.com/
对于想要做前后端分离,单页面应用的却不太了解后端知识的同学再适合不过了,这个插件支持很多类型的模拟数据,配置好之后会自动拦截Ajax请求,后端逻辑没有也不用担心页面空白啦~

## 23.Swiper
http://www.swiper.com.cn/

> 中文网给的评价是开源、免费、强大的移动端触摸滑动插件

移动端开发,h5开发,或者是页面上的一个轮播,翻页(如果你不在乎项目体积) 都可以用的Api文档都比较全.主要是有中文网,哈哈哈
哦对,之前在Vue项目中用过swiper,但是在npm run build 的时候会报错, 找到的解决方法是不用这个库. 哈哈哈 为什么呢, 因为已经有大神把Swiper封装成Vue插件啦,接下来就介绍

## 24.vue-awesome-swiper
https://github.com/surmon-china/vue-awesome-swiper
这是一位大神做的Vue版Swiper,用这个插件确实能解决npm run bulid 使用原版Swiper报错的问题,但具体原因,怎么解决的我没有去了解.哈哈哈
然后就是.这个vue-awesome-swiper封装的功能是很全面了,api直接参照[Swiper官网][12].插件的使用方法大神在github上讲的很清楚啦.同时也提供了SSR解决方案.厉害厉害!

## 25.Muse-UI
http://www.muse-ui.org/#/index
> 官网介绍:基于 Vue 2.0 和 Material Design(本人比较喜欢的一种设计风格)  的 UI 组件库

这个组件库有中文文档,组件也比较丰富,如果希望 Material Design 和Vue的同学,不妨在自己的项目里面尝试一下

## 26.Google Fonts
https://fonts.google.com/  (需科学上网)
这个是谷歌的开源字体库,里面提供多种语言的丰富样式的字体,并且是免费下载,或者直接复制`<link>`地址(需科学上网),建议自主下载字体文件到项目中使用,噢对,这个字体库似乎是没有中文字体的.

## 27.Material Design Icon
https://material.io/icons/  (需科学上网)
上文提到了Material Design,所以这里就顺带把这个图标库po出来,这个是谷歌提供的基于Material Design的一套icon,种类比较丰富,覆盖领域也算还行,喜欢Material Design的话就可以在这里找找需要的icon噢~

## 28.iCSS
https://github.com/chokcoco/iCSS

>你想知道的 CSS 奇技淫巧，在这里，都有。

>本系列围绕 CSS 展开，谈一些有趣的话题，内容天马行空，想到什么说什么，不仅是为了拓宽解决问题的思路，更涉及一些容易忽视或是十分有趣的 CSS 细节。

*iCSS官方说法*

## 29.svgtrick
http://svgtrick.com/
想要了解SVG的同学可以看看这个网站提供的一些例子,可以找找灵感,其中也不乏CSS的动画实例,都有提供demo哦

## 30.cube-ui
https://didi.github.io/cube-ui/#/zh-CN
这是一个基于Vue.js的移动端UI组件库,是[DiDi滴滴出行][13]做的一款UI组件库,github的star有2000+ 文档中有提供手机预览




接下来就是一些个人觉得很好看的网站和一些很有意思的css特效啦！


~~（canvas 很深奥啊~~）

http://blockstudio.tw/en/

http://norgram.co/

https://www.obrigadonatural.com/en_gb

https://tympanus.net/Development/HoverEffectIdeas/index.html

http://www.2lgstudio.com/

https://www.ginlane.com/




~~第一次分享。不足之处多多指点~~


~~第二次分享。不足之处多多指点~~

第三次分享。不足之处多多指点



以上网址都没有任何商业，广告等盈利目的。内容均来自本人日常收集。纯属分享，内容如有雷同，纯属巧合啦。侵删

**感谢阅读**



  [1]: http://summernote.org/
  [2]: http://ueditor.baidu.com/website/
  [3]: http://www.wangeditor.com/
  [4]: http://classfoo.com/ccby/article/e3KsbU8#sec_1BgVeJG
  [5]: https://www.froala.com/wysiwyg-editor
  [6]: https://daneden.github.io/animate.css/
  [7]: https://www.froala.com/wysiwyg-editor
  [8]: http://hawx1993.github.io/Front-end-Interview-Questions/#/?id=%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98-20
  [9]: http://web.jobbole.com/91429/?utm_source=blog.jobbole.com&utm_medium=relatedPosts
  [10]: https://zhuanlan.zhihu.com/p/25855075
  [11]: https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers
  [12]: http://idangero.us/swiper/
  [13]: https://github.com/didi
  