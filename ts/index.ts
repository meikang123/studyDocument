// 基础类型
let a: number = 12;

let a1: string = 'abc';

let a2: boolean = false;

let a3: [number, string] = [1, 'abc'];

let a4: Array<number> = [1, 2];

// 枚举--数字枚举（数字枚举多了反向映射）
enum b { A, B = 3, C}

// 枚举--字符串
enum b1 { A = 'a', B = 'b', C = 'c' }

// Any 类型--des: 任何类型都可以为any类型、即称为超级类型
let c: any = 123;
c = 'abc';
c = false;
c = [1, 'abc'];
a3 = c;
a4 = c;

// unknown类型--只能赋值给 any和unknown 类型
let d: unknown = 2;
d = function () {

}
// error let d1: number = d;
// error d();

// 元祖类型-des：一般用于定义有限属性的类型、给每个属性都关联一个类型。
let e: [number, string, boolean] = [1, 'abc', false];

//void类型-des：没有类型，当一般函数没返回值类型是void, 如果涉及变量是void 起值只能是undefined and null
function aF(): void {}
let f: void = undefined;
f = null;


// ts 也存在undefined\null 类型
let g: undefined = undefined;
let h: null = null;

// never 类型-des：表示永不存在的类型、、、、使用 never 避免出现新增了联合类型没有对应的实现
function error(massage: string): never {
    throw new Error(`error: ${massage}`)
}
let i = (): never => {
    while(true) {}
}
type Foo = string | number ;
function check(foo: Foo) {
    if(typeof foo === 'string') {

    } else if(typeof foo === 'number') {

    } else {
        const check: never = foo;
    }
}
let foo: Foo = 1;
foo = 'abc';
// error foo = false;

// 断言两种形式  一种尖括号、一种as
let j:string = 'abc';
let k:number = (<string>j).length;
let l:number = (j as string).length;
function asset(len: Foo): number {
    console.log(len);
    if((<string>len).length) return (<string>len).length;
    return len.toString().length;
}
console.log(asset(j));

// 类型保护、即属性类型检查 in and typeof and instanceof
interface IA {
    name: string,
    age: number
}

interface IB {
    name: string,
    des: string
}

type IAB = IA | IB;

function inAB(emp: IAB): number | string {
    if('age' in emp) return emp.age;
    if('des' in emp) return emp.des;
}

function typeofSN(v: string | number): number {
    if(typeof v === 'string') return v.length;
    if(typeof v === 'number') return v;
}


// 联合类型、一般null and undefined 一起使用
const ad = (count: string | undefined = 'abc') => {}

// 类型别名、交叉类型 &
type Message = string | string[]
interface IPerson {
    id: string;
    age: number;
}

interface IWorker {
    companyId: string;
}

type IStaff = IPerson & IWorker;

const staff: IStaff = {
    id: 'E1006',
    age: 33,
    companyId: 'EFT'
};

console.dir(staff)

// 函数
function fa(name: string): string {
    return name;
}

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a, b) {
    return a + b;
}


//  实例1

type Fc<T> = {
    (props: T): string
}

interface Props {
    name: string
}

const com: Fc<Props> = (props) => {
    return 'abc'
};

// 实例2

interface Fun {
    (s: string): boolean
}

const fun: Fun = (str) => {
    return !!str;
}

// 实例3

interface Arr {
    [index: number]: string
}

const arr: Arr = ['1', 'abc']

// 实例4---implements

interface Imp {
    time: Date;
}

class Clock implements Imp {
    time = new Date();

    constructor() {

    }

}

// 类

class Pa {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name
    }
}

interface Pna {
    name: string
}

const pa: Pna = new Pa('mk');


// 派生类
abstract class A {
    static abc = 123;

    constructor() {
    }

    abstract show(): void
}

class B extends A {
    constructor() {
        super();
    }

    show() {

    }
}

const ac = new B();

// 泛型函数pm2
const mf: <T>(arg: T) => T = (arg) => arg;
console.log(mf('abc'));
const mfk: {<T>(arg: T): T} = (arg) => arg;
interface Mfc {
    <T>(arg: T): T;
}
const mfc: Mfc = (arg) => arg;
interface Mc<T> {
    (arg: T): T;
}
const mc: Mc<number> = arg => arg;


//其他
const dd = { m: 1, k: 2};
const aa = (m, key) => {
    console.log(m[key])
}
aa(dd, 't')


