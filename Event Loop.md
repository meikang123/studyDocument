* 宏任务（Macrotask）：script（整体代码）、setTimeout、setInterval,XMLHttpRequest.prototype.onload、I/O、UI 渲染
* 微任务（Microtask）：Promise、MutationObserver
* 执行栈与任务队列

----
JavaScript 是单线程的。
而这种 主线程从 “任务队列” 中读取执行事件，不断循环重复的过程，就被称为 事件循环（Event Loop）。

```javascript
console.log('start');
setTimeout(() => {
  console.log('timeout');
});
Promise.resolve().then(() => {
  console.log('resolve');
});
console.log('end');
```
我们来分析一下:
1. 刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印start和end
2. setTimeout 作为一个宏任务放入宏任务队列
3. Promise.then作为一个为微任务放入到微任务队列
4. 当本次宏任务执行完，检查微任务队列，发现一个Promise.then, 执行
5. 接下来进入到下一个宏任务——setTimeout, 执行

** 在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。

#### 浏览器环境下 EventLoop 的执行流程
1. 一开始整段脚本作为第一个宏任务执行
2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3. 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
4. 执行浏览器 UI 线程的渲染工作
5. 检查是否有Web worker任务，有则执行
6. 执行队首新的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

nodejs 和 浏览器关于eventLoop的主要区别
-----
两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而nodejs中的微任务是在不同阶段之间执行的。