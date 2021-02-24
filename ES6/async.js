// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

/*function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();*/

function spawn(gen) {
  return new Promise((resolve, reject) => {
    const g = gen();
    function step(nextFun) {
      let next;
      try {
        next = nextFun();
      } catch (e) {
        return reject(e)
      }

      Promise.resolve(next.value).then((v) => {
        step(function() {
          return g.next(v)
        })
      }, (e) => {
        step(function () {
          return g.throw(e)
        })
      })
    }

    step(function () {
      return g.next(undefined)
    })
  })
}

function fn(args) {
  return spawn(function* () {

  })
}
