class Compiler {
    constructor(el, vm) {
        this.vm = vm;
        this.$el = document.querySelector(el);
        console.log(this.$el, '------------------kkk');
        if(this.$el) {
            // 将dom节点转换为Fragment提高执行效率
            this.$fragment = this.nodeToFragment(this.$el);
            this.compiler(this.$fragment);
            console.log(this.$fragment, '------------------kkk');
            this.$el.appendChild(this.$fragment) // dom实例化
        }
    }

    nodeToFragment(el) {
        const fragment = document.createDocumentFragment();
        let child;
        while ((child = el.firstChild)) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    isElementNode(node) { // 元素节点
        return node.nodeType === 1;
    }

    isTextNode(node) { // 文本节点
        return node.nodeType === 3;
    }


    compiler(node) {
        const nodes = node.childNodes;
        [...nodes].forEach(item => {
            // console.log(item);
            if(this.isElementNode(item)) { // 标签
                this.compileElement(item);
                this.compiler(item);
            } else if(this.isTextNode(item) && /\{\{(.*)\}\}/.test(item.textContent)) { // 文本
                this.compileText(item, RegExp.$1);
            }

        })
    }

    compileText(node, exp) { // 更新文本
        const w = new Watcher(this.vm, exp, function(value) {
            node.textContent = value;
        })
        w.update();
    }

    compileElement(node) {
        const attrs = node.attributes;
        [...attrs].forEach(attr => {
            if(attr.nodeName === 'v-model') {
                const name = attr.nodeValue;
                node.addEventListener('input', (event) => {
                    this.vm[name] = event.target.value;
                })
                new Watcher(this.vm, name, (value) => {
                    node.value = value;
                });
            }
        })
    }
}
