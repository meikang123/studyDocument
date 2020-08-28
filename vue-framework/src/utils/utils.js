/**
 * 节流-N秒内只执行一次
 * 限制函数的执行。尤其适用于速率限制 例如在：event[resize, scroll]上使用
 * @param {number} delay - 以毫秒为单位的零或更大的延迟。对于事件回调，值在100或250(甚至更高)左右最有用。
 * @param {Function} cb -
 * @param {boolean} [noTrailing] - delay秒后是否尾随执行callback
 *
 * @return {Function} 一个新的、节流的函数。
 * */
export const throttle = (delay, cb, noTrailing) => {
  let timeoutID;
  let lastExecTime = 0;
  let cancelled = false;

  function clearExistingTimeout() {
    if(timeoutID) clearTimeout(timeoutID);
  }

  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }

  function wrapper(...arg) {
    const self = this;

    let elapsed = Date.now() - lastExecTime;

    if(cancelled) return;

    const exec = () => {
      lastExecTime = Date.now();
      cb.apply(self, arg);
    }

    clearExistingTimeout();

    if(elapsed > delay) {
      exec();
    } else if(!noTrailing) {
      timeoutID = setTimeout(exec, delay - elapsed);
    }

  }

  wrapper.cancel = cancel;

  return wrapper;
}

/**
 * 防抖-N秒内执行一次、N秒内再次执行重新计时
 * 终止函数的执行。消除抖动,不像节流, 保证一个函数只执行一次
 * @param {number} delay - 以毫秒为单位的零或更大的延迟。对于事件回调，值在100或250(甚至更高)左右最有用。
 * @param {Function} cb -
 * @param {boolean} [noTrailing] - delay秒后是否尾随执行callback
 *
 * @return {Function} 一个新的、防抖的函数。
 * */
export const debounce = (delay, cb, noTrailing) => {
  let timeoutID;
  let cancelled = false;

  function cancel() {
    if(timeoutID) clearTimeout(timeoutID);
    cancelled = true;
  }

  function wrapper(...arg) {
    const self = this;

    if(cancelled) return;

    const exec = () => {
      cb.apply(self, arg);
    }

    if(!timeoutID) exec();
    else clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = undefined;
      if(noTrailing) exec();
    }, delay)
  }

  wrapper.cancel = cancel;

  return wrapper;
}
