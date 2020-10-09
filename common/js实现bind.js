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


Function.prototype.nBind = function(context) {

    if(typeof this !== 'function') { //只能对函数执行bind方法
        throw TypeError('Function.prototype.bind - what is trying to be bound is not callable')
    }

    var self = this,
        //缓存原型方法，提升性能。
        slice = Array.prototype.slice,
        //获取除第一个以外的参数，第一个参数是上下文，其它才是真正的参数。
        args = slice.call(arguments, 1),
        //返回函数
        fBound = function(){
            //把原型链指向要bind操作的函数，也就是原函数。
            //直接执行时this变得未知，所以加上try
            try {
                this.__proto__ = self.prototype;
            } catch(e) {}
            //怎么使用bind后的方法，new或者直接执行
            var isNew = self.prototype ? this instanceof self : false;
            self.apply(
                //如果是new操作符实例出来对象，则为this。
                //如果是直接执行方法，则为context
                isNew ? this : context,
                //用bind时的参数合并执行时的参数，等于所有参数
                args.concat(slice.call(arguments))
            );
        }

    //bind后的方法是没有原型的，使其与浏览器原生表现一致
    fBound.prototype = undefined;
    return fBound;
}

b.fun.nBind(a)();

