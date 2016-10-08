---
layout: post
date: 2015-10-29 21:29:00
title:  "Android开发手记(18) 数据存储三 SQLite存储数据"
category: Android-Study
tags:   [Android, DataStore, SQLite]
---

Android为数据存储提供了五种方式：

1、SharedPreferences

2、文件存储

**3、SQLite数据库**

4、ContentProvider

5、网络存储

 
　　SQLite 是以嵌入式为目的而设计的轻型数据库，运行起来占用的资源非常低，通常只需要几百K的内存就足够了。同时也具有非常好的兼容性，支持标准SQL语言。Android提供了对SQLite的支持，我们可以通过其来管理一些应用数据。

#### **一、创建SQLite数据库和表**

　　我们可以通过SQLiteDatabase.openOrCreateDatabase()来创建一个数据库实例。

> SQLiteDatabase db = openOrCreateDatabase(dbName, MODE_PRIVATE, null);  
> // openOrCreateDatabase(String name, int mode, CursorFactory factory)  
> // 第一个参数为创建数据库的名称  
> // 第二个参数为创建数据库的权限，其权限同内部文件存储数据权限相同。默认为MODE_PRIVATE。  
> // 第三个参数为CursorFactory对象，用于查询时返回Cursor的子类对象；或者传入null使用默认的factory构造。  

　　在创建表的时候，我们可以使用一条SQL语句来完成。

{% highlight java linenos %}
cmd = "CREATE TABLE IF NOT EXISTS " + tableName + " (name VARCHAR, passwd VARCHAR)";
db.execSQL(cmd);
{% endhighlight %}

　　这样，我们可以发现在“/data/data/[PACKAGE_NAME]/databases”目录下生成了一个“myDB.db”数据库文件。

　　完整代码：

{% highlight java linenos %}
import android.database.sqlite.SQLiteDatabase;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
 
public class MainActivity extends AppCompatActivity {
 
    private Button btnDB;
    private Button btnTable;
    private String dbName = "myDB";
    private String cmd = "";
    private SQLiteDatabase db;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        btnDB = (Button)findViewById(R.id.btnDB);
        btnTable = (Button)findViewById(R.id.btnTable);
 
        btnDB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                db = openOrCreateDatabase(dbName,MODE_PRIVATE,null);
            }
        });
        btnTable.setOnClickListener(new View.OnClickListener() {
            String tableName = "User";
            @Override
            public void onClick(View view) {
                cmd = "CREATE TABLE IF NOT EXISTS " + tableName + " (name VARCHAR, passwd VARCHAR)";
                db.execSQL(cmd);
            }
        });
 
    }
}
{% endhighlight %}

#### **二、添加、删除、修改**

#### （2.1）SQL语句方法

{% highlight java linenos %}
cmd = "INSERT INTO " + tableName + " values ('Amy','123456')";
db.execSQL(cmd);
cmd = "UPDATE " + tableName + " SET passwd='654321' WHERE name='AMY')";
db.execSQL(cmd);
cmd = "DELETE FROM " + tableName + " WHERE name='Amy'";
db.execSQL(cmd);
{% endhighlight %}

#### （2.2）另一种方法

{% highlight java linenos %}
db.insert(String table, String nullColumnHack, ContentValues values);
db.update(String table, Contentvalues values, String whereClause, String whereArgs);
db.delete(String table, String whereClause, String whereArgs);
{% endhighlight %}

　　以上三个方法的第一个参数都是表示要操作的表名；insert中的第二个参数表示如果插入的数据每一列都为空的话，需要指定此行中某一列的名称，系统将此列设置为NULL，不至于出现错误；insert中的第三个参数是ContentValues类型的变量，是键值对组成的Map，key代表列名，value代表该列要插入的值；update的第二个参数也很类似，只不过它是更新该字段key为最新的value值，第三个参数whereClause表示WHERE表达式，比如“age > ? and age < ?”等，最后的whereArgs参数是占位符的实际参数值；delete方法的参数也是一样。

　　实例：

{% highlight java linenos %}
    btnTable.setOnClickListener(new View.OnClickListener() {
            String tableName = "User";
 
            @Override
            public void onClick(View view) {
                cmd = "CREATE TABLE IF NOT EXISTS " + tableName + " (name VARCHAR, passwd VARCHAR)";
                db.execSQL(cmd);
 
                ContentValues cv = new ContentValues();
                cv.put("name", "Amy");
                cv.put("passwd", "123456");
                db.insert(dbName, null, cv);
//              cmd = "INSERT INTO " + tableName + " values ('Amy','123456')";
//              db.execSQL(cmd);
 
                cv = new ContentValues();
                cv.put("passwd", "654321");
                db.update(dbName, cv, "name=?", new String[]{"Amy"});
//              cmd = "UPDATE " + tableName + " SET passwd='654321' WHERE name='AMY')";
//              db.execSQL(cmd);
 
                db.delete(dbName, "name=?", new String[]{"Amy"});
//              cmd = "DELETE FROM " + tableName + " WHERE name='Amy'";
//              db.execSQL(cmd);
            }
        });
{% endhighlight %}

