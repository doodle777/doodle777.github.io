---
layout: post
date: 2016-04-24 16:18:00
title:  "LaTeX 中插入数学公式"
category: Other
tags:   [LaTeX, Math, Equation]
---

* content
{:toc}

#### **一、常用的数学符号**

##### 1、小写希腊字母

|  小写希腊字母   |LaTeX表达式|  小写希腊字母  |LaTeX表达式|
|:--------------:|----------|:--------------:|----------|
| $$ \alpha   $$ | \alpha   | $$ \nu      $$ | \nu      |
| $$ \beta    $$ | \beta    | $$ \xi      $$ | \xi      |
| $$ \gamma   $$ | \gamma   | $$ o        $$ | o        |
| $$ \delta   $$ | \delta   | $$ \pi      $$ | \pi      |
| $$ \epsilon $$ | \epsilon | $$ \rho     $$ | \rho     |
| $$ \zeta    $$ | \zeta    | $$ \sigma   $$ | \sigma   |
| $$ \eta     $$ | \eta     | $$ \tau     $$ | \tau     |
| $$ \theta   $$ | \theta   | $$ \upsilon $$ | \upsilon |
| $$ \iota    $$ | \iota    | $$ \phi     $$ | \phi     |
| $$ \kappa   $$ | \kappa   | $$ \chi     $$ | \chi     |
| $$ \lambda  $$ | \lambda  | $$ \psi     $$ | \psi     |
| $$ \mu      $$ | \mu      | $$ \omega   $$ | \omega   |

##### 2、大写希腊字母

|  大写希腊字母   |LaTeX表达式|  大写希腊字母  |LaTeX表达式|
|:--------------:|----------|:--------------:|----------|
| $$ \Gamma   $$ | \Gamma   | $$ \Lambda  $$ | \Lambda  |
| $$ \Sigma   $$ | \Sigma   | $$ \Psi     $$ | \Psi     |
| $$ \Delta   $$ | \Delta   | $$ \Upsilon $$ | \Upsilon |
| $$ \Omega   $$ | \Omega   | $$ \Theta   $$ | \Theta   |
| $$ \Xi      $$ | \Xi      | $$ \Pi      $$ | \Pi      |
| $$ \Phi     $$ | \Phi     |  |  |

#### 3、运算符

　　对于加减除，对应键盘上便可打出来，但是对于乘法，键盘上没有这个符号，所以我们应该输入 \times 来显示一个 $$ \times $$ 号。

　　普通字符在数学公式中含义一样，除了 # $ % & ~ _ ^ \ { }  若要在数学环境中表示这些符号# $ % & _ { }，需要分别表示为\# \$ \% \& \_ \{ \}，即在个字符前加上\。

#### **二、简单格式**

#### 1、上下标

　　上标：$ f(x) = x^2 $ 或者 $ f(x) = {x}^{2} $ 均可表示 $$ f(x)=x^2 $$。

　　下标：$ f(x) = x_2 $ 或者 $ f(x) = {x}_{2} $ 均可表示 $$ f(x)=x_2 $$。

　　上下标可以级联：$ f(x) = x_1^2 + {x}_{2}^{2} $ -> $$ f(x)=x_1^2+{x}_{2}^{2} $$。

#### 2、加粗和倾斜

　　加粗：$ f(x) = \textbf{x}^2 $  -> $$ f(x)=\textbf{x}^2 $$。

　　文本：$ f(x) = x^2 \mbox{abcd} $ -> $$ f(x)=x^2\mbox{abcd}$$。

　　倾斜：$ f(x) = x^2 \mbox{\emph{abcd} defg} $ -> $$ f(x)=x^2\mbox{\emph{abcd}defg} $$。

#### 3、分数

```
$ f(x,y) = \frac{x^2}{y^3} $
```

$$ f(x,y)=\frac{x^2}{y^3} $$

#### 4、开根号

```
$ f(x,y) = \sqrt[n]{x^2 y^3} $
```

$$ f(x,y)=\sqrt[n]{x^2y^3} $$

#### 5、省略号

```
$ f(x_1, x_2, \ldots, x_n) = x_1 + x_2 + \cdots + x_n $
```

$$ f(x_1,x_2,\ldots,x_n)=x_1+x_2+\cdots+x_n $$

#### 6、括号和分隔符

