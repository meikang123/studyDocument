// Generator 是一个状态机、也是一个遍历器生成函数、返回一个遍历器对象iterator

/*function* statusGenerator() {
  yield 1;
  yield 2;
  return 3
}

const d = statusGenerator()
console.log(d.next())
console.log(d[Symbol.iterator])*/

/*function wrapper(generatorFun) {
  return function(...args) {
    const d = generatorFun(...args)
    d.next()
    return d;
  }
}

const d = wrapper(function* () {
  console.log(`one ${yield 1}`)
  return 'done'
})

d().next('123')*/

/*function* fibonacci() {
  let [pre, cur] = [1, 1]
  while (true) {
    yield cur;
    [pre, cur] = [cur, cur + pre]
  }
}

for(let n of fibonacci()) {
  if(n > 1000) break
  console.log(n)
}*/

/*function mackAjax(data) {
  setTimeout(() => {
    const d = it.next(data * 2)
    console.log(d, '--------------d');
  }, 3000)
  return 222
}

function* main() {
  var result = yield mackAjax(12);
  console.log(result)
}

const it = main();

console.log(it.next(), '-----------m')*/

const d = function(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

const gen = function* () {
  var p1 = yield d(1)
  var p2 = yield d(p1 + 1)
  var p3 = yield d(p2 + 1)
  console.log('end')
}

/*const g = gen();
g.next().value.then(res => {
  console.log(res)
  g.next().value.then(res => {
    console.log(res)
    g.next().value.then(res => {
      console.log(res)
      // g.next()
    })
  })
})*/

function run(gen) {
  const g = gen();

  function next(data) {
    const dataPromise = g.next(data);
    if(dataPromise.done) return dataPromise.value;
    dataPromise.value.then(data => {
      console.log(data)
      next(data)
    })
    return 1
  }

  console.log(next(), '-----end')
}

run(gen)
