---
title: React项目服务端部署过程记录（create-react-app）
date: 2018-04-10 15:42:01
tags: React
---

**说在最最前**

这次分享比较啰嗦啦，想说的很多。实际问题的解决是 “2-3.恍然大悟 部分”，可以直接跳过其他多余的絮叨哦～
<!-- more -->

## 1.前言

最近入职新公司由于前端主要是react，遂开始去学习了解react，这两天跟着电子书《The Road to learn React》敲了一遍，巩固了js，熟悉了react的基础知识。但在完成最后部署上线是遇到一些小问题，由于搜索无果，便记录于此。

> 由于我用的是nginx服务器，所以这里说明一下是基于nginx的配置， 需求不符可以再找找别的啦


## 2.絮叨开始

> 推荐想入门react的同学去看这本书[《The Road to learn React》](https://github.com/the-road-to-learn-react/the-road-to-learn-react-chinese),个人觉得很受用。

### 2-1.一开始很顺畅

首先我这次的项目是用create-react-app这个脚手架搭建的，在`package.json`里面就有写好脚本命令，这个工具的readme里面也有介绍到。
当需要把项目打包成生产环境的文件是需要使用的是`npm run build`这个命令

> `npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

这里把官方的介绍copy过来凑下字数，顺便自己大概意译一下就是这个命令会把可供生产环境使用的文件打包到`bulid`文件夹中，你需要然后访问者打开你的网站时可以访问到你的这个`index.html`，然后就是在`index.html`里面引用的资源文件的路径也跟资源文件一一对应好了。路径如上所述。

### 2-2.Boom
由于是自己的项目，自己的云服务器。没那么多讲究。项目打包好了之后就直接把build文件夹里面的内容丢到服务器上了，也在nginx配置文件中给location配置好了。

兴高采烈访问地址想看看学习成果，不出意料，炸了。

**我先来看看我做了啥。**
- `npm run build`
- 把build文件夹的内容丢到服务器上
- 配置nginx
- 打开浏览器
- boom 空白页面

其实这里页面访问到了，服务器是指向了我的`index.html`文件的，因为没有404错误。
既然服务端没错，那就是前端问题，那么就打开控制台看看，果然报错。

控制台报找不到资源文件，仔细一看这里资源文件的路径指的是我服务器的根目录


### 2-3.恍然大悟

看到控制台报错内容瞬间就想明白了，原来这里`index.html`的路径默认是指向相对根目录的，那么知道问题就开始解决了。
由于之前部署Vue项目时也碰到过这种类似的问题，当时是通过修改webpack配置解决的。

因为这里是通过create-react-app搭建的项目，所以继续看文档发现

> By default, Create React App produces a build assuming your app is hosted at the server root.
To override this, specify the homepage in your package.json, for example:

原来是可以通过往package.json添加homepage项实现相对路径的修改的！

like this:

```js
  "homepage": "http://mywebsite.com/relativepath",
```

### 2-4.大吉大利

不出意外，跟着文档的指示，成功部署到了服务器上，虽然是个很简单的项目。但自己算是第n次初学react了。遂记录一下，以后也有迹可循。

## 3.最后


感谢阅读！
不足之处，请多指教～


