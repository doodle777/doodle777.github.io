---
layout : post
date: 2015-11-15 16:23:00
title : "Android开发手记(27) Java多线程的操作"
category : Android-Study
tags : [Android, Thread, Runnable]
---

　　Java中常用的有关线程的操作有，判断线程是否启动、线程强制执行、线程休眠、线程中断、线程让步、线程同步等。下面就一一举例。

　　首先，我们新建一个MyThread类实现Runnable接口。基于此接口进行线程的相关操作。

{% highlight java linenos %}
class MyThread implements Runnable {
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println(Thread.currentThread().getName() + " 运行 " + i);
        }
    }
}
{% endhighlight %}

#### **1、判断线程是否启动**

　　判断线程是否启动很简单，通过Thread.isAlive()方法即可。

{% highlight java linenos %}
public class Test {
    public static void main(String[] args) {
        MyThread mt = new MyThread();
        Thread t = new Thread(mt);
 
        System.out.println("线程" + (t.isAlive() ? "已" : "未") + "启动");
        t.start();
        System.out.println("线程" + (t.isAlive() ? "已" : "未") + "启动");
    }
}
{% endhighlight %}

　　输出如下：

> 线程未启动  
> 线程已启动  
> Thread-0 运行 0  
> Thread-0 运行 1  
> Thread-0 运行 2  

#### **2、线程强制执行**

　　线程强制执行可以通过Thread.join()实现。我们首先来看一个没有强制执行的例子