#### **三、数据库查询**

　　对数据库的查询可以通过db.query()来实现，query方法一般包含8个参数：

> db.query(String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit);  
> // table为查询表的名称  
> // columns为查询的字段名  
> // selection为查询的条件  
> // selectionArgs为查询条件的值  
> // groupBy为分组字段值  
> // having为分组后筛选条件  
> // orderBy为排序字段名  
> // limit为查询结果返回记录条数  

　　查询的的结果通过Cursor返回。代表数据集的游标。

{% highlight java linenos %}
        Cursor cursor = db.query(tableName, null, null, null, null, null, null);
        String str = "";
        if(cursor.getCount()!=0){                       // 查询符合条件的记录个数
            cursor.moveToFirst();                       // 移动到第一个记录
            for(int i=0; i<cursor.getCount();i++){
                str += cursor.getString(0)+" "+cursor.getString(1)+"\n";
                cursor.moveToNext();                    // 移动到下一个记录
            }
        }
        new AlertDialog.Builder(MainActivity.this).setTitle("Query")
                .setMessage(str).setNegativeButton("OK",null).show();
{% endhighlight %}

#### **四、SQLiteOpenHelper**

　　除了常规的管理方法之外，Android SDK还提供了另外一种管理数据库的方法，SQLiteOpenHelper。它提供了一套自动执行的机制来创建、更新、打开数据库。

　　首先，我们继承SQLiteOpenHelper类，创建MyDBHelper类。

{% highlight java linenos %}
public class MyDBHelper extends SQLiteOpenHelper {
    private String tableName = "User";
 
    public MyDBHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }
 
    public void onCreate(SQLiteDatabase db) {
        String cmd = "CREATE TABLE IF NOT EXISTS " + tableName + " (name VARCHAR, passwd VARCHAR)";
        db.execSQL(cmd);
    }
 
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String cmd = "UPDATE " + tableName + " SET passwd='654321' WHERE name='AMY')";
        db.execSQL(cmd);
    }
 
    public String showTable(){
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(tableName, null, null, null, null, null, null);
        String str = "";
        if(cursor.getCount()!=0){                       // 查询符合条件的记录个数
            cursor.moveToFirst();                       // 移动到第一个记录
            for(int i=0; i<cursor.getCount();i++){
                str += cursor.getString(0)+" "+cursor.getString(1)+"\n";
                cursor.moveToNext();                    // 移动到下一个记录
            }
        }
        return str;
    }
 
}
{% endhighlight %}

      然后，我们便可以在MainActivity内使用我们定义的SQLiteOpenHelper类的方法。

{% highlight java linenos %}
    btnShow = (Button) findViewById(R.id.btnShow);
    btnShow.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            dbHelper = new MyDBHelper(MainActivity.this, dbName, null, 1);
            new AlertDialog.Builder(MainActivity.this).setTitle("MyDBHelper")
                    .setMessage(dbHelper.showTable()).setNegativeButton("OK", null).show();
        }
    });
{% endhighlight %}

　　完整代码如下：

#### MainActivity.java

{% highlight java linenos %}
import android.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
 
public class MainActivity extends AppCompatActivity {
 
    private Button btnShow;
    private String dbName = "myDB";
    private MyDBHelper dbHelper;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        btnShow = (Button) findViewById(R.id.btnShow);
        btnShow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dbHelper = new MyDBHelper(MainActivity.this, dbName, null, 1);
                new AlertDialog.Builder(MainActivity.this).setTitle("MyDBHelper")
                        .setMessage(dbHelper.showTable()).setNegativeButton("OK", null).show();
            }
        });
    }
 
}
{% endhighlight %}

#### MyDBHelper.java

{% highlight java linenos %}
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
 
public class MyDBHelper extends SQLiteOpenHelper {
    private String tableName = "User";
 
    public MyDBHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }
 
    public void onCreate(SQLiteDatabase db) {
        String cmd = "CREATE TABLE IF NOT EXISTS " + tableName + " (name VARCHAR, passwd VARCHAR)";
        db.execSQL(cmd);
    }
 
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String cmd = "UPDATE " + tableName + " SET passwd='654321' WHERE name='AMY')";
        db.execSQL(cmd);
    }
 
    public String showTable(){
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(tableName, null, null, null, null, null, null);
        String str = "";
        if(cursor.getCount()!=0){                       // 查询符合条件的记录个数
            cursor.moveToFirst();                       // 移动到第一个记录
            for(int i=0; i<cursor.getCount();i++){
                str += cursor.getString(0)+" "+cursor.getString(1)+"\n";
                cursor.moveToNext();                    // 移动到下一个记录
            }
        }
        return str;
    }
 
}
{% endhighlight %}
