---
layout: post
date: 2016-05-15 19:13:00
title:  "LeetCode 263. Ugly Number(EASY)"
category: ACM-Free
tags:   [LeetCode, ACM, Easy]
---

* content
{:toc}

### Discription:

Write a program to check whether a given number is an ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. For example, 6, 8 are ugly while 14 is not ugly since it includes another prime factor 7.

Note that 1 is typically treated as an ugly number.

### 题目描述：

写一个程序来检查一个数是否为丑数。

**丑数**是一个正整数，它的左右因子只包含2、3、5。例如，6和8是丑数，但是14不是丑数（因为它包含了因子7）。

注意，1是一个特殊的丑数。

---

### 算法思想：

如果 n 不为 0 的话，就将它分别除以 2、3、5。

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    bool isUgly(int num)
    {
        for (int i=2; i<6 && num; i++)
            while (num % i == 0)
                num /= i;
        return num == 1;
    }
};

{% endhighlight %}

