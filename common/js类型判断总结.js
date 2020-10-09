/*
* 在JavaScript中，有八种内置类型，null，undefined，boolean，number，String，Object，Symbol（ES6中新增），BigInt（ES10新增）
* */

/*
* 在条件判断时，undefined， null， false， NaN， ''， ±0 转为 false, 其余都为true。
* 对象转基本类型，调用优先级 Symbol.toPrimitive > valueOf() > toString()，方法皆可重写
*
* 对象键名的转换
对象的键名只能是字符串和Symbol类型
其它类型的键名会被转换成字符串类型
对象转字符串默认会调用 toString 方法
* */
var a = {
    valueOf() {
        return 1;
    },
    toString() {
        return 2;
    },
    [Symbol.toPrimitive]() {
        return 3;
    }
}
a + 1; //4
a + '1'; //31


/*
* typeof
* typeof 无法区分null、[]、{}
* 原生函数有String(),Number(),Boolean(),Array(),Object(),Function().RegExp().Date(),Error()。这些在使用typeof检测时都返回"object"。
* */
typeof 1 === 'number'
typeof 'str' === 'string'
typeof true === 'boolean'
typeof Symbol() === 'symbol'
typeof undefined === 'undefined'
function fun() {}
typeof fun === 'function'
typeof class C{} === 'function'
typeof 1n === 'bigint'

typeof null === 'object'
typeof {} === 'object'
typeof [] === 'object'


/*
* constructor
* 如果我们要判断出对象是由哪些函数构建的，我们可以通过使用对象的constructor属性来判断
* constructor还有一个需要注意的点，就是在使用继承的时候，它可能不会出现我们期待的结果
* */
new String().constructor===String
// true
new Number().constructor===Number
// true
new Array().constructor===Array
// true
new Boolean().constructor===Boolean
// true
new Object().constructor===Object
// true
new Function().constructor===Function
// true
new RegExp().constructor===RegExp
// true
new Date().constructor===Date
// true
new Error().constructor===Error
// true

// 继承
function People(){}
function Student(){}
Student.prototype=new People()
new Student().constructor===Student
// false
new Student().constructor===People
// true

/*
* Object.prototype.toString
* Object.prototype.toString返回的是"[Object (class)]"，class的部分就是我们要的内容。
* */
Object.prototype.toString.call(1)
// "[object Number]"
Object.prototype.toString.call("str")
// "[object String]"
Object.prototype.toString.call({})
// "[object Object]"
Object.prototype.toString.call(null)
// "[object Null]"
Object.prototype.toString.call(undefined)
// "[object Undefined]"
Object.prototype.toString.call(Symbol())
// "[object Symbol]"
Object.prototype.toString.call(true)
// "[object Boolean]"
Object.prototype.toString.call(1n)
// "[object BigInt]"

function fn(){}
Object.prototype.toString.call(fn)
// "[object Function]"

/*
* instanceof
* instanceof在对继承对象的判断上正确，但是在对原始类型的判断上不尽人意
* instanceof的判断原理实际上就是原型链
* */
class People{}
class Student extends People{}
new Student() instanceof Student
// true
new Student() instanceof People
// true

1 instanceof Number
// false
true instanceof Boolean
// false
"str" instanceof String
// false

//使用代码简单表示就是
function _instanceof(leftVal,rightVal){
    leftVal = leftVal.__proto__
    const rightPro = rightVal.prototype
    while(true){
        if(leftVal === null){
            return false
        }
        if(leftVal === rightPro){
            return true
        }
        leftVal = leftVal.__proto__
    }
}

/*
* 总结
* typeof
1.对其他内置类型的检测正确，在对null进行类型检测时会返回"object"

2.对方法进行检测时，会返回”function"

3.typeof对于对象统一返回"object"，即使使用了不同的原生函数，typeof无法区分这些原生函数构造的对象

constructor
1.对于内置类型只能判断Number（需要将值赋给变量才能判断），Boolean，Object，Symbol，BigInt其他三种无法判断

2.对于对象能返回构造对象的构造函数名

3.当使用继承时会返回原型链末端的构造函数名

Object.prototype.toString
1.对于所有内置对象都可以判断

2.对于对象能返回构造对象的构造函数名，但自定义对象只能返回object

instanceof
1.对于对象能返回构造对象的构造函数名

2.能正确判断继承的对象

3.对于原始类型字面量无法正确判断（Number，Boolean，String），对new构造的对象可以正确判断，可以正确判断原生类型（RegExp，Array，Function，Object）
* */
