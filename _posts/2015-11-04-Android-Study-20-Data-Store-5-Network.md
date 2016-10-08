---
layout: post
date: 2015-11-04 22:07:00
title:  "Android开发手记(20) 数据存储五 网络存储"
category: Android-Study
tags:   [Android, DataStore, Network]
---

Android为数据存储提供了五种方式：

1、SharedPreferences

2、文件存储

3、SQLite数据库

4、ContentProvider

**5、网络存储**

 

　　安卓的网络存储比较简单，因为Android提供的 Uri 和 Intent 可以帮助我们完成大多数任务。

#### **一、发送邮件**

　　首先，我们来看一下如何写一个发邮件的程序。前提是需要在系统邮件程序中配置好邮件发送的账户。由于发送邮件需要访问网络，所以我们需要添加如下权限：

{% highlight xml %}
<uses-permission android:name="android.permission.INTERNET"/>
{% endhighlight %}

　　然后，我们添加三个TextView和三个EditText和一个Button。如图所示：

<div style="text-align: center">
<img src="{{ site.url }}/images/201511/2015110401.png"/> 
</div>

　　对发送按钮添加相应的点击事件即可。

{% highlight java linenos %}
btnSend.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        Uri uri = Uri.parse("mailto:" + etReceiver.getText());      // 发送邮件地址
        Intent intent = new Intent(Intent.ACTION_SENDTO, uri);      // 创建发送邮件Intent
        intent.putExtra(Intent.EXTRA_SUBJECT, etSubject.getText()); // 设置邮件主题
        intent.putExtra(Intent.EXTRA_TEXT, etContent.getText());    // 设置邮件内容
 
        startActivity(intent);
    }
});
{% endhighlight %}

　　之后，单击发送按钮，就会调用系统自带的邮件程序来进行邮件的发送。

　　完整代码如下：

{% highlight java linenos %}
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
 
 
public class MainActivity extends AppCompatActivity {
 
    private EditText etReceiver;
    private EditText etSubject;
    private EditText etContent;
    private Button btnSend;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        etReceiver = (EditText) findViewById(R.id.etReceiver);
        etSubject = (EditText) findViewById(R.id.etSubject);
        etContent = (EditText) findViewById(R.id.etContent);
        btnSend = (Button) findViewById(R.id.btnSend);
        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("mailto:" + etReceiver.getText());      // 发送邮件地址
                Intent intent = new Intent(Intent.ACTION_SENDTO, uri);      // 创建发送邮件Intent
                intent.putExtra(Intent.EXTRA_SUBJECT, etSubject.getText()); // 设置邮件主题
                intent.putExtra(Intent.EXTRA_TEXT, etContent.getText());    // 设置邮件内容
 
                startActivity(intent);
            }
        });
 
    }
 
}
{% endhighlight %}

#### **二、浏览网页**

　　Android浏览网页可以使用WebView组件。只需要提供Url地址即可。首先建立如图所示的Activity，然后对Button添加单击事件，使其将EditText内用户输入的地址传送到WebView内即可。由于浏览网页需要访问网络，所以我们需要添加如下权限：

{% highlight xml %}
<uses-permission android:name="android.permission.INTERNET"/>
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/201511/2015110402.png"/> 
<img src="{{ site.url }}/images/201511/2015110403.png"/> 
</div>

　　需要指出的是，WebView所接受的URL必须带有类似“http://”的前缀才能正常解析，可以在编程时人工加上去。另外，我们需要覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开。只需重载shouldOverrideUrlLoading()方法即可。此方法返回值是true的时候控制去WebView打开，为false调用系统浏览器或第三方浏览器。

{% highlight java linenos %}
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
 
public class MainActivity extends Activity {
 
    private WebView webView;
    private EditText etUrl;
    private Button button;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        webView = (WebView) findViewById(R.id.webView);
        etUrl = (EditText) findViewById(R.id.editText);
        button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                webView.loadUrl("http://" + etUrl.getText().toString());//WebView加载web资源
                //覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
                webView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, String url) {
                        //返回值是true的时候控制去WebView打开，为false调用系统浏览器或第三方浏览器
                        view.loadUrl(url);
                        return true;
                    }
                });
            }
        });
    }
 
}
{% endhighlight %}
