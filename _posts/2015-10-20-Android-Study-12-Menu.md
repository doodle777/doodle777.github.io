---
layout: post
date: 2015-10-20 19:25:00
title:  "Android开发手记(12) Menu的使用"
category: Android-Study
tags:   [Android, Menu]
---

　　Android中的Menu分为三种，分别为：OptionsMenu（选项菜单）、ContextMenu（上下文菜单）、SubMenu（子菜单）。

#### **1、OptionsMenu**

　　按Menu键就会显示，用于当前的Activity。

　　在Activity里面，一般通过以下函数来使用options menu：

     Activity::onCreateOptionsMenu (Menu menu)   创建options menu，这个函数只会在menu第一次显示时调用。
     Activity::onPrepareOptionsMenu (Menu menu)  更新改变options menu的内容，这个函数会在menu每次显示时调用。
     Activity::onOptionsItemSelected (MenuItem item) 处理选中的菜单项。

{% highlight java linenos %}
        //menu.add(groupId, itemId, order, title); 通过add()增加menuItem，每个menuItem有groupId，itemId，Order。这三个属性是相互独立，没有关联。  
         MenuItem redMenu = menu.add(MENU_GROUP_1, 0, 0, "Red");
         MenuItem OrangedMenu = menu.add(MENU_GROUP_1, 1, 1, "Orange");
         MenuItem YellowMenu = menu.add(MENU_GROUP_2, 2, 2, "Yellow");
         MenuItem GreenMenu = menu.add(MENU_GROUP_2, 3, 3, "Green");
         MenuItem BlueMenu = menu.add(MENU_GROUP_2, 4, 4, "Blue");
         MenuItem CyangonMenu = menu.add(MENU_GROUP_3, 5, 5, "Cyangon");
         MenuItem PurpleMenu = menu.add(MENU_GROUP_3, 6, 6, "Purple");

         menu.setGroupCheckable(MENU_GROUP_2, true /*isCheckable*/, false);//第三个参数true为单选，false为多选
         menu.setGroupEnabled(MENU_GROUP_2, true/*isEnabled*/);
         menu.setGroupVisible(MENU_GROUP_2, true/*isVisible*/);
         menu.setGroupCheckable(MENU_GROUP_3, true, true);    
{% endhighlight %}

完整代码如下：

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    private static int MENU_GROUP_1 = 1;
    private static int MENU_GROUP_2 = 2;
    private static int MENU_GROUP_3 = 3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuItem redMenu = menu.add(MENU_GROUP_1, 0, 0, "Red");
        MenuItem OrangedMenu = menu.add(MENU_GROUP_1, 1, 1, "Orange");
        MenuItem YellowMenu = menu.add(MENU_GROUP_2, 2, 2, "Yellow");
        MenuItem GreenMenu = menu.add(MENU_GROUP_2, 3, 3, "Green");
        MenuItem BlueMenu = menu.add(MENU_GROUP_2, 4, 4, "Blue");
        MenuItem CyangonMenu = menu.add(MENU_GROUP_3, 5, 5, "Cyangon");
        MenuItem PurpleMenu = menu.add(MENU_GROUP_3, 6, 6, "Purple");

        menu.setGroupCheckable(MENU_GROUP_2, true /*isCheckable*/, false);//第三个参数true为单选，false为多选
        menu.setGroupEnabled(MENU_GROUP_2, true/*isEnabled*/);
        menu.setGroupVisible(MENU_GROUP_2, true/*isVisible*/);
        menu.setGroupCheckable(MENU_GROUP_3, true, true);

        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        super.onOptionsItemSelected(item);
        switch (item.getItemId()) {
            case 0:
                Toast.makeText(this, "Red", Toast.LENGTH_SHORT).show();
                break;
            case 1:
                Toast.makeText(this, "Orange", Toast.LENGTH_SHORT).show();
                break;
            case 2:
                if(item.isCheckable()){
                    item.setChecked(!item.isChecked());
                }
                break;
            case 3:
                if(item.isCheckable()){
                    item.setChecked(!item.isChecked());
                }
                break;
            case 4:
                if(item.isCheckable()){
                    item.setChecked(!item.isChecked());
                }
                break;
            case 5:
                if(item.isCheckable()){
                    item.setChecked(true);
                }
                break;
            case 6:
                if(item.isCheckable()){
                    item.setChecked(true);
                }
                break;
        }
        return true;
    }

}
{% endhighlight %}


<div style="text-align: center">
<img src="{{ site.url }}/images/201510/2015102001.png"/> 
<img src="{{ site.url }}/images/201510/2015102002.png"/> 
</div>

#### **2、ContextMenu**

　　要在相应的view上按几秒后才显示的，用于view，跟某个具体的view绑定在一起。这类型的菜单不支持icon和快捷键！

　　在Activity里面，一般通过以下函数来使用context menu：

　　Activity::registerForContextMenu(View view) 为某个view注册context menu，一般在Activity::onCreate里面调用。

　　Activity::onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) 创建context menu，和options menu不同，context meun每次显示时都会调用这个函数。

　　Activity::onContextItemSelected(MenuItem item) 处理选中的菜单项。

{% highlight java linenos %}
         menu.setHeaderTitle("ContextMenu");
         menu.add(GROUP_COLOR, 0, 0, "Red");
         menu.add(GROUP_COLOR, 1, 1, "Green");
         menu.add(GROUP_COLOR, 2, 2, "Blue");
{% endhighlight %}

