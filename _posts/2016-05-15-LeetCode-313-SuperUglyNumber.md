---
layout: post
date: 2016-05-15 19:35:00
title:  "LeetCode 313. Super Ugly Number(MEDIUM)"
category: ACM-Free
tags:   [LeetCode, ACM, Medium]
---

* content
{:toc}

更多内容参考 [263. Ugly Number]({{ 'acm-free/2016/05/15/LeetCode-263-UglyNumber.html' | prepend: site.baseurl | prepend: site.url}})

更多内容参考 [264. Ugly Number II]({{ 'acm-free/2016/05/15/LeetCode-264-UglyNumberII.html' | prepend: site.baseurl | prepend: site.url}})

### Discription:

Write a program to find the nth super ugly number.

Super ugly numbers are positive numbers whose all prime factors are in the given prime list primes of size k. For example, <a>\[1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32\]</a> is the sequence of the first 12 super ugly numbers given <a>primes = \[2, 7, 13, 19\]</a> of size 4.

Note:  
1. 1 is a super ugly number for any given primes.  
2. The given numbers in primes are in ascending order.  
3. $$ 0 < k ≤ 100, 0 < n ≤ 10^6, 0 < primes[i] < 1000 $$.

### 题目描述：

写一个程序来计算第n个超级丑数的值。

**超级丑数**是一个正整数，它的左右因子只包含给定的k个质数。例如：给定大小为4的质数序列：<a>primes = \[2, 7, 13, 19\]</a>，前12个超级丑数的序列为：<a>\[1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32\]</a>。

注意：  
1. 1是一个特殊的丑数。  
2. 给定的质数序列是递增序列。  
3. $$ 0 < k ≤ 100, 0 < n ≤ 10^6, 0 < primes[i] < 1000 $$.

---

### 算法思想：

1. 申请一个长度为 n 的数组 ugly，用于从小到大顺序存储 n 个超级丑数，数组中的首项为 1 ，即第一个超级丑数为 1  
2. 申请一个长度和 primes 相同的数组 index，用于存储下标，初始值均为 0  
3. 找出数组对于 index 内的每个下标 j，计算 ugly\[index\[j\]\]\*primes\[j\] 的最小值，最小值即为下一个超级丑数，同时更新最小值对应的下标，如果多个数字同时为最小值，则它们的下标都要更新  
4. 找到第 n 个超级丑数时，循环结束，返回最后一个超级丑数  

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    int nthSuperUglyNumber(int n, vector<int> &primes)
    {
        int len = primes.size();                         // 质数的个数
        vector<int> index(len, 0), ugly(n, INT_MAX);
        ugly[0] = 1;                                     // 第一个超级丑数为 1
        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < len; j++)                // 找到 ugly[index[j]]×primes[j] 的最小值
                ugly[i] = min(ugly[i], ugly[index[j]] * primes[j]);

            for (int j = 0; j < len; j++)                // 更新下标
                index[j] += (ugly[i] == ugly[index[j]] * primes[j]);
        }
        return ugly[n - 1];
    }

};

{% endhighlight %}

