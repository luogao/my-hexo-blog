---
title: new article
date: 2017-12-30 20:31:25
tags: test
---

# test

你好， 这是我的新的Hexo博客， 欢迎光临

``` bash
$ hexo new "My New Post"
```
<!-- more -->

```
.
├── _config.yml # 主题配置文件
├── layout # 布局文件夹
│   ├── archive.pug # 归档页
│   ├── category.pug # 分类页
│   ├── includes # 复用的公共页
│   │   ├── layout.pug # 页面布局
│   │   ├── pagination.pug # 翻页模板
│   │   └── recent-posts.pug # 文章列表模板
│   ├── index.pug # 主页
│   ├── page.pug # 页面详情页
│   ├── post.pug # 文章详情页
│   └── tag.pug # 标签页
└── source # 资源文件夹
    ├── css # CSS
    │   └── temp.styl
    ├── favicon.ico # 站点图标
    └── js # JS
        └── temp.js
```


``` javascript
var hljs = require('highlight.js/lib/highlight');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var alias = require('../highlight_alias.json');

function highlightUtil(str, options) {
  if (typeof str !== 'string') throw new TypeError('str must be a string!');
  options = options || {};

  var useHljs = options.hasOwnProperty('hljs') ? options.hljs : false;
  var gutter = options.hasOwnProperty('gutter') ? options.gutter : true;
  var wrap = options.hasOwnProperty('wrap') ? options.wrap : true;
  var firstLine = options.hasOwnProperty('firstLine') ? +options.firstLine : 1;
  var caption = options.caption;
  var mark = options.hasOwnProperty('mark') ? options.mark : [];
  var tab = options.tab;

  hljs.configure({ classPrefix: useHljs ? 'hljs-' : ''});

  var data = highlight(str, options);

  if (useHljs && !gutter) wrap = false;

  var before = useHljs ? '<pre><code class="hljs ' + options.lang + '">' : '<pre>';
  var after = useHljs ? '</code></pre>' : '</pre>';

  if (!wrap) return useHljs ? before + data.value + after : data.value;

  var lines = data.value.split('\n');
  var numbers = '';
  var content = '';
  var result = '';
  var line;

  for (var i = 0, len = lines.length; i < len; i++) {
    line = lines[i];
    if (tab) line = replaceTabs(line, tab);
    numbers += '<span class="line">' + (firstLine + i) + '</span><br>';
    content += formatLine(line, firstLine + i, mark, options);
  }

  result += '<figure class="highlight' + (data.language ? ' ' + data.language : '') + '">';

  if (caption) {
    result += '<figcaption>' + caption + '</figcaption>';
  }

  result += '<table><tr>';
```