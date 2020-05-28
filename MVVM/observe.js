class Observer {
    constructor(data, vm) {
        this.vm = vm;
        this.observer(data, true)
    }

    observer(data, isInit) {
        if(data && typeof data === 'object') {
            for(let key in data) {
                if(data.hasOwnProperty(key)) this.defineProperty(data, key, data[key]);
                if(isInit) this.defaultData(key);
            }
        }
    }

    defineProperty(data, key, value) {
        const _t = this;
        _t.observer(value);

        const dep = new Dep();

        Object.defineProperty(data, key, {
            get() {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target);

                return value;
            },
            set(newV) {
                if(newV !== value) {
                    _t.observer(newV);
                    value = newV;
                    dep.notify();
                }
            }
        })

    }

    defaultData(key) {
        const _t = this;
        Object.defineProperty(_t.vm, key, {
            get() {
                return _t.vm.$data[key];
            },
            set(value) {
                _t.vm.$data[key] = value;
            }
        })
    }
}
