type Return<T> = T extends (...args: any[]) => infer R ? R : any

type $Fun<T> = T extends () => infer R ? R : boolean;

const $b_d: Return<number> = 1;

const $b_a: $Fun<() => number> = 1;

// Exclude 属性排除
interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

type keys = keyof User;

type ExcludeUser = Exclude<keys, "age" | "email">;
// 等价于
type ExcludeUserCopy = "id" | "name" | "gender";

// never 永不存在、函数抛出异常
function throwError(message: string): never {
  throw new Error(message);
}

// Pick 部分选择
interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}
type PickUser = Pick<User, "id" | "name" | "gender">;
// 等价于
type PickUserCopy = {
  id: number;
  name: string;
  gender: number;
};

// Partial 可选属性
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
type PartialRectangle = Partial<Rectangle>;
// 等价于
type PartialRectangleCopy = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

//Omit 属性忽略
interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

// 表示忽略掉User接口中的age和email属性
type OmitUser = Omit<User, "age" | "email">;
// 等价于
type OmitUserCopy = {
  id: number;
  name: string;
  gender: number;
};


//函数
type fooB<T> = T;

const fooB: fooB<string> = "456";

// 判断属性
type $B_D<T, P> = P extends undefined ? T :  P;
interface $B_A {
  name: string;
}
interface $B_B {
  age: number;
}

type k = $B_D<$B_A, $B_B>;

class AB<P = undefined> {
  require = (): $B_D<$B_A, P> => {
    return {
      name: '123'
    } as $B_D<$B_A, P>
  }
}

const kkk = new AB<$B_B>();
const ddd = kkk.require();
ddd.age = 456;
