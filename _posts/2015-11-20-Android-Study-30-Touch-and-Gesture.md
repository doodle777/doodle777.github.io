---
layout: post
date: 2015-11-20 21:22:00
title:  "Android开发手记(30) 触摸及手势操作"
category: Android-Study
tags:   [Android, Touch, Gesture]
---

* content
{:toc}

　　触摸操作在现在智能手机系统中起到举足轻重的作用，本文将对安卓中的触摸以及一些简单手势的操作进行简单的介绍。

#### **1、触摸**

　　首先是关于触摸的判断，有两种方法可以判断的触摸操作。

#### （1.1）setOnTouchListener

　　对于View类，我们可以为View添加setOnTouchListener来获取触摸事件。我们以TextView为例，由于TextView继承自View，所以我们可以为其添加一个触摸监听。然后将触摸事件交给OnTouchListener处理。比如，我们在触摸TextView时改变这个TextView的文字。

{% highlight java linenos %}
textView.setOnTouchListener(new View.OnTouchListener() {
    @Override
    public boolean onTouch(View v, MotionEvent event) {
        int action = MotionEventCompat.getActionMasked(event);
 
        switch (action){
            case MotionEvent.ACTION_DOWN :
                textView.setText("TextAction: DOWN"); return true;
            case MotionEvent.ACTION_UP :
                textView.setText("TextAction UP"); return true;
            default: return false;
        }
    }
});
{% endhighlight %}

　　其中，我们通过getActionMasked(MotionEvent event)取得触摸事件的类型ID，然后对其分别判断。当然，还有一些其他的事件：

{% highlight java %}
public static final int ACTION_DOWN         = 0; //单点触摸动作
public static final int ACTION_UP           = 1; //单点触摸离开动作
public static final int ACTION_MOVE         = 2; //触摸点移动动作
public static final int ACTION_CANCEL       = 3; //触摸动作取消
public static final int ACTION_OUTSIDE      = 4; //触摸动作超出边界
public static final int ACTION_POINTER_DOWN = 5; //多点触摸动作
public static final int ACTION_POINTER_UP   = 6; //多点离开动作
{% endhighlight %}

#### （1.2）onTouchEvent

　　对于Activity，我们可以通过重载onTouch方法来获取触摸事件。我们这里通过触摸MainActivity然后通过一个TextView来显示触摸的信息。

{% highlight java linenos %}
@Override
public boolean onTouchEvent(MotionEvent event) {
 
    int action = MotionEventCompat.getActionMasked(event);
 
    switch (action){
        case MotionEvent.ACTION_DOWN :
            textView.setText("MainAction: DOWN"); return true;
        case MotionEvent.ACTION_UP :
            textView.setText("MainAction UP"); return true;
        default: return super.onTouchEvent(event);
    }
}
{% endhighlight %}

　　完整代码为：

{% highlight java linenos %}
import android.app.Activity;
import android.os.Bundle;
import android.support.v4.view.MotionEventCompat;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;
 
public class MainActivity extends Activity {
 
    private TextView textView;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        textView = (TextView)findViewById(R.id.textView);
        textView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                int action = MotionEventCompat.getActionMasked(event);
 
                switch (action) {
                    case MotionEvent.ACTION_DOWN:
                        textView.setText("TextAction: DOWN");
                        return true;
                    case MotionEvent.ACTION_UP:
                        textView.setText("TextAction UP");
                        return true;
                    default:
                        return false;
                }
            }
        });
    }
 
    @Override
    public boolean onTouchEvent(MotionEvent event){
 
        int action = MotionEventCompat.getActionMasked(event);
 
        switch (action){
            case MotionEvent.ACTION_DOWN :
                textView.setText("MainAction: DOWN"); return true;
            case MotionEvent.ACTION_UP :
                textView.setText("MainAction UP"); return true;
            default: return super.onTouchEvent(event);
        }
    }
 
}
{% endhighlight %}

#### **2、手势识别**

　　Android提供的onTouch方法只能处理一些简单的触摸操作比如触摸、离开、移动之类的，但是当我们处理一些复杂的手势时，这样判断就会很复杂，比如长按操作。好在Android SDK提供了另外的一些方法来处理手势的操作：GestureDetector。GestureDetector类对外提供了两个接口：OnGestureListener，OnDoubleTapListener，还有一个内部类SimpleOnGestureListener；SimpleOnGestureListener类是GestureDetector提供给我们的一个更方便的响应不同手势的类，它实现了上述两个接口，该类是static class，也就是说它实际上是一个外部类，我们可以在外部继承这个类，重写里面的手势处理方法。

　　使用GestureDetector，具体过程为，首先实现GestureDetector接口，然后实例化一个这个类对象，最后对Activity添加onTouchEvent处理方法即可。

#### （2.1）OnGestureListener

　　首先我们需要新建一个MyGesture类来实现GestureDetector的接口，这里我们需要注意的是我们必须实现所有提供的接口：

- 按下（onDown）： 刚刚手指接触到触摸屏的那一刹那，就是触的那一下。  
- 提拉（onFling）： 手指在触摸屏上迅速移动，并松开的动作。  
- 长按（onLongPress）： 手指按在持续一段时间，并且没有松开。  
- 滚动（onScroll）： 手指在触摸屏上滑动。  
- 按住（onShowPress）： 手指按在触摸屏上，它的时间范围在按下起效，在长按之前。  
- 抬起（onSingleTapUp）：手指离开触摸屏的那一刹那。  

