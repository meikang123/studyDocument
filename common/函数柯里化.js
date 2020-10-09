/*
* 柯里化
* 指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
* 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。通俗点说就是将一个函数拆分成多个函数，是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数。
* 使用
* */

const add = function () {
    const arg = Array.prototype.slice.call(arguments);
    const _add = function() {
        const _arg = Array.prototype.slice.call(arguments);
        arg.concat(_arg);
    }

    _add.toString = function() {
        return arg.reduce(function(a, b) {
            return a + b;
        })
    }

    return _add;
}

add(1, 2, 3) // 6
add(1, 2, 3)(6) // 12
add(1)(9)(5) // 15


/*
* 案例2
* */
// 实现一个判断数据类型的方法
const checkType = function(type, content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
}
checkType('Number',2); // true
// 这种方法总是要把type参数传过去，如果写错了就会影响到正确的结果了，可以考虑下如何做到把“Number“做到复用

const curry = function(type){
    return function(content){
        return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
}
const isNumber =  curry('Number');
isNumber(3) // true
// 这里就实现参数的复用了，这样的实现给之后的调用带来了很大的便利
