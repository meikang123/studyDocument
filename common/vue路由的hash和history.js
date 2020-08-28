/****
 * hash——即地址栏 URL 中的 # 符号（此 hash 不是密码学里的散列运算）。
 * 比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。
 * 它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
 */
const hashURL = 'http://www.abc.com/#/hello';

window.onhashchange = function(event) { //监听浏览器地址变化做出改变
    console.log(event.oldURL, event.newURL);
}

// push
window.location.assign(hashURL); // 加载并显示指定的URL内容

// replace
window.location.replace(hashURL); // 当前替换的页面不会加入到历史回话，点击后退不会返回到改页面

// go
window.history.go() // 前进后退页面历史

// back
window.hostory.go(-1) // 后退历史

// forward
window.history.go(1) // 前进历史

/**
 * 实现原理
 * <a href="#/home">首页</a>
 * <a href="#/about">关于</a>
 * <div id="html"></div>
 * */ 

window.addEventListener('load',()=>{
    html.innerHTML = location.hash.slice(1);
});
window.addEventListener('hashchange',()=>{
    html.innerHTML = location.hash.slice(1)
})


/****
 * history —— 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）
 * 这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。
 * 只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。
 */
window.onpopstate = function(event) { //监听浏览器地址变化做出改变
    console.log(event.state);
}

// push params-{state -状态对象Object、 title-标题String、 URL-定义新的历史URL记录String}
window.history.pushState({foo: 'bar'}, '', '/home');

// replace params-{state -状态对象Object、 title-标题String、 URL-修改当前历史URL记录String} 
window.history.replaceState({foo: 'bar'}, '', '/index');

// go
window.history.go() // 前进后退页面历史

// back
window.hostory.go(-1) // 后退历史

// forward
window.history.go(1) // 前进历史

/**
 * 实现原理
 * <a onclick="go('/home')">首页</a>
 * <a onclick="go('/about')">关于</a>
 * <div id="html"></div>
 * */ 

function go(pathname) {
    history.pushState({}, null, pathname);
    html.innerHTML = pathname;
}
window.addEventListener('popstate', () => {
    go(location.pathname);
})


 /***
  *404错误
  * hash模式下，仅hash符号之前的内容会被包含在请求中，如http://www.abc.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误；
  * history模式下，前端的url必须和后端发起请求的url一致，例如http://www.abc.com/book/id，如果后端缺少对book/id的路由处理，就会返回404错误。
  */


// 简单实现vue-router
let Vue; // 用户保存vue实例

class HistoryRoute {
    constructor() {
        this.current = null;
    }
}

class VueRouter {
    constructor(options) {
        this.mode = options.mode || "hash"; // 默认hash模式
        this.routes = options.routes || [];
        this.routeMaps = this.generateMap(this.routes); // 路由映射表
        this.currentHistory = new HistoryRoute(); // 当前路由
        this.initRoute(); // 初始化路由
    }

    generateMap(routes) {
        return routes.reduce((pre, item) => {
            pre[item.path] = item.component;
            return pre;
        }, {});
    }

    initRoute() {
        if(this.mode === 'hash') {
            location.hash ? '' : (location.hash = '/');
            window.addEventListener('load', () => {
                this.currentHistory.current = location.hash.slice(1);
            });

            window.addEventListener('hashchange', () => {
                this.currentHistory.current = location.hash.slice(1);
            })

        } else {
            location.pathname ? '' : (location.pathname = '/');
            window.addEventListener('load', () => {
                this.currentHistory.current = location.pathname;
            });

            window.addEventListener('popstate', () => {
                this.currentHistory.current = location.pathname;
            });
        }
    }
}

VueRouter.install = function(_vue) { // 装载函数
    Vue = _vue;

    // 每个组件都有 this.$router / this.$route 所以要mixin一下
    // 在每个组件中都可以获取到 this.$router与this.$route，这里进行混入vue实例中
    Vue.mixin({
        beforeCreate() {
            if(this.$options && this.$options.router) { // 如果根

            } else {

            }
        }
    });

}