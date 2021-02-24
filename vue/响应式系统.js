/*
* 响应式系统
* v2.0主要三个概念：Object.defineProperty、依赖收集、依赖更新
* 在init函数中执行initState处理部分选项数据，initData用于处理data
* initData遍历data，definedReactive处理每个属性
* definedReactive给对象的属性通过defineProperty设置响应式（函数内用Dep来创建集中收集所有依赖我的）
*
* 然后在页面渲染读取数据的时候用watcher来采集（通过Dep.target不断变化）
*
* watcher
* */


/*
* Dep.target = 具体watcher
* 简单想，指向哪个watcher，那么就是那个 watcher 正在使用数据，数据就要收集这个watcher
*
* dep.addSub
*
*
*
* */
