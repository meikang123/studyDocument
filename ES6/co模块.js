// Sorrow.X --- 添加注释,注释纯属个人理解
/**
 * slice变量 引用 数组的 slice方法
 */
var slice = Array.prototype.slice;

/**
 * 抛出 `co`.
 */
// module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */
co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  };
};

/**
 * 执行 generator 函数 且返回一个promise对象
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */
function co(gen) {
  var ctx = this;    // 存储上下文环境
  var args = slice.call(arguments, 1);    // 提取除了第一个参数的其他参数值(数组)
  var count = 0;

  // 我们用 promise 把参数转成 promise实例 来 避免 promise链,
  // 这会导致内存泄漏错误.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);    // 判断gen是否为函数, 是的话执行一下
    if (!gen || typeof gen.next !== 'function') return resolve(gen);    // 如果gen不是generator函数, 则直接返回gen函数的执行结果

    onFulfilled();    // 首次执行gen.next()方法

    /**
     * 执行gen遍历器对象 的next方法
     * @param {Mixed} res  next方法的参数 作为上一个异步的结果
     * @return {Promise}
     * @api private
     */
    function onFulfilled(res) {
      var ret;    // 对象 {value: 紧跟yield后面表达式的值, done: generator函数是否执行完毕}
      try {
        // console.log('成功开始');
        ret = gen.next(res);    // 调用遍历器gen对象的next方法
        // console.log('成功执行');
      } catch (e) {
        return reject(e);    // 捕获 异常
      };
      // console.log('成功next开始');
      next(ret);
    };

    /**
     * 执行gen遍历器对象 的throw方法
     * @param {Error} err
     * @return {Promise}
     * @api private
     */
    function onRejected(err) {
      var ret;
      try {
        // console.log('错误开始');
        ret = gen.throw(err);    // generator函数体外抛出错误(如果generator函数体内有try catch则被generator函数体内捕获,如果没有则就被下面的这个catch捕获, 如果都没有的话则直接中断generator函数执行撒)
      } catch (e) {
        return reject(e);    // 捕获 异常 (此异常会被返回的promise实例的.catch((e)=>{console.error(e)})捕获)
      };
      // console.log('失败next开始');
      next(ret);
    };

    /**
     * 得到gen.next()方法的值(该值的value是promise实例),然后执行promise实例的then方法,为了交回generator的执行权,
     * 返回一个promise(注: promise的then和catch方法返回的都是新的promise实例哈)
     * @param {Object} ret    ret: 对象 {value: 紧跟yield后面表达式的值, done: generator函数是否执行完毕}
     * @return {Promise}
     * @api private
     */
    function next(ret) {
      if (ret.done)    // generator函数执行完毕的话, 则调用resolve方法
        return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);    // 把ret.value值转换成promise实例
      if (value && isPromise(value))    // 如果value是promise实例的话,则执行promise实例的then方法,成功的话,继续调用onFulfilled,这样就达到了自动执行的目的
        return value.then(onFulfilled, onRejected);    // 等待异步完成后再通过onFulfilled函数把执行权交给generator函数, 如果异步失败则调用onRejected,不会继续执行generator容器剩下的异步操作
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));    // 值不是promise则调用onRejected方法,也不会继续执行generator容器剩下的异步操作了
    };
  });
};

/**
 * 把 yield后面的表达式转换成 promise实例
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */
function toPromise(obj) {
  if (!obj) return obj;    // 如果是假值, 则直接返回
  if (isPromise(obj)) return obj;    // 如果是promise的话, 则直接返回
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);    // 如果obj是个generator函数的话,则递归下去
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);    // 把thunk函数转换成promise实例
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);    // obj如果是数组,则把数组中每个成员都转成promise
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
};

/**
 * 把thunk函数转换成promise实例
 * @param {Function}
 * @return {Promise}
 * @api private
 */
function thunkToPromise(fn) {
  var ctx = this;    // 存一下上下文环境
  return new Promise(function (resolve, reject) {    // 返回一个promise
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);    // 回调第一个参数有错误就reject
      if (arguments.length > 2) res = slice.call(arguments, 1);    // 去掉第一个err参数,把剩下的参数放入数组中
      resolve(res);    // 成功回调并把res作为参数传过去
    });
  });
}

/**
 * 数组中每个成员都转成promise, 使用Promise.all并发执行每个promise
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */
function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
};

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */
function objectToPromise(obj){
  var results = new obj.constructor();    // 得到一个空对象
  var keys = Object.keys(obj);    // 获取obj对象的所有属性名
  var promises = [];    // promise数组集合
  for (var i = 0; i < keys.length; i++) {    // 遍历对象属性
    var key = keys[i];    // obj对象属性名
    var promise = toPromise.call(this, obj[key]);    // 把key对应的属性值转成promise
    if (promise && isPromise(promise)) defer(promise, key);    // 如果属性值是promise, 就推到promises数组中去
    else results[key] = obj[key];
  };
  return Promise.all(promises).then(function () {    // 还是使用Promise.all并行执行
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  };
};

/**
 * 检查obj是否是一个promise, 根据obj的then属性是否是函数来判断
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isPromise(obj) {
  return 'function' == typeof obj.then;
};

/**
 * 检查obj是否是遍历器对象(其实就是generator函数生成的遍历器)
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
};

/**
 * 检查obj是不是generator函数
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;    // generator函数的constructor就是GeneratorFunction函数(constructor: GeneratorFunction函数)
  if (!constructor) return false;    // 如果假值, 则直接return
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;   // constructor函数的name属性为GeneratorFunction或者displayName属性为'GeneratorFunction' 则obj就是Generator函数
  return isGenerator(constructor.prototype);    // 检查constructor.prototype是否是遍历器对象
};

/**
 * 检查val是不是一个普通对象
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */
function isObject(val) {
  return Object == val.constructor;
};