{% highlight java linenos %}
class MyGesture implements GestureDetector.OnGestureListener{
 
        @Override
        public boolean onDown(MotionEvent event) {
            textView.setText("onDown: " + event.toString());
            return true;
        }
 
        @Override
        public boolean onFling(MotionEvent event1, MotionEvent event2,
                               float velocityX, float velocityY) {
            textView.setText("onFling: " + event1.toString() + event2.toString());
            return true;
        }
 
        @Override
        public void onLongPress(MotionEvent event) {
            textView.setText("onLongPress: " + event.toString());
        }
 
        @Override
        public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
                                float distanceY) {
            textView.setText("onScroll: " + e1.toString() + e2.toString());
            return true;
        }
 
        @Override
        public void onShowPress(MotionEvent event) {
            textView.setText("onShowPress: " + event.toString());
        }
 
        @Override
        public boolean onSingleTapUp(MotionEvent event) {
            textView.setText("onSingleTapUp: " + event.toString());
            return true;
        }
    }
{% endhighlight %}

　　然后在MainActivity的onCreate方法内实例化这个类；

{% highlight java %}
gestureDetector = new GestureDetector(MainActivity.this, new MyGesture());
{% endhighlight %}

　　最后，根据我们实例化的对象为MainActivity添加时间处理方法：

{% highlight java linenos %}
@Override
public boolean onTouchEvent(MotionEvent event){
 
    gestureDetector.onTouchEvent(event);
 
    return super.onTouchEvent(event);
}
{% endhighlight %}

　　完整的代码如下：

{% highlight java linenos %}
import android.app.Activity;
import android.os.Bundle;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.widget.TextView;
 
public class MainActivity extends Activity {
 
    private TextView textView;
    private GestureDetector gestureDetector;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        textView = (TextView)findViewById(R.id.textView);
        gestureDetector = new GestureDetector(MainActivity.this, new MyGesture());
    }
 
    @Override
    public boolean onTouchEvent(MotionEvent event){
 
        gestureDetector.onTouchEvent(event);
 
        return super.onTouchEvent(event);
    }
 
    class MyGesture implements GestureDetector.OnGestureListener{
 
        @Override
        public boolean onDown(MotionEvent event) {
            textView.setText("onDown: " + event.toString());
            return true;
        }
 
        @Override
        public boolean onFling(MotionEvent event1, MotionEvent event2,
                               float velocityX, float velocityY) {
            textView.setText("onFling: " + event1.toString() + event2.toString());
            return true;
        }
 
        @Override
        public void onLongPress(MotionEvent event) {
            textView.setText("onLongPress: " + event.toString());
        }
 
        @Override
        public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
                                float distanceY) {
            textView.setText("onScroll: " + e1.toString() + e2.toString());
            return true;
        }
 
        @Override
        public void onShowPress(MotionEvent event) {
            textView.setText("onShowPress: " + event.toString());
        }
 
        @Override
        public boolean onSingleTapUp(MotionEvent event) {
            textView.setText("onSingleTapUp: " + event.toString());
            return true;
        }
    }
}
{% endhighlight %}

#### （2.2）SimpleOnGestureListener

　　从上文可以看出，我们在使用OnGestureListener的时候，需要重载一些我们用不到的方法，好在Android也为我们考虑到了这种不便，所以为我们提供了一个SimpleOnGestureListener类来方便的实现我们需要的手势。

　　这里我们只需要继承一下SimpleOnGestureListener类即可：

{% highlight java linenos %}
class MyGesture extends GestureDetector.SimpleOnGestureListener{
 
    @Override
    public boolean onDown(MotionEvent event) {
        textView.setText("onDown: " + event.toString());
        return true;
    }
    //...其他实现方法
}
{% endhighlight %}

　　完整的代码入下：

{% highlight java linenos %}
import android.app.Activity;
import android.os.Bundle;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.widget.TextView;
 
public class MainActivity extends Activity {
 
    private TextView textView;
    private GestureDetector gestureDetector;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        textView = (TextView)findViewById(R.id.textView);
        gestureDetector = new GestureDetector(MainActivity.this, new MyGesture());
    }
 
    @Override
    public boolean onTouchEvent(MotionEvent event){
 
        gestureDetector.onTouchEvent(event);
 
        return super.onTouchEvent(event);
    }
 
    class MyGesture extends GestureDetector.SimpleOnGestureListener{
 
        @Override
        public boolean onDown(MotionEvent event) {
            textView.setText("onDown: " + event.toString());
            return true;
        }
 
        @Override
        public boolean onFling(MotionEvent event1, MotionEvent event2,
                               float velocityX, float velocityY) {
            textView.setText("onFling: " + event1.toString() + event2.toString());
            return true;
        }
 
        @Override
        public void onLongPress(MotionEvent event) {
            textView.setText("onLongPress: " + event.toString());
        }
 
        @Override
        public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
                                float distanceY) {
            textView.setText("onScroll: " + e1.toString() + e2.toString());
            return true;
        }
 
        @Override
        public void onShowPress(MotionEvent event) {
            textView.setText("onShowPress: " + event.toString());
        }
 
        @Override
        public boolean onSingleTapUp(MotionEvent event) {
            textView.setText("onSingleTapUp: " + event.toString());
            return true;
        }
    }
}
{% endhighlight %}
