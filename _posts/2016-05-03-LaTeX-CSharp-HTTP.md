---
layout: post
date: 2016-05-03 09:00:00
title:  "C#开发基于Http的LaTeX数学公式转换器"
category: Other
tags:   [LaTeX, C#, Math, Equation]
---

* content
{:toc}


　　本文将讲解如何通过codecogs.com和Google.com提供的API接口来将LaTeX数学函数表达式转化为图片形式。具体思路如下：

　　（1）通过TextBox获取用户输入的LaTeX数学表达式，然后对表达式格式化使之便于网络传输。

　　（2）将格式化之后的字符串，通过Http请求发送至codecogs.com或者Google.com。

　　（3）获取网站返回的数据流，将其转化为图片，并显示在PictureBox上。

具体过程为：

　　首先，我们在这个网站输入LaTeX数学公式然后返回图片时，即“http://latex.codecogs.com/gif.latex?“后面跟上我们输入的公式内容。比如”http://latex.codecogs.com/gif.latex?\alpha”就显示一个希腊字母 $$ \alpha $$ 。所以我们可以在其后加上我们希望转换的公式即可。但是需要注意的是，网络URL中的空格有时候会自动转化为加号”+“。所以，我们在传输的时候需要将空格去掉。或者将其转换为”%20“。

　　建立如图所示的Form。一个TextBox，六个Button和一个PictureBox。

　　用例为著名的“薛定谔方程”：

$$ i\hbar\frac{\partial \psi}{\partial {t}} = \frac{-\hbar^2}{2m} \left( \frac{\partial^2}{\partial {x^2}} + 
\frac{\partial^2}{\partial {y^2}} + \frac{\partial^2}{\partial {z^2}} \right) \psi + V \psi $$

> i\hbar\frac{\partial\psi}{\partial{t}}=\frac{-\hbar^2}{2m}\left(\frac{\partial^2}{\partial{x^2}}+  
> \frac{\partial^2}{\partial{y^2}}+\frac{\partial^2}{\partial{z^2}}\right)\psi+V\psi  

<div style="text-align: center">
<img src="{{ site.url }}/images/201605/2016050401.png"/> 
</div>

　　“粘贴文本”按钮添加如下单击事件。

{% highlight csharp linenos %}
private void btnPasteText_Click(object sender, EventArgs e)
{
    string content = Clipboard.GetText();   // 获取剪切板文本信息
    textBox.Text = content;                 // 将信息显示到TextBox
}
private bool check()
{
    if(textBox.Text.Trim() == "") // 如果TextBox为空
    {
        MessageBox.Show(this, "请填写 LaTeX 函数代码！");
        return false;
    }
    return true;
}
{% endhighlight %}

　　“Google预览”按钮添加如下事件。

{% highlight csharp linenos %}
private void btnPreviewGoogle_Click(object sender, EventArgs e)
{
    if (check())
    {
        // 首先将文本信息格式化，作为URL信息。
        string ImgUrl = String.Format(PicUrlGoogle, HttpUtility.UrlPathEncode(textBox.Text));
        pictureBox.ImageLocation = ImgUrl;  // 加载网络图片到PictureBox
        btnCopyImg.Enabled = true;          // 使“复制图像”按钮可用
    }
    else
        btnCopyImg.Enabled = false;         // 否则使“复制图像”按钮不可用
}
{% endhighlight %}

　　“Cogs预览”按钮添加如下事件。

{% highlight csharp linenos %}
private void btnPreviewCogs_Click(object sender, EventArgs e)
{
    if (check())
    {
        // 首先将文本信息格式化，作为URL信息。
        string ImgUrl = String.Format(PicUrlCogs, HttpUtility.UrlPathEncode(textBox.Text));
        pictureBox.ImageLocation = ImgUrl;  // 加载网络图片到PictureBox
        btnCopyImg.Enabled = true;          // 使“复制图像”按钮可用
    }
    else
        btnCopyImg.Enabled = false;         // 否则使“复制图像”按钮不可用
}
{% endhighlight %}

　　“复制图像”按钮添加如下单击事件。

{% highlight csharp linenos %}
private void btnCopyImg_Click(object sender, EventArgs e)
{
    if(pictureBox.Image != null)
        Clipboard.SetImage(pictureBox.Image);  // 将Picture图片复制到剪切板
}
{% endhighlight %}

　　“显示帮助”按钮添加如下事件。

{% highlight csharp linenos %}
private void btnHelp_Click(object sender, EventArgs e)
{
    textBox.Text = "1、LaTex 公式前后无需 $ 符号；\r\n"
                 + "2、需要联网，Google丑，Cogs慢；\r\n"
                 + "3、尽量多使用 {} 将字段括起来；\r\n"
                 + "4、于 2015年11月13日。";
}
{% endhighlight %}

　　“退出”按钮添加如下事件。

{% highlight csharp linenos %}
private void btnExit_Click(object sender, EventArgs e)
{
    System.Environment.Exit(0);      // 退出程序
}
{% endhighlight %}

　　完整代码如下：

{% highlight csharp linenos %}
using System;
using System.Windows.Forms;
using System.Web;
 
namespace LaTeX_Win
{
    public partial class Form1 : Form
    {
        private static string PicUrlGoogle = @"http://chart.apis.google.com/chart?cht=tx&chl={0}";
        private static string PicUrlCogs = @"http://latex.codecogs.com/gif.latex?{0}";
        public Form1()
        {
            InitializeComponent();
        }
 
        private void btnPasteText_Click(object sender, EventArgs e)
        {
            string content = Clipboard.GetText();
            textBox.Text = content;
        }
 
        private void btnPreviewGoogle_Click(object sender, EventArgs e)
        {
            if (check())
            {
                string ImgUrl = String.Format(PicUrlGoogle, HttpUtility.UrlPathEncode(textBox.Text));
                pictureBox.ImageLocation = ImgUrl;
                btnCopyImg.Enabled = true;
            }
            else
                btnCopyImg.Enabled = false;
        }
        private void btnPreviewCogs_Click(object sender, EventArgs e)
        {
            if (check())
            {
                string ImgUrl = String.Format(PicUrlCogs, HttpUtility.UrlPathEncode(textBox.Text));
                pictureBox.ImageLocation = ImgUrl;
                btnCopyImg.Enabled = true;
            }
            else
                btnCopyImg.Enabled = false;
        }
        private void btnCopyImg_Click(object sender, EventArgs e)
        {
            if(pictureBox.Image != null)
                Clipboard.SetImage(pictureBox.Image);
        }
        private bool check()
        {
            if(textBox.Text.Trim() == "")
            {
                MessageBox.Show(this, "请填写 LaTeX 函数代码！");
                return false;
            }
            return true;
        }
 
        private void btnExit_Click(object sender, EventArgs e)
        {
            System.Environment.Exit(0);
        }
 
        private void btnHelp_Click(object sender, EventArgs e)
        {
            textBox.Text = "1、LaTex 公式前后无需 $ 符号；\r\n"
                         + "2、需要联网，Google丑，Cogs慢；\r\n"
                         + "3、尽量多使用 {} 将字段括起来；\r\n"
                         + "4、于 2015年11月13日。";
        }
    }
}
{% endhighlight %}

