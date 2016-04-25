---
layout: post
date: 2015-10-26 19:35:00
title:  "Android开发手记(15) 拨打电话和收发短信"
category: Android-Study
tags:   [Android, Phone, Message]
---

#### **1、Intent简介**

　　Android组价之间的通信，由Intent来协助完成。Intent负责对应用中一次操作的动作、动作涉及数据、附加数据进行描述，Android则根据此Intent的描述，负责找到对应的组件，将 Intent传递给调用的组件，并完成组件的调用。

　　Intent可以启动一个Activity，也可以启动一个Service，还可以发起一个广播Broadcasts。分别通过startActivity();startService();startBroadcasts();来执行操作。

　　在使用Android的电话功能的时候，我们需要调用Intent的相关功能来实现拨打电话和收发短信。

#### **2、URI**

　　URI是统一资源标识符（Uniform Resource Identifier）的缩写。是一个用于标识某一互联网资源名称的字符串。 该种标识允许用户对任何（包括本地和互联网）的资源通过特定的协议进行交互操作。URI由包括确定语法和相关协议的方案所定义。在Android中URI的意义非常重大，他是所有资源的标示符（ID），通过URI可找到一个对应的具体实体，如文件(file)，数据库的表项(content)等，可以说贯穿整个Framework。 
　　URI一般的格式为：[scheme:]schemeSpecificPart[#fragment]  ([...]表示可选) 

#### **3、拨打电话**

　　直接拨打电话需要添加android.permission.CALL_PHONE权限，在AndroidManifest.xml中添加如下代码：

{% highlight xml %}
<uses-permission android:name="android.permission.CALL_PHONE"/>
{% endhighlight %}

　　完整代码为：

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.doodle.button" >

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

    <uses-permission android:name="android.permission.CALL_PHONE"/>

</manifest>
{% endhighlight %}


　　然后，我们实例化一个Uri，其内容为要拨打电话的命令。电话号码通过TextView获得。然后我们实例化一个Intent，设置Intent的行为为“直接拨打电话”，Intent的数据为“拨打XXX电话命令”。

{% highlight java linenos %}
      Uri uri = Uri.parse("tel:" + tvPhone.getText());
      Intent intent = new Intent();
      intent.setAction(Intent.ACTION_CALL);
      intent.setData(uri);
{% endhighlight %}

　　然后为拨打电话按钮添加此单击事件即可

{% highlight java linenos %}
        btnDriect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("tel:" + tvPhone.getText());
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_CALL);
                intent.setData(uri);
                startActivity(intent);
            }
        });
{% endhighlight %}

　　同理，我们可以通过Intent来启动系统自带的拨号器。启动系统自带的拨号器是不需要android.permission.CALL_PHONE权限的。

{% highlight java linenos %}
        btnSystem.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("tel:" + tvPhone.getText());
                Intent intent = new Intent(Intent.ACTION_DIAL, uri);
                startActivity(intent);
            }
        });
{% endhighlight %}

#### **4、发送短信**

　　同拨打电话一样，发送短信同样需要相应的权限。

{% highlight xml %}
<uses-permission android:name="android.permission.SEND_SMS"/>
{% endhighlight %}

　　不同的是，我们在发送短信的时候是通过SmsManager来完成发送的。首先我们要实例化一个SmsManager。通过SmsManager.sendTextMessage()方法可以进行短信发送。其原型为：

> sendTextMessage(String destAddr, String scAddr, String text, PendingIntent sentIntent, PendingIntent deliveryIntent);  
> // destAddress 发送短信的地址（也就是号码）  
> // scAddress 短信服务中心，如果为null，就是用当前默认的短信服务中心  
> // text 短信内容  
> // sentIntent 如果不为null，当短信发送成功或者失败时，这个PendingIntent会被广播出去成功的结果代码是Activity.RESULT_OK  
> // deliveryIntent  如果不为null，当这个短信发送到接收者那里，这个PendtingIntent会被广播，状态报告生成的pdu（指对等层次之间传递的数据单位）会拓展到数据（"pdu"）  

　　这里我们需要实例化一个PendingIntent来协助SMSManger的工作。

> SmsManager smsManager = SmsManager.getDefault();  
> PendingIntent pendingIntent = PendingIntent.getBroadcast(MainActivity.this, 0, new Intent(), 0);  
> smsManager.sendTextMessage(strAddr, null, strCont, pendingIntent, null);  


