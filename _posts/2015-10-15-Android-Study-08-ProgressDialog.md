---
layout: post
date: 2015-10-15 19:15:00
title:  "Android学习手记(08) ProgressDialog的使用"
category: Android-Study
tags:   [Android, ProgressDialog]
---

ProgressDialog，进度对话框。一般有两种，一种是圆形的进度条(ProgressDialog.STYLE_SPINNER)，另一种是长条形的进度条(ProgressDialog.STYLE_HORIZONTAL)。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015101501.png"/> 
<img src="{{ site.url }}/images/posts/201510/2015101502.png"/>
</div>
 
ProgressDialog常用的方法有以下几种：

{% highlight java linenos %}
progressDialog = new ProgressDialog(MainActivity.this);             // 新建一个ProgressDialog
progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);   // 设置ProgressDialog的样式
progressDialog.setTitle("Note:");                                   // 设置标题
progressDialog.setMessage("这是一个水平进度条");                     // 设置显示内容
progressDialog.setIndeterminate(false);                             // 是否是不确定状态
progressDialog.setCancelable(true);                                 // 是否可以取消
progressDialog.setProgress(0);                                      // 设置初始进度
progressDialog.setMax(200);                                         // 设置最大进度
progressDialog.setSecondaryProgress(100);                           // 设置第二进度（可用于缓冲显示）

progressDialog.setButton(DialogInterface.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
     @Override                                                      // 设置按钮
     public void onClick(DialogInterface dialogInterface, int i) {  // DialogInterface表示按钮位置
         progressDialog.cancel();                                   // BUTTON_POSITIVE 为最右边
     }                                                              // BUTTON_NEUTRAL  为在中间
});                                                                 // BUTTON_NEGATIVE 为最左边
progressDialog.show();                                              // 显示ProgressDialog
{% endhighlight %}

#### **1、圆形进度条**

{% highlight java linenos %}
        btnCricleDlg = (Button)findViewById(R.id.btnCircleDlg);

        btnCricleDlg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressDialog = new ProgressDialog(MainActivity.this);
                progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
                progressDialog.setTitle("Note:");
                progressDialog.setMessage("这是一个圆形进度条");
                progressDialog.setIndeterminate(false);
                progressDialog.setCancelable(true);
                progressDialog.setButton(DialogInterface.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int witch) {
                        progressDialog.cancel();
                    }
                });
                progressDialog.setButton(DialogInterface.BUTTON_NEGATIVE,"CANCEL",new DialogInterface.OnClickListener(){
                    @Override
                    public void onClick(DialogInterface dialog, int witch){
                        progressDialog.cancel();
                    }
                });
                progressDialog.show();
            }
        });
{% endhighlight %}

#### **2、长形进度条**

{% highlight java linenos %}
        btnLongDlg = (Button) findViewById(R.id.btnLongDlg);
        btnLongDlg.setOnClickListener(new View.OnClickListener() {
            int count = 0;
            @Override
            public void onClick(View view) {
                progressDialog = new ProgressDialog(MainActivity.this);             // 新建一个ProgressDialog
                progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);   // 设置ProgressDialog的样式
                progressDialog.setTitle("Note:");                                   // 设置标题
                progressDialog.setMessage("这是一个水平进度条");                     // 设置显示内容
                progressDialog.setIndeterminate(false);                             // 是否是不确定状态
                progressDialog.setCancelable(true);                                 // 是否可以取消
                progressDialog.setProgress(0);                                      // 设置初始进度
                progressDialog.setMax(200);                                         // 设置最大进度
                progressDialog.setSecondaryProgress(100);                           // 设置第二进度（可用于缓冲显示）
                progressDialog.setButton(DialogInterface.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
                    @Override                                                       // 设置按钮
                    public void onClick(DialogInterface dialogInterface, int i) {   // DialogInterface表示按钮位置
                        progressDialog.cancel();                                    // BUTTON_POSITIVE 为最右边
                    }                                                               // BUTTON_NEUTRAL  为在中间
                });                                                                 // BUTTON_NEGATIVE 为最左边
                progressDialog.show();                                              // 显示ProgressDialog

                new Thread(){
                    public void run(){
                        while(count<=200){
                            try{
                                Thread.sleep(100);
                                progressDialog.incrementProgressBy(1);
                            }catch(Exception e){

                            }

                        }
                    }

                }.start();
            }
        });
{% endhighlight %}

#### **3、完整代码**

{% highlight java linenos %}
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;


public class MainActivity extends AppCompatActivity {

    private Button btnCricleDlg;
    private Button btnLongDlg;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnCricleDlg = (Button)findViewById(R.id.btnCircleDlg);
        btnLongDlg = (Button) findViewById(R.id.btnLongDlg);

        btnCricleDlg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressDialog = new ProgressDialog(MainActivity.this);
                progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
                progressDialog.setTitle("Note:");
                progressDialog.setMessage("这是一个圆形进度条");
                progressDialog.setIndeterminate(false);
                progressDialog.setCancelable(true);
                progressDialog.setButton(DialogInterface.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int witch) {
                        progressDialog.cancel();
                    }
                });
                progressDialog.setButton(DialogInterface.BUTTON_NEGATIVE,"CANCEL",new DialogInterface.OnClickListener(){
                    @Override
                    public void onClick(DialogInterface dialog, int witch){
                        progressDialog.cancel();
                    }
                });
                progressDialog.show();
            }
        });

        btnLongDlg.setOnClickListener(new View.OnClickListener() {
            int count = 0;
            @Override
            public void onClick(View view) {
                progressDialog = new ProgressDialog(MainActivity.this);             // 新建一个ProgressDialog
                progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);   // 设置ProgressDialog的样式
                progressDialog.setTitle("Note:");                                   // 设置标题
                progressDialog.setMessage("这是一个水平进度条");                     // 设置显示内容
                progressDialog.setIndeterminate(false);                             // 是否是不确定状态
                progressDialog.setCancelable(true);                                 // 是否可以取消
                progressDialog.setProgress(0);                                      // 设置初始进度
                progressDialog.setMax(200);                                         // 设置最大进度
                progressDialog.setSecondaryProgress(100);                           // 设置第二进度（可用于缓冲显示）
                progressDialog.setButton(DialogInterface.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
                    @Override                                                       // 设置按钮
                    public void onClick(DialogInterface dialogInterface, int i) {   // DialogInterface表示按钮位置
                        progressDialog.cancel();                                    // BUTTON_POSITIVE 为最右边
                    }                                                               // BUTTON_NEUTRAL  为在中间
                });                                                                 // BUTTON_NEGATIVE 为最左边
                progressDialog.show();                                              // 显示ProgressDialog

                new Thread(){
                    public void run(){
                        while(count<=200){
                            try{
                                Thread.sleep(100);
                                progressDialog.incrementProgressBy(1);
                            }catch(Exception e){

                            }

                        }
                    }

                }.start();
            }
        });

    }
}
{% endhighlight %}

