---
layout: post
date: 2015-11-17 10:11:00
title:  "Android开发手记(28) Handler和Looper"
category: Android-Study
tags:   [Android, Handler, Looper]
---

　　Android的消息处理有三个核心类：Looper,Handler和Message。其实还有一个Message Queue（消息队列），但是MQ被封装到Looper里面了，我们不会直接与MQ打交道。平时我们最常使用的就是Message与Handler了，如果使用过HandlerThread或者自己实现类似HandlerThread的东西可能还会接触到Looper，而MessageQueue是Looper内部使用的，对于标准的SDK，我们是无法实例化并使用的（构造函数是包可见性）。

　　在Android中，消息处理的大体过程为：

- （1）首先，要有消息的内容，我们将其放到一个Bundle中来存储消息的内容。  
- （2）然后通过此Bundle来实例化一个Message，并将此Message作为消息发送的基本单位。  
- （3）之后可以将Message放到Looper中用以循环处理消息。  
- （4）由于Handler内部拥有Looper实例，所以可以直接通过Handler发送和处理上述的Message。  

　　以上就是Android中消息发送和处理的基本过程。

　　以下1、2部分引自[博客园](http://www.cnblogs.com/codingmyworld/archive/2011/09/14/2174255.html)

#### **1、Looper**

　　Looper的字面意思是“循环者”，它被设计用来使一个普通线程变成Looper线程。所谓Looper线程就是循环工作的线程。在程序开发中（尤其是GUI开发中），我们经常会需要一个线程不断循环，一旦有新任务则执行，执行完继续等待下一个任务，这就是Looper线程。使用Looper类创建Looper线程很简单：

{% highlight java linenos %}
public class LooperThread extends Thread {
    @Override
    public void run() {
        // 将当前线程初始化为Looper线程
        Looper.prepare();
         
        // ...其他处理，如实例化handler
         
        // 开始循环处理消息队列
        Looper.loop();
    }
}
{% endhighlight %}

　　通过上面两行核心代码，你的线程就升级为Looper线程了！！！是不是很神奇？让我们放慢镜头，看看这两行代码各自做了什么。

#### 1) Looper.prepare()

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201511/2015111701.png"/> 
</div>

　　通过上图可以看到，现在你的线程中有一个Looper对象，它的内部维护了一个消息队列MQ。注意，一个Thread只能有一个Looper对象。

#### 2）Looper.loop()

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201511/2015111702.png"/> 
</div>

　　调用loop方法后，Looper线程就开始真正工作了，它不断从自己的MQ中取出队头的消息(也叫任务)执行。由上loop()方法可以简单得出结论，Looper用以处理MessageQueue中的取出的Message，由MessageQueue是Handler及Looper所共用的，取出的Message则交由Handler进行处理。而Handler也能够通过post或者send等方式将Message添加到MessageQueue中供Looper后续进行取出处理。sThreadLocal保证了Looper是线程私有的，所有信息发送与处理都是在本线程中。

　　prepare()用以在sThreadLocal中创建线程与该线程对应的Looper的键值对；new Handler或者getHandler创建的Handler都根据sThreadLocal.get()进行获取；创建的Handler与Looper共用MessageQueue;loop开始循环处理Messagequeue中的事件。其即为整个流程。

#### **2、Handler**

　　handler扮演了往MQ上添加消息和处理消息的角色（只处理由自己发出的消息），即通知MQ它要执行一个任务(sendMessage)，并在loop到自己的时候执行该任务(handleMessage)，整个过程是异步的。handler创建时会关联一个looper，默认的构造方法将关联当前线程的looper，不过这也是可以set的。加入handler后的效果如下图：

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201511/2015111703.png"/> 
</div>

　　可以看到，一个线程可以有多个Handler，但是只能有一个Looper！

#### **3、使用Handler发送和处理消息**

　　根据本文开始提到的，我们来实现通过Handler发送消息，然后改变MainActivity内一个TextView的颜色和内容。规定 flag == false 时为红色，arg1 = 0；flag == true 时为蓝色，arg1 = 1。

　　我们需要明白，Handler是通过一个进程来发送消息的，所以我们需要将发送消息的过程写到Runnable.run()方法内。首先我们新建一个SendMessage implements Runnable 类，然后我们构造消息：

{% highlight java linenos %}
@Override
public void run(){
    while(true) {
        try {
              Thread.sleep(1000);                 // 每个1秒启动一次消息发送
              Bundle bundle = new Bundle();       // Bundle 用于存储消息内容
              Message msg = Message.obtain();     // 实例化一个空消息
              if (flag) {                         // 如果flag为真，说明当前颜色为蓝色
                  msg.arg1 = 0;                   // 颜色应变为红色，记录信息用于发送
                  flag = false;                   // 假设当前已经变为红色
                  bundle.putString("text", "我的颜色是红色");
            } else {                              // 如果flag为假，说明当前颜色为红色
                  msg.arg1 = 1;                   // 颜色应变为蓝色，记录信息用于发送
                  flag = true;                    // 假设当前已经变为蓝色
                  bundle.putString("text", "我的颜色是蓝色");
            }
              count++;                            // 记录颜色变化的次数
              msg.arg2 = count;                   // 存储颜色变化的次数用以发送
              msg.setData(bundle);                // 将Bundle封装至待发送的消息
              handler.sendMessage(msg);           // 通过handler发送消息
        } catch (Exception e) {
              e.printStackTrace();
        }
    }
}
{% endhighlight %}

　　这里需要注意的是，我们在通过bundle发送消息的时候，发送到什么地方了呢？这里我们需要在MainActivity内实例化一个Handler来处理发送的消息，并同时用此Handler来构造SendMessage。

{% highlight java linenos %}
class SendMessage implements Runnable{
    private Handler handler;
    static boolean flag = false;
    static int count = 0;
 
    public SendMessage(Handler handler){
        this.handler = handler;
    }
 
    @Override
    public void run(){
        while(true) {
            try {
                Thread.sleep(1000);                 // 每个1秒启动一次消息发送               
    /* ----------------------------------------- */
                handler.sendMessage(msg);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
 
}
{% endhighlight %}

　　下面就是在MainActivity内进行消息处理，我们继承Handler来新建一个自己的消息处理器。通过Message.getData().getString(String keyValue)来获取我们上一步中封装到Message内的Bundle信息。通过判断传入Message的arg1和arg2的简单int类型，来判断需要改变的颜色。（如果待发送的消息比较简单的话，可以直接封装到Message的arg1或者arg2内，就不必再使用Bundle来发送消息了）。

{% highlight java linenos %}
class MyHandler extends Handler{
    @Override
    public void handleMessage(Message msg){
        textView.setText(msg.getData().getString("text") + msg.arg2);
        if(msg.arg1 == 1)
            textView.setTextColor(Color.BLUE);
        else
            textView.setTextColor(Color.RED);
    }
 
}
{% endhighlight %}

　　最后，为Button添加单击事件，来启动SendMessage线程即可。

{% highlight java linenos %}
public class MainActivity extends Activity {
 
    private Button button;
    private TextView textView;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        button = (Button)findViewById(R.id.button);
        textView = (TextView)findViewById(R.id.textView);
 
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Thread thread = new Thread(new SendMessage(new MyHandler()));
                thread.start();
            }
        });
    }
 
    class MyHandler extends Handler{
        @Override
        public void handleMessage(Message msg){
            textView.setText(msg.getData().getString("text") + msg.arg2);
            if(msg.arg1 == 1)
                textView.setTextColor(Color.BLUE);
            else
                textView.setTextColor(Color.RED);
        }
 
    }
 
}
{% endhighlight %}

