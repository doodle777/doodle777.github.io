---
layout: post
date: 2016-07-29 12:10:23
title: "FreeMarker 学习（Java）"
category: Other
tags:   [FreeMarker]
---

### 1 FreeMarker简介

**引自[“百度百科”](http://baike.baidu.com/view/1278430.htm)**

>FreeMarker是一款模板引擎： 即一种基于模板和要改变的数据，并用来生成输出文本（HTML网页、电子邮件、配置文件、源代码等）的通用工具。它不是面向最终用户的，而是一个Java类库，是一款程序员可以嵌入他们所开发产品的组件。
>FreeMarker是免费的，基于Apache许可证2.0版本发布。其模板编写为FreeMarker Template Language（FTL），属于简单、专用的语言。需要准备数据在真实编程语言中来显示，比如数据库查询和业务运算，之后模板显示已经准备好的数据。在模板中，主要用于如何展现数据，而在模板之外注意于要展示什么数据。

### 2 导入FreeMarker

FreeMarker提供了一个jar包，在Java工程里，只要引入这个jar包即可：

<div style="text-align: center">
<img src="{{ site.url }}/images/201607/2016072901.png"/> 
</div>

点击“Add as Library”便可以在程序中使用FreeMarker的各种功能了。

### 3 FreeMarker基本语法

FreeMarker在使用过程中主要包含两部分，一部分是模板文件，另一部分就是程序执行代码。首先编写一个符合FreeMarker语法的模板文件，然后在Java程序中编译这个模板文件，即可生成我们需要的文件。

FreeMarker模板文件主要由如下4个部分组成:   
1. 文本:直接输出的部分   
2. 注释:<#-- ... -->格式部分,不会输出   
3. 插值:即${...}或#{...}格式的部分,将使用数据模型中的部分替代输出   
4. FTL指令:FreeMarker指定,和HTML标记类似,名字前加#予以区分,不会输出   

#### 3.1 插值规则

插值有如下两种类型:

(1)通用插值${expr} : 如果，expr==10，那么插值“${expr}”，将被直接替换成“10”。

(2)数字格式化插值${expr;format} : format基本格式为“mXMY”，分别代表小数部分最少为X位，小数部分最大为Y位。即如果，expr==10，那么插值“${expr;m1}”，将被直接替换成“10.0”。

#### 3.2 FTL指令

FreeMarker使用FTL标签来使用指令其标签和HTML标签类似：   
1. 开始标签:<#oper arg>   
2. 结束标签:</#oper>   
3. 空标签:<#oper arg/>   

### 4 以编写JavaBean为例

本小结中，将通过模板文件生成一个JavaBeans。

#### 4.1 模板文件

首先，是JavaBeans的基本结构。JavaBeans是Java中一种特殊的类，可以将多个对象封装到一个对象（bean）中。特点是可序列化，提供无参构造器，提供getter方法和setter方法访问对象的属性。

基本结构如下：

{% highlight java linenos %}

package 包名;

public class 类名 {
	private 类型 名称;
	
	public 类名() {}
	public 类型 get名称() {}
	public void set名称(类型 参数) {}
}

{% endhighlight %}

根据此我们可以编写模板如下（其中cap_first意为将字符串首字符改为大写）：

{% highlight java linenos %}

package ${package};

public class ${class} {
	<#list attrs as attr>
	private ${attr.type} ${attr.name};
	</#list>

	// default constructor
	public ${class}() {
	}

	<#list attrs as attr>
	public ${attr.type} get${attr.name?cap_first}() {
		return this.${attr.name};
	}

	public void set${attr.name?cap_first}(${attr.type} ${attr.name}) {
		this.${attr.name} = ${attr.name};
	}

	</#list>
}

{% endhighlight %}

#### 4.2 程序文件

{% highlight java linenos %}

package science.duanxu;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args){
        try {
            Configuration conf = new Configuration();
            conf.setDirectoryForTemplateLoading(new File("."));
            conf.setObjectWrapper(new DefaultObjectWrapper());
            //conf.setDefaultEncoding("UTF-8");

            Template template = conf.getTemplate("./Student.ftl");

            // parms 中存贮的key值即为模板中可以直接获取的值
            Map<String, Object> parms = new HashMap<>();
            parms.put("package", "science.duanxu");
            parms.put("class", "Student");

            // 获取子属性值需要通过一个 JavaBean 来获取
            List<Attr> attrs = new ArrayList<>();
            attrs.add(new Attr("String", "name"));
            attrs.add(new Attr("String", "address"));
            attrs.add(new Attr("Integer", "age"));
            parms.put("attrs", attrs);

            Writer writer = new OutputStreamWriter(new FileOutputStream("Student.java"));
            template.process(parms, writer);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static class Attr {
        private String type;
        private String name;

        public Attr() {
        }

        public Attr(String type, String name) {
            this.type = type;
            this.name = name;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getType() {
            return this.type;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getName() {
            return this.name;
        }
    }
}

{% endhighlight %}

#### 4.3 输出结果

{% highlight java linenos %}

package science.duanxu;

public class Student {
	private String name;
	private String address;
	private Integer age;

	// default constructor
	public Student() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

}

{% endhighlight %}

### 5 总结

1. FreeMarker可以很方便的根据模板构造输出文件
2. 还有很多更加灵活的使用技巧，需要学习如何使用。
3. 上述实例中，可以将一些路径信息和成员变量信息事先写入到一个配置文件内，通过读取配置文件，便可以更加方便的输出文件。
4. 在实际应用中，通过FreeMarker可以很方便的编写自动测试花用例，从而提高测试效率。
5. ...

