#### history 接口允许操作浏览器标签页访问的会话历史记录
1. 属性
    - history.length 返回当前历史记录的数目。
    - history.state 返回历史堆栈顶部的状态值。
2. 方法
    - history.back() 返回上一页等价于history.go(-1)。
    - history.forward() 前往下一页等价于history.go(1)。
    - history.go(N) 通过当前记录前进或后退N页，如果不存在则没任何效果。
    - history.pushState() 添加历史记录。
    - history.replaceState() 替换当前历史记录、替换的不会存在历史记录中。