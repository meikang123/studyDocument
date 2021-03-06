/**
 * 前面加;---主要是应对代码合并压缩时，由于缺少分号；带来的错误。
 * undefined在老一辈的浏览器是不被支持的，直接使用会报错，js框架要考虑到兼容性，因此增加一个形参undefined，就算有人把外面的 undefined 定义了，里面的 undefined 依然不受影响；
 */

; (function (undefined) {
    "use strict" //使用js严格模式检查，使语法更规范

    class Plugin {

    }

    var getGlobal = function () {
        if (typeof self !== 'undefined') { return self; }
        if (typeof window !== 'undefined') { return window; }
        if (typeof global !== 'undefined') { return global; }
        throw new Error('unable to locate global object');
    };


    // 最后将插件对象暴露给全局对象
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Plugin;
    } else if (typeof define === "function" && define.amd) {
        define(function () { return Plugin; });
    } else {
        let _global = getGlobal();
        !('Plugin' in _global) && (_global.Plugin = Plugin);
    }

}());