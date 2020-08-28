// 防抖--触发高频事件后N秒内函数只执行一次，如果N秒内再次触发，则重新计时
function debounce(fn, wait) {
    let timer;
    return function () {
        let _this = this;
        let args = arguments;
        if(timer) clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(_this, args);
        }, wait);
    }
}

// 节流--高频事件触发、但N秒内只执行一次，所以节流会稀释函数的执行评率
function throttlel(fn, wait) {
    let time = 0;
    return function() {
        let _this = this;
        let args = arguments;
        let now = Date.now();
        if(now - time > wait) {
            fn.apply(_this, args);
            time = now;
        }
    }
}