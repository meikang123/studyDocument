Function.prototype.newBind = function(target) {
    const _this = this;
    return function(...rest) {
        _this.apply(target, rest);
    }
}

var name = 'name'

var a = {
    name: 'nameA'
}

var b = {
    name: 'nameB',
    fun() {
        console.log(123456, this.name);
    }
}

b.fun();
b.fun.bind(a)();
b.fun.newBind(a)();


Function.prototype.nBind = function(content) {
    console.log(content);
    const fun = this;
    var args1 = Array.prototype.slice.call(arguments, 1);

    var bindFun = function() {
        var args2 = Array.prototype.slice.call(arguments);
        var that2 = this instanceof bindFn ? this : context; // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作。如果this是构造函数bindFn new出来的实例，那么此处的this一定是该实例本身。
        return that.apply(that2, args1.concat(args2));
    }

    bindFun.prototype = fun.prototype;

    return bindFun;



    var Fn = function() {}
    Fn.prototype = fun.prototype;
    bindFun.prototype = new Fn();
}

b.fun.bind(a);
