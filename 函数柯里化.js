/*
* 柯里化使用
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
