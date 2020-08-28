const ieVersion = Number(document.documentMode); // IE版本

/**
 * dom 事件绑定处理
 * @param {Element} element -
 * @param {String} event -
 * @param {Function} handler -
 * */
export const on = (() => {
  if(document.addEventListener) {
    return (element, event, handler) => {
      if(element && event && handler) element.addEventListener(event, handler, false);
    }
  } else { // IE < 9
    return (element, event, handler) => {
      if(element && event && handler) element.attachEvent('on' + event, handler);
    }
  }
})();

/**
 * dom 事件移除处理
 * @param {Element} element -
 * @param {String} event -
 * @param {Function} handler -
 * */
export const off = (() => {
  if(document.removeEventListener) {
    return (element, event, handler) => {
      if(element && event && handler) element.removeEventListener(event, handler, false);
    }
  } else { // IE < 9
    return (element, event, handler) => {
      if(element && event && handler) element.detachEvent('on' + event, handler);
    }
  }
})()

/**
 * dom 事件绑定一次
 * @param {Element} el -
 * @param {String} event -
 * @param {Function} fn -
 * */
export const once = (el, event, fn) => {
  const listener = function(...arg) {
    if(fn) fn.apply(this, arg);

    off(el, event, listener);
  }

  on(el, event, listener);
}

/**
 * 判断class是否存在
 * */
export const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/**
 * 添加class
 * */
export const addClass = (el, cls) => {
  if(!el) return;

  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/**
 * 设置元素样式
 * @param {Element} element -
 * @param {Object | String} styleName -
 * @param {String | Number} value -
 *
 * @return void
 * */
export const setStyle = (element, styleName, value) => {
  if(!element || !styleName) return;

  if(typeof styleName === 'object') {
    for(let prop in styleName) {
      if(Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    if(styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : `alpha(opacity=${value * 100})`;
    } else {
      element.style[styleName] = value;
    }
  }
}
