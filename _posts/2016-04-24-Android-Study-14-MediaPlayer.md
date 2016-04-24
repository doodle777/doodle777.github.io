---
layout: post
title:  "Android开发手记(14) 使用MediaPlayer播放mp3"
category: Android-Study
tags:   [Android, MediaPlayer]
---

#### **1、获取MediaPlayer实例**

#### （1.1）可以直接通过new或者create方式：

　　调用setDataSource和create的区别是，create时已经执行了MediaPlayer.prepare()，而setDataSource需要手动执行。

{% highlight java %}
MediaPlayer mPlayer = new MediaPlayer();
mPlayer.setDataSource();
MediaPlayer mPlayer = MediaPlayer.create();
{% endhighlight %}

#### （1.2）获取用户事先导入到/res的资源文件

{% highlight java %}
private MediaPlayer mPlayer;
mPlayer = MediaPlayer.create(this, R.raw.leessang);
{% endhighlight %}

#### （1.3）获取存储在SD卡或者其他路径下的文件

{% highlight java %}
MediaPlayer mPlayer = new MediaPlayer();
mPlayer.setDataSource("/sdcard/leesang.mp3");
{% endhighlight %}

#### （1.4）获取网络媒体文件

{% highlight java %}
MediaPlayer mPlayer = new MediaPlayer();
mPlayer.setDataSource("http://www.xxxx.com/yyyy.mp3");
{% endhighlight %}

#### **2、播放、暂停**

　　对于通过create调用的媒体，无需在播放时调用prepare方法，而对于通过new创建的媒体，则需要调用一次prepare方法才可完成start的启动。


{% highlight java linenos %}
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    if (mPlayer != null) {
                        if (mPlayer.isPlaying()) {
                            mPlayer.pause();
                            btnStart.setText("播放");
                        } else {
//                          mPlayer.prepare();
                            mPlayer.start();
                            btnStart.setText("暂停");
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
{% endhighlight %}

#### **3、停止播放**

　　当Mediaplayer对象在播放时，可以进行暂停和停止操作，pause方法暂停播放，stop方法停止播放。处于暂停暂停时可通过start方法恢复播放，但是处于停止状态时则必须先调用prepare方法使其处于准备状态，再调用start方法。 


{% highlight java linenos %}
        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    if (mPlayer != null) {
                        mPlayer.stop();
                        seekBar.setProgress(mPlayer.getCurrentPosition());
                        btnStart.setText("播放");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
{% endhighlight %}

#### **4、通过SeekBar控制播放进度**

　　通过MediaPlayer.getDuration()可以得到媒体文件的长度（单位毫秒），可以将此作为SeekBar的最大值。

　　通过MediaPlayer.seekTo(int i)可以定位媒体文件的任意位置（单位毫秒），mPlayer.seekTo(seekBar.getProgress()); 


{% highlight java linenos %}
        seekBar.setMax(mPlayer.getDuration());
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                mPlayer.seekTo(seekBar.getProgress());
            }
        });
{% endhighlight %}

#### **5、将播放时间反馈给SeekBar**

　　由于Android没有提供播放时间反馈方法，所以只能使用定时器或者线程来进行播放反馈。即每隔一定时间来检查播放进度，按照此进度来调节SeekBar。

{% highlight java linenos %}
        mTimer = new Timer();
        mTimerTask = new TimerTask() {
            @Override
            public void run() {
                seekBar.setProgress(mPlayer.getCurrentPosition());
            }
        };
        mTimer.schedule(mTimerTask, 0, 10);
{% endhighlight %}

#### **6、小结**

　　此处转载自[博客园](http://www.cnblogs.com/dyllove98/p/3192090.html)

> #### android Mediaplayer各种属性和方法简单介绍  
>（1） 当一个MediaPlayer对象被创建或者调用 reset() 方法之后，它处于空闲状态，调用 release() 方法后处于结束状态    
> 　　　　1、一个MediaPlayer对象调用了 reset() 方法后，再调用其它方法可能会触发 OnErrorListener.onError() 事件，未调用 reset() 方法则不会触发   
> 　　　　2、当Mediaplayer对象不再被使用时，最好调用 release() 方法对其进行释放，使其处于结束状态，此时它不能被使用   
> 　　　　3、Mediaplayer对象被创建时（调用构造方法）处于空闲状态，若使用 create() 方法创建后则处于准备状态。   
>（2） 一般情况下，一些常用的播放控制操作可能因为音频、视频的格式不被支持或者质量较差以及流超时，也有可能由于开发者的疏忽使得Mediaplayer对象处于无效状态等而导致错误。此时可通过注册setOnErrorListener方法实现监控。如果发生了错误，Mediaplayer对象将处于多雾状态，可以使用 reset() 方法来恢复错误。   
>（3） 任何Mediaplayer对象都必须先处于准备状态，然后才开始播放   
>（4） 要开始播放Mediaplayer对象都必须成功调用 start() 方法，可通过 isPlaying() 方法来检测是否正在播放   
>（5） 当Mediaplayer对象在播放时，可以进行暂停和停止操作， pause() 方法暂停播放， stop() 方法停止播放。处于暂停暂停时可通过 start() 方法恢复播放，但是处于停止状态时则必须先调用 prepare() 方法使其处于准备状态，再调用 start() 方法。   

#### **7、完整代码**

{% highlight java linenos %}
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {

    private Button btnStart;
    private Button btnStop;
    private TextView textView;
    private MediaPlayer mPlayer;
    private SeekBar seekBar;
    private Timer mTimer;
    private TimerTask mTimerTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mPlayer = MediaPlayer.create(this, R.raw.leessang);
        textView = (TextView) findViewById(R.id.textView);
        textView.setText("MP3播放器");
        btnStart = (Button) findViewById(R.id.btnStart);
        btnStop = (Button) findViewById(R.id.btnStop);
        seekBar = (SeekBar) findViewById(R.id.seekBar);

        mPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                btnStart.setText("播放");
                mPlayer.seekTo(0);
                seekBar.setProgress(0);
            }
        });

        mTimer = new Timer();
        mTimerTask = new TimerTask() {
            @Override
            public void run() {
                seekBar.setProgress(mPlayer.getCurrentPosition());
            }
        };
        mTimer.schedule(mTimerTask, 0, 10);


        seekBar.setMax(mPlayer.getDuration());
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                mPlayer.seekTo(seekBar.getProgress());
            }
        });

        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    if (mPlayer != null) {
                        if (mPlayer.isPlaying()) {
                            mPlayer.pause();
                            btnStart.setText("播放");
                        } else {
//                            mPlayer.prepare();
                            mPlayer.start();
                            btnStart.setText("暂停");
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    if (mPlayer != null) {
                        mPlayer.stop();
                        seekBar.setProgress(mPlayer.getCurrentPosition());
                        btnStart.setText("播放");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });

    }
}
{% endhighlight %}

