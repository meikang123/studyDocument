渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排。
真实dom， 使用document.CreateElement 和 document.CreateTextNode创建的就是真实节点。
