---
layout: post
date: 2015-11-04 22:08:00
title:  "Android开发手记(21) 遍历文件夹"
category: Android-Study
tags:   [Android, Folder]
---
 
　　我们在遍历文件夹的时候由于涉及到SD卡相关操作，所以我们需要添加如下权限：

{% highlight xml %}
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
{% endhighlight %}

　　首先，需要检查SD卡挂载状态：

{% highlight java linenos %}
boolean sdCard = Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
    if (!sdCard) {
        Toast.makeText(MainActivity.this, "SD卡未挂载", Toast.LENGTH_SHORT).show();
        MainActivity.this.finish();
    }
{% endhighlight %}

　　当getExternalStorageState()挂载状态返回为未挂载时，程序提示错误，并结束执行。

　　然后，通过Intent获取Activity当前的消息，如果第一次执行，那么Intent所get到的信息为空。此时就读取SD卡根目录文件列表。如果不是第一次执行，那么就获取上次传入的文件路径信息，然后再读取此文件路径下的文件列表。


{% highlight java linenos %}
Intent intent = getIntent();
CharSequence cs = intent.getCharSequenceExtra("filePath"); //filePath 为传入的文件路径信息
if (cs != null) {
     File file = new File(cs.toString());
     tvPath.setText(file.getPath());
     files = file.listFiles();
} else {
     File sdFile = Environment.getExternalStorageDirectory();
     tvPath.setText(sdFile.getPath());
     files = sdFile.listFiles();
}ra("filePath");
{% endhighlight %}

　　然后，在获取到了所有的文件列表信息之后，我们需要将其输入到ListView中，而ListView数据是和Adapter绑定的。Adapter的初始化原型为：


> SimpleAdapter(Context context, List<? extends Map<String, ?>> data, int resource, String[] from, int[] to)  
> // context 是上下文，这里我们取MainActivity.this  
> // data 是数据来源，是一个Map结构，最终显示Map中的Value  
> // resource 是资源文件，根据此xml文件将ListView中内容排版  
> // from 是数据来源的名称，为Map中的Key值  
> // to 是将数据和resource中进行绑定id的值  

　　根据此，我们实例化一个Map来存储最终需要显示的数据，同时新建一个资源文件/res/layout/list_layout.xml来对ListView内容进行排版：

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:weightSum="1">
 
    <ImageView
        android:layout_width="46dp"
        android:layout_height="45dp"
        android:id="@+id/image" />
 
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="38dp"
        android:textAppearance="?android:attr/textAppearanceLarge"
        android:text="Large Text"
        android:id="@+id/fileName"
        android:layout_weight="0.14" />
</LinearLayout>
{% endhighlight %}

{% highlight java linenos %}
List<HashMap<String, Object>> list = new ArrayList<>();
    for (int i = 0; i < files.length; i++) {
        HashMap<String, Object> hashMap = new HashMap<>();
        if (files[i].isDirectory()) {
            hashMap.put("image", android.R.drawable.ic_dialog_email);
        } else {
            hashMap.put("image", android.R.drawable.ic_dialog_map);
        }
        hashMap.put("fileName", files[i].getName());
        list.add(hashMap);
    }
{% endhighlight %}

　　最后，实例化此Adapter并将ListView与其绑定，同时为ListView添加Item单击事件。如果Item是目录的话，就将目录的路径通过intent传递给Activity，然后启动此Activity。回到起始定义Intent的地方，此Intent会得到由Activity传递过来的目录信息，然后根据此目录信息可以进一步访问文件目录。

{% highlight java linenos %}
SimpleAdapter adapter = new SimpleAdapter(MainActivity.this, list, R.layout.list_layout,
        new String[]{"image", "fileName"}, new int[]{R.id.image, R.id.fileName});
listView.setAdapter(adapter);
listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        if (files[i].isDirectory()) {
            File[] childFile = files[i].listFiles();
            if (childFile != null && childFile.length >= 0) {
                Intent intent = new Intent(MainActivity.this, MainActivity.class);
                intent.putExtra("filePath", files[i].getPath());
                Toast.makeText(MainActivity.this, files[i].getPath(), Toast.LENGTH_SHORT).show();
                startActivity(intent);
            }
        }
    }
});
{% endhighlight %}

　　完整代码如下：

{% highlight java linenos %}
import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;
 
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
 
public class MainActivity extends AppCompatActivity {
 
    private TextView tvPath;
    private ListView listView;
    private File[] files;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        tvPath = (TextView) findViewById(R.id.textView);
        listView = (ListView) findViewById(R.id.listView);
 
        boolean sdCard = Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
        if (!sdCard) {
            Toast.makeText(MainActivity.this, "SD卡未挂载", Toast.LENGTH_SHORT).show();
            MainActivity.this.finish();
        }
 
        Intent intent = getIntent();
        CharSequence cs = intent.getCharSequenceExtra("filePath");
        if (cs != null) {
            File file = new File(cs.toString());
            tvPath.setText(file.getPath());
            files = file.listFiles();
        } else {
            File sdFile = Environment.getExternalStorageDirectory();
            tvPath.setText(sdFile.getPath());
            files = sdFile.listFiles();
        }
 
        List<HashMap<String, Object>> list = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            HashMap<String, Object> hashMap = new HashMap<>();
            if (files[i].isDirectory()) {
                hashMap.put("image", android.R.drawable.ic_dialog_email);
            } else {
                hashMap.put("image", android.R.drawable.ic_dialog_map);
            }
            hashMap.put("fileName", files[i].getName());
            list.add(hashMap);
        }
 
        SimpleAdapter adapter = new SimpleAdapter(MainActivity.this, list, R.layout.list_layout,
                new String[]{"image", "fileName"}, new int[]{R.id.image, R.id.fileName});
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if (files[i].isDirectory()) {
                    File[] childFile = files[i].listFiles();
                    if (childFile != null && childFile.length >= 0) {
                        Intent intent = new Intent(MainActivity.this, MainActivity.class);
                        intent.putExtra("filePath", files[i].getPath());
                        Toast.makeText(MainActivity.this, files[i].getPath(), Toast.LENGTH_SHORT).show();
                        startActivity(intent);
                    }
                }
            }
        });
 
    }
 
}
{% endhighlight %}

<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201511/2015110404.png"/> 
</div>




