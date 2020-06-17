// 基础类型
var a = 12;
var a1 = 'abc';
var a2 = false;
var a3 = [1, 'abc'];
var a4 = [1, 2];
// 枚举--数字枚举（数字枚举多了反向映射）
var b;
(function (b) {
    b[b["A"] = 0] = "A";
    b[b["B"] = 3] = "B";
    b[b["C"] = 4] = "C";
})(b || (b = {}));
// 枚举--字符串
var b1;
(function (b1) {
    b1["A"] = "a";
    b1["B"] = "b";
    b1["C"] = "c";
})(b1 || (b1 = {}));
// Any 类型--des: 任何类型都可以为any类型、即称为超级类型
var c = 123;
c = 'abc';
c = false;
c = [1, 'abc'];
a3 = c;
a4 = c;
// unknown类型--只能赋值给 any和unknown 类型
var d = 2;
d = function () {
};
// error let d1: number = d;
// error d();
// 元祖类型-des：一般用于定义有限属性的类型、给每个属性都关联一个类型。
var e = [1, 'abc', false];
//void类型-des：没有类型，当一般函数没返回值类型是void, 如果涉及变量是void 起值只能是undefined and null
function aF() { }
var f = undefined;
f = null;
// ts 也存在undefined\null 类型
var g = undefined;
var h = null;
// never 类型-des：表示永不存在的类型、、、、使用 never 避免出现新增了联合类型没有对应的实现
function error(massage) {
    throw new Error("error: " + massage);
}
var i = function () {
    while (true) { }
};
function check(foo) {
    if (typeof foo === 'string') {
    }
    else if (typeof foo === 'number') {
    }
    else {
        var check_1 = foo;
    }
}
var foo = 1;
foo = 'abc';
// error foo = false;
// 断言两种形式  一种尖括号、一种as
var j = 'abc';
var k = j.length;
var l = j.length;
function asset(len) {
    console.log(len);
    if (len.length)
        return len.length;
    return len.toString().length;
}
console.log(asset(j));
function inAB(emp) {
    if ('age' in emp)
        return emp.age;
    if ('des' in emp)
        return emp.des;
}
function typeofSN(v) {
    if (typeof v === 'string')
        return v.length;
    if (typeof v === 'number')
        return v;
}
// 联合类型、一般null and undefined 一起使用
var ad = function (count) {
    if (count === void 0) { count = 'abc'; }
};
var staff = {
    id: 'E1006',
    age: 33,
    companyId: 'EFT'
};
console.dir(staff);
// 函数
function fa(name) {
    return name;
}
function add(a, b) {
    return a + b;
}
var com = function (props) {
    return 'abc';
};
var fun = function (str) {
    return !!str;
};
var arr = ['1', 'abc'];
var Clock = /** @class */ (function () {
    function Clock() {
        this.time = new Date();
    }
    return Clock;
}());
// 类
var Pa = /** @class */ (function () {
    function Pa(name) {
        this.name = name;
    }
    Pa.prototype.getName = function () {
        return this.name;
    };
    return Pa;
}());
var pa = new Pa('mk');
