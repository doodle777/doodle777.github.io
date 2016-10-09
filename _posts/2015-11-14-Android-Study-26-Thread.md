---
layout: post
date: 2015-11-14 19:17:00
title:  "Android开发手记(26) Java多线程的实现"
category: Android-Study
tags:   [Android, Thread, Runnable]
---

* content
{:toc}

　　随着多核CPU的发展，多线程编程显得越来越重要，本文将对Java中的多线程编程进行一些简单的探讨。

#### **1、继承Thread类**

　　Java中，线程运行的基本单位是Thread，所以，我们可以通过继承Thread类的方法来实现多线程编程。继承Thread类，必须重写run方法。

{% highlight java linenos %}
class MyThread extends Thread {
 
    private int num = 5;
 
    public void run() {
        for (int i = 0; i < 5; i++)
            if (num > 0)
                System.out.println(Thread.currentThread().getName() + " Ticket:" + num--);
    }
}
{% endhighlight %}

　　这样，我们在main方法里就可以通过实例化两个MyThread类的方法来实现多线程编程。

{% highlight java linenos %}
public class Test {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
 
        t1.start();
        t2.start();
    }
}
{% endhighlight %}

　　最后运行的结果如下：

> Thread-1 Ticket:5  
Thread-0 Ticket:5  
Thread-1 Ticket:4  
Thread-0 Ticket:4  
Thread-1 Ticket:3  
Thread-0 Ticket:3  
Thread-1 Ticket:2  
Thread-0 Ticket:2  
Thread-0 Ticket:1  
Thread-1 Ticket:1  

　　当然，由于线程运行不确定性，所以每次运行的结果可能不尽相同。

#### **2、Runnable方法**

　　Runnable实际上是一个接口，我们在多线程编程的时候需要实现这个接口定义的抽象方法。首先需要定义一个MyRunnable来实现Runnable的接口。这里我们只实现其中的构造方法和run方法。run()是MyRunnable运行的关键方法。

{% highlight java linenos %}
class MyThread implements Runnable {
 
    private int num = 5;
 
    public void run() {
        for (int i = 0; i < 5; i++)
            if (num > 0)
                System.out.println(Thread.currentThread().getName() + " Ticket:" + num--);
    }
}
{% endhighlight %}

　　然后，仅仅实现了Runnable的接口是无法运行的。因为线程运行单位是Thread，所以我们需要用Runnable实例化一个Thread来运行。实际上Thread也是实现了Runnable的接口。

{% highlight java linenos %}
public class Test {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
 
        Thread tt1 = new Thread(t1, "NO.1");
        Thread tt2 = new Thread(t2, "NO.2");
 
        tt1.start();
        tt2.start();
    }
}
{% endhighlight %}

　　具体的执行结果如下：

> NO.1 Ticket:5  
NO.1 Ticket:4  
NO.2 Ticket:5  
NO.1 Ticket:3  
NO.2 Ticket:4  
NO.1 Ticket:2  
NO.1 Ticket:1  
NO.2 Ticket:3  
NO.2 Ticket:2  
NO.2 Ticket:1  

#### **3、Runnable和Thread的区别与联系**

　　实现Runnable接口比继承Thread类所具有的优势：

　　1）：适合多个相同的程序代码的线程去处理同一个资源

　　2）：可以避免java中的单继承的限制

　　3）：增加程序的健壮性，代码可以被多个线程共享，代码和数据独立。

　　另外，使用Runnable可以实现对线程资源的共享，我们将2中的main方法修改如下，通过使用同一个Runnable实例化多个线程，可以实现对此Runnable资源的共享。

{% highlight java linenos %}
public class Test {
    public static void main(String[] args) {
        MyThread t = new MyThread();
 
        Thread tt1 = new Thread(t, "NO.1");
        Thread tt2 = new Thread(t, "NO.2");
 
        tt1.start();
        tt2.start();
    }
}
{% endhighlight %}

　　运行结果为：

> NO.1 Ticket:5  
NO.2 Ticket:4  
NO.1 Ticket:3  
NO.2 Ticket:2  
NO.1 Ticket:1  

#### **4、使用线程池实现多线程**

　　本小节转载自：[博客园](http://www.cnblogs.com/dolphin0520/p/3932921.html)

　　java.uitl.concurrent.ThreadPoolExecutor类是线程池中最核心的一个类，其构造方法为：

{% highlight java %}
public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize,long keepAliveTime,
                                           TimeUnit unit, BlockingQueue<Runnable> workQueue);
{% endhighlight %}

- corePoolSize：核心池的大小，这个参数跟后面讲述的线程池的实现原理有非常大的关系。在创建了线程池后，默认情况下，线程池中并没有任何线程，而是等待有任务到来才创建线程去执行任务，除非调用了prestartAllCoreThreads()或者prestartCoreThread()方法，从这2个方法的名字就可以看出，是预创建线程的意思，即在没有任务到来之前就创建corePoolSize个线程或者一个线程。默认情况下，在创建了线程池后，线程池中的线程数为0，当有任务来之后，就会创建一个线程去执行任务，当线程池中的线程数目达到corePoolSize后，就会把到达的任务放到缓存队列当中；  
- maximumPoolSize：线程池最大线程数，这个参数也是一个非常重要的参数，它表示在线程池中最多能创建多少个线程；  
- keepAliveTime：表示线程没有任务执行时最多保持多久时间会终止。默认情况下，只有当线程池中的线程数大于corePoolSize时，keepAliveTime才会起作用，直到线程池中的线程数不大于corePoolSize，即当线程池中的线程数大于corePoolSize时，如果一个线程空闲的时间达到keepAliveTime，则会终止，直到线程池中的线程数不超过corePoolSize。但是如果调用了allowCoreThreadTimeOut(boolean)方法，在线程池中的线程数不大于corePoolSize时，keepAliveTime参数也会起作用，直到线程池中的线程数为0；  
- unit：参数keepAliveTime的时间单位。  
- workQueue：一个阻塞队列，用来存储等待执行的任务，这个参数的选择也很重要，会对线程池的运行过程产生重大影响。  

