---
layout: post
title:  "Android 学习笔记(01) Activity 跳转"
category: Android-Study
tags:   [Android, Activity]
---

#### **1. 新建Project，并将主页命名为MainActivity**

#### **2. 创建一个Activity**

在App上“右键->New->Activity->Empty Activity”， 将新建的Activity命名为AnotherAty。

#### **3. 在MainActivity上添加一个按钮，并设置 id 和 text 属性**

打开”activity_main.xml”， 添加如下代码：

{% highlight xml %}
<Button
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="Another Activity"
android:id="@+id/btnStartAnotherAty"
android:layout_below="@+id/textView"
android:layout_alignParentLeft="true"
android:layout_alignParentStart="true" />
{% endhighlight %}

#### **4. 为按钮添加行为**

打开“MainActivity.java”，在OnCreate方法内添加：

{% highlight java linenos %}
findViewById(R.id.btnStartAnotherAty).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this,AnotherAty.class));
            }
});
{% endhighlight %}

　　这是完整代码:

{% highlight java linenos %}
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btnStartAnotherAty).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this,AnotherAty.class));
            }
        });
    }
}
{% endhighlight %}

这样就实现了单击MainActivity中的Button跳转到AnotherAty的功能。

