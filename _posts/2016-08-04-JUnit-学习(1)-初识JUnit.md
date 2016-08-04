---
layout: post
date: 2016-08-04 20:21:30
title: "JUnit学习(1) 初识JUnit"
category: Java
tags:   [JUnit]
---

### 1 JUnit简介

**引自[“百度百科”](http://baike.baidu.com/item/junit)**

>JUnit是一个Java语言的单元测试框架。它由Kent Beck和Erich Gamma建立，逐渐成为源于Kent Beck的sUnit的xUnit家族中最为成功的一个。 JUnit有它自己的JUnit扩展生态圈。多数Java的开发环境都已经集成了JUnit作为单元测试的工具。  
>JUnit是由 Erich Gamma 和 Kent Beck 编写的一个回归测试框架（regression testing framework）。Junit测试是程序员测试，即所谓白盒测试，因为程序员知道被测试的软件如何（How）完成功能和完成什么样（What）的功能。Junit是一套框架，继承TestCase类，就可以用Junit进行自动测试了。

### 2 基础测试

#### 2.1 测试函数

测试工具是一整套固定的工具用于基线测试。测试工具的目的是为了确保测试能够在共享且固定的环境中运行，因此保证测试结果的可重复性。它包括：  
- 在所有测试调用指令发起前的 setUp() 方法。  
- 在测试方法运行后的 tearDown() 方法。  

所以，我们可以在 setUp() 方法内编写测试的初始化方法，之后在测试函数内部编写测试代码。

测试程序在执行的时候，会自动识别类内部名称为 test* 的方法，并执行相应的测试。本例中，在 setUp() 方法内部将私有成员初始化，之后在 testInitial 方法内测试初始化的结果。

{% highlight java linenos %}

package science.duanxu;

import junit.framework.*;

public class JUnitStudyFunction extends TestCase {
    private int value;

    protected void setUp() {
        value = 100;
    }

    public void testInitial() {
        assertTrue(value == 100);
    }
}

{% endhighlight %}

#### 2.2 测试类

首先，我们编写一个具有功能的 Complex 类，其中只是最简单的实现了复数相加的功能。

{% highlight java linenos %}

package science.duanxu;

public class Complex {
    // 为了省去get set方法，这里我们把rel和img设为private
    public double rel, img;

    public Complex() {
        rel = img = 0;
    }

    public Complex(double rel, double img) {
        this.rel = rel;
        this.img = img;
    }

    public Complex add(Complex complex) {
        return new Complex(this.rel + complex.rel, this.img + complex.img);
    }

    @Override
    public boolean equals(Object object) {
        Complex complex = (Complex)object;
        return this.rel == complex.rel && this.img == complex.img;
    }
}

{% endhighlight %}

之后，我们就可以对这个复数类编写测试类，用来测复数类的执行。本例中，由于只有一个 add 方法，所以我们仅测试这一个方法的执行结果：

{% highlight java linenos %}

package test;

import org.junit.Test;
import science.duanxu.Complex;

import static org.junit.Assert.assertEquals;

public class TestComplex {
    @Test
    public void testAdd() {
        Complex x = new Complex(1,2);
        Complex y = new Complex(3,4);

        assertEquals(new Complex(4,6), x.add(y));
    }

}

{% endhighlight %}

其中，在测试执行的时候，进入测试类 TestComplex，然后执行 @Test 注解的 testAdd() 方法。进入testAdd() 方法之后，通过 assertEquals 方法返回测试结果（调用了Complex类内部的 equals 方法）。

#### 2.3 批量测试

有些时候，我们需要同时测试很多类的执行情况，于是分别给这些类编写了相应的测试类，之后我们便可以通过“测试套件”的方法来统一测试这些类。

以上面编写的 JUnitStudyFunction 类和 TestComplex 类为例。

{% highlight java linenos %}

package test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import science.duanxu.JUnitStudyFunction;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        TestComplex.class,
        JUnitStudyFunction.class,
})

public class TestAll {
}

{% endhighlight %}

我们将所有的类名加入到 SuitClasses 列表内部，然后执行类 TestAll 即可自动完成所有的测试工作。
