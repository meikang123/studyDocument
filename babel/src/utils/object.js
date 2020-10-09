/**
 * @module utils/object
 * @description JS对象操作
 */


/**
 * @description 根据传入对象的路径取值
 * @param {object} 传入对象 eg. {a:{b:{c:{d:111}}}}
 * @param {string} 属性path  eg. a.b.c.d
 * @returns { * } 跟据路径获取到的 value
 */
const get = (object, propertyPath) => {
  let srcObj = object;
  const paths = propertyPath.split('.');
  for (let index = 0; index < paths.length; index += 1) {
    const key = paths[index];
    if (srcObj[key]) {
      srcObj = srcObj[key];
    } else {
      return undefined;
    }
  }
  return srcObj;
};

/**
 * @description 对象深拷贝
 * @param {object} object - 被拷贝的对象
 * @return {object} 新对象
 */
const deepClone = object => {
  const obj = object;
  let targetObj = {};
  // 递归出口
  // if (typeof obj !== 'object' || obj == null) {
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }

  if (obj instanceof Array) {
    targetObj = [];
  }

  Object.keys(obj).forEach(key => {
    targetObj[key] = deepClone(obj[key]);
  });

  return targetObj;
};

export default {
  get,
  deepClone
};
