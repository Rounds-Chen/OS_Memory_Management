# 内存管理——请求分页分配




## 项目目的

1. 学习页面、页表、地址转换
2. 学习页面置换过程
3. 加深对请求调页系统的原理和实现过程的理解

## 开发环境

* 开发环境：**Node.js** *v14.16.0*
* 开发工具：**Visual Studio Code** *1.56.2*   **Google Chrome** *91.0.4472.77*
* 前端框架：**Vue** *2.6.11*



## 运行方式





## 项目需求

假设每个页面可存放10条指令，分配给一个作业的内存块为4。

模拟一个作业的执行过程，该作业有320条指令，即它的地址空间为32页，目前所有页还没有调入内存。

## 项目功能

* **指令执行**

  项目模拟了指令的执行过程。

  指令的访问次序按照如下原则：

  * 50%的指令顺序执行；
  * 25%的指令均匀分布在前地址部分；
  * 25%的指令均匀分布在后地址部分。

* **模拟内存页面置换**

  项目模拟了指令执行时页面置换过程。

  模拟过程中，若所访问的指令已存在于内存中，则显示其物理地址，并转到下一条指令；若未存在于内存中，则需要将其所在块页调入内存，若此时4个内存块已全部装入指令，则需进行页面置换。

  有两种可选的页面置换算法：

  * FIFO
  * LRU

* **多种执行方式**

  项目提供了`RUN ALL`(<u>连续执行</u>指令至结束)，`RUN ONE`(<u>单步执行</u>)两种执行方式。

* **信息展示**

  项目在页面*左侧*展示了<u>本项目模拟的作业的参数</u>，以及<u>项目执行的结果</u>；页面*右侧*展示了<u>当前内存中的页</u>，能够比较清晰的了解内存状况以及当前所正在执行的指令。

* **页面重置**

  项目提供`CLEAR`(页面重置)按钮，方便重新执行项目。

## 页面展示

### 初始页面

<img src="C:\Users\round\Documents\VueProjects\memorymanagement\display\初始页面 .png" alt="初始页面 " style="zoom:67%;" />



### 算法选择

<img src="C:\Users\round\Documents\VueProjects\memorymanagement\display\选择算法.png" alt="选择算法" style="zoom:67%;" />



### 警告

<img src="C:\Users\round\Documents\VueProjects\memorymanagement\display\警告.png" alt="警告" style="zoom:67%;" />

<img src="C:\Users\round\Documents\VueProjects\memorymanagement\display\警告2.png" alt="警告2" style="zoom:67%;" />



### 结果展示

<img src="C:\Users\round\Documents\VueProjects\memorymanagement\display\结果显示.png" alt="结果显示" style="zoom:67%;" />



### 结果对比

<img src="C:\Users\round\Documents\VueProjects\memorymanagement\display\结果对比.png" alt="结果对比" style="zoom:50%;" />



## 功能实现

### 置换算法

本项目实现了两个经典的页面置换算法，即`FIFO`和`LRU`算法。

> `FIFO`算法:先进先出算法是最简单的页面换算法，是指每次有新的分页致效率的降低。
>
> `LRU`算法：最近最少使用算法，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。

这两种算法选择置换页面依据均与“时间”相关，`FIFO`算法考虑的是页面已调入内存的时间，`LRU`算法考虑的是页面上一次使用的时间。

故本项目采用一个数组`times`记录4个内存块中的页*“调入”*或*“最近一次使用”*的时间。

对于每次需要访问的指令`m`：

* 若`m`已存在内存中，两种算法进行不同的操作：
  * `LRU`：获取当前`times`中的最大值`maxValue`，将指令`m`所在内存块`i`对应的`time`(即`times[i]`)更新为`maxValue+1`，表明指令`m`所在页面最近一次被使用；
  * `FIFO`：不进行额外的操作，因为对已存在内存中的页面的使用不涉及页面的调入。

  **核心代码：**

  ```javascript
  for (pi = 0; pi < 4; pi++) {
      // 当前指令已在内存块p中
      if (this.pages[pi] === m_page) {
          detail = "当前指令已在内存块中";
          //若是LRU算法，更新该指令所在内存块的使用times
          if (this.algo === "LRU") {
              this.times[pi] = Math.max(this.times) + 1;
          }
          break;
      }
  }
  ```

