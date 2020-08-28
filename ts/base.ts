interface Aa {
    name: string;
}

interface Bb {
    age: number;
}

type E = Aa & Bb;

let t: F = { name: 'mm', age: 20 }


interface Ia {
    name: string;
}

interface Ib {
    age: number;
}

type F = Ia & Ib;

let s: E = { name: '123',age: 16 }

// 谓词
interface Ma {
    fly();
    log();
}

interface Mb {
    swim();
    log();
}

function mab(): Ma | Mb {
    return {
        log() {
            console.log(123)
        },
        swim() {
            console.log(123)
        }
    }
}

function isSw(pm: Ma | Mb): pm is Ma {
    return
}

let pm = mab();

pm.log();



