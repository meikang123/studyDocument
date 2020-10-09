import utils from './src/utils/index'
import { getName } from "./utils";

console.log(utils)

let a = [1, 2, 3];
const b = a.map(item => {
  return item + 1;
})
console.log(b);

const name = getName();
console.log(name);

class Pro {
  constructor(age) {
    this.age = age;
  }

  getAge() {
    return this.age;
  }
}

const pro = new Pro(26);
console.log(pro.getAge());


const p = () => {
  return new Promise((resolve => {
    resolve(true);
  }))
}

p.then(res => {
  console.log(res);
}).finally(() => {
  console.log(2222);
})

export default {
  version: '1.0.0'
}
