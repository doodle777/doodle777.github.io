---
layout: post
date: 2015-10-29 17:10:00
title:  "Android开发手记(17) 数据存储二 文件存储数据"
category: Android-Study
tags:   [Android, DataStore, File]
---

* content
{:toc}

Android为数据存储提供了五种方式：

1、SharedPreferences

**2、文件存储**

3、SQLite数据库

4、ContentProvider

5、网络存储

 

　　本文主要介绍如何使用文件来存储数据。Android文件操作用到的是Java.IO中的FileOutputStream和FileInputStream类。

#### **一、存储文件**

　　首先实例化一个FileOutputStream。

  
> FileOutputStream foStream = openFileOutput(fileName, MODE_PRIVATE);  
> // fileName: 要写入文件的名称  
> // MODE_PRIVATE: 为默认操作模式,代表该文件是私有数据,只能被应用本身访问,在该模式下,写入的内容会覆盖原文件的内容  
> // MODE_APPEND: 模式会检查文件是否存在,存在就往文件追加内容,否则就创建新文件.  
> // MODE_WORLD_READABLE: 表示当前文件可以被其他应用读取，不推荐使用  
> // MODE_WORLD_WRITEABLE: 表示当前文件可以被其他应用写入，不推荐使用  

　　然后调用foStream.write()即可完成写入。

{% highlight java linenos %}
byte[] buffer = fileContent.getBytes();
foStream.write(buffer);
Toast.makeText(MainActivity.this, "写入成功",Toast.LENGTH_SHORT).show();
{% endhighlight %}

　　最后进行一些清理工作，刷新写出流和关闭流。

{% highlight java linenos %}
foStream.flush();
foStream.close();
{% endhighlight %}

#### **二、读取文件**

　　同样的，首先实例化一个FileInputStream。

{% highlight java linenos %}
FileInputStream fiStream = openFileInput(fileName);
{% endhighlight %}

　　然后调用fiStream.read()即可

{% highlight java linenos %}
int len = fiStream.available();
byte[] buffer = new byte[len];
fiStream.read(buffer);
{% endhighlight %}

　　最后，将文本显示并关闭读文件流

{% highlight java linenos %}
etContent.setText(new String(buffer));
Toast.makeText(MainActivity.this, "读取成功",Toast.LENGTH_SHORT).show();
fiStream.close();
{% endhighlight %}

#### **三、完整代码**

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.FileInputStream;
import java.io.FileOutputStream;

public class MainActivity extends AppCompatActivity {

    private EditText etName;
    private EditText etContent;
    private Button btnWrite;
    private Button btnRead;
    private String fileName = "";
    private String fileContent = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etName = (EditText)findViewById(R.id.etName);
        etContent = (EditText)findViewById(R.id.etContent);
        btnWrite = (Button)findViewById(R.id.btnWrite);
        btnRead = (Button)findViewById(R.id.btnRead);

        btnWrite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                fileName = etName.getText().toString();
                fileContent = etContent.getText().toString();
                try {
                    FileOutputStream foStream = openFileOutput(fileName, MODE_PRIVATE);
                    byte[] buffer = fileContent.getBytes();
                    foStream.write(buffer);
                    Toast.makeText(MainActivity.this, "写入成功",Toast.LENGTH_SHORT).show();
                    foStream.flush();
                    foStream.close();
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        });
        btnRead.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                fileName = etName.getText().toString();
                try{
                    FileInputStream fiStream = openFileInput(fileName);
                    int len = fiStream.available();
                    byte[] buffer = new byte[len];
                    fiStream.read(buffer);
                    etContent.setText(new String(buffer));
                    Toast.makeText(MainActivity.this, "读取成功",Toast.LENGTH_SHORT).show();
                    fiStream.close();
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        });

    }
}
{% endhighlight %}

#### activity_main.xml

{% highlight xml %}
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">


    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/etName"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:text="文件名" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/etContent"
        android:layout_below="@+id/etName"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:text="文件内容" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="保存"
        android:id="@+id/btnWrite"
        android:layout_alignTop="@+id/btnRead"
        android:layout_toLeftOf="@+id/btnRead"
        android:layout_toStartOf="@+id/btnRead" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="读取"
        android:id="@+id/btnRead"
        android:layout_below="@+id/etContent"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true" />
</RelativeLayout>
{% endhighlight %}