* 若`m`不存在内存中：

  * 若4个内存块当前有空闲，将`m`所在页调入空闲的内存块中；

  * 若4个内存块均已有页面，进行页面置换：

    对于`LRU`与`FIFO`算法，在本算法中置换原则相同，均是选取`times`数组中最小者对应的块`i`，将其中的页面置换出来；同时将该内存块i对应的`time`（即`times[i]`)更新为`maxValue+1`（`maxValue`为当前`times`中的最大值）

  **核心代码：**

  ```javascript
  // 置换算法
  Substitute(m_page) {
      let index = 0;
      let minValue = this.times[0];
      let maxValue = this.times[0];
      for (let i = 0; i < 4; i++) {
          maxValue = this.times[i] > maxValue ? this.times[i] : maxValue;
  
          if (this.times[i] < minValue) {
              minValue = this.times[i];
              index = i;
          }
      }
  
      this.times[index] = maxValue + 1;
      this.pages[index] = m_page;
  
      let detail =
          "将页面Page" + String(index + 1) + "的内容置换为" + String(m_page);
  
      return detail;
  },
  ```

  

### 指令选取

本项目中指令的访问次序按照如下原则进行模拟：

* 第`1`条指令<u>随机选取</u>；
* 第`2~320`条指令按照如下原则选取：
  * **50%**的指令<u>顺序执行</u>；
  * **25%**的指令<u>均匀分布在前地址部分</u>；
  * **25%**的指令<u>均匀分布在后地址部分</u>。

首先,<u>随机选取</u>`[0, 319]`范围内的一个值，作为<u>第一条</u>执行的指令的编号。

**核心代码：**

```javascript
 if (m === -1) {
     return Math.floor(Math.random() * 320);
 }
```

然后，设置一个数组`arr`，值为` [0, 0, 0, 0, 1, 1, 2, 2]`; 其中`0`表示<u>顺序执行</u>；`1`表示<u>向前随机选取</u>指令；`2`表示<u>向后随机选取</u>指令。<u>随机产生</u>一个`[0,7]`内的整数`c`，根据`arr[c]`对应的值，采取相应的策略进行下一条指令的选取。

**核心代码：**

```javascript
// 获得下一条指令
NextIns(m) {
    if (m === -1) {
        return Math.floor(Math.random() * 320);
    }

    let arr = [0, 0, 0, 0, 1, 1, 2, 2];
    let c = Math.floor(Math.random() * arr.length);

    switch (arr[c]) {
            // 顺序产生
        case 0:
            return m != 319 ? m + 1 : m;

            // 随机产生[0,m-1]之一
        case 1:
            return m != 0 ? Math.floor(Math.random() * m) : m;

            // 随机产生[m+1,319]之一
        case 2:
            return m != 319 ? Math.floor(Math.random() * (319 - m) + m + 1) : m;
    }
},
```



### 其他

本项目主要实现了下列方法：

| 方法                 | 说明                                        |
| -------------------- | ------------------------------------------- |
| `runOne()`           | 单步执行                                    |
| `run()`              | 连续执行至结束                              |
| `clear()`            | 重置页面                                    |
| `Substitute(m_page)` | 页面置换，m_page表示待调入的页编号          |
| `NextIns(m)`         | 选择下一条执行指令，m表示当前执行的指令编号 |
| `solve()`            | 执行一条指令                                |



## 项目总结

* 实现了两种经典置换算法和指令执行次序的模拟
* 界面美观，能够比较好的展示内存模拟过程
* 用户友好，提示用户进行相应操作

## 改进方向

* 本项目仅实现了FIFO和LRU两种算法，在未来可以考虑其他置换算法的实现；

* 本项目中界面仅针对于网页端，尚未对手机浏览器做出相应适配。