{% highlight java linenos %}
        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String strAddr = etPhone.getText().toString();
                String strCont = etContent.getText().toString();

                if (strAddr.equals("")) {
                    Toast.makeText(MainActivity.this, "收件人不能为空", Toast.LENGTH_SHORT).show();
                }
                if (strCont.equals("")) {
                    Toast.makeText(MainActivity.this, "短信内容不能为空", Toast.LENGTH_SHORT).show();
                }

                SmsManager smsManager = SmsManager.getDefault();
                PendingIntent pendingIntent = PendingIntent.getBroadcast(MainActivity.this, 0, new Intent(), 0);
                smsManager.sendTextMessage(strAddr, null, strCont, pendingIntent, null);
                Toast.makeText(MainActivity.this, "短信发送成功",Toast.LENGTH_LONG).show();
            }
        });
{% endhighlight %}

　　完整代码为：

{% highlight java linenos %}
import android.app.PendingIntent;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private EditText etPhone;
    private EditText etContent;
    private Button btnSend;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etPhone = (EditText) findViewById(R.id.etPhone);
        etContent = (EditText) findViewById(R.id.etContent);
        btnSend = (Button) findViewById(R.id.btnSend);

        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String strAddr = etPhone.getText().toString();
                String strCont = etContent.getText().toString();

                if (strAddr.equals("")) {
                    Toast.makeText(MainActivity.this, "收件人不能为空", Toast.LENGTH_SHORT).show();
                }
                if (strCont.equals("")) {
                    Toast.makeText(MainActivity.this, "短信内容不能为空", Toast.LENGTH_SHORT).show();
                }

                SmsManager smsManager = SmsManager.getDefault();
                PendingIntent pendingIntent = PendingIntent.getBroadcast(MainActivity.this, 0, new Intent(), 0);
                smsManager.sendTextMessage(strAddr, null, strCont, pendingIntent, null);
                Toast.makeText(MainActivity.this, "短信发送成功",Toast.LENGTH_LONG).show();
            }
        });
    }
}
{% endhighlight %}

#### **5、接收短信**

　　同拨打电话一样，发送短信同样需要相应的权限。接收短信需要

{% highlight xml %}
<uses-permission android:name="android.permission.RECEIVE_SMS"/>
{% endhighlight %}

　　接收短信的原理是，首先新建一个BroadcastReceiver来监听短信信息，然后根据监听到的广播信息中的短信进行捕捉，然后呈现出来。

　　首先，新建一个Receiver类，然后重载其onReceive方法。

{% highlight java linenos %}
public class Receiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {

         
        }
    }
}
{% endhighlight %}

　　然后，我们新建一个Budle来接收信息，我们知道，短信信息的关键字为"pdus"，所以通过一个Object[]来接收此信息，然后再将其转化为SmsMessage即可。

　　由于接收到的短信由于长度原因，可能被分割成若干条信息，所以，我们通过一个for循环来处理此短信。

{% highlight java linenos %}
        if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
            StringBuilder str = new StringBuilder();
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                SmsMessage[] msg = new SmsMessage[pdus.length];
                for (int i = 0; i < pdus.length; i++) {
                    msg[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                }
                for (SmsMessage m : msg) {
                    str.append("发件人：");
                    str.append(m.getDisplayOriginatingAddress());
                    str.append("\n内容:");
                    str.append(m.getDisplayMessageBody());
                }
                Toast.makeText(context, "收到消息：\n" + str, Toast.LENGTH_LONG);
            }
        }
{% endhighlight %}

　　最后在AndroidManifest.xml中处理一下新建的Receiver类即可。

　　完整代码：

#### AndroidMainfest.xml

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.doodle.button" >

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <receiver android:name=".Receiver" android:enabled="true">
            <intent-filter>
                <action android:name="android.provider.Telephony.SMS_RECEIVED"/>
            </intent-filter>
        </receiver>

    </application>

    <uses-permission android:name="android.permission.SEND_SMS"/>
    <uses-permission android:name="android.permission.RECEIVE_SMS"/>

</manifest>
{% endhighlight %}

#### MainActivity.java

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }
}
{% endhighlight %}

#### Receiver.java

{% highlight java linenos %}
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.widget.Toast;

public class Receiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
            StringBuilder str = new StringBuilder();
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                SmsMessage[] msg = new SmsMessage[pdus.length];
                for (int i = 0; i < pdus.length; i++) {
                    msg[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                }
                for (SmsMessage m : msg) {
                    str.append("发件人：");
                    str.append(m.getDisplayOriginatingAddress());
                    str.append("\n内容:");
                    str.append(m.getDisplayMessageBody());
                }
                Toast.makeText(context, "收到消息：\n" + str, Toast.LENGTH_LONG);
            }
        }
    }
}
{% endhighlight %}
