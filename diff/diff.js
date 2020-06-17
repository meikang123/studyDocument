class Util {
    constructor() {
    }

    // 检测基础类型
    _isPrimitive(value) {
        return /(Sting|Number|Symbol|Boolean)/.test(Object.prototype.toString.call(value))
    }

    // 判读是否为空
    _isDef(v) {
        return v !== undefined && v !== null;
    }

}

const util = new Util();

/*
* 对象去描述一个真实DOM
* */
class VNode {
    constructor(tag, data, children) {
        this.tag = tag; // 标签
        this.data = data; // 属性
        this.children = util._isPrimitive(children) ? null : children; // 子节点
        this.elm = ''
        this.text = util._isPrimitive(children) ? children : ''; // 文本
    }
}

const pathVnode = (nVnode, oVnode) => {
    if(nVnode.text && nVnode.text !== oVnode) {

    } else {
        const oldCh = oVnode.children;
        const newCh = nVnode.children;
        if(util._isDef(oldCh) && util._isDef(newCh)) {
            updateChildren(oldCh, newCh);
        }

    }
}

const updateChildren = (oldCh, newCh) => {
    // 旧Vnode
    let oldStartIdx = 0;
    let oldStartVnode = oldCh[oldStartIdx];
    let oldEndIdx = oldCh.length - 1;
    let oldEndVnode = oldCh[oldEndIdx];

    // 新Vnode
    let newStartIdx = 0;
    let newStartVnode = newCh[newStartIdx];
    let newEndInx = newCh.length - 1;
    let newEndVnode = newCh[newEndInx];


    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndInx) { // 开始遍历children
        console.log(111, oldStartIdx, oldEndIdx, oldStartVnode);
        if(!util._isDef(oldStartVnode)) {
            console.log(22222);
            oldStartVnode = oldCh[++oldStartIdx]
        } else if(!util._isDef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx]
        }
        oldStartIdx++;




    }


}

// 元素内容结构
let arr =
    [{
        tag: 'i',
        text: 2
    }, {
        tag: 'span',
        text: 3
    }, {
        tag: 'strong',
        text: 4
    }]

let arr2 =
    [{
        tag: 'i',
        text: 2
    }, {
        tag: 'div',
        text: 3
    }, {
        tag: 'strong',
        text: 6
    }]

let createVnode = function (arr) {
    let _c = (tag, data, children) => {
        return new VNode(tag, data, children)
    };
    return _c('div', {attrs: {id: 'test'}}, arr.map(a => _c(a.tag, {}, a.text)))
}

const newVnode = createVnode(arr);
const oldVnode = createVnode(arr2);

pathVnode(newVnode, oldVnode);

