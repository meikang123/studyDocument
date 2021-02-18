enum BEnum {
  Top,
  Left
}

const bEnum: string = BEnum[BEnum.Top]

console.log(bEnum)


abstract class BClass {
  cb?: () => void;
  fun: (age: number) => number;
}

const bClass: BClass = {
  fun(age) {
    return age;
  }
};

interface BClassInterface {
  bClass: BClass
}

class BClassInstance implements BClassInterface {
  bClass = {
    fun(age) {
      return age;
    }
  };
}

const bClassInstance = new BClassInstance()
console.log(bClassInstance.bClass.fun(2))

const bDefault = {
  name: '并行请求',
  age: 29
}

const bData: typeof bDefault = {
  name: '厉害了',
  age: 40
};


