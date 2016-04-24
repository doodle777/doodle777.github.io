---
layout: post
title:  "Android 学习笔记(04) BroadcastReceiver监听电池信息"
category: Android-Study
tags:   [Android, BroadcastReceiver]
---

在Android 中，Broadcast是一种在应用程序之间进行传输信息的机制。BroadcastReceiver对发送过来的Broadcast进行过滤和响应。根据这种机制，我们可以获取电池现有电量等信息。

#### **1、实例化BroadcastReceiver**

　　在接受信息的时候，可以通过intent.getAction().equals(Intent.ACTION_BATTERY_CHANGED)来判断接收的信息是否为电池电量变化信息。如果是，就获取此信息的详细情况。

{% highlight java linenos %}
private BroadcastReceiver batteryInfoReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
	if(intent.getAction().equals(Intent.ACTION_BATTERY_CHANGED)){
	    int level = intent.getIntExtra("level", 0);
	    int scale = intent.getIntExtra("scale", 100);
	    batteryView.setText("BatteryLevel " + String.valueOf(level*100/scale)+"%");
	    }
	}
    };
{% endhighlight %}

#### **2、注册消息接收器**

　　在onResume方法内注册消息接收器用来接收消息

>registerReceiver(batteryInfoReceiver, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));

#### **3、注销消息接收器**

　　在onPause方法内注销消息接收器

>unregisterReceiver(batteryInfoReceiver); 

#### **4、完整代码**

{% highlight java linenos %}
public class MainActivity extends AppCompatActivity {

    private TextView batteryView;
    private BroadcastReceiver batteryInfoReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getAction().equals(Intent.ACTION_BATTERY_CHANGED)){
                int level = intent.getIntExtra("level", 0);
                int scale = intent.getIntExtra("scale", 100);
                batteryView.setText("BatteryLevel " + String.valueOf(level*100/scale)+"%");
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        batteryView = (TextView) this.findViewById(R.id.batteryView);
    }

    @Override
    protected void onResume(){
        super.onResume();
        registerReceiver(batteryInfoReceiver, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
    }

    @Override
    protected void onPause(){
        super.onPause();
        unregisterReceiver(batteryInfoReceiver);
    }
}
{% endhighlight %}
