---
layout: post
date: 2015-10-14 19:48:00
title:  "Android学习手记(07) 按钮类控件的使用"
category: Android-Study
tags:   [Android, Button]
---

#### **1、点击Button改变页面背景色**

　　通过Button改变页面背景色，首先新建相应的对象，让后绑定到Layout上的元素。

- final RelativeLayout layout = (RelativeLayout)this.findViewById(R.id.layout);
- final Button btnRed = (Button)this.findViewById(R.id.btnRed);

　　然后向新建的按钮增加单机事件。

{% highlight java linenos %}
        btnRed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                layout.setBackgroundColor(Color.RED);
                ((Button)view).setText("Is Red");
            }
        });
{% endhighlight %}

　　完整代码： 

{% highlight java linenos %}
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setTitle("Button");
        setContentView(R.layout.activity_main);

        final RelativeLayout layout = (RelativeLayout)this.findViewById(R.id.layout);
        final Button btnRed = (Button)this.findViewById(R.id.btnRed);
        final Button btnGreen = (Button)this.findViewById(R.id.btnGreen);
        final Button btnBlue = (Button)this.findViewById(R.id.btnBlue);

        btnRed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                btnGreen.setText("Green");
                btnBlue.setText("Blue");
                layout.setBackgroundColor(Color.RED);
                ((Button)view).setText("Is Red");
            }
        });
        btnGreen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                btnRed.setText("Red");
                btnBlue.setText("Blue");
                layout.setBackgroundColor(Color.GREEN);
                ((Button)view).setText("Is Green");
            }
        });
        btnBlue.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                btnRed.setText("Red");
                btnGreen.setText("Green");
                layout.setBackgroundColor(Color.BLUE);
                ((Button)view).setText("Is Blue");
            }
        });

    }
}
{% endhighlight %}


#### **2、CheckBox状态获取**

　　要获取CheckBox状态，只需要设置OnCheckedChangeListener()即可。

{% highlight java linenos %}
        CheckBox chkBox = (CheckBox) findViewById(R.id.chkFootball);
        chkFootball.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b) strFootball = "Football";
                else strFootball = "";
                tvResult.setText(strFootball + " " + strBasketball);
            }
        });
{% endhighlight %}

　　完整代码为：

{% highlight java linenos %}
public class MainActivity extends AppCompatActivity {

    private String strFootball = "";
    private String strBasketball = "";
    private TextView tvResult ;
    private CheckBox chkFootball;
    private CheckBox chkBasketball;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        this.setTitle("Button");
        setContentView(R.layout.activity_main);
        tvResult = (TextView) findViewById(R.id.tvResult);
        chkFootball = (CheckBox) findViewById(R.id.chkFootball);
        chkBasketball = (CheckBox) findViewById((R.id.chkBasketball));

        chkFootball.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b) strFootball = "Football";
                else strFootball = "";
                tvResult.setText(strFootball + " " + strBasketball);
            }
        });

        chkBasketball.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b) strBasketball = "Basketball";
                else strBasketball = "";
                tvResult.setText(strFootball + " " + strBasketball);
            }
        });
    }

}
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/201510/2015101401.png"/> 
</div>

#### **3、RadioButton与RadioGroup**

　　要获取RadioGroup内RadioButton的选择状态，为RadioGroup添加选择事件即可。

{% highlight java linenos %}
        rGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                // TODO
            }
        });
{% endhighlight %}

　　首先在RadioGroup内创建两个RadioButton:

{% highlight xml %}
<RadioGroup
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@+id/textView"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:id="@+id/rGroup">

        <RadioButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="男"
            android:id="@+id/rbMale"
            android:checked="false" />

        <RadioButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="女"
            android:id="@+id/rbFemale"
            android:checked="false" />

    </RadioGroup>
{% endhighlight %}

　　然后，为RadioGroup设置OnCheckedChangeListener()

{% highlight java linenos %}
        rGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                if(i==rbMale.getId()) {
                    result.setText("你的性别是：男");
                }
                else if(i==rbFemale.getId()){
                    result.setText("你的性别是：女");
                }
            }
        });
{% endhighlight %}

　　完整代码：

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

        private TextView result;
        private RadioButton rbMale;
        private RadioButton rbFemale;
        private RadioGroup rGroup;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
//        this.setTitle("Button");
            setContentView(R.layout.activity_main);

            result = (TextView)findViewById(R.id.textView);
            rbMale = (RadioButton)findViewById(R.id.rbMale);
            rbFemale = (RadioButton)findViewById(R.id.rbFemale);
            rGroup = (RadioGroup)findViewById(R.id.rGroup);

            rGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                if(i==rbMale.getId()) {
                    result.setText("你的性别是：男");
                }
                else if(i==rbFemale.getId()){
                    result.setText("你的性别是：女");
                }
            }
        });

    }

}
{% endhighlight %}

