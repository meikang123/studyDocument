class Prom {
    constructor(fn) {
        this.eventBus = [];

        this.resolveFun = (data) => {
            this.eventBus.map(item => item(data))
        }

        this.rejectFun = () => {}

        fn(this.resolveFun, this.rejectFun);
    }

    then(fn) {
        this.eventBus.push(fn);
    }
}

const prom = new Prom(function(resolve, reject) {
    setTimeout(() => {
        console.log(222222, resolve);
        resolve(123);
    }, 5000)
});

console.log(prom)

prom.then(data => {
    console.log('prom--------', data);
})

