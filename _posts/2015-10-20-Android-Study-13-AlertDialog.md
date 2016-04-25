---
layout: post
date: 2015-10-20 21:27:00
title:  "Android开发手记(13) 几种Alertdialog的使用"
category: Android-Study
tags:   [Android, Alertdialog]
---
　　本文主要讨论七种形式的AlertDialog，及其编写方法。

### **1、退出**

　　在用户退出的时候提示用户是否退出，含有“确定”和“退出”两个按键。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102003.png"/> 
</div>

{% highlight java linenos %}
        btnExit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog.Builder alertDlg = new AlertDialog.Builder(MainActivity.this);
                alertDlg.setMessage("确定退出吗？");
                alertDlg.setTitle("退出");
                alertDlg.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        MainActivity.this.finish();
                    }
                });
                alertDlg.setNegativeButton("取消", null);
                alertDlg.show();
            }
        });
{% endhighlight %}

### **2、调查图表**

　　弹出对话框，让用户选择相应的按钮来获得用户选项。含有相应的提示问题。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102004.png"/> 
</div>

{% highlight java linenos %}
        btnChart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder alertDlg = new AlertDialog.Builder(MainActivity.this);
                alertDlg.setIcon(android.R.drawable.btn_star);
                alertDlg.setTitle("调查");
                alertDlg.setMessage("你喜欢的颜色是？");
                alertDlg.setPositiveButton("红色", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(MainActivity.this, "你喜欢红色", Toast.LENGTH_SHORT);
                    }
                });
                alertDlg.setNegativeButton("蓝色", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(MainActivity.this, "你喜欢蓝色", Toast.LENGTH_SHORT);
                    }
                });
                alertDlg.setNeutralButton("黄色", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(MainActivity.this, "你喜欢黄色", Toast.LENGTH_SHORT);
                    }
                });
                alertDlg.show();
            }
        });
{% endhighlight %}


### **3、输入内容**

　　弹出对话框，提示用户输入用户名或者密码，可以作登陆使用。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102005.png"/> 
</div>

{% highlight java linenos %}
        btnContent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder alertDlg = new AlertDialog.Builder(MainActivity.this);
                alertDlg.setTitle("请输入");
                alertDlg.setIcon(android.R.drawable.ic_dialog_info);
                alertDlg.setView(new EditText(MainActivity.this)).setPositiveButton("确定", null);
                alertDlg.setNegativeButton("取消", null);
                alertDlg.show();
            }
        });
{% endhighlight %}


### **4、单选按钮**

　　对话框内含有一系列单选按钮让用户选择。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102006.png"/> 
</div>

{% highlight java linenos %}
        btnRadio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(MainActivity.this).setTitle("单选框")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setSingleChoiceItems(new String[]{"红色", "蓝色", "黄色"}, 0, null)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });
{% endhighlight %}

### **5、多选按钮**

　　对话框内含有一系列多选按钮让用户选择。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102007.png"/> 
</div>

{% highlight java linenos %}
        btnCheckBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(MainActivity.this).setTitle("复选框")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setMultiChoiceItems(new String[]{"红色", "蓝色", "黄色"}, null, null)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });
{% endhighlight %}


### **6、简单列表**

　　含有一系列简单的列表，供用户点击，可以做菜单使用。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102008.png"/> 
</div>

{% highlight java linenos %}
        btnList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(MainActivity.this).setTitle("列表框")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setItems(new String[]{"红色", "蓝色", "黄色"}, null)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });
{% endhighlight %}

### **7、自定义布局**

　　可以自定义对话框显示内容，通过资源文件导入布局。

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102009.png"/> 
</div>

{% highlight java linenos %}
        btnCostume.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LayoutInflater inflater = getLayoutInflater();
                View layout = inflater.inflate(R.layout.activity_main,
                        (ViewGroup)findViewById(R.id.mainMenu));

                new AlertDialog.Builder(MainActivity.this).setTitle("自定义布局")
                        .setView(layout)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });
{% endhighlight %}

### **8、完整代码：**

　　可以自定义对话框显示内容，通过资源文件导入布局。

{% highlight java linenos %}
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private Button btnExit;
    private Button btnChart;
    private Button btnContent;
    private Button btnRadio;
    private Button btnCheckBox;
    private Button btnList;
    private Button btnCostume;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnExit = (Button)findViewById(R.id.btnExit);
        btnChart = (Button)findViewById(R.id.btnChart);
        btnContent = (Button)findViewById(R.id.btnContent);
        btnRadio = (Button)findViewById(R.id.btnRadio);
        btnCheckBox = (Button)findViewById(R.id.btnCheckBox);
        btnList = (Button)findViewById(R.id.btnList);
        btnCostume = (Button)findViewById(R.id.btnCostume);


        btnExit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog.Builder alertDlg = new AlertDialog.Builder(MainActivity.this);
                alertDlg.setMessage("确定退出吗？");
                alertDlg.setTitle("退出");
                alertDlg.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        MainActivity.this.finish();
                    }
                });
                alertDlg.setNegativeButton("取消", null);
                alertDlg.show();
            }
        });

        btnChart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder alertDlg = new AlertDialog.Builder(MainActivity.this);
                alertDlg.setIcon(android.R.drawable.btn_star);
                alertDlg.setTitle("调查");
                alertDlg.setMessage("你喜欢的颜色是？");
                alertDlg.setPositiveButton("红色", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(MainActivity.this, "你喜欢红色", Toast.LENGTH_SHORT);
                    }
                });
                alertDlg.setNegativeButton("蓝色", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(MainActivity.this, "你喜欢蓝色", Toast.LENGTH_SHORT);
                    }
                });
                alertDlg.setNeutralButton("黄色", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(MainActivity.this, "你喜欢黄色", Toast.LENGTH_SHORT);
                    }
                });
                alertDlg.show();
            }
        });

        btnContent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder alertDlg = new AlertDialog.Builder(MainActivity.this);
                alertDlg.setTitle("请输入");
                alertDlg.setIcon(android.R.drawable.ic_dialog_info);
                alertDlg.setView(new EditText(MainActivity.this)).setPositiveButton("确定", null);
                alertDlg.setNegativeButton("取消", null);
                alertDlg.show();
            }
        });

        btnRadio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(MainActivity.this).setTitle("单选框")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setSingleChoiceItems(new String[]{"红色", "蓝色", "黄色"}, 0, null)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });

        btnCheckBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(MainActivity.this).setTitle("复选框")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setMultiChoiceItems(new String[]{"红色", "蓝色", "黄色"}, null, null)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });

        btnList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(MainActivity.this).setTitle("列表框")
                        .setIcon(android.R.drawable.ic_dialog_info)
                        .setItems(new String[]{"红色", "蓝色", "黄色"}, null)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });

        btnCostume.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LayoutInflater inflater = getLayoutInflater();
                View layout = inflater.inflate(R.layout.activity_main,
                        (ViewGroup)findViewById(R.id.mainMenu));

                new AlertDialog.Builder(MainActivity.this).setTitle("自定义布局")
                        .setView(layout)
                        .setPositiveButton("确定", null)
                        .setNegativeButton("取消", null).show();
            }
        });

    }

}
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015102010.png"/> 
</div>

