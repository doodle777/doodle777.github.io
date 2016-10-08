---
layout: post
date: 2016-05-16 21:33:00
title:  "LeetCode 123. Best Time to Buy and Sell Stock III(HARD)"
category: ACM-Free
tags:   [LeetCode, ACM]
---

* content
{:toc}

更多内容参考 [121. Best Time to Buy and Sell Stock]({{ 'acm-free/2016/05/16/LeetCode-121-BestTimeToBuyAndSellStock.html' | prepend: site.baseurl | prepend: site.url}})

更多内容参考 [122. Best Time to Buy and Sell Stock II]({{ 'acm-free/2016/05/16/LeetCode-122-BestTimeToBuyAndSellStockII.html' | prepend: site.baseurl | prepend: site.url}})

### Discription:

Say you have an array for which the $$ i^{th} $$ element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

**Note:**  
You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

### 题目描述：

假设给定一个数组，数组的第 i 个元素是第 i 天股票的价格。

设计一个算法使得盈利最大化。你最多可以进行两次交易。

**注意：**  
你不能在同一时间同时存在多次交易（比如你在购买股票之前将其售出）。

---

### 算法思想：

首先假设我们初始金币为 0。

所以 $$ buy1 $$ 意味着我们需要从别人那借钱来买股票。我们需要保证利润最大化，所以应当尽可能少的去借钱。

$$ sell1 $$ 意味着我们想要出售股票，在出售之后，我们的获得了当天股票的价格 $$ price[i] $$，之后还回一开始借来的钱，所以最后总的利润是 $$ price[i] - \|buy1\| = prices[i] + buy1 $$ 。我们的目的是保证利润最大化。

$$ buys2 $$ 意味着我们要买另外一只股票，这时我们已经拥有了 $$ sell1 $$ 的钱，所以在购买 $$ buy2 $$ 之后，我们还剩有 $$ buy2 = sell1 - price[i] $$ 。需要尽可能多的省钱，所以需要保证 $$ buy2 $$ 最大化。

$$ sell2 $$ 意味着我们想要出售股票2，在出售之后，我们的获得了当天股票的价格 $$ price[i] $$ ，由于之前已经有了 $$ buy2 $$ 那么多余钱，所以 $$ sell2 = buy2 + prices[i] $$ 是最终的利润。保证 $$ sell2 $$ 最大化，然后作为返回结果即可。

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    int maxProfit(vector<int> &prices)
    {
        int buy1 = INT_MIN, sell1 = 0, buy2 = INT_MIN, sell2 = 0;
        for(int i = 0; i != prices.size(); i++)
        {
            buy1  = max(buy1 , -prices[i]);           // buy1 尽可能少借钱买股票
            sell1 = max(sell1, (prices[i] + buy1));   // 尽可能多的获取股票1得到的利润
            buy2  = max(buy2 , (sell1 - prices[i]));  // 拥有 buy1 的余钱，然后尽可能花少的钱买 buy2
            sell2 = max(sell2, (prices[i] + buy2));   // 保证 sell2 利润最大化
        }
        return sell2;
    }
};

{% endhighlight %}

