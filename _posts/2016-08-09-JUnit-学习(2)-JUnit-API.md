---
layout: post
date: 2016-08-09 20:27:30
title: "JUnit学习(2) JUnit API"
category: Java
tags:   [JUnit]
---

### 3 JUnit API

**引自[“极客学院”](http://wiki.jikexueyuan.com/project/junit/api.html)**

JUnit 中比较重要的类有四个：

|:---:|:---:|:---:|
|序号|类的名称|类的功能|
|1|Assert|assert方法的集合|
|2|TestCase|定义了运行多重测试的固定装置|
|3|TestResult|TestResult 集合了执行测试样例的所有结果|
|4|TestSuit|TestSuite 是测试的集合|

#### 3.1 Assert类

这个类提供了一系列的编写测试的有用的声明方法。只有失败的声明方法才会被记录。Assert 类的重要方法列式如下：

|:---:|:---:|:---:|
|序号|方法|描述|
|1|void assertEquals(boolean expected, boolean actual)|检查两个变量或者等式是否平衡|
|2|void assertFalse(boolean condition)|检查条件是假的|
|3|void assertNotNull(Object object)|检查对象不是空的|
|4|void assertNull(Object object)|检查对象是空的|
|5|void assertTrue(boolean condition)|检查条件为真|
|6|void fail()|在没有报告的情况下使测试不通过|

测试类用法如下：

{% highlight java linenos %}

import org.junit.Test;
import static org.junit.Assert.*;
public class TestJunit1 {
   @Test
   public void testAdd() {
      //test data
      int num= 5;
      String temp= null;
      String str= "Junit is working fine";

      //check for equality
      assertEquals("Junit is working fine", str);

      //check for false condition
      assertFalse(num > 6);

      //check for not null value
      assertNotNull(str);
   }
}

{% endhighlight %}

#### 3.2 TestCase类

测试样例定义了运行多重测试的固定格式。TestCase 类的一些重要方法列式如下：

|:---:|:---:|:---:|
|序号|方法|描述|
|1|int countTestCases()|为被run(TestResult result) 执行的测试案例计数|
|2|TestResult createResult()|创建一个默认的 TestResult 对象|
|3|String getName()|获取 TestCase 的名称|
|4|TestResult run()|一个运行这个测试的方便的方法，收集由TestResult 对象产生的结果|
|5|void run(TestResult result)|在 TestResult 中运行测试案例并收集结果|
|6|void setName(String name)|设置 TestCase 的名称|
|7|void setUp()|创建固定装置，例如，打开一个网络连接|
|8|void tearDown()|拆除固定装置，例如，关闭一个网络连接|
|9|String toString()|返回测试案例的一个字符串表示|

测试类用法如下：

{% highlight java linenos %}

import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
public class TestJunit2 extends TestCase  {
   protected double fValue1;
   protected double fValue2;

   @Before 
   public void setUp() {
      fValue1= 2.0;
      fValue2= 3.0;
   }

   @Test
   public void testAdd() {
      //count the number of test cases
      System.out.println("No of Test Case = "+ this.countTestCases());

      //test getName 
      String name= this.getName();
      System.out.println("Test Case Name = "+ name);

      //test setName
      this.setName("testNewAdd");
      String newName= this.getName();
      System.out.println("Updated Test Case Name = "+ newName);
   }
   //tearDown used to close the connection or clean up activities
   public void tearDown(  ) {
   }
}

{% endhighlight %}

#### 3.3 TestResult类

测试样例定义了运行多重测试的固定格式。TestCase 类的一些重要方法列式如下：

|:---:|:---:|:---:|
|序号|方法|描述|
|1|void addError(Test test, Throwable t)|在错误列表中加入一个错误|
|2|void addFailure(Test test, AssertionFailedError t)|在失败列表中加入一个失败|
|3|void endTest(Test test)|显示测试被编译的这个结果|
|4|int errorCount()|获取被检测出错误的数量|
|5|Enumeration errors()|返回错误的详细信息|
|6|int failureCount()|获取被检测出的失败的数量|
|7|void run(TestCase test)|运行 TestCase|
|8|int int runCount()|获得运行测试的数量|
|9|void startTest(Test test)|声明一个测试即将开始|
|10|void stop()|标明测试必须停止|

测试类用法如下：

{% highlight java linenos %}

import org.junit.Test;
import junit.framework.AssertionFailedError;
import junit.framework.TestResult;

public class TestJunit3 extends TestResult {
   // add the error
   public synchronized void addError(Test test, Throwable t) {
      super.addError((junit.framework.Test) test, t);
   }

   // add the failure
   public synchronized void addFailure(Test test, AssertionFailedError t) {
      super.addFailure((junit.framework.Test) test, t);
   }
   @Test
   public void testAdd() {
   // add any test
   }

   // Marks that the test run should stop.
   public synchronized void stop() {
   //stop the test here
   }
}

{% endhighlight %}

#### 3.4 TestSuit类

TestSuite 类是测试的组成部分。它运行了很多的测试案例。TestSuite 类的一些重要方法列式如下：

|:---:|:---:|:---:|
|序号|方法|描述|
|1|void addTest(Test test)|在套中加入测试。|
|2|void addTestSuite(Class<? extends TestCase> testClass)|将已经给定的类中的测试加到套中。|
|3|int countTestCases()|对这个测试即将运行的测试案例进行计数。|
|4|String getName()|返回套的名称。|
|5|void run(TestResult result)|在 TestResult 中运行测试并收集结果。|
|6|void setName(String name)|设置套的名称。|
|7|Test testAt(int index)|在给定的目录中返回测试。|
|8|int testCount()|返回套中测试的数量。|
|9|static Test warning(String message)|返回会失败的测试并且记录警告信息。|

测试类用法如下：

{% highlight java linenos %}

import junit.framework.*;
public class JunitTestSuite {
   public static void main(String[] a) {
      // add the test's in the suite
      TestSuite suite = new TestSuite(TestJunit1.class, TestJunit2.class, TestJunit3.class );
      TestResult result = new TestResult();
      suite.run(result);
      System.out.println("Number of test cases = " + result.runCount());
    }
}

{% endhighlight %}
