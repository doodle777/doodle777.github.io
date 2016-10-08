---
layout: post
date: 2015-11-08 19:43:00
title:  "Android开发手记(24) Log的使用及颜色的更改"
category: Android-Study
tags:   [Android, Log]
---

* content
{:toc}

　　在程序开发过程中，LOG是广泛使用的用来记录程序执行过程的机制，它既可以用于程序调试，也可以用于产品运营中的事件记录。在Android系统中，提供了简单、便利的LOG机制，开发人员可以方便地使用。本文简单介绍了Android中Log的使用以及在Android Studio中 Log 颜色的更改。

　　要使用 Log，我们需要首先 import android.util.Log，其中Log常用的方法有5个：Log.v() Log.d() Log.i() Log.w() 以及 Log.e() 。根据首字母对应VERBOSE，DEBUG，INFORMATION，WARNING，ERROR。其中：

- Log.v 的调试颜色为黑色的，任何消息都会输出。
- Log.d的输出颜色是蓝色的，仅输出debug调试的意思，但他会输出上层的信息。
- Log.i的输出为绿色，一般提示性的消息information，它不会输出Log.v和Log.d的信息，但会显示i、w和e的信息。
- Log.w的意思为橙色，可以看作为warning警告，一般需要我们注意优化Android代码，同时选择它后还会输出Log.e的信息。
- Log.e为红色，可以想到error错误，这里仅显示红色的错误信息，这些错误就需要我们认真的分析，查看栈的信息了。

　　我们新建一个Button，然后Click事件设置为：

{% highlight java linenos %}
Log.v("MainActivity", "This is Verbose.");
Log.d("MainActivity", "This is Debug.");
Log.i("MainActivity", "This is Information");
Log.w("MainActivity", "This is Warning.");
Log.e("MainActivity", "This is Error.");
{% endhighlight %}

　　此时，我们单击Button时，在Android/logcat中便会显示出Log信息：

<div style="text-align: center">
<img src="{{ site.url }}/images/201511/2015110801.png"/> 
</div>

　　但是，我们发现，Log信息在你的电脑上可能是白色和红色的。那么如何来修改Log信息的颜色呢？

1. File->Settings 或Ctrl + Alt +S
2. 找到 Editor -> Colors &Fonts -> Android Logcat 或在上面的搜索框中输入Logcat
3. 点中Verbose , Info, Debug等选项，然后在后面将Use Inberited attributes 去掉勾选
4. 再将 Foreground 前的复选框选上，就可以双击后面的框框去选择颜色了
5. Apply–>OK
      我们可以将Log颜色修改如下，便可得到上图所示的Log效果。

| Log | 色值 |
|----------|------|
| VERBOSE | BBBBBB |
| DEBUG | 0070BB |
| INFOMATION | 48BB31 |
| WARNING | BBBB23 |
| ERROR | FF0006 |
| ASSERT | 8F0005 |

　　至此便可得到上述的效果了。

　　完整代码如下：

{% highlight java linenos %}
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
 
public class MainActivity extends Activity {
 
    private Button button;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        button = (Button) findViewById(R.id.button);
 
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v("MainActivity", "This is Verbose.");
                Log.d("MainActivity", "This is Debug.");
                Log.i("MainActivity", "This is Information");
                Log.w("MainActivity", "This is Warning.");
                Log.e("MainActivity", "This is Error.");
            }
        });
    }
 
}
{% endhighlight %}
