---
layout: post
date: 2016-05-16 21:34:00
title:  "LeetCode 309. Best Time to Buy and Sell Stock V(EASY)"
category: ACM-Free
tags:   [LeetCode, ACM]
---

### Discription:

Given a string which contains only lowercase letters, remove duplicate letters so that every letter appear once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

#### Example:
  
> **Given** "bcabc"  
> **Return** "abc"  
> 
> **Given** "cbacdcbc"  
> **Return** "acdb"  

### 题目描述：

给定一个只包含小写字母的字符串，移除所有的重复字母，使得字符串中的所有字母出现且仅出现一次。你必须确保你得到的解，是所有满足条件结果中处于字典序最小的那个。

> **输入** "bcabc"  
> **输出** "abc"  
> 
> **输入** "cbacdcbc"  
> **输出** "acdb"  

---

### 算法思想：

1. 首先，仅出现一次的字符是必选的。称其为**独立字符**。  
2. 如果一个字符出现多次，在独立字符前后都有出现，那么，选择后面的丢掉前面的（为了字典序更小）。  
3. 由于独立字符必选，且字典序最小。所以，以独立字符为界将字符串分段的话，应尽量使前面的段更小，满足贪心的性质。  
4. 在每一小段内，段最后是仅出现一次的独立字符，其余均为出现多次的字符。应当保证最后选取的字符均小于独立字符，且选取的字符单调递增。如果不这样的话，将破坏单调性的字符放到后面段内选择，字典序会更优。  
5. 如果段内存在相同的字符，则根据其后面是否出现比其小的字符，如果有选后面的，如果没有选择前面的。比如“abacf”选择前面的“a”(“abcf”)，“ebecf”选择后面的“e”(“becf”)。  

于是可得算法如下（栈来存储当前选择的字符）：

首先进行一次遍历计数，统计每个字符出现的次数。然后，从头开始遍历字符串。如果当前字符未被选择，当前的字符串为首字符或者大于最后选择的字符（**栈顶字符**），那么就将其放到栈中，并其计数-1，标记已经选择。否则，如果当前字符小于或等于最后选择字符，就将大于当前字符的非独立字符都出栈（当等于的时候，如果当前字符未被选择，说明存在小于其的字符，但也可能存在大于其的字符，所以按照普通情况对待）。对于栈中的字符，出栈的时候遇到独立字符，那么意味着遇到了分界，否则栈非空的时候一直出栈。然后，将当前字符入栈，更新信息。如果当前字符已经被选择，意味着可以直接跳过。

<div style="text-align: center">
<img src="{{ site.url }}/images/201605/2016051501.png" width="100%" height="100%"/> 
<p>算法复杂度 O(n)，LeetCode 4ms</p>
</div>

---

### 代码（C++）：

{% highlight cpp linenos %}
class Solution
{
public:
    string removeDuplicateLetters(string s)
    {
        if(s.length() == 0 || s.length() == 1) return s;    // 如果串长度为0或者1，直接返回此串

        int count[26] = {0}, len = s.length();              // 计数数组
        bool isSelect[26] = {false};                        // 某个字符是否被选择
        for(int i = 0; i < len; i++) count[s[i] - 'a']++;   // 初始化计数数组

        stack<char> stack;                                  // 用来存储选择的字符
        stack.push(s[0]);                                   // 处理首个字符
        count[s[0] - 'a']--;
        isSelect[s[0] - 'a'] = true;
        for(int curr = 1; curr < len; curr++)               // 对除了首字符的所有字符进行处理
        {                                                   // curr 代表当前字符位置
            if(!isSelect[s[curr] - 'a'])                    // 如果当前字符未被选择
            {
                if(s[curr] > stack.top())                   // 如果当前字符大于最后选择的字符
                {                                           // 那么就将其放到栈中，并其计数-1，标记已经选择
                    stack.push(s[curr]);
                    count[s[curr] - 'a']--;
                    isSelect[s[curr] - 'a'] = true;
                }
                else                                        // 如果当前字符小于或等于最后选择的字符
                {
                    while(!stack.empty() && stack.top() > s[curr] && count[stack.top() - 'a'] >= 1)
                    {
                        isSelect[stack.top() - 'a'] = false;// 将此字符标记为未选择后出栈
                        stack.pop();
                    }
                    stack.push(s[curr]);                    // 当前字符未被选择，入栈
                    count[s[curr] - 'a']--;                 // 此时栈中以独立字符为界，后面的所有字符到新入栈的当前字符
                    isSelect[s[curr] - 'a'] = true;         // 应当保持单调递增顺序
                }
            }
            else count[s[curr] - 'a']--;                    // 当前字符已经被选择的话，无条件计数-1，跳过。
        }

        string str;                                         // 将栈中的字符按照出栈顺序倒序插入string中，作为返回串
        while(!stack.empty())
        {
            str.insert(str.begin(), stack.top());
            stack.pop();
        }
        return str;
    }
};

{% endhighlight %}

