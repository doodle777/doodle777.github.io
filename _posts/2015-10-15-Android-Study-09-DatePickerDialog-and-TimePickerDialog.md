---
layout: post
date: 2015-10-15 20:28:00
title:  "Android学习手记(09) DatePickerDialog 和 TimePickerDialog"
category: Android-Study
tags:   [Android, DatePickerDialog, TimePickerDialog]
---

* content
{:toc}

#### **1、DatePickerDialog**

　　用于获取用户输入的日期信息。其原型为：

>public DatePickerDialog(Contex contex, DatePickerDialog.OnDateSetListener callback, int year, int month, int day);

　　其中，year,month,day是传递给DatePickerDialog的初始值信息，然后通过OnDateSetListener来设置用户选择的日期。

{% highlight java linenos %}
        DatePickerDialog dpDlg = new DatePickerDialog(MainActivity.this, new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        year = i;
                        month = i1;
                        day = i2;
                        tvDate.setText(year + "-" + month + "-" + day);
                    }
                },year,month,day);
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/201510/2015101503.png"/> 
</div>
 
完整代码为：

{% highlight java linenos %}
import android.app.DatePickerDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private TextView tvDate;
    private Button btnDateDlg;
    private int year;
    private int month;
    private int day;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvDate = (TextView) findViewById(R.id.textView);
        btnDateDlg = (Button) findViewById(R.id.button);
        Calendar myCalendar = Calendar.getInstance(Locale.CHINA);
        Date date = new Date();
        myCalendar.setTime(date);

        year = myCalendar.get(Calendar.YEAR);
        month = myCalendar.get(Calendar.MONTH);
        day = myCalendar.get(Calendar.DAY_OF_MONTH);
        tvDate.setText(year + "-" + month + "-" + day);
        btnDateDlg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DatePickerDialog dpDlg = new DatePickerDialog(MainActivity.this, new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        year = i;
                        month = i1;
                        day = i2;
                        tvDate.setText(year + "-" + month + "-" + day);
                    }
                },year,month,day);
                dpDlg.show();
            }
        });

    }

}
{% endhighlight %}

#### **2、TimePickerDialog**

　　用于获取用户输入的日期信息。其原型为：

>public TimePickerDialog(Contex contex, TimePickerDialog.OnTimeSetListener callback, int hour, int minute, boolean is24Hours);

　　其中，hour,minute是传递给TimePickerDialog的初始值信息，is24Hours表示是否为24小时制，然后通过OnTimeSetListener来设置用户选择的日期。

{% highlight java linenos %}
        TimePickerDialog tpDlg = new TimePickerDialog(MainActivity.this, new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker timePicker, int i, int i1) {
                        hour = i;
                        minute = i1;
                        tvTime.setText(year + "-" + month + "-" + day + " " + hour + ":" + minute);
                    }
                },hour, minute,true);
                tpDlg.show();
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/201510/2015101504.png"/> 
</div>
 
完整代码为：

{% highlight java linenos %}
import android.app.TimePickerDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.TimePicker;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private TextView tvTime;
    private Button btnTimeDlg;
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvTime = (TextView) findViewById(R.id.textView);
        btnTimeDlg = (Button) findViewById(R.id.button);
        Calendar myCalendar = Calendar.getInstance(Locale.CHINA);
        Date date = new Date();
        myCalendar.setTime(date);

        year = myCalendar.get(Calendar.YEAR);
        month = myCalendar.get(Calendar.MONTH);
        day = myCalendar.get(Calendar.DAY_OF_MONTH);
        hour = myCalendar.get(Calendar.HOUR);
        minute = myCalendar.get(Calendar.MINUTE);
        tvTime.setText(year + "-" + month + "-" + day + " " + hour + ":" + minute);
        btnTimeDlg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                TimePickerDialog tpDlg = new TimePickerDialog(MainActivity.this, new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker timePicker, int i, int i1) {
                        hour = i;
                        minute = i1;
                        tvTime.setText(year + "-" + month + "-" + day + " " + hour + ":" + minute);
                    }
                },hour, minute,true);
                tpDlg.show();
            }
        });

    }
}
{% endhighlight %}
