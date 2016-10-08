---
layout: post
date: 2016-05-16 21:31:00
title:  "LeetCode 122. Best Time to Buy and Sell Stock II(MEDIUM)"
category: ACM-Free
tags:   [LeetCode, ACM, Medium]
---

* content
{:toc}

更多内容参考 [121. Best Time to Buy and Sell Stock]({{ 'acm-free/2016/05/16/LeetCode-121-BestTimeToBuyAndSellStock.html' | prepend: site.baseurl | prepend: site.url}})

### Discription:

Say you have an array for which the $$ i^{th} $$ element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times). However, you may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

### 题目描述：

假设给定一个数组，数组的第 i 个元素是第 i 天股票的价格。

设计一个算法使得盈利最大化。你可以随意进行交易（比如，可以多次购买和售出同一只股票）。但是，你不能在同一时间同时存在多次交易（比如你在购买股票之前将其售出）。

---

### 算法思想：

由于我们可以多次买卖，那么就采取这样的策略：股票价格上涨就不动，赚取上涨的差价。股票价格下降就立即售出，保证我们可以避免损失。也就是说，在理想情况下，我们可以赚取每次价格上涨带来的盈利而不蒙受任何损失。所以可得代码如下：

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    int maxProfit(vector<int> &prices)
    {
        int maxProf = 0;                                  // 最大盈利
        for (int i = 1; i < prices.size(); i++)
        {
            if (prices[i] > prices[i - 1])                // 如果价格上涨了，就可以赚取其差价
                maxProf += (prices[i] - prices[i - 1]);
        }
        return maxProf;
    }
};

{% endhighlight %}