　　公式高度比较低的话直接从键盘输入括号即可，但是对于公式高度比较高的情形，需要特殊的运算。

```
$ {f}'(x) = (\frac{df}{dx}) $
```

$$ {f}'(x)=(\frac{df}{dx}) $$

```
$ {f}'(x) = \left( \frac{df}{dx} \right) $
```

$$ {f}'(x)=\left(\frac{df}{dx}\right) $$

　　可以看出，通过将 \left( 和 \right) 结合使用，可以将括号大小随着其内容变化。[ ] 和 { } 同理。

```
$ {f}'(0)=\left.\frac{df}{dx}\right|_{x=0} $
```

$$ {f}'(0)=\left.\frac{df}{dx}\right|_{x=0} $$

#### **三、矩阵和行列式**

```
$ A=\left[ \begin{matrix}  
  a & b  \\  
  c & d  \\  
\end{matrix} \right] $  
```

$$ A=\left[\begin{matrix}
a&b\\
c&d\\
\end{matrix}\right] $$

```
$ \chi (\lambda)=\left\| \\begin{matrix}  
  \lambda - a & -b  \\  
  -c & \lambda - d  \\  
\end{matrix} \right| $  
```

$$ \chi(\lambda)=\left|\begin{matrix}
\lambda-a&-b\\
-c&\lambda-d\\
\end{matrix}\right| $$

#### **四、求和与连乘**

```
$ \sum_{k=1}^n k^2 = \frac{1}{2} n (n+1) $
```

$$ \sum_{k=1}^nk^2=\frac{1}{2}n(n+1) $$

```
$ \prod_{k=1}^n k = n! $
```

$$ \prod_{k=1}^nk=n! $$

#### **五、导数、极限、积分**

#### 1、导数

　　导数的表示用一对花括号将被导函数括起来，然后加上一个英文的引号即可。

```
$ {f}'(x) = x^2 + x $
```

$$ {f}'(x)=x^2+x $$

##### 2、极限

```
$ \lim_{x \to 0} \frac{3x^2 +7x^3}{x^2 +5x^4} = 3 $
```

$$ \lim_{x\to0}\frac{3x^2+7x^3}{x^2+5x^4}=3 $$

#### 3、积分

　　积分中，需要注意的是，在多重积分内 dx 和 dy 之间 使用一个斜杠加一个逗号 \, 来增大稍许间距。同样，在两个积分号之间使用一个斜杠加一个感叹号 \! 来减小稍许间距。使之更美观。

```
$ \int_a^b f(x)\,dx $
```

$$ \int_a^bf(x)\,dx $$

```
$ \int_0^{+\infty} x^n e^{-x} \,dx = n! $
```

$$ \int_0^{+\infty}x^ne^{-x}\,dx=n! $$

```
$ \int_{x^2 + y^2 \leq R^2} f(x,y)\,dx\,dy = \int_{\theta=0}^{2\pi} \int_{r=0}^R f(r\cos\theta,r\sin\theta) r\,dr\,d\theta $
```

$$ \int_{x^2 + y^2 \leq R^2} f(x,y)\,dx\,dy = \int_{\theta=0}^{2\pi} \int_{r=0}^R f(r\cos\theta,r\sin\theta) r\,dr\,d\theta $$

```
$ \int \!\!\! \int_D f(x,y)\,dx\,dy  
\int \int_D f(x,y)\,dx\,dy $
```

$$ \int \!\!\! \int_D f(x,y)\,dx\,dy
\int \int_D f(x,y)\,dx\,dy $$

　　在加入了 \! 之后，距离的改变还是很明显的。

```
$ i\hbar\frac{\partial \psi}{\partial {t}} = \frac{-\hbar^2}{2m} \left( \frac{\partial^2}{\partial x^2} + 
\frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} \right) \psi + V \psi $
```

$$ i\hbar\frac{\partial \psi}{\partial {t}} = \frac{-\hbar^2}{2m} \left( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} \right) \psi + V \psi $$

```
$ \frac{d}{dt} \int \!\!\! \int \!\!\! \int_{\textbf{R}^3} \left| \psi(\mathbf{r},t) \right|^2\,dx\,dy\,dz = 0 $
```

$$ \frac{d}{dt}\int\!\!\!\int\!\!\!\int_{\textbf{R}^3}\left|\psi(\mathbf{r},t)\right|^2\,dx\,dy\,dz=0 $$
