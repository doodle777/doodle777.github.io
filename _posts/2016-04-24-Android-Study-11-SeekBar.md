---
layout: post
title:  "Android开发手记(11) 滑动条SeekBar"
category: Android-Study
tags:   [Android, SeekBar]
---

　　安卓滑动条的操作特别简单，通过getProgress()可以获得SeekBar的位置，通过setProgress(int progress)可以设置SeekBar的位置。要想动态获取用户对SeekBar的操作的话，只需要设置setOnSeekBarChangeListener即可。

>setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201604/2016042410.png"/> 
</div>

　　示例代码如下：

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.SeekBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private SeekBar seekBar;
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        seekBar = (SeekBar) findViewById(R.id.seekBar);
        textView = (TextView) findViewById(R.id.textView);

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                textView.setText(i + " progress");
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
    }
}
{% endhighlight %}


