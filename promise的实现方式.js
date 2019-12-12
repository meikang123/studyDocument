class Prom {
    static resolve(value) {
        return new Prom(resolve => resolve(value));
    }

    static reject(error) {
        return new Prom((resolve, reject) => reject(error));
    }

    constructor(fn) {
        this.status = 'loading'; // 状态
        this.result = undefined; // 结果

        // 维护一个 resolve/reject 的函数队列
        this.resolveFns = [];
        this.rejectFns = [];

        const resolve = (value) => {
            this.status = "success";
            this.result = value;
            this.resolveFns.map(({fn, resolve: res, reject: rej}) => res(fn(value)));
        };

        const reject = (error) => {
            this.status = "error";
            this.result = error;
            this.rejectFns.map(({fn, resolve: res, reject: rej}) => rej(fn(error)));
        };

        fn(resolve, reject);
    }


    then(fn) {
        if(this.status === 'success') {
            const result = fn(this.result);
            return Prom.resolve(result);
        } else {
            return new Prom((resolve, reject) => {
                this.resolveFns.push({fn, resolve, reject});
            });
        }
    }

    catch(fn) {
        if(this.status === 'error') {
            const result = fn(this.result);
            return Prom.resolve(result);
        } else {
            return new Prom((resolve, reject) => {
                this.rejectFns.push({fn, resolve, reject});
            });
        }
    }
}

const prom1 = new Prom((resolve, reject) => {
    setTimeout(() => resolve(1000), 2000);
});

const prom2 = new Prom((resolve, reject) => {
    setTimeout(() => reject(2000), 5000);
});

prom1.then((value) => {
    console.log(value);
    return value;
}).then(value => {
    console.log(222, value);
});

prom2.catch((error) => {
    console.log(error);
});

const prom3 = Prom.reject('出错了');
prom3.catch(function(s) {
    console.log(s);
});