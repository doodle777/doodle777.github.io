---
layout: post
date: 2017-08-20 14:41:30
title: "Ubuntu下Thunderbird邮件ExQuilla插件license过期解决办法"
category: [Ubuntu]
tags:   [Ubuntu, Thunderbird, ExQuilla]
---

* content
{:toc}

Linux上只用Web版处理邮件，就是因为找不到太好的能支持Exchange的邮件客户端。在网上无意中发现了[ExQuilla][1] 这个Thunderbird的插件，试用了一下还是不错的，很方便，不过只能免费试用60天。
 
网上能找到的解决办法都是用老版本的Thunderbird，搭配老版本的ExQuilla，但版本都太老了点。
 
另外一种办法是破解license，原来的注册码的结构是：
```
EX0,*@*,2015-03-19,80324c6d8724c3e4cd0111b51a5718ad
```
可以看到，注册码被用逗号分成了四个部分：

1. 第一部分是注册类型，EX0是免费给的试用类型，我不知道EX1、EX2是什么情况，但试了下，EX1是可以用的
2. 第二部分是邮件，*@*是免费给的60天试用的，这里要填有效的Exchange邮箱，可以在选项里Valid Emails里看到
3. 第三部分是license过期日期。
4. 第四部分是校验码，分别是前三个部分再加上**```356B4B5C```**算出来的MD5值。
 
例如，注册类型EX1、Exchange邮箱xxx@xxx.com，到期日期2016-12-31(注意这里的到期日期是未来你想用到什么时候)，可以计算出MD5的值
EX1,xxx@xxx.com,2016-12-31,356B4B5C
将上面字符串(邮件填写自己的，日期是到期时间)，用md5工具加密，生成加密串，这个加密串是32位的。在线MD5加密工具:[站长之家MD5加密][2]
 
把生成的加密串放到注册码的第四部分如下：
```
EX1,xxx@xxx.com,2016-12-31,4decad8da20e0118311e5861775eb6a7
```
把这个替换原来的注册码就成功了，本例中可以一直用到2016-12-31
Thunderbird -> Tools -> ExQuilla for Microsoft Exchange -> ExQuilla license options -> 在顶部输入栏内，替换新的完整的注册码，重启Thunderbird即可。

[1]:https://addons.mozilla.org/zh-CN/thunderbird/addon/exquilla-exchange-web-services/
[2]:http://tool.chinaz.com/tools/md5.aspx
