---
layout: post
date: 2016-05-16 21:28:00
title:  "LeetCode 121. Best Time to Buy and Sell Stock(EASY)"
category: ACM-Free
tags:   [LeetCode, ACM, Easy]
---

* content
{:toc}

### Discription:

Say you have an array for which the $$ i^{th} $$ element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

### 题目描述：

假设给定一个数组，数组的第 i 个元素是第 i 天股票的价格。

如果只允许你进行一次交易（比如购买和出售一只股票），设计一个算法使盈利最大化。

---

### 算法思想：

既然只能进行一次交易，那么就应该在序列中找到两个数 $$ a $$ 和 $$ b $$，使得  $$ a $$ 位于 $$ b $$ 之前， $$ a < b $$ 且其差值最大。于是我们可以这样考虑，在遍历数组的时候存储一个已经遍历的最小值，然后用当前遍历的值对其求差，将差值记录下来，这个就是最后返回的最大化的盈利。

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    int maxProfit(vector<int>& prices)
    {
        if(prices.size() == 0) return 0;    // 数组为空的情况

        int min = prices[0], maxProf = 0;
        for(int i = 1; i != prices.size(); i++)
        {
            min = min < prices[i] ? min : prices[i];
            maxProf = (prices[i] - min) > maxProf ? (prices[i] - min) : maxProf;
        }
        return maxProf;
    }
};

{% endhighlight %}