　　菜单响应事件处理和OptionMenu类似。

{% highlight java linenos %}
public class MainActivity extends AppCompatActivity {

    private TextView colorText;
    private static int GROUP_COLOR = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        colorText = (TextView) findViewById(R.id.textView);
        registerForContextMenu(colorText);
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);

        menu.setHeaderTitle("ContextMenu");
        menu.add(GROUP_COLOR, 0, 0, "Red");
        menu.add(GROUP_COLOR, 1, 1, "Green");
        menu.add(GROUP_COLOR, 2, 2, "Blue");
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        super.onContextItemSelected(item);

        switch (item.getItemId()) {
            case 0:
                colorText.setTextColor(Color.RED);
                break;
            case 1:
                colorText.setTextColor(Color.GREEN);
                break;
            case 2:
                colorText.setTextColor( Color.BLUE);
                break;

        }
        return true;
    }

}
{% endhighlight %}


#### **3、SubMenu**

　　SubMenu可以和OptionMenu、ContextMenu配合使用，但子菜单不能嵌套子菜单，这意味着在Android系统，菜单只有两层。同时子菜单不支持icon。

　　可以在onCreateOptionMenu或者onCreateContextMenu内定义SubMenu：

{% highlight java linenos %}
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);

        menu.setHeaderTitle("ContextMenu");
        menu.add(GROUP_COLOR, 0, 0, "Red");
        menu.add(GROUP_COLOR, 1, 1, "Green");
        menu.add(GROUP_COLOR, 2, 2, "Blue");

        SubMenu subMenu = menu.addSubMenu(Menu.NONE, 10, 10, "Text Size");
        subMenu.add(Menu.NONE, 11, 11, "Large");
        subMenu.add(Menu.NONE, 12, 12, "Small");
    }
{% endhighlight %}

　　完整代码：

{% highlight java linenos %}
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private TextView colorText;
    private static int GROUP_COLOR = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        colorText = (TextView) findViewById(R.id.textView);
        registerForContextMenu(colorText);
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);

        menu.setHeaderTitle("ContextMenu");
        menu.add(GROUP_COLOR, 0, 0, "Red");
        menu.add(GROUP_COLOR, 1, 1, "Green");
        menu.add(GROUP_COLOR, 2, 2, "Blue");

        SubMenu subMenu = menu.addSubMenu(Menu.NONE, 10, 10, "Text Size");
        subMenu.add(Menu.NONE, 11, 11, "Large");
        subMenu.add(Menu.NONE, 12, 12, "Small");
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        super.onContextItemSelected(item);

        switch (item.getItemId()) {
            case 0:
                colorText.setTextColor(Color.RED);
                break;
            case 1:
                colorText.setTextColor(Color.GREEN);
                break;
            case 2:
                colorText.setTextColor( Color.BLUE);
                break;
            case 11:
                colorText.setTextSize(30);
                break;
            case 12:
                colorText.setTextSize(20);
                break;
        }
        return true;
    }

}
{% endhighlight %}


#### **4、XML定义菜单**

　　首先在/res/menu新建一个menu_main.xml，在其中定义相关Menu

{% highlight xml %}
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".MainActivity">
    <item android:id="@+id/subMenu"
        android:title="SubMenu" >
        <menu>  <!--定义子菜单-->
            <item android:id="@+id/subLarge"
                android:title="Large"/>
            <item android:id="@+id/subSmall"
                android:title="Small"/>
        </menu>
    </item>
    <!--定义菜单组1-->
    <group android:id="@+id/group1"
        android:checkableBehavior="single"
        android:enabled="true">
        <item android:id="@+id/redMenu"
            android:title="Red"/>
        <item android:id="@+id/blueMenu"
            android:title="Blue"/>
    </group>
    <!--定义菜单组2-->
    <group android:id="@+id/group2"
        android:checkableBehavior="all"
        android:enabled="true">
        <item android:id="@+id/greenMenu"
            android:title="Green"/>
        <item android:id="@+id/purpleMenu"
            android:title="Purple"/>
    </group>
</menu>
{% endhighlight %}

#### （4.1）XML定义OptionsMenu

　　重载onCreateOptionsMenu即可：

{% highlight java linenos %}
     @Override
     public boolean onCreateOptionsMenu(Menu menu){
         MenuInflater menuInflater = new MenuInflater(getApplication());
         menuInflater.inflate(R.menu.menu_main, menu);
         return super.onCreateOptionsMenu(menu);
     }
{% endhighlight %}

　　完整代码为：

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private TextView colorText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        MenuInflater menuInflater = new MenuInflater(getApplication());
        menuInflater.inflate(R.menu.menu_main, menu);
        return super.onCreateOptionsMenu(menu);
    }
    
}
{% endhighlight %}


#### （4.2）XML定义ContextMenu

　　首先为ContextMenu注册菜单项

{% highlight java linenos %}
         colorText = (TextView)findViewById(R.id.textView);
         registerForContextMenu(colorText);
{% endhighlight %}

　　然后重载onCreateContextMenu即可：

{% highlight java linenos %}
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);

        getMenuInflater().inflate(R.menu.menu_main, menu);
    }
{% endhighlight %}

　　完整代码为：

{% highlight java linenos %}
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private TextView colorText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        colorText = (TextView)findViewById(R.id.textView);
        registerForContextMenu(colorText);
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);

        getMenuInflater().inflate(R.menu.menu_main, menu);
    }

}
{% endhighlight %}


