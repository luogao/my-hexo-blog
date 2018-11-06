---
title: 简单的网站搭建——初步配置
date: 2018-11-06 17:54:35
tags:
---

最近趁着双十一的折扣，换了服务器厂商，重新配置了一遍新服务器。记录一下配置过程

<!--more-->

本文适用于CentOS 7.x版本。

## 首先你得有一个服务器

买好一个服务器，具体操作因服务器厂商的不同，不尽相同

配置的话，小型站点的话 1G 1核 就完事了，多了价格也跟着涨的。

挑好配置，然后下单，付款。云服务器就准备好了，在终端通过`ssh`命令链接一下，就已经可以进入到服务器啦

怎么用`ssh` 连接，百度就知道了。

这里不多说服务器怎么链接，怎么买，怎么登陆。。。之类的问题，主要是介绍我自己在一台服务器上会做的一些事情

## 初步配置

### 一：修改密码

最开始是通过root 作为用户登陆到主机，所以先来修改root 的密码。这里建议通过**密码生成器**类似的工具生成一个复杂的密码。然后，把这个密码~~背下来是不可能~~记在你的有保护的备忘录里，或者抄下来到自己的小本本里。请自行保管好自己的密码。

命令如下

```bash
passwd
```

输入命令之后就会有提示，跟着提示走下来就好了

### 二：新建用户

可能以后自己的网站会有多个用户维护，所以需要给自己设置一个用户

```bash
useradd -d /home/roy -s /bin/bash -m roy
```

上面命令中，参数d指定用户的主目录，参数s指定用户的shell，参数m表示如果该目录不存在，则创建该目录。

接着就是设置新用户的密码

```bash
passwd roy
```

密码设置好了就是给新用户添加权限了

```bash
visudo
```

visudo命令会打开sudo设置文件/etc/sudoers，找到下面这一行

```bash
root    ALL=(ALL:ALL) ALL
```

在这一行下面加上一行

```bash
roy     ALL=(ALL:ALL) ALL
```

保存更改之后，可以`exit`退出当前root 的登陆，使用新创建的用户登陆，看是否成功

### 三：SSH设置

其实每次通过`ssh` 登陆，需要输入密码我觉得还行，不是很麻烦。至少有点安全的感觉。但是嫌麻烦，可以把自己本地的机器的SSH公钥拷贝到服务器的authorized_keys 文件里

```bash
cat ~/.ssh/id_rsa.pub | ssh roy@ip.ip.ip.ip 'mkdir -p .ssh && cat - >> ~/.ssh/authorized_keys'

# 或者在服务器端，运行下面命令

echo "ssh-rsa [your public key]" > ~/.ssh/authorized_keys
```

然后就是修改一些服务器上ssh 的默认配置，编辑ssh 配置文件/etc/ssh/sshd_config

```bash
sudo cp /etc/ssh/sshd_config ~
sudo nano /etc/ssh/sshd_config
```

进入到文件可以看到有Port 22 的默认配置，这里可以修改成你喜欢的端口（从1025到65536之间的任意一个整数），确保不会跟别的端口冲突了。

个人觉得修改一个端口号就够了，如果还需要别的配置可以百度。

最后保存好修改之后，重启一下ssh，没有问题的话，更改的设置应该已经在重启后就生效了。可以`exit`一下，试试配置的端口号是否管用

图方便的话，可以在本机的~/.ssh 文件夹下面创建config 文件，里面写上如下内容

```bash
# 请自行填充 #号后面的内容，并删除#
Host # 想给这个服务器取的名字
HostName # 服务器的ip 地址
User # 用户名
Port # 配置的端口号 默认22
```

保存之后，试试 `ssh 给服务器取的名字` 看是否能成功登陆上去

到此，我为自己的服务器初步配置的内容就结束了，这部分主要是参考和摘录[阮一峰](https://github.com/ruanyf)老师的[Linux服务器的初步配置流程](http://www.ruanyifeng.com/blog/2014/03/server_setup.html)主要内容，感谢，侵删。

## Nginx 安装和简单配置

建站一般会在服务器上配个[LNMP](https://www.zhihu.com/question/20561907)，但是这里我用的是[Hexo](https://hexo.io/)构建的静态网站，所以不需要MySql，PHP这些。只需要安装配置nginx ，所以接下来就说说怎么安装配置。需要了解LNMP的相关配置，可以百度

### 安装

添加RPM包进行安装

```bash
#添加Nginx包
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

#安装
sudo yum -y install nginx
```

上面就等待下载就好，然后会有一个询问是否安装的提示，输入yes 然后回车就好了

安装完之后，就可以来启动nginx了

```bash
#启动服务
sudo systemctl start nginx
#（如果启动失败，可能是Apache等服务占用了80端口，关掉相应服务/修改端口即可）

#设置nginx开机启动
sudo systemctl enable nginx
```

nginx的默认端口是80，所以如果服务器有别的服务占用了80端口，就会导致nginx启动失败，请自行排查一下

值得一提的是，有的主机商会设置一些默认安全组（在主机商的控制台里可以看到）这时即使服务器上的端口80没问题，主机的安全组里没有配置80的话 也会导致无法访问，所以出现无法访问的情况可以逐一排查问题原因所在

测试安装是否成功，只要在浏览器地址栏输入服务器的IP，出现了如下图所示内容，则说明成功

{% asset_img nginx-test-page.png nginx-test-page %}

### 配置

这里只提一下简单的配置，接下来应该会在下篇和下下篇文章（flag）提到nginx的https的配置，和一些由配置带来的网站优化内容会具体提及

我是直接修改的全局配置文件`/etc/nginx/nginx.conf` 

主要就是修改root 项为我的网站项目的路径

```bash
vim /etc/nginx/nginx.conf
```



```nginx
server {
    listen 80;
    # ... 默认配置，省略
    root /home/www;
    # ... 默认配置，省略
    # ...
    location / {
    	index index.html index.htm;
    }
    # ...
}
```

以上只是示例

保存完更改之后可以通过`nginx -t`指令来测试配置文件是否正确，如果出现ok 相关内容，说明配置更改成功。然后重启nginx 服务就好了 `systemctl restart nginx`



## 最后

至此，本文想记录的就到这里了，只是个比较简单的服务器初始配置和nginx 的安装配置。本文无具体教学目的和效果。只是作者为了记录自己在买回来新的服务器会做的一些事情。其实服务器的配置百度一下会有很多很好的教程，需要的可以自己百度



## 参考

[Linux服务器的初步配置流程](http://www.ruanyifeng.com/blog/2014/03/server_setup.html)

[【CentOS7快速上手】4、Nginx安装&配置](https://cloud.tencent.com/developer/article/1334264)

[centos7重启apache、nginx、mysql、php-fpm命令](https://segmentfault.com/a/1190000010269580)