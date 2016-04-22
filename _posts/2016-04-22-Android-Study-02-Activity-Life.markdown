---
layout: post
title:  "Android 学习笔记(02) Activity 生命周期"
date:   2016-04-21 20:30:19
categories: Android-Study
tags:	Android Activity
---

#### **1. 单个Activity的生命周期**
　　当只有一个Activity的时候， 首先执行onCreate->onStart->onResume。 这时， 窗口便显示在屏幕上了。 然后我们按返回键退到桌面的时候，便执行onPause->onStop。这时候， 如果我们在最近使用程序列表内将其再次打开，便会执行onRestart->onStart->onResume。 

<div style="text-align: center">
<img src="{{ site.url }}/images/2016042201.png"/>
</div>


#### 2. **多个Activity相互跳转**
　　首先执行A.onCreate->A.onStart->A.onResume， 此时屏幕显示Activity A， 通过A来调用显示Activity B的时候，首先执行A.onPause， 然后执行B.onCreate->B.onStart->B.onResume， 在B显示之后执行A.onStop。之后按返回键返回到 A， 需要首先暂停窗口B，即执行 B.onPause， 但是需要指出的是， 这个时候在暂停B之后紧接着执行的是 A.onResume， 之后才会执行B的销毁程序 B.onStop->B.onDestroy。

#### 3. **当B是对话框的时候(不能完全遮挡A)**
　　此时，因为B没有完全遮挡A， 只需要执行A.onPause即可， 不需要执行 A.onStop。其他的过程与2相同。
