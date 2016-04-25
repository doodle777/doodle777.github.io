---
layout: post
title:  "Android开发手记(25) 简单Service的实现"
category: Android-Study
tags:   [Android, Service]
---

　　本文将通过实现一个简单的Service发送简单消息，然后通过一个BroadcastReceiver接收Service发送的消息，从而改变一个TextView的文本颜色。

　　这里，我们需要三个java文件，一个实现MainActivity，一个实现Service，一个实现BroadcastReceiver。

　　首先是MyService.java，为了让BroadcastReceiver，接收到消息，我们需要调用sendBroadcast(Intent) 方法，这里的intent便是我们需要发送的消息内容。发送消息的时候改变TextView的颜色一次。

{% highlight java %}
intent = new Intent("Change_Color");
sendBroadcast(intent);
{% endhighlight %}

　　为了实现1s改变一次TextView的颜色，我们需要将Service运行在一个线程之中，这时我们来新建一个线程，并让此线程每隔1s休眠一次。需要注意的是，在最后一定不能忘记调用Thread.start()。

{% highlight java linenos %}
new Thread(){
    @Override
    public void run(){
        while(true){
            intent = new Intent("Change_Color"); // 待广播的intent
            sendBroadcast(intent);               // 广播intent
            try{
                Thread.sleep(1000);              // 休眠1秒
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }
 
}.start();                                      // 开启线程
{% endhighlight %}

　　另外，继承Service的话，需要重载onBind方法，IBinder是远程对象的基本接口，是为高性能而设计的轻量级远程调用机制的核心部分。但它不仅用于远程调用，也用于进程内调用。这个接口定义了与远程对象交互的协议。Android的远程调用（就是跨进程调用）就是通过IBinder实现的。

　　完整代码如下：

{% highlight java linenos %}
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
 
public class MyService extends Service{
 
    private Intent intent;
 
    @Override
    public IBinder onBind(Intent i){
        return null;
    }
 
    @Override
    public void onCreate(){
        super.onCreate();
 
        new Thread(){
            @Override
            public void run(){
                while(true){
                    intent = new Intent("Change_Color");
                    sendBroadcast(intent);
                    try{
                        Thread.sleep(1000);
                    } catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
 
        }.start();
    }
 
    @Override
    public void onDestroy(){
        super.onDestroy();
 
        this.stopService(intent);
    }
}
{% endhighlight %}

　　然后是MyBroadcastReceiver.java，继承BroadcastReceiver，然后重载onReceiver。在得到的intent判断intent.getAction()是否和发送的消息相同即可。

{% highlight java linenos %}
if(intent.getAction().equals("Change_Color")){          // 接受的intent是上述发送的intent
    if(!colorIndex) {
        MainActivity.textView.setTextColor(Color.BLUE); // 改变TextView的颜色
        colorIndex = true;
    } else {
        MainActivity.textView.setTextColor(Color.RED);
        colorIndex = false;
    }
{% endhighlight %}

　　colorIndex需要定义为static，为了使下一次实例化MyBroadcastReceiver的时候可以记住当前的TextView颜色。完整代码如下：

{% highlight java linenos %}
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
 
public class MyBroadcastReceiver extends BroadcastReceiver{
 
    static boolean colorIndex = false;
 
    @Override
    public void onReceive(Context context, Intent intent){
 
        if(intent.getAction().equals("Change_Color")){
            if(!colorIndex) {
                MainActivity.textView.setTextColor(Color.BLUE);
                colorIndex = true;
            } else {
                MainActivity.textView.setTextColor(Color.RED);
                colorIndex = false;
            }
 
        }
    }
}
{% endhighlight %}

　　最后是MainActivity.java，这个比较简单，在onCreate()内startService()，在onDestroy()内stopService()即可。注意一定要stopService()，否则这个Service将一直占用CPU时间。

{% highlight java linenos %}
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
 
public class MainActivity extends Activity {
 
    private Button button;
    static TextView textView;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
 
        textView = (TextView)findViewById(R.id.textView);
        button = (Button)findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
 
                startService(new Intent(MainActivity.this, MyService.class));  // 启动服务
                textView.setText("这是一个可以变颜色的文字");
            }
        });
    }
 
    @Override
    public void onDestroy(){
        super.onDestroy();
 
        stopService(new Intent(MainActivity.this, MyService.class));           // 关闭服务
    }
}
{% endhighlight %}

　　仅仅这样做，我们发现仍然没法让程序按照我们希望的样子运行。这是因为我们没有在AndroidManifest.xml内注册我们定义的Service和BroadcastReceiver。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.doodle.example" >
 
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
 
        <service android:name=".MyService"/>
        <receiver android:name=".MyBroadcastReceiver">
            <intent-filter>
                <action android:name="Change_Color"/>
            </intent-filter>
        </receiver>
 
    </application>
 
</manifest>
{% endhighlight %}

