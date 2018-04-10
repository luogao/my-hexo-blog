---
title: Vue自定义全局组件制作方法
date: 2018-04-10 15:51:59
tags: Vue
---

解决了一个长期困扰着我的问题，现在记录一下，供日后参考。
<!-- more -->
> 涉及知识点是[Vue.js官网教程][1]中的插件使用

首先我遇到的问题就是我自定义的组件如果需要在项目中其他组件中多次被调用，而我之前的解决方法就是简单的，哪里需要在哪引用。这无疑增加了许多代码重复。

而在使用Vue.js的一些UI框架的时候则注意到，只需要在项目的入口文件中import这个插件然后在接着Vue.use(‘插件名’)。这样就能在整个项目里面使用这个框架中的组件以及方法了。

查阅资料后发现，自定义的组件需要提供一个install方法

``` javascript
import sideblockComponent from './sideBlock'
const defaultComponentName = 'sidebar'

const Sidebar = {
    install(Vue, options = {}) {
        //提供可选的组件名
        const componentName = options.componentName || defaultComponentName 
        Vue.component(componentName, sideblockComponent)
    }
}

export default Sidebar
```
像这样 引入自己编写好的组件，然后创建一个对象，并包含一个install方法，并使用`Vue.component()`方法注册成Vue全局组件，最后`export default`导出这个对象。

到此最关键的步骤已经做好，接下来是**最最关键**的步骤。


----------


我们需要在项目的入口文件中引入刚刚做好的组件，并且通过`Vue.use(引入的组件)`来使用插件。
到此，一个全局Vue组件就弄好了。我们在提供install方法的同时也可以通过Vue.$emit()的方法来触发组件中的方法，但最近在使用Element UI时发现他们组件中的方法一般都是通过Vue.$refs()来触发的。具体原因留到日后再做研究。


[1]: https://cn.vuejs.org/v2/guide/plugins.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6