{% highlight java linenos %}
public class Test {
    public static void main(String[] args) {
        MyThread mt1 = new MyThread();
        MyThread mt2 = new MyThread();
        Thread t1 = new Thread(mt1);
        Thread t2 = new Thread(mt2);
 
        try {
            t1.start();
            // t1.join();
            t2.start();
            // t2.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
{% endhighlight %}

　　程序输入如下：

> Thread-0 运行 0  
> Thread-1 运行 0  
> Thread-0 运行 1  
> Thread-1 运行 1  
> Thread-0 运行 2  
> Thread-1 运行 2  

　　我们发现，两个线程是并行运行的，因此，执行的结果为两个线程分别执行取得的输出然后在按照时间插入到输出流中。我们将join注释掉之后，发现程序的执行结果变为：

> Thread-0 运行 0  
> Thread-0 运行 1  
> Thread-0 运行 2  
> Thread-1 运行 0  
> Thread-1 运行 1  
> Thread-1 运行 2  

　　可以看出，执行的结果是线程1开始执行，等线程1执行完毕之后线程2才开始执行。

#### **3、线程休眠**

　　线程休眠通过Thread.sleep()实现。这是一个静态方法，所以需要通过Thread类来调用，而不是通过实例化之后的变量调用。另外，调用sleep()可能抛出InterruptedException异常，我们我们需要将其放在try-catch块中来捕获此异常。

{% highlight java linenos %}
public class Test {
    public static void main(String[] args) {
 
        MyThread mt = new MyThread();
        Thread t = new Thread(mt);
 
        long stime = System.currentTimeMillis();
        t.start();
        System.out.println(System.currentTimeMillis() - stime);
        try {
            Thread.sleep(1000);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(System.currentTimeMillis() - stime);
    }
}
{% endhighlight %}

　　程序执行结果为：

> Thread-0 运行 0  
> Thread-0 运行 1  
> Thread-0 运行 2  
> 1000

　　使用System.currentTimeMiles()来获取程序运行的时间。我们发现：从开始执行到结束，花了1秒钟的时间，这个时间是main Thread休眠的时间。

#### **4、线程中断**

　　上一小节提到，线程在sleep过程中可以被打断并抛出InterruptedException异常，这个线程中断行为可以通过Thread.interrupt()实现。首先我们将时间统计移动到MyThread内部，然后在MyThread内每输出一次运行情况进行一次休眠操作。

{% highlight java linenos %}
class MyThread implements Runnable {
    public void run() {
        long stime = System.currentTimeMillis();
        System.out.println(System.currentTimeMillis() - stime);
        for (int i = 0; i < 3; i++) {
            System.out.println(Thread.currentThread().getName() + " 运行 " + i);
            try {
                Thread.sleep(1000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println(System.currentTimeMillis() - stime);
    }
}
 
public class Test {
    public static void main(String[] args) {
 
        MyThread mt = new MyThread();
        Thread t = new Thread(mt);
 
        t.start();
        t.interrupt();
    }
}
{% endhighlight %}

　　程序输出为：

> Thread-0 运行 0  
> java.lang.InterruptedException: sleep interrupted  
> Thread-0 运行 1   at java.lang.Thread.sleep(Native Method)  
>    at MyThread.run(Test.java:9)  
>    at java.lang.Thread.run(Thread.java:745)  
>  
> Thread-0 运行 2  
> 2002  

　　程序从开始运行到结束，花了2秒左右的时间，但是明明在MyThread内休眠了3次，每次一秒，应该运行3秒左右。这是因为在线程第一次休眠的时候，在main线程内通过Thread.interrupt对第一次休眠进行了打断，所以这次休眠时间几乎为0，剩余的两次休眠没有被打断，所以总共执行时间为2秒左右。

#### **5、线程让步**

　　有时候，线程在执行过程中，需要等待其余线程的执行结果，才能继续自身的运算，这时候就需要进行线程让步。线程的让步可以通过Thread.yield来实现。

{% highlight java linenos %}
class MyThread implements Runnable {
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println(Thread.currentThread().getName() + " 运行 " + i);
            Thread.yield();
        }
    }
}
 
public class Test {
    public static void main(String[] args) {
 
        MyThread mt1 = new MyThread();
        MyThread mt2 = new MyThread();
        Thread t1 = new Thread(mt1);
        Thread t2 = new Thread(mt2);
 
        t1.start();
        t2.start();
 
    }
}
{% endhighlight %}

　　输出结果为：

> Thread-0 运行 0  
> Thread-1 运行 0  
> Thread-0 运行 1  
> Thread-1 运行 1  
> Thread-0 运行 2  
> Thread-1 运行 2  

#### **6、线程同步**

　　Java中线程同步可以通过同步方法和同步代码块来完成：

#### （6.1）同步方法

　　我们首先来观察一个程序的执行结果

{% highlight java linenos %}
class MyThread implements Runnable {
 
    private int Tic = 5;
    @Override
    public void run() {
        for (int i = 0; i < 3; i++)
            if (Tic > 0)
                System.out.println(Thread.currentThread().getName() + " Ticket:" + Tic--);
    }
}
 
public class Test {
    public static void main(String[] args) {
        MyThread mt = new MyThread();
        for (int i = 0; i < 3; i++) {
            new Thread(mt).start();
        }
    }
}
{% endhighlight %}

　　执行结果为：

> Thread-1 Ticket:5  
> Thread-2 Ticket:3  
> Thread-0 Ticket:4  
> Thread-2 Ticket:1  
> Thread-1 Ticket:2  

　　我们发现，其结果是3个线程不分先后并行执行，当线程0运行的时候，线程2依然可以访问到方法体内部，反之依然。有时候（比如卖票系统）我们需要在一个线程运行的时候，另一个线程无法进入到正在运行的方法体内部，这时候我们就需要进行线程的同步与互斥操作。通过在方法前面加入synchronized可以指定一个方法为同步方法。

{% highlight java linenos %}
class MyThread implements Runnable {
 
    private int Tic = 5;
    @Override
    public synchronized void run() {
        for (int i = 0; i < 3; i++)
            if (Tic > 0)
                System.out.println(Thread.currentThread().getName() + " Ticket:" + Tic--);
    }
}
{% endhighlight %}

　　此时程序的运行结果为：

> Thread-0 Ticket:5  
> Thread-0 Ticket:4  
> Thread-0 Ticket:3  
> Thread-2 Ticket:2  
> Thread-2 Ticket:1  

　　可以看出，在增加了同步之后，票是一张一张被卖出去的，这样就可以有效的避免重票的情况。

#### （6.2）同步代码块

　　我们将上述代码改为如下。依然可以实现相同的功能

{% highlight java linenos %}
class MyThread implements Runnable {
 
    private int Tic = 5;
 
    @Override
    public void run() {
        synchronized (this) {
            for (int i = 0; i < 3; i++)
                if (Tic > 0)
                    System.out.println(Thread.currentThread().getName() + " Ticket:" + Tic--);
        }
    }
}
{% endhighlight %}

#### （6.3）注意

　　1）当一个线程正在访问一个对象的synchronized方法，那么其他线程不能访问该对象的其他synchronized方法。这个原因很简单，因为一个对象只有一把锁，当一个线程获取了该对象的锁之后，其他线程无法获取该对象的锁，所以无法访问该对象的其他synchronized方法。

　　2）当一个线程正在访问一个对象的synchronized方法，那么其他线程能访问该对象的非synchronized方法。这个原因很简单，访问非synchronized方法不需要获得该对象的锁，假如一个方法没用synchronized关键字修饰，说明它不会使用到临界资源，那么其他线程是可以访问这个方法的，

　　3）如果一个线程A需要访问对象object1的synchronized方法fun1，另外一个线程B需要访问对象object2的synchronized方法fun1，即使object1和object2是同一类型），也不会产生线程安全问题，因为他们访问的是不同的对象，所以不存在互斥问题。

#### **7、生产者消费者问题**

{% highlight java linenos %}
class BreadContainer {
    public static final int maxNum = 300;
    private int num;
 
    public BreadContainer() {
    }
 
    public BreadContainer(int num) {
        this.num = num;
    }
 
    public synchronized void produceBread(int pdcNum, String producer) {
        while(num + pdcNum > maxNum){
            System.out.println(producer + " 要生产 " + pdcNum +" 个，资源充足无需生产，转入等待。");
            try{
                this.wait();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
 
        num += pdcNum;
        System.out.println(producer + " 生产了 " + pdcNum + " 个，现有 " + num + " 个");
        this.notifyAll();
    }
 
    public synchronized void consumerBread(int csmNum, String consumer) {
        while (csmNum > num) {
            System.out.println(consumer + " 要消费 " + csmNum + " 个，资源不足无法消费，转入等待。");
            try {
                this.wait();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
 
        num -= csmNum;
        System.out.println(csmNum + " 消费了 " + csmNum + " 个，现有 " + num + " 个");
        this.notifyAll();
    }
     
}
 
class Producer extends Thread {
    private int pdcNum;
    private BreadContainer bc;
 
    public Producer() {
 
    }
 
    public Producer(int pdcNum, BreadContainer bc, String producer) {
        this.pdcNum = pdcNum;
        this.bc = bc;
        this.setName(producer);
    }
 
    public void run() {
        bc.produceBread(pdcNum, this.getName());
    }
}
 
class Consumer extends Thread {
    private int csmNum;
    private BreadContainer bc;
 
    public Consumer() {
 
    }
 
    public Consumer(int csmNum, BreadContainer bc, String consumer) {
        this.csmNum = csmNum;
        this.bc = bc;
        this.setName(consumer);
    }
 
    public void run() {
        bc.consumerBread(csmNum, this.getName());
    }
}
 
public class Test {
    public static void main(String[] args) {
        BreadContainer bc = new BreadContainer(50);
        Producer p1 = new Producer(50, bc, "p1");
        Producer p2 = new Producer(200, bc, "p2");
        Producer p3 = new Producer(290, bc, "p3");
        Consumer c1 = new Consumer(70, bc, "c1");
        Consumer c2 = new Consumer(80, bc, "c2");
 
        c1.start();
        c2.start();
        p1.start();
        p2.start();
        p3.start();
    }
}
{% endhighlight %}

　　输出结果为：

> c1 要消费 70 个，资源不足无法消费，转入等待。  
> p3 要生产 290 个，资源充足无需生产，转入等待。  
> p2 生产了 200 个，现有 250 个  
> p1 生产了 50 个，现有 300 个  
> 80 消费了 80 个，现有 220 个  
> p3 要生产 290 个，资源充足无需生产，转入等待。  
> 70 消费了 70 个，现有 150 个  
> p3 要生产 290 个，资源充足无需生产，转入等待。  

