---
layout: post
date: 2016-10-27 22:09:30
title: "Ubuntu+Django+Nginx+uWSGI+Mysql搭建Python Web服务器"
category: Ubuntu
tags:   [Ubuntu, MySQL, Django, Nginx, Python Web]
---

* content
{:toc}

**本文转载自[SegmentFault](https://segmentfault.com/a/1190000007262187)**

前不久为了部署Django项目，在百度上到处找教程，找到的教程因为这样那样的原因，总是失败，可能是因为作者水平比较高吧，有些细节的东西估计没写出来，造成我这种初学者想照着做都做不成。百度不行就用Google吧，中文不行就找英文的，最后，给我误打误撞的部署成功了。为了加深印象，我用虚拟机再重新部署一次。

### 1 准备工作
我使用的系统是Ubuntu14.04.5 LTS(Trusty Tahr) server i386版，官网下载地址：http://releases.ubuntu.com/14.04.4/ubuntu-14.04.5-server-i386.iso

安装的时候全部选择英文，记得以前选择中文的时候安装时出了问题，服务器组件一个不选，Ubuntu安装做的很贴心，基本上是一路回车，就不详细说明了。装好以后，首先要更新apt-get，貌似我的ubuntu镜像是在国内站下载的，所以源是国内的地址，所以就不用更换源了。

#### 1.1 更新apt-get

{% highlight shell %}
sudo apt-get update
sudo apt-get upgrade
{% endhighlight %}

#### 1.2 安装SSH

{% highlight shell %}
sudo apt-get install ssh
{% endhighlight %}

装好以后，用ifconfig查看一下IP地址

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102701.png"/> 
</div>


可以看到IP地址是192.168.0.154，下面我们就使用XSHELL连接192.168.0.154进行操作了。

#### 1.3 安装Git

这一步不是必须的，因为我的测试项目是放在git.oschina.com上的，安装git获取项目代码就很方便了

{% highlight shell %}
sudo apt-get install git
{% endhighlight %}

### 2 安装配置MySQL

#### 2.1 安装

{% highlight shell %}
sudo apt-get install mysql-server
{% endhighlight %}

安装过程中会提示让你设置root密码

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102702.png"/> 
</div>

#### 2.2 配置

2.2.1 数据库初始化：

{% highlight shell %}
sudo mysql_install_db
{% endhighlight %}

2.2.2 运行数据库Mysql安全配置向导

{% highlight shell %}
sudo mysql_secure_installation
{% endhighlight %}

输入root密码

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102703.png"/> 
</div>

是否修改root密码，因为前面已经设置过了，选n

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102704.png"/> 
</div>

是否移除匿名用户,肯定是要选y的

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102705.png"/> 
</div>

是否允许远程登陆，如果选n的话，只能在本机访问数据库，建议选y

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102706.png"/> 
</div>

是否移除test数据库，建议选是

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102707.png"/> 
</div>

重新加载权限表，选y

<div style="text-align: center">
<img src="{{ site.url }}/images/201610/2016102708.png"/> 
</div>

All done!

### 3 安装配置Python环境

#### 3.1 安装python-dev包

{% highlight shell %}
sudo apt-get install python-dev
{% endhighlight %}

#### 3.2 安装pip

{% highlight shell %}
sudo apt-get install python-pip
{% endhighlight %}

#### 3.3 更换pip源

因为国内使用默认的pip源速度很慢，所以需要更换,在用户根目录下新建.pip目录，在该目录下新建pip.conf文件

{% highlight shell %}
sudo mkdir ~/.pip
sudo vi ~/.pip/pip.conf
{% endhighlight %}

然后在文件里写上：

{% highlight shell %}
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com
{% endhighlight %}

#### 3.4 安装配置VirtualEnv和VirtualEnvWrapper

VirtualEnv可以管理多个开发环境，VirtualEnvWrapper使得VirtualEnv变得更好用

{% highlight shell %}
sudo pip install virtualenv virtualenvwrapper
{% endhighlight %}

安装完成以后，需要在环境变量中加入一些配置：下面这句话是使用python3才需要执行的，python2不需要

{% highlight shell %}
echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3" >> ~/.bashrc
{% endhighlight %}

不管python是什么版本，都要执行下面两句：


{% highlight shell %}
echo "export WORKON_HOME=~/Env" >> ~/.bashrc
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc
{% endhighlight %}

可以重启系统激活，也可以运行：

{% highlight shell %}
source ~/.bashrc
{% endhighlight %}

然后就可以开始建立一个虚拟环境：

{% highlight shell %}
mkvirtualenv first
{% endhighlight %}

你会发现，提示符变成(first)user@hostname:~$,表示现在已经进入first的虚拟环境，在此环境下进行的pip等操作，只会在当前环境下生效,当前虚拟环境在/home/siva/Env/first目录下

### 4 Django项目配置

#### 4.1 安装django

我使用选择版本来安装：

{% highlight shell %}
pip install django==1.10.1
{% endhighlight %}

#### 4.2 下载或拷贝项目

安装完成以后，使用git把项目clone下来,此处填写你自己的地址：

{% highlight shell %}
git clone https://git.oschina.net/xxx/Siva_First.git
{% endhighlight %}

此例子的项目名称是Siva_First，路径是在/home/siva/下

#### 4.3 配置django

用Mysql建好项目的数据库，然后进入Siva_First目录，用django应用数据模型：

{% highlight shell %}
python manage.py makemigrations
python manage.py migrate
{% endhighlight %}

建立后台超级用户：

{% highlight shell %}
python manage.py createsuperuser
{% endhighlight %}


静态文件安置：

{% highlight shell %}
python manage.py collectstatic
{% endhighlight %}

#### 4.4 测试项目

运行开发服务器测试一下是否可以正常运行：

{% highlight shell %}
python manage.py runserver 0.0.0.0:8000
{% endhighlight %}

这时，用浏览器打开http://192.168.0.154:8000/可以看到网站

#### 4.5 退出虚拟环境

因为当前是在first虚拟环境下，为了下一步的安装，必须退出当前的虚拟环境：

{% highlight shell %}
deactivate
{% endhighlight %}

### 5 uWSGI安装和配置

#### 5.1 安装uWSGI

pip下安装很简单：

{% highlight shell %}
sudo pip install uwsgi
{% endhighlight %}


我们可以测试一下uwsgi是否安装成功

{% highlight shell %}
uwsgi --http :8000 --home /home/siva/Env/first --chdir /home/siva/Siva_First -w Siva_First.wsgi
{% endhighlight %}

上面的命令是使用8000端口，虚拟环境在/home/siva/Env/first，项目在/home/siva/Siva_First下

#### 5.2 配置uWSGI

使用上面的命令行来部署网站肯定是不行的，我们需要使用“Emperor mode”，建立一个目录来放配置文件：

{% highlight shell %}
sudo mkdir -p /etc/uwsgi/sites
cd /etc/uwsgi/sites
{% endhighlight %}

以项目名称来命名这个配置文件：

{% highlight shell %}
sudo vi Siva_First.ini
{% endhighlight %}

内容如下：

{% highlight shell %}
[uwsgi]
project = Siva_First
base = /home/siva

chdir = %(base)/%(project)
home = %(base)/Env/%(project)
module = %(project).wsgi:application

master = true
processes = 5

socket = %(base)/%(project)/%(project).sock
chmod-socket = 664
vacuum = true
{% endhighlight %}

project是项目名称，base是项目所在位置

现在，配置文件建好了，但是uwsgi还不能自动运行我们需要在/etc/init目录中建一个启动脚本：

{% highlight shell %}
sudo vi /etc/init/uwsgi.conf
{% endhighlight %}

内容如下：

{% highlight shell %}
description "uWSGI application server in Emperor mode"

start on runlevel [2345]
stop on runlevel [!2345]

setuid siva
setgid www-data

exec /usr/local/bin/uwsgi --emperor /etc/uwsgi/sites
{% endhighlight %}

这一步完成以后，uwsgi还是不能正常启动，是因为www-data用户组还没有创建，等我们装完nginx以后就可以了。

### 6 反向代理：Nginx的安装和配置

#### 6.1 安装

{% highlight shell %}
sudo apt-get install nginx
{% endhighlight %}

#### 6.2 创建配置文件

{% highlight shell %}
sudo vi /etc/nginx/sites-available/Siva_First
{% endhighlight %}


内容如下：

{% highlight shell %}
server {
    listen 80;
    server_name 192.168.0.154;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/siva/Siva_First;
    }

    location / {
        include         uwsgi_params;
        uwsgi_pass      unix:/home/siva/Siva_First/Siva_First.sock;
    }
}
{% endhighlight %}

然后把这个配置文件链接到sites-enabled目录下

{% highlight shell %}
sudo ln -s /etc/nginx/sites-available/Siva_First /etc/nginx/sites-enabled/
{% endhighlight %}

检查一下配置文件的语法是否有问题

{% highlight shell %}
sudo service nginx configtest
{% endhighlight %}

如果没问题，那么重启一下nginx和uwsgi的服务就可以访问了

{% highlight shell %}
sudo service nginx restart
sudo service uwsgi restart
{% endhighlight %}

