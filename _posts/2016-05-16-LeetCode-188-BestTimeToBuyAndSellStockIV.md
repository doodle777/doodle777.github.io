---
layout: post
date: 2016-05-16 21:33:00
title:  "LeetCode 188. Best Time to Buy and Sell Stock IV(HARD)"
category: ACM-Free
tags:   [LeetCode, ACM]
---

更多内容参考 [121. Best Time to Buy and Sell Stock]({{ 'acm-free/2016/05/16/LeetCode-121-BestTimeToBuyAndSellStock.html' | prepend: site.baseurl | prepend: site.url}})

更多内容参考 [122. Best Time to Buy and Sell Stock II]({{ 'acm-free/2016/05/16/LeetCode-122-BestTimeToBuyAndSellStockII.html' | prepend: site.baseurl | prepend: site.url}})

更多内容参考 [123. Best Time to Buy and Sell Stock III]({{ 'acm-free/2016/05/16/LeetCode-123-BestTimeToBuyAndSellStockIII.html' | prepend: site.baseurl | prepend: site.url}})

### Discription:

Say you have an array for which the $$ i^{th} $$ element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most k transactions.

**Note:**  
You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

### 题目描述：

假设给定一个数组，数组的第 i 个元素是第 i 天股票的价格。

设计一个算法使得盈利最大化。你最多可以进行 **k** 次交易。

**注意：**  
你不能在同一时间同时存在多次交易（比如你在购买股票之前将其售出）。

---

### 算法思想（思路一）：

参考[123. Best Time to Buy and Sell Stock III]({{ 'acm-free/2016/05/16/LeetCode-123-BestTimeToBuyAndSellStockIII.html' | prepend: site.baseurl | prepend: site.url}})的解题过程，可以得到类似的解法：

1. 首先假设我们初始金币为 0。  
2. $$ buy[j] $$ 意味着我们需要从别人那借钱来买股票。我们需要保证利润最大化，所以应当尽可能少的去借钱。  
3. $$ sell[j] $$ 意味着我们想要出售股票，在出售之后，我们的获得了当天股票的价格 $$ price[j] $$ ，之后还回一开始借来的钱，所以最后总的利润是  $$ price[j] - \| buy[j] \| = prices[j] + buy[j] $$。我们的目的是保证利润最大化。  
4. $$ buy[j] $$ 更新过程中，如果要买另外一只股票，这时我们已经拥有了 $$ sell[j-1] $$ 的钱，所以在购买 $$ buy[j] $$ 之后，我们还剩有 $$ buy[j] = sell[j-1] - price[i] $$。需要尽可能多的省钱，所以需要保证 $$ buy[j] $$ 最大化。  
5. $$ sell[j] $$ 意味着我们想要出售股票 $$ j $$ ，在出售之后，我们的获得了当天股票的价格 $$ price[j] $$ ，由于之前已经有了 $$ buy[j] $$ 那么多余钱，所以 $$ sell[j] = buy[j] + prices[j] $$ 是最终的利润。保证 $$ sell[j] $$ 最大化。  
6. 最后，更新 $$ k $$ 轮之后，$$ sell[k] $$即为得到的最终利润，作为返回结果即可。  
7. **注意：有可能 $$ k $$ 的值很大，当 $$ k $$ 的值大于天数的一半时，意味着我们可以在每个上涨周期内都交易股票，此时最大利润即为每个上涨利润之和。**

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    int maxProfit(int k, vector<int> &prices)
    {
        if (k == 0) return 0;

        if (k >= prices.size() / 2)                    // 如果买卖次数大于天数一半
        {                                              // 可以获得每个上涨周期的利润
            int sum = 0;
            for (int i = 1; i < prices.size(); i++)
            {
                if (prices[i] > prices[i - 1])         // 如果价格上涨
                {
                    sum += prices[i] - prices[i - 1];  // 利润加入总利润
                }
            }
            return sum;
        }

        vector<int> buy(k+1, INT_MIN), sell(k+1, 0);

        for (int i = 0; i != prices.size(); i++)
        {
            for (int j = 1; j <= k; j++)               // k 轮循环得到最大利润
            {
                buy[j] = max(buy[j], sell[j - 1] - prices[i]);   // j 轮借的钱和上一轮剩下的钱
                sell[j] = max(sell[j], prices[i] + buy[j]);      // j 轮的总利润
            }
        }
        return sell[k];
    }
};
{% endhighlight %}

---

### 算法思想（思路二）：

思路一主要考虑递推公式的方法，这是一种间接的动态规划。现在如果直接考虑动态规划的方法来做。

1. 假设 $$ dp[i, j] $$ 表示遍历到 $$ prices[j] $$ 时候，进行 $$ i $$ 次交易的最大利润。  
2. $$ dp[0, j] = 0 $$ 表示进行 0 次交易，利润为 0。  
3. $$ dp[i, 0] = 0 $$ 表示只有 1 个价格数据，无法交易，所以利润为 0。  
4. 交易的最大利润和前面若干天交易均有关。(1)前一天交易的最大利润，(2)前一轮交易中，第jj天的交易利润去掉那天的股票价格然后加上当前天的价格，即为前一轮交易中到当前天的最大利润。取这两者的最大值即为本轮交易中当前天的最大利润。  

   $$ \begin{align}
      dp[i, j] &= max(dp[i, j-1], prices[j] - prices[jj] + dp[i-1, jj]), 0 ≤ jj ≤ j -1 \\
               &= max(dp[i, j-1], prices[j] + \max_{ 0 ≤ jj ≤ j -1 } \left(dp[i-1, jj] - prices[jj]\right))
      \end{align}
   $$  


### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    int maxProfit(int k, vector<int> &prices)
    {
        if (k == 0) return 0;                            // 当交易次数为0时，直接返回0

        int n = prices.size();
        if (k >= n / 2)                                  // 交易次数大于总数据一半时，可以交易每个涨区间
        {
            int sum = 0;
            for (int i = 1; i < n; i++)
            {
                if (prices[i] > prices[i - 1])
                {
                    sum += prices[i] - prices[i - 1];    // 累加每个涨区间
                }
            }
            return sum;
        }

        vector<vector<int>> dp(k + 1, vector<int>(n, 0));
        for (int i = 1; i <= k; i++)
        {
            int localMax = dp[i - 1][0] - prices[0];                 // 单次交易的最大利润
            for (int j = 1; j < n; j++)                              
            {
                dp[i][j] = max(dp[i][j - 1], prices[j] + localMax);
                localMax = max(localMax, dp[i - 1][j] - prices[j]);
            }
        }
        return dp[k][n - 1];
    }
};

{% endhighlight %}
