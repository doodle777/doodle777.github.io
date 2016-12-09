---
layout: post
date: 2016-05-31 21:56:00
title:  "LeetCode 72. Edit Distance(HARD)"
category: ACM-Free
tags:   [LeetCode, ACM]
---

* content
{:toc}

此题为求最短编辑距离，类似的题目有很多：

[LeetCode Edit-Distance](https://leetcode.com/problems/edit-distance/)

[NowCoder 计算字符串的相似度](http://www.nowcoder.com/practice/f549ee08ddd84b8485a4fa9aefaf4a38?tpId=37&tqId=21302&rp=&ru=/ta/huawei&qru=/ta/huawei/question-ranking)

[NowCoder 计算字符串的距离](http://www.nowcoder.com/practice/3959837097c7413a961a135d7104c314?tpId=37&tqId=21275&rp=&ru=/ta/huawei&qru=/ta/huawei/question-ranking)


### Discription:

Given two words word1 and word2, find the minimum number of steps required to convert word1 to word2. (each operation is counted as 1 step.)

You have the following 3 operations permitted on a word:

- Insert a character
- Delete a character
- Replace a character

### 题目描述：

给定两个单词 word1 和 word2，计算从 word1 转化到 word2 所需的最短编辑距离，每次操作就算作一次编辑距离。

允许的操作有3种：

- 插入一个字符
- 删除一个字符
- 替换一个字符

---

### 算法思想：

#### 思路一：

考虑到两个游标 $$ i $$ 指向 $$ word1 $$ 中的位置， $$ j $$ 指向 $$ word2 $$ 中的位置。当 $$ i $$ 和 $$ j $$ 分别指向字符串末尾时，计算出的 $$ count $$ 值便为最终的最短编辑距离。于是可以考虑动态规划来解决此问题。$$ dp[i][j] $$ 表示 $$ word1(0,i) $$ 和 $$ word2(0,j) $$ 这两个字串的最短编辑距离。

**最优子结构**：由于字符串的特殊性，$$ dp[i][j] $$ 的状态只取决于 $$ dp[i-1][j-1], dp[i-1][j], dp[i][j-1] $$ 这三者的状态转移。这三者状态转移后的最优状态必是问题的解，可见问题具有最优子结构性质。

**子问题重叠**：在计算 $$ dp[i+1][j+1], dp[i+1][j], dp[i][j+1] $$ 都要用到 $$ dp[i][j] $$ 的状态转移，可见问题具有自问题重叠性质。

**边界情况**：当 $$ i = 0 $$ 时，最短编辑距离显然为 $$ j $$ ，$$ j = 0 $$ 时，最短编辑距离为 $$ i $$。 

经过上述分析，可以得到状态转移方程：

$$
\begin{equation}
    dp[i][j] =
   \begin{cases}
   i & ,j = 0 \\
   j & ,i = 0 \\
   dp[i-1][j-1] & ,word1[i]==word2[j] \\
   min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]) & ,word1[i]!=word2[j] \\
   \end{cases}
  \end{equation}
$$

---

### 代码（C++）：

{% highlight cpp linenos %}

/* 思路一 && 头文件省略 */

class Solution
{
public:
    int minDistance(string word1, string word2)
    {
        int m = (int)word1.length(), n = (int)word2.length();
        if(m == 0 || n == 0) return m + n;

        vector<vector<int>> dp(m, vector<int>(n, 0));
        for(int i = 0; i < m; i++)
            for(int j = 0; j < n; j++)
                if(word1[i] == word2[j]) dp[i][j] = i&&j ? dp[i-1][j-1] : i + j;
                else dp[i][j] = min(i&&j ? dp[i-1][j-1] : i+j, min(i ? dp[i-1][j] : j, j ? dp[i][j-1] : i)) + 1;

        return dp[m-1][n-1];
    }
};

int main()
{
    string word1, word2;
    Solution solution;
    while(cin >> word1 >> word2)
    {
        cout << solution.minDistance(word1, word2) << endl;
    }
    return 0;
}


{% endhighlight %}