　　具体实现为：

{% highlight java linenos %}
public class Test {
     public static void main(String[] args) {   
         ThreadPoolExecutor executor = new ThreadPoolExecutor(5, 10, 200, TimeUnit.MILLISECONDS, new ArrayBlockingQueue<Runnable>(5));
           
         for(int i=0;i<15;i++){
             MyTask myTask = new MyTask(i);
             executor.execute(myTask);
             System.out.println("线程池中线程数目："+executor.getPoolSize()+"，队列中等待执行的任务数目："+ executor.getQueue().size()+"，已执行玩别的任务数目：" + executor.getCompletedTaskCount());
         }
         executor.shutdown();
     }
}
   
class MyTask implements Runnable {
    private int taskNum;
      
    public MyTask(int num) {
        this.taskNum = num;
    }
      
    @Override
    public void run() {
        System.out.println("正在执行task "+taskNum);
        try {
            Thread.currentThread().sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("task "+taskNum+"执行完毕");
    }
}
{% endhighlight %}

　　执行结果：

> 正在执行task 0   
线程池中线程数目：1，队列中等待执行的任务数目：0，已执行玩别的任务数目：0  
线程池中线程数目：2，队列中等待执行的任务数目：0，已执行玩别的任务数目：0  
线程池中线程数目：3，队列中等待执行的任务数目：0，已执行玩别的任务数目：0  
正在执行task 1  
正在执行task 2  
线程池中线程数目：4，队列中等待执行的任务数目：0，已执行玩别的任务数目：0  
正在执行task 3  
线程池中线程数目：5，队列中等待执行的任务数目：0，已执行玩别的任务数目：0  
正在执行task 4  
线程池中线程数目：5，队列中等待执行的任务数目：1，已执行玩别的任务数目：0  
线程池中线程数目：5，队列中等待执行的任务数目：2，已执行玩别的任务数目：0  
线程池中线程数目：5，队列中等待执行的任务数目：3，已执行玩别的任务数目：0  
线程池中线程数目：5，队列中等待执行的任务数目：4，已执行玩别的任务数目：0  
线程池中线程数目：5，队列中等待执行的任务数目：5，已执行玩别的任务数目：0  
线程池中线程数目：6，队列中等待执行的任务数目：5，已执行玩别的任务数目：0  
正在执行task 10  
线程池中线程数目：7，队列中等待执行的任务数目：5，已执行玩别的任务数目：0  
正在执行task 11  
线程池中线程数目：8，队列中等待执行的任务数目：5，已执行玩别的任务数目：0  
正在执行task 12  
线程池中线程数目：9，队列中等待执行的任务数目：5，已执行玩别的任务数目：0  
正在执行task 13  
线程池中线程数目：10，队列中等待执行的任务数目：5，已执行玩别的任务数目：0  
正在执行task 14  
task 0执行完毕  
正在执行task 5  
task 1执行完毕  
task 2执行完毕  
正在执行task 6  
正在执行task 7  
task 4执行完毕  
task 3执行完毕  
正在执行task 8  
正在执行task 9  
task 12执行完毕  
task 11执行完毕  
task 13执行完毕  
task 10执行完毕  
task 14执行完毕  
task 5执行完毕  
task 6执行完毕  
task 7执行完毕  
task 8执行完毕  
task 9执行完毕  

　　不过在java doc中，并不提倡我们直接使用ThreadPoolExecutor，而是使用Executors类中提供的几个静态方法来创建线程池：

{% highlight java %}
Executors.newCachedThreadPool();        //创建一个缓冲池，缓冲池容量大小为Integer.MAX_VALUE
Executors.newSingleThreadExecutor();    //创建容量为1的缓冲池
Executors.newFixedThreadPool(int);      //创建固定容量大小的缓冲池
{% endhighlight %}

　　下面是这三个静态方法的具体实现：

{% highlight java linenos %}
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
{% endhighlight %}

　　从它们的具体实现来看，它们实际上也是调用了ThreadPoolExecutor，只不过参数都已配置好了。

- newFixedThreadPool创建的线程池corePoolSize和maximumPoolSize值是相等的，它使用的LinkedBlockingQueue；

- newSingleThreadExecutor将corePoolSize和maximumPoolSize都设置为1，也使用的LinkedBlockingQueue；

- newCachedThreadPool将corePoolSize设置为0，将maximumPoolSize设置为Integer.MAX_VALUE，使用的SynchronousQueue，也就是说来了任务就创建线程运行，当线程空闲超过60秒，就销毁线程。

　　实际中，如果Executors提供的三个静态方法能满足要求，就尽量使用它提供的三个方法，因为自己去手动配置ThreadPoolExecutor的参数有点麻烦，要根据实际任务的类型和数量来进行配置。另外，如果ThreadPoolExecutor达不到要求，可以自己继承ThreadPoolExecutor类进行重写。

