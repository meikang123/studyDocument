/*
* var obj = {
*   a: {},
*   b: []
* }
* */

const deepClone = function(obj, cache = []) {
    if(obj === null || typeof obj !== 'object') return obj;

    // 防止循环引用
    const data = cache.filter(item => item.obj === obj);
    if(data) return data.copy;

    const copy = Array.isArray(obj) ? [] : {};

    cache.push({ obj, copy });

    Object.keys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache);
    })

    return  copy;
}

