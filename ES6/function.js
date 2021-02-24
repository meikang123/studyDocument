// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

/*var obj = {
  a: 1
}

const p = Object.getPrototypeOf(obj)

p.show = () => {
  console.log('k')
}

console.log(p)

obj.show()

class Foo {
  static show() {
    console.log(this, this.hide)
  }

  hide() {
    console.log('-hide')
  }
}

Foo.show()*/

class Foo {
  #arg = 26

  show() {
    console.log(this.#arg)
  }
}

Foo._name = 'mk';

Foo.prototype._name = 'kun';

const d = new Foo()

console.log(d.show(), Foo._name)
