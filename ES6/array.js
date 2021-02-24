const numFun = function *() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i ++
  }
}

Number.prototype[Symbol.iterator] = numFun
console.log([...5])

const d = numFun.bind(Number(5))()

// 具备数据结构iterator就能进行数据解构
