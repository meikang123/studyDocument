import { getName } from "./utils";

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

export default {
  version: '1.0.0'
}
