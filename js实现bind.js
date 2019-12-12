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