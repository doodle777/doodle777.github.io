---
layout: post
date: 2015-11-17 22:30:00
title:  "Android开发手记(29) 基于Http的LaTeX数学公式转换器"
category: Android-Study
tags:   [Android, Http, Latex]
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

　　本文将讲解如何通过codecogs.com和Google.com提供的API接口来将LaTeX数学函数表达式转化为图片形式。具体思路如下：

　　（1）通过EditText获取用户输入的LaTeX数学表达式，然后对表达式格式化使之便于网络传输。

　　（2）将格式化之后的字符串，通过Http请求发送至codecogs.com或者Google.com。

　　（3）获取网站返回的数据流，将其转化为图片，并显示在ImageView上。

　　具体过程为：

#### **1、获取并格式化LaTeX数学表达式**

　　首先，我们在这个网站输入LaTeX数学公式然后返回图片时，即“http://latex.codecogs.com/gif.latex?“后面跟上我们输入的公式内容。比如”http://latex.codecogs.com/gif.latex?\alpha”就显示一个希腊字母$$\alpha$$。所以我们可以在其后加上我们希望转换的公式即可。但是需要注意的是，网络URL中的空格有时候会自动转化为加号”+“。所以，我们在传输的时候需要将空格去掉。或者将其转换为”%20“。Button单击时执行。

　　首先要添加网络访问权限：
{% highlight xml %}
<uses-permission android:name="android.permission.INTERNET"/>
{% endhighlight %}

{% highlight java linenos %}
String PicUrlCogs = "http://latex.codecogs.com/gif.latex?";
Url = new URL(PicUrlCogs + editText.getText().toString().replace(" ",""));
new MyDownloadTask().execute();                 // 执行Http请求
while(!finishFlag) {}                           // 等待数据接收完毕
imageView.setImageBitmap(pngBM);                // 显示图片
finishFlag = false;                             // 标识回位
{% endhighlight %}

#### **2、发送Http请求**

　　这里，我们发送Http请求采取异步线程的方式。首先，获取上一步得到的URL地址，然后建立一个Http链接，然后将返回的数据输入到输入流中，最后将输入流进行解码为图片并显示在ImageView中。

{% highlight java linenos %}
      protected Void doInBackground(Void... params) {
            try {
                URL picUrl = Url;                            // 获取URL地址
                  HttpURLConnection conn = (HttpURLConnection) picUrl.openConnection();
//                conn.setConnectTimeout(1000);              // 建立连接
//                conn.setReadTimeout(1000);
                conn.connect();                              // 打开连接
                if (conn.getResponseCode() == 200) {         // 连接成功，返回数据
                    InputStream ins = conn.getInputStream(); // 将数据输入到数据流中
                    pngBM = BitmapFactory.decodeStream(picUrl.openStream()); // 解析数据流
                    finishFlag = true;                       // 数据传输完毕标识
                    ins.close();                             // 关闭数据流
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
{% endhighlight %}

　　完整的MyDownloadTask类代码（在MainActivity内）：

{% highlight java linenos %}
class MyDownloadTask extends AsyncTask<Void, Void, Void> {
 
        protected void onPreExecute() {
            //display progress dialog.
 
        }
 
        protected Void doInBackground(Void... params) {
            try {
                URL picUrl = Url;                            // 获取URL地址
                HttpURLConnection conn = (HttpURLConnection) picUrl.openConnection();
//                conn.setConnectTimeout(1000);              // 建立连接
//                conn.setReadTimeout(1000);
                conn.connect();                              // 打开连接
                if (conn.getResponseCode() == 200) {         // 连接成功，返回数据
                    InputStream ins = conn.getInputStream(); // 将数据输入到数据流中
                    pngBM = BitmapFactory.decodeStream(picUrl.openStream()); // 解析数据流
                    finishFlag = true;                       // 数据传输完毕标识
                    ins.close();                             // 关闭数据流
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
 
        protected void onPostExecute(Void result) {
            // dismiss progress dialog and update ui
        }
    }
{% endhighlight %}

#### **3、显示图片**

　　在上一步建立的网络连接类，然后在Button单击事件内实例化一个此类来接收数据，然后将返回的数据显示在ImageView内。

{% highlight java linenos %}
        btnPreview.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               try {
                   Url = new URL(PicUrlCogs + editText.getText().toString().replace(" ","")); // 转换字符串
                   new MyDownloadTask().execute();                 // 执行Http请求
                   while(!finishFlag) {}                           // 等待数据接收完毕
                   imageView.setImageBitmap(pngBM);                // 显示图片
                   finishFlag = false;                             // 标识回位
 
               } catch (Exception e) {
                   e.printStackTrace();
               }
 
           }
       });
{% endhighlight %}
       
　　这样，我们在输入LaTeX公式之后，单击PREVIEW按钮，就会在ImageView上显示对应的图片了。由于本文只讨论如何进行转化，并没有对图片进行任何优化处理，可能看起来比较小。另外，如果采取去空格转化URL的方法，尽量保证LaTeX表达式是严格合法的（比如所有单元都用{}括起来）。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201511/2015111704.png"/> 
<img src="{{ site.url }}/images/posts/201511/2015111705.png"/> 
</div>

　　完整代码：
{% highlight java linenos %}
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
 
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
 
public class MainActivity extends Activity {
 
    private String PicUrlGoogle = "http://chart.apis.google.com/chart?cht=tx&chl=";
    private String PicUrlCogs = "http://latex.codecogs.com/gif.latex?";
    private Button btnPreview;
    private EditText editText;
    private ImageView imageView;
    private Bitmap pngBM;
    private URL Url;
    private boolean finishFlag = false;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        btnPreview = (Button) findViewById(R.id.btnPreview);
        imageView = (ImageView) findViewById(R.id.imageView);
        editText = (EditText) findViewById(R.id.editText);
        btnPreview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Url = new URL(PicUrlCogs + editText.getText().toString().replace(" ","")); // 转换字符串
                    new MyDownloadTask().execute();                 // 执行Http请求
                    while(!finishFlag) {}                           // 等待数据接收完毕
                    imageView.setImageBitmap(pngBM);                // 显示图片
                    finishFlag = false;                             // 标识回位
 
                } catch (Exception e) {
                    e.printStackTrace();
                }
 
            }
        });
    }
 
    @Override
    public void onDestroy() {
        super.onDestroy();
    }
 
    class MyDownloadTask extends AsyncTask<Void, Void, Void> {
 
        protected void onPreExecute() {
            //display progress dialog.
 
        }
 
        protected Void doInBackground(Void... params) {
            try {
                URL picUrl = Url;                            // 获取URL地址
                HttpURLConnection conn = (HttpURLConnection) picUrl.openConnection();
//                conn.setConnectTimeout(1000);              // 建立连接
//                conn.setReadTimeout(1000);
                conn.connect();                              // 打开连接
                if (conn.getResponseCode() == 200) {         // 连接成功，返回数据
                    InputStream ins = conn.getInputStream(); // 将数据输入到数据流中
                    pngBM = BitmapFactory.decodeStream(picUrl.openStream()); // 解析数据流
                    finishFlag = true;                       // 数据传输完毕标识
                    ins.close();                             // 关闭数据流
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
 
        protected void onPostExecute(Void result) {
            // dismiss progress dialog and update ui
        }
    }
 
}
{% endhighlight %}
