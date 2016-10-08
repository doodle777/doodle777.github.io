---
layout: post
date: 2015-11-22 19:57:00
title:  "Android开发手记(31) 使用MediaRecorder录音"
category: Android-Study
tags:   [Android, MediaRecorder]
---

　　使用Android手机的时候，有时我们会用到录音功能，本文简单的介绍了如何使用MediaRecorder通过手机自带麦克风进行录音。

　　首先，既然是录音，我们需要录音和写外存的权限：

{% highlight xml %}
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
{% endhighlight %}

　　然后，我们创建一个录音的方法startRecord()，当我们单击录音按钮时调用这个方法来进行录音。录音的过程为：

　　（1）确定录音的文件的存放位置

　　（2）实例化一个MediaRecorder对象，并设置其参数

　　（3）调用MediaRecorder.prepare()准备录音

　　（4）调用MediaRecorder.start()开始录音

{% highlight java linenos %}
public void startRecord(){
    if(mr == null){
        File filePath = new File(Environment.getExternalStorageDirectory(), "myRecord");
        File fileName = new File(filePath, System.currentTimeMillis() + ".amr");
        try {
            if (!filePath.exists()) {
                filePath.mkdirs();
            }
            if (!fileName.exists()) {
                fileName.createNewFile();
            }
        } catch(IOException e){
            e.printStackTrace();
        }
 
        mr = new MediaRecorder();
        mr.setAudioSource(MediaRecorder.AudioSource.MIC);      // 设置录音的输入源
        mr.setOutputFormat(MediaRecorder.OutputFormat.AMR_WB); // 设置输出格式
        mr.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_WB); // 设置编码格式
        mr.setOutputFile(fileName.getAbsolutePath());          // 设置输出文件名
 
        try{
            mr.prepare();
            mr.start();
            textView.setText("文件名："+fileName.getAbsolutePath());
        } catch(IOException e){
            e.printStackTrace();
        }
    }
}
{% endhighlight %}

　　然后我们创建一个方法stopRecord()来停止录音，调用MediaRecorder.stop()可以停止录音，调用MediaRecorder.release()释放录音对象。然后将MediaRecorder指针置空以便下一次录音可以实例化新的MediaRecorder对象。

{% highlight java linenos %}
public void stopRecord(){
    if(mr != null){
        mr.stop();
        mr.release();
        mr = null;
    }
}
{% endhighlight %}

　　最后，在MainActivity中为按钮添加单击事件，并调用上述方法即可实现录音。完整代码如下：

#### activity_main.xml

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.doodle.myapplication">
 
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
 
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
 
</manifest>
{% endhighlight %}

#### MainActivity.java

{% highlight java linenos %}
import android.app.Activity;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
 
import java.io.File;
import java.io.IOException;
 
public class MainActivity extends Activity {
 
    private Button button;
    private TextView textView;
    private boolean isStart = false;
    private MediaRecorder mr = null;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        button = (Button)findViewById(R.id.button);
        textView = (TextView)findViewById(R.id.textView);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(isStart){
                    startRecord();
                    button.setText("停止录音");
                    isStart = false;
                }
                else {
                    stopRecord();
                    button.setText("开始录音");
                    isStart = true;
                }
            }
        });
 
    }
 
    public void startRecord(){
        if(mr == null){
            File filePath = new File(Environment.getExternalStorageDirectory(), "myRecord");
            File fileName = new File(filePath, System.currentTimeMillis() + ".amr");
            try {
                if (!filePath.exists()) {
                    filePath.mkdirs();
                }
                if (!fileName.exists()) {
                    fileName.createNewFile();
                }
            } catch(IOException e){
                e.printStackTrace();
            }
 
            mr = new MediaRecorder();
            mr.setAudioSource(MediaRecorder.AudioSource.MIC);      // 设置录音的输入源
            mr.setOutputFormat(MediaRecorder.OutputFormat.AMR_WB); // 设置输出格式
            mr.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_WB); // 设置编码格式
            mr.setOutputFile(fileName.getAbsolutePath());          // 设置输出文件名
 
            try{
                mr.prepare();
                mr.start();
                textView.setText("文件名："+fileName.getAbsolutePath());
            } catch(IOException e){
                e.printStackTrace();
            }
        }
    }
 
    public void stopRecord(){
        if(mr != null){
            mr.stop();
            mr.release();
            mr = null;
        }
    }
 
}
{% endhighlight %}
