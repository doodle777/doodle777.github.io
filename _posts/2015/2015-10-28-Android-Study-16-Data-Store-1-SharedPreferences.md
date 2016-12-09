---
layout: post
date: 2015-10-28 21:27:00
title:  "Android开发手记(16) 数据存储一 SharedPreferences"
category: Android-Study
tags:   [Android, DataStore, SharedPreferences]
---

* content
{:toc}

Android为数据存储提供了五种方式：

**1、SharedPreferences**

2、文件存储

3、SQLite数据库

4、ContentProvider

5、网络存储

　　SharedPreferences是Android中最容易理解的数据存储技术，实际上SharedPreferences处理的就是一个key-value（键值对）SharedPreferences常用来存储一些轻量级的数据。这类似于C++中Map的数据存储方式（实际上在最后生成的.xml文件内，就是以Map格式存储的）。

　　获取SharedPreferences的两种方式:

　　　　1、调用Context对象的getSharedPreferences()方法

　　　　2、调用Activity对象的getPreferences()方法

　　两种方式的区别：

　　　　调用Context对象的getSharedPreferences()方法获得的SharedPreferences对象可以被同一应用程序下的其他组件共享。

　　　　调用Activity对象的getPreferences()方法获得的SharedPreferences对象只能在该Activity中使用。

　　其中，getSharedPreferences()的方法原型为：


> getSharedPreferences(String name, int mode);  
> // name: 生成xml文件的名称  
> // MODE_PRIVATE: 为默认操作模式,代表该文件是私有数据,只能被应用本身访问,在该模式下,写入的内容会覆盖原文件的内容  
> // MODE_APPEND: 模式会检查文件是否存在,存在就往文件追加内容,否则就创建新文件.  
> // MODE_WORLD_READABLE: 表示当前文件可以被其他应用读取，不推荐使用  
> // MODE_WORLD_WRITEABLE: 表示当前文件可以被其他应用写入，不推荐使用  

　　使用SharedPreferences存储数据的方法如下：

{% highlight java linenos %}
//实例化SharedPreferences对象（第一步） 
SharedPreferences sp = getSharedPreferences("test", MODE_PRIVATE); 
//实例化SharedPreferences.Editor对象（第二步） 
SharedPreferences.Editor editor = mySharedPreferences.edit(); 
//用putString的方法保存数据 
editor.putString("UserName", etName.getText().toString());
editor.putString("Password", etPassword.getText().toString());
//提交当前数据 
//editor.apply();
editor.commit(); 
//使用toast信息提示框提示成功写入数据 
Toast.makeText(MainActivity.this, "注册成功", Toast.LENGTH_LONG).show();
{% endhighlight %}

　　使用SharedPreferences读取数据的方法如下：

{% highlight java linenos %}
SharedPreferences sp = getSharedPreferences(strLogInfo, MODE_APPEND);
String name = sp.getString("UserName", "");
String passwd = sp.getString("Password","");
if(etName.getText().toString().equals(name) && etPassword.getText().toString().equals(passwd)){
        Toast.makeText(MainActivity.this, "登陆成功", Toast.LENGTH_LONG).show();
} else{
        Toast.makeText(MainActivity.this, "登录失败", Toast.LENGTH_LONG).show();
}
{% endhighlight %}


　　在使用SharedPreferences之后，程序会在“/data/data/包名/shared_prefs/xxx.xml”生成的一个XML文件。文件名取决于getSharedPreferences的第一个参数名。

{% highlight xml %}
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="UserName">Name</string>
    <string name="Password">Password</string>
</map>
{% endhighlight %}

　　完整代码如下：

{% highlight java linenos %}
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private EditText etName;
    private EditText etPassword;
    private Button btnLogin;
    private Button btnLogup;
    private String strLogInfo = "test";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etName = (EditText)findViewById(R.id.etName);
        etPassword = (EditText)findViewById(R.id.etPassword);
        btnLogin = (Button)findViewById(R.id.btnLogin);
        btnLogup = (Button)findViewById(R.id.btnLogup);

        btnLogup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences sp = getSharedPreferences(strLogInfo, MODE_APPEND);
                SharedPreferences.Editor editor = sp.edit();

                editor.putString("UserName", etName.getText().toString());
                editor.putString("Password", etPassword.getText().toString());
                editor.commit();
                Toast.makeText(MainActivity.this, "注册成功", Toast.LENGTH_LONG).show();
            }
        });
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences sp = getSharedPreferences(strLogInfo, MODE_APPEND);
                String name = sp.getString("UserName", "");
                String passwd = sp.getString("Password","");
                if(etName.getText().toString().equals(name) && etPassword.getText().toString().equals(passwd)){
                    Toast.makeText(MainActivity.this, "登陆成功", Toast.LENGTH_LONG).show();
                } else{
                    Toast.makeText(MainActivity.this, "登录失败", Toast.LENGTH_LONG).show();
                }
            }
        });

    }
}
{% endhighlight %}


