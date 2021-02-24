/*
* computed原理---流程处理
* 页面更新->
* 页面获取computed(computed getter执行)->
* computed开始计算(Dep.target 设置为computed watcher)->
* computed计算读取data(data 收集到computed watcher)->
* computed计算完毕(Dep.target 恢复上一个页面watcher)->
* 手动让data收集一遍Dep.target(data 又收集到了页面的watcher)
* 综上，此时 data 的依赖收集器=【computed-watcher，页面watcher】、data 改变，正序遍历通知，computed 先更新，页面再更新，所以，页面才能读取到最新的 computed 值
*
*
*
*
*
*
* */
