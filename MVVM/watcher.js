class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;

        this.vm[this.key]; // 读取操作，主动触发 get，当前 Watcher 实例被添加到依赖管理器中

        Dep.target = null;
    }

    update() {
        this.cb.call(this.vm, this.vm[this.key]);
    }
}
