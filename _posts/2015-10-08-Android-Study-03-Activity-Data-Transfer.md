---
layout: post
date: 2015-10-08 20:17:00
title:  "Android 学习笔记(03) Activity 间传递数据"
category: Android-Study
tags:   [Android, Activity]
---

* content
{:toc}

#### **1. 简单数据传递**

建立两个Activity，名称分别为MainActivity和TheAty，在MainActivity中新建一个Button，id为btnStartAty。在TheAty中新建一个TextView，id为tv。分别加入如下代码：

MainActivity.java
{% highlight java linenos %}
 public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button = (Button)findViewById(R.id.btnStartAty);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent();

                i.setClass(MainActivity.this, TheAty.class);
                i.putExtra("data", "hello android");

                startActivity(i);
            }
        });

    }
}
{% endhighlight %}



TheAty.java
{% highlight java linenos %}
public class TheAty extends AppCompatActivity {

    private TextView textv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_the_aty);

        Intent i = getIntent();

        textv = (TextView)findViewById(R.id.tv);
        textv.setText(i.getStringExtra("data"));
    }
}
{% endhighlight %}

其中，Intent i 的作用是作为绑定两个Activity的中介，然后进行string的传递。使用putExtra()的getStringExtra()函数对来实现简单值的传递。

#### **2. 使用Bundle传递数据**

MainActivity.java
{% highlight java linenos %}
 public class MainActivity extends AppCompatActivity {

    private EditText myText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myText = (EditText)findViewById(R.id.editText);
        Button button = (Button) findViewById(R.id.btnOK);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String str = myText.getText().toString();

                Intent i = new Intent(MainActivity.this, TheAty.class);
                Bundle bundle = new Bundle();
                bundle.putString("message", str);

                i.putExtras(bundle);

                startActivity(i);
            }
        });

    }
}
{% endhighlight %}

TheAty.java
{% highlight java linenos %}
 public class TheAty extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_the_aty);

        Bundle bundle = this.getIntent().getExtras();
        String mesg = bundle.getString("message");

        TextView myText = (TextView) findViewById(R.id.tv);
        myText.setText(mesg);
    }
}
{% endhighlight %}
