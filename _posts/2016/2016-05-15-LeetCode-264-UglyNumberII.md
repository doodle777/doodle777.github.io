---
layout: post
date: 2016-05-15 19:20:00
title:  "LeetCode 264. Ugly Number II(MEDIUM)"
category: ACM-Free
tags:   [LeetCode, ACM, Medium]
---

* content
{:toc}

更多内容参考 [263. Ugly Number]({{ 'acm-free/2016/05/15/LeetCode-263-UglyNumber.html' | prepend: site.baseurl | prepend: site.url}})

### Discription:

Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. For example, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.

Note that 1 is typically treated as an ugly number.

### 题目描述：

写一个程序来计算第n个丑数的值。

**丑数**是一个正整数，它的左右因子只包含2、3、5。例如：1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前10个丑数的序列 。

注意，1是一个特殊的丑数。

---

### 算法思想：

1. 申请一个长度为n的数组uglyNumbers，用于从小到大顺序存储n个丑数，数组中的首项为1，即第一个丑数为1  
2. 设置三个变量idx2、idx3、idx5存储下标，初始值都为0  
3. 找出数组uglyNumbers[idx2]*2、uglyNumbers[idx3]*3、uglyNumbers[idx5]*5的最小值，最小值即为下一个丑数，同时更新最小值对应的下标，如果多个数字同时为最小值，则它们的下标都要更新
4. 找到第n个丑数时，循环结束

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution {
public:
    int nthUglyNumber(int n) 
    {
        if(n <= 0) return 0; 
        if(n == 1) return 1; 
        int t2 = 0, t3 = 0, t5 = 0;
        vector<int> k(n);
        k[0] = 1;
        for(int i  = 1; i < n ; i ++)
        {
            k[i] = min(k[t2]*2,min(k[t3]*3,k[t5]*5));
            if(k[i] == k[t2]*2) t2++; 
            if(k[i] == k[t3]*3) t3++;
            if(k[i] == k[t5]*5) t5++;
        }
        return k[n-1];
    }
};

{% endhighlight %}

