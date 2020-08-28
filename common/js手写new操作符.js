/*
* const obj = new Object({a: 123})
* */

const New = function(fn) {
    const obj = Object.create(fn.prototype);
    const arg = Array.prototype.slice.call(arguments, 1);
    fn.apply(obj, arg);
    return obj;
}

const Fun = function(data) {
    this.data = data;
}

const obj = New(Fun, {a: 1});

console.log(obj)

