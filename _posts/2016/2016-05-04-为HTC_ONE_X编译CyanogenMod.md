---
layout: post
date: 2016-05-04 12:06:00
title:  "为 HTC ONE X 编译 CyanogenMod"
category: Other
tags:   [ROM, Recovery, CyanogenMod]
---

* content
{:toc}

**本文翻译自[CyanogenMod Wiki](http://wiki.cyanogenmod.org/w/Build_for_endeavoru)。**

### 1.简介

　　这个教程将帮助你从一个解锁了 bootloader 的 HTC ONE X （以下简称 HOX）开始，然后下载必要的工具和基于谷歌安卓系统的最新的 CyanogenMod 源代码。通过这些，你可以从源代码编译 CyanogenMod 和 CyanogenMod Recovery 镜像，然后将其安装到你的手机。

　　很难讲清楚顺利完成这个教程需要多少经验。这个教程显然不是为了纯小白准备的，但是你也不需要一个软件工程的博士学位。一些读者可以无障碍的顺利完成此教程。另一些人可能需要在基本操作上进行一些探索。因为每个人的经历、背景和经验都是不同的。每进行一步都弄清楚你是否理解并正确执行了是很重要的。

　　记住，你可能遇到很多困难，但是克服这些困难是值得的！在自己家中就能够为你的手机安装一个全新的操作系统，这是很令人愉快的。一旦你成为一个安卓大神，你就不需要等待每日编译版（nightly）。因为你具备了从源代码编译安装完整操作系统的能力。为了成为一个大神，你可能需要增加一个功能、修复一个BUG、添加语言支持、学习编译一个新的 APP或者将源码编译到一个新的设备，这完全取决于你自己喜好。

#### 1.1 你将需要的

- 一台 HTC ONE X  
- 一台较新的电脑（Linux，OS X，或者 Windows），拥有可观的 RAM 和 100GB 以上的可用空间（如果你开启了 ccache 或者为多台设备构造，你可能需要更多）。RAM 越小编译时间越久（推荐 8GB 或更多）。使用 SSD 会显著提升编译的速度。  
- 一根和 HOX 兼容的 USB 数据线。
- 熟悉基本的安卓系统和终端的操作。如果你安装过自定义的 ROM，或者你熟悉 recovery，这会是很有帮助的。了解基本的终端命令也是很有用的，比如 cd(change directory)。

　　学习使用 Linux 很有挑战，如果你不熟悉 Linux 的使用，那么就下载一个虚拟机软件，比如 VirtualBox，然后在其中安装 Ubuntu 来学习 Linux。任何最近的64位版本都能得到很好的支持，但是我们推荐使用最新的版本。

> 注意：  
> 你需要使用64位的系统，一个32位的环境只支持编译 CyanogenMod 6 或者更早的系统。对于 CyanogenMod 10.1 如果你遇到了64位主机问题，你可以在你的环境中设置 “BUILD_HOST_32bit=1”。这通常是不需要的，尤其是在 CyanogenMod 10.2 或更新的版本中。  

　　使用一个虚拟机可以在你的现有系统内再运行一个系统。如果你对任何版本的 Linux 都觉得厌烦，你总是可以卸载和删除所有的东西。设置一个 Ubuntu 虚拟机的教程满世界都找得到，对此不在赘述。

　　好，我们现在开始把！

---

### 2.编译 CyanogenMod 和 CyanogenMod Recovery

#### 2.1 准备编译环境

> 注意：  
> 你仅仅在第一次编译的时候需要做这些，如果你已经准备好了环境，然后下载了 CyanogenMod 源代码，请移步“[准备设备专用代码](#device-specific)”。  

##### 2.1.1 安装 SDK

　　如果你之前没有安装 [adb](http://wiki.cyanogenmod.org/w/Doc:_adb_intro) 和 [fastboot](http://wiki.cyanogenmod.org/w/Doc:_fastboot_intro)，请安装 Android SDK。SDK(Software Developer Kit)，软件开发包。其中包括一些有用的工具，通过这些工具，你可以刷新软件、查看系统时间、截图等等。所有的这些都通过电脑来完成。

> 注意：  
> SDK包含很多不同的工具，adb 和 fastboot 是最有用的工具之一，位于 /platform-tools 目录下。  

##### 2.1.2 安装依赖包

　　要想编译 CyanogenMod，需要几个依赖包，你可以通过包管理器安装。

> 注意：  
> Linux 的包管理器用于安装或者卸载软件（通常通过网络安装），对于 Ubuntu，你可以使用 Ubuntu 软件中心。或者，你可以使用 apt-get install 命令直接在终端中安装软件。  

　　对于32位和64位系统，都需要：

> bison build-essential curl flex git gnupg gperf libesd0-dev liblz4-tool libncurses5-dev libsdl1.2-dev libwxgtk2.8-dev libxml2 libxml2-utils lzop maven openjdk-7-jdk openjdk-7-jre pngcrush schedtool squashfs-tools xsltproc zip zlib1g-dev

　　除了以上的依赖包，64位系统还需要：

> g++-multilib gcc-multilib lib32ncurses5-dev lib32readline-gplv2-dev lib32z1-dev

　　查询此网页可以看到详细的列表：[依赖列表](http://source.android.com/source/initializing.html)

#### 2.2 建立目录

　　你需要在编译环境中新建一个目录：

{% highlight bash %}
$ mkdir -p ~/bin
$ mkdir -p ~/android/system
{% endhighlight %}

#### 2.3 安装 repo 命令

　　输入下列命令下载“repo”二进制文件，并将其设置为可执行：

{% highlight bash %}
$ curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
$ chmod a+x ~/bin/repo
{% endhighlight %}

#### 2.4 将 ~/bin 目录加入到执行目录

　　在较新版本的 Ubuntu 中，~/bin 目录应该已经位于 [PATH](http://wiki.cyanogenmod.org/w/Doc:_paths) 内，你可以使用文本编辑器打开 ~/.profile 文件来检查以下代码是否存在：

{% highlight shell-session %}
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
{% endhighlight %}

#### 2.5 初始化 CyanogenMod repository

　　输入下列代码来初始化 CyanogenMod repository。确保此处的 cm 分支是你想编译的，同时支持你的设备。

{% highlight bash %}
$ cd ~/android/system/
$ repo init -u https://github.com/CyanogenMod/android.git -b cm-12.1
{% endhighlight %}

#### 2.6 下载源代码

　　开始下载源代码：

{% highlight bash %}
$ repo sync
{% endhighlight %}

　　CM 清单包含了一个默认的 repo 配置，我们强烈推荐你使用默认的配置（比如对 sync 不添加任何的参数）。举例来说，我们的默认配置是 “-j 4” 和 “-c”。“-j 4”意味着将会建立4个虚拟链接。如果你遇到了链接错误，你可以降低此链接数“-j 3”或者“-j 2”。“-c”意味着请求 repo 仅仅更新当前分支的最新状态，而不是整个 CM 历史版本。

　　下载将花费您很长时间，请耐心等待。

> 注意：  
> repo sync 命令用来从 CyanogenMod 和 Google 更新最新的源代码。记住，你可以每隔几天更新一次以便保持你的源代码为最新状态。  

#### 2.7 获取预编译的APP（适用于CM11和更低版本）

　　输入：

{% highlight bash %}
$ cd ~/android/system/vendor/cm
{% endhighlight %}

　　然后：

{% highlight bash %}
$ ./get-prebuilts
{% endhighlight %}

　　你将不会看到任何确认信息，这将导致一些预编译的应用被加载和安装到源代码内。一旦完成之后，将不需要做第二次。

<span id="device-specific"/>

#### 2.8 准备设备专用代码

　　完成下载源代码之后，确保你在源代码根目录下（cd ~/android/system），然后键入：

{% highlight bash %}
$ source build/envsetup.sh
$ breakfast endeavoru
{% endhighlight %}

　　这会下载设备专用代码和设备内核代码。

　　一个可选的使用 breakfast 命令的方式是编译[本地列表](http://wiki.cyanogenmod.org/w/Doc:_Using_manifests#The_local_manifest)。为了完成这个，需要你下载[CM Github](http://github.com/CyanogenMod)上列出的所有定义在 cm.dependencies 内的 repo，下载到你的本地列表内。

> 注意：  
1. breakfast 期间的错误  
	- 不同的维护者设计他们设备的继承规则是不同的，有些需要首先完成供应商目录后才可以进行 breakfast。如果你在供应商 makefiles 时得到一个错误，那么就跳转到下一节“提取所有的 blobs 文件”。首先确保 breakfast 被成功推送到了设备树中，并且提取 blobs 脚本应处于可用状态。在完成这个部分之后，你可以重新运行 breakfast endeavoru。   
2. 如果你想了解更多关于“source build/envsetup.sh”做了什么，或者了解 breakfast、brunch、lunch命令，单机此链接：[Envsetup help](http://wiki.cyanogenmod.org/w/Envsetup_help)。  
3. 为了方便每次返回源码根目录都需要键入“cd ~/android/system”，你可以使用 croot。为了使用此命令，你必须首先从“~/android/system”运行“source build/envsetup.sh”。  

#### 2.9 提取所有的blobs文件

　　现在确保你的 HOX 已经通过 USB 连接线连接到你的电脑，并且你位于“~/android/system/device/htc/endeavoru”目录，如果需要的话你可以通过“cd ~/android/system/device/htc/endeavoru”来返回。然后运行以下脚本：

{% highlight bash %}
$ ./extract-files.sh
{% endhighlight %}

　　你将会在“~/android/system/vendor/htc”目录下看到从你设备中提取出来的“blobs”文件。如果你看到类似adb不能提取出文件的错误，可能是因为adb的路径没有添加到环境变量的原因，如果是这样的话，你可以查看这个关于处理"command not found"的错误信息的链接：[adb](http://wiki.cyanogenmod.org/w/Adb)。

> 注意：  
> 1、为了让 extract-files.sh 脚本正常工作，你的设备应当已经在运行 CyanogenMod 的某个编译版本。  
> 2、使用 extract-files.sh 脚本将所有的文件释放到“~/android/system/vendor/htc”目录是很重要的。同时会生成 Makefiles 文件来确保 blobs 文件被拷贝到设备内。如果没有这些 blobs 文件，编译 CyanogenMod 时不会出现任何错误，但是你可能丢失一些重要的功能，比如设备可能因为图形库的丢失而不显示任何东西。  

#### 2.10 开启缓存来优化编译速度

　　你可以加快编译速度，添加“export USE_CCACHE=1”到你的["~/.bashrc”](http://superuser.com/questions/49289/what-is-the-bashrc-file)文件。然后指定 ccache 可用的磁盘空间：

{% highlight bash %}
prebuilts/misc/linux-x86/ccache/ccache -M 50G
{% endhighlight %}

　　这里的 50G 指的是缓存的空间，这只需要做一次，然后此设置将被记住。从 25GB 到 100GB 范围的缓存将显著影响编译的速度（比如一小时的编译过程可能被缩短到20分钟）。如果你只是为一个设备构造，那么25GB-50GB的空间就足够了，如果你为多个设备构造，而且不同的设备间不共享相同的内核源码，那么你需要分配75GB-100GB的空间。这些缓存空间将被永久的在你得驱动器上被占用。[了解更多关于 ccahche 的信息](http://source.android.com/source/initializing.html#setting-up-ccache)。

> 注意：  
> 如果你是一名非常活跃的开发者，不仅仅工作在Android项目上，你可能倾向于将你的 Android ccahce 独立出来，因为它占用空间巨大，而且可能会降低其他项目的效率。那么就从 CyanogenMod 12.1 开始，你可以通过环境变量指定缓存的地址和大小：  
export ANDROID_CCACHE_DIR="$HOME/android/.ccache"  
export ANDROID_CCACHE_SIZE="50G"  

#### 2.11 开始编译

　　现在到了编译的时候了，输入：

{% highlight bash %}
$ croot
$ brunch endeavoru
{% endhighlight %}

　　然后编译将开始自动执行。

> 注意：  
> 1、如果编译没有开始，尝试 lunch 然后从菜单中选择你的设备。如果这仍然不工作，尝试 breakfast 然后从菜单选择，然后 make endeavoru 将开始工作。  
> 2、再次注意，如果在使用 croot、brunch、lunch 的时候提示“command not found”的错误，请确认你已经在终端中的“~/android/system”目录下执行了下面这个脚本：“.build/envsetup.sh”。  

#### 2.12 如果编译中断...

　　如果你遇到类似内存不足的错误：

{% highlight bash %}
ERROR: signapk.jar failed: return code 1make: *** \[out/target/product/endeavoru/cm_endeavoru-ota-eng.root.zip\] Error 1
{% endhighlight %}

　　你可能需要做如下改动：打开“~/android/system/build/tools/releasetools/common.py”文件，查找“-Xmx2048m”（可能出现在“OPTIONS.java_args”下面，或者出现在“signapk.jar”附近）。然后将其更改为：“-Xmx1024m”或者“-Xmx512m”。然后重新编译。

　　如果你会突然看到什么无缘无故的被“killed”的消息，那么你的虚拟机可能内存溢出或者空间不足，请分配更多的资源，然后重试。

---

### 3.安装构建

　　假设编译顺利完成，在同一个终端键入“$ cd $OUT”。在这你会看到生成的所有的文件，在“/system”目录下的我们称为system，在root目录下的将会成为你的ramdisk，在kernel目录下将会成为你的kernel.... 这些只是后台信息，下面的两个文件是我们最需要关注的：(1)recovery.img,它包含了 CyanogenMod 的 Recovery, (2)cm-\[something\].zip，它包含了 CyanogenMod 安装包。

---

### 4.使用fastboot安装Recovery

　　单击此链接获得更多关于[自定义Recovery](http://wiki.cyanogenmod.org/w/All_About_Recovery_Images)的帮助。

1. 确保你的电脑安装有 fastboot 和 adb。  
2. 通过 USB 连接你的 HOX 到电脑。  
3. 确保可执行的 fastboot 程序位于 PATH 内，并且 Recovery 镜像和 fastboot 位于同一目录。  
4. 打开终端，将手机重启至 fastboot 模式：“adb reboot bootloader”。或者通过手机特殊按键组合重启至此模式。  
5. 一旦你的设备重启到 fastboot 模式，确认你的PC是否可以识别设备：“fastboot devices”。  
	- 如果你没有看到设备号，只看到“<waiting for device>”，说明 fastboot 没有正确安装配置，[点此查看更多帮助](http://wiki.cyanogenmod.org/w/Doc:_fastboot_intro)。  
	- 如果你看到“no permissions fastboot”，确保 [UDEV](http://wiki.cyanogenmod.org/w/UDEV) 规则被正确的配置了。  
6. 将 Recovery 安装到设备：“fastboot flash recovery your_recovery_image.img”。其中文字部分是 Recovery 镜像的名字。  
7. 一旦安装完成，将设备重启到 Recovery 来确认安装是否成功。  
	- 有些 ROM 在安装时会覆盖 Recovery，所以请注意你的设备 ROM 是否存在这个问题。  

#### 4.1 安装 CyanogenMod

　　返回“$OUT”目录，你应该看到某个文件名类似于：“cm-13.0-20160504-UNOFFICIAL-endeavoru.zip”。现在你可以像正常安装 ROM 那样在 Recovery 中安装。在此之前，请确保已经备份了重要的文件，同时备份当前系统，以防止在安装过程中出现错误。由于 CyanogenMod 没有备份功能，所以你可以选择其他 Recovery 来完成此工作，或者使用类似于 Titanium 之类的工具（需要 root 权限）。

#### 4.2 成功！接下来...

　　你成功了，欢迎加入自编译的精英俱乐部，你已经从头到尾编译了你的系统...希望你能在移植的过程中学到东西，并尝到一些乐趣。 现在你已经为你的设备成功编译 CyanogenMod，这个链接是一些关于下一步该做什么的建议：[一些关于下一步该做什么的建议](http://wiki.cyanogenmod.org/w/After_You_Build)。 此外，请在开发者主题的开发者中心上查看关于这个wiki各种详细的信息：[收集logs信息](http://wiki.cyanogenmod.org/w/Doc:_debugging_with_logcat)，知道[源代码目录里有些什么](http://wiki.cyanogenmod.org/w/Doc:_the_cm_source)，[提交你的贡献](http://wiki.cyanogenmod.org/w/Doc:_using_gerrit)，[移植CygogenMod到新设备](http://wiki.cyanogenmod.org/w/Doc:_porting_intro)和其它更多的内容。再次祝贺你！

