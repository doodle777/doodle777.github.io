---
layout: post
date: 2015-10-11 20:50:00
title:  "Android 学习笔记(05) 基本UI布局"
category: Android-Study
tags:   [Android, UI-Layout]
---

#### **1、View和ViewGroup**

Activity是Android应用程序的基本管理单元，Android的每一个窗口都是通过一个Activity来定义的，但是Activity并不能直接用来显示窗口。我们需要调用setContentView(View view)来显示这个窗口。也就是说，真正用来显示窗口的是View类及其子类。 

View主要负责绘制元素和事件处理，提供了许多用于绘制界面的子类。比如Button类，TextView类，EditText类等等。我们可以通过这些子类控件来进行一些简单的界面绘制。 

ViewGroup是View的子类，主要作用是容纳其他元素。ViewGroup是一个抽象类，所以容纳其他元素充当一个容器的任务实际上是通过其子类完成的。比如FrameLayout类、LinearLayout类、AbsoluteLayout类、RelativeLayout类、TableLayout类、GridLayout类等等。

// Android APIs
ViewGroup
extends View
implements ViewParent ViewManager

java.lang.Object

   ↳    android.view.View

       ↳    android.view.ViewGroup

Known Direct Subclasses：
AbsoluteLayout, AdapterView<T extends Adapter>, CoordinatorLayout, DrawerLayout, FragmentBreadCrumbs, FrameLayout, GridLayout, LinearLayout, LinearLayoutCompat, PagerTitleStrip, RecyclerView, RelativeLayout, ShadowOverlayContainer, SlidingDrawer, SlidingPaneLayout, SwipeRefreshLayout, Toolbar, TvView, ViewPager

Known Indirect Subclasses:
AbsListView, AbsSpinner, ActionMenuView, AdapterViewAnimator, AdapterViewFlipper, AppBarLayout, AppCompatSpinner, AppWidgetHostView, BaseCardView, BrowseFrameLayout, and 43 others.

#### **2、普通布局**

##### A. FrameLayout

FrameLayout，框架布局。是一种最简单的布局类型，将所有的组件固定在界面的左上角，叠加显示，后一个组件在前一个组件之上显示。也就是说，后一个组件可能会覆盖前一个组件。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">

    <TextView android:text="Hello World!" 
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
    <TextView android:text="Hello Android!"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
</FrameLayout>
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015101101.png"/>
</div>

##### B. LinearLayout

LinearLayout，线性布局。所有的组件按照一个方向放置，其方向通过android:orientation=”horizontal”来控制，这个是水平放置组件，我们可以把horizonal改写为vertical，从而实现组件的竖直放置。

{% highlight xml %}
<LinearLayout
    android:orientation="horizontal">
    <!-- 组件 -->
</LinearLayout>
{% endhighlight %}


{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity"
    android:orientation="horizontal">

    <TextView android:text="Hello World!" 
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
    <TextView android:text="Hello Android!"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
</LinearLayout>
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015101102.png"/>
</div>

##### C. AbsoluteLayout

AbsoluteLayout，绝对布局。这是一种不推荐的方式，因为其组件位置由左上角为坐标原点定义，当屏幕尺寸变化时，不能良好适应屏幕的显示需求，可能因为坐标问题在屏幕外面显示，从而用户无法对其操作。

{% highlight xml %}
<AbsoluteLayout>
    <Button android:text="Hello Android!"
        <!-- 其他代码 -->
        android:layout_x="100px"
        android:layout_y="100px"/>
</AbsoluteLayout>
{% endhighlight %}

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<AbsoluteLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">

    <TextView android:text="Hello World!"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_x="600px"
        android:layout_y="50px"/>
    <TextView android:text="Hello Android!"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_x="100px"
        android:layout_y="100px"/>
</AbsoluteLayout>
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015101103.png"/>
</div>

##### D. RelativeLayout

RelativeLayout，相对布局。放置在相对布局上的组件可以设置其相对于子元素或者父元素的位置。通过指定相对父元素的位置来实现定位。

{% highlight xml %}
<RelativeLayout
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="OK"
        android:id="@+id/button"
        android:layout_below="@+id/radioFalse"  <!-- 指定在父元素下方 -->
        android:layout_alignParentRight="true"  <!-- 右端与父窗体右端对齐 -->
        android:layout_alignParentEnd="true" /> <!-- 下端与父窗体末尾对齐 -->
</RelativeLayout>
{% endhighlight %}

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Is that right?"
        android:id="@+id/textView"
        android:textSize="50px"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />

    <RadioButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="True"
        android:id="@+id/radioTrue"
        android:layout_below="@+id/textView"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:checked="true" />

    <RadioButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="False"
        android:id="@+id/radioFalse"
        android:layout_below="@+id/radioTrue"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:checked="false" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="OK"
        android:id="@+id/button"
        android:layout_below="@+id/radioFalse"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true" />
</RelativeLayout>
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015101104.png"/>
</div>

##### E. GridLayout

GridLayout，网格布局。这种布局把子视图存放在一个矩形网格中。网格是由被无数虚细线分割成多个单元格的可视区域组成。贯穿整个API的网格线通过网格索引数来指定。

{% highlight xml %}
<GridLayout 
    <!-- 其他代码省略 -->
    android:orientation="horizontal"
    android:columnCount="4"             <!-- Grid列数 -->
    android:rowCount="5">               <!-- Grid行数 -->

    <Button
        android:layout_columnSpan="2"   <!-- 指定占用列数 -->
        android:layout_rowSpan="2"      <!-- 指定占用行数 -->
        android:layout_gravity="fill"/> <!-- 相对父View的位置 -->
  /GridLayout>
{% endhighlight %}

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:columnCount="4"
    android:orientation="horizontal"
    android:paddingEnd="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:rowCount="5">
    　　

    <Button
        android:id="@+id/one"
        android:text="1" />
    <Button
        android:id="@+id/two"
        android:text="2" />
    <Button
        android:id="@+id/three"
        android:text="3" />　　
    <Button
        android:id="@+id/devide"
        android:text="/" />
    <Button
        android:id="@+id/four"
        android:text="4" />
   <Button
        android:id="@+id/five"
        android:text="5" />　　
    <Button
        android:id="@+id/six"
        android:text="6" />　　
    <Button
        android:id="@+id/multiply"
        android:text="×" />　　
    <Button
        android:id="@+id/seven"
        android:text="7" />　　
    <Button
        android:id="@+id/eight"
        android:text="8" />　　
    <Button
        android:id="@+id/nine"
        android:text="9" />
    <Button
        android:id="@+id/minus"
        android:text="-" />
    <Button
        android:id="@+id/zero"
        android:layout_columnSpan="2"
        android:layout_gravity="fill"
        android:text="0" />
    <Button
        android:id="@+id/point"
        android:text="." />
    <Button
        android:id="@+id/plus"
        android:layout_gravity="fill"
        android:layout_rowSpan="2"
        android:text="+" />
    <Button
        android:id="@+id/equal"
        android:layout_columnSpan="3"
        android:layout_gravity="fill"
        android:text="=" />
</GridLayout>
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201510/2015101105.png"/>
</div>

#### **3、总结**

以上就是几种布局的基本方法，其中包括FrameLayout、LinearLayout、AbsoluteLayout、RelativeLayout、GridLayout。使用过程中应该灵活使用，加上布局嵌套之类的。