　　完整代码如下：

{% highlight java linenos %}
import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Message;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
 
 
public class MainActivity extends Activity {
 
    private Button button;
    private TextView textView;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        button = (Button)findViewById(R.id.button);
        textView = (TextView)findViewById(R.id.textView);
 
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Thread thread = new Thread(new SendMessage(new MyHandler()));
                thread.start();
            }
        });
    }
 
    class MyHandler extends Handler{
        @Override
        public void handleMessage(Message msg){
            textView.setText(msg.getData().getString("text") + msg.arg2);
            if(msg.arg1 == 1)
                textView.setTextColor(Color.BLUE);
            else
                textView.setTextColor(Color.RED);
        }
 
    }
 
}
 
class SendMessage implements Runnable{
    private Handler handler;
    static boolean flag = false;
    static int count = 0;
 
    public SendMessage(Handler handler){
        this.handler = handler;
    }
 
    @Override
    public void run(){
        while(true) {
            try {
                Thread.sleep(1000);                 // 每个1秒启动一次消息发送
                Bundle bundle = new Bundle();       // Bundle 用于存储消息内容
                Message msg = Message.obtain();     // 实例化一个空消息
                if (flag) {                         // 如果flag为真，说明当前颜色为蓝色
                    msg.arg1 = 0;                   // 颜色应变为红色，记录信息用于发送
                    flag = false;                   // 假设当前已经变为红色
                    bundle.putString("text", "我的颜色是红色");
                } else {                            // 如果flag为假，说明当前颜色为红色
                    msg.arg1 = 1;                   // 颜色应变为蓝色，记录信息用于发送
                    flag = true;                    // 假设当前已经变为蓝色
                    bundle.putString("text", "我的颜色是蓝色");
                }
                count++;                            // 记录颜色变化的次数
                msg.arg2 = count;                   // 存储颜色变化的次数用以发送
                msg.setData(bundle);                // 将Bundle封装至待发送的消息
                handler.sendMessage(msg);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
 
}
{% endhighlight %}

