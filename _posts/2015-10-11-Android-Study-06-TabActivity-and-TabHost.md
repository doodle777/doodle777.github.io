---
layout: post
date: 2015-10-12 22:04:00
title:  "Android学习手记(06) TabActivity和TabHost"
category: Android-Study
tags:   [Android, TabActivity, TabHost]
---

使用TabHost可以实现标签式效果，将两个Activity放在两个Tab内。 

首先，需要基于MainActivity创建一个TabHost对象。

>TabHost tabHost = this.getTabHost();

通过 TabHost.addTab() 可以创建一个新Tab。

>TabHost.addTab(tabHost.newTabSpec("tab1").setIndicator("Sign In").setContent(new Intent(this, SignIn.class)));

其中，newTabSpec() 设置新建Tab名称。setIndicator(“”) 设置新建标签的内容。setContent()设置Tab的内容。 

---

首先，新建两个Activity，分别命名为“SignIn“和”SignUp“。

<div style="text-align: center">
<img src="{{ site.url }}/images/201510/2015101106.png"/> 
<img src="{{ site.url }}/images/201510/2015101107.png"/>
</div>
 

然后在MainActivity中加入如下代码，即可实现下图所示功能。 

MainActivity.java

{% highlight java linenos %}
public class MainActivity extends TabActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setTitle("TabActivity");

        TabHost tabHost = this.getTabHost();
        tabHost.addTab(tabHost.newTabSpec("tab1").setIndicator("Sign In").setContent(new Intent(this, SignIn.class)));
        tabHost.addTab(tabHost.newTabSpec("tab2").setIndicator("Sign Up").setContent(new Intent(this, SignUp.class)));
    }
}
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/201510/2015101108.png"/> 
<img src="{{ site.url }}/images/201510/2015101109.png"/>
</div>
 
