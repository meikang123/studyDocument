// 返回第一个选择的元素
const dom = document.querySelector('.btn');

// 返回所有类名相同的元素列表
const list = document.querySelectorAll('div.btn, div.box');

// 创建元素、添加元素、插入元素
const a = document.createElenemt('ul');
[1, 2, 3].forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerText = item;
    a.appendChild(listItem);
})
document.body.appendChild(a);

// 插入元素-返回插入节点
const b = document.querySelector('ul > li');
const new_b = document.createElement('li');
new_b.innerText = '插入';
a.insertBefore(new_b, b);

// 其它操作
a.removeChild(new_b); // 移除元素
a.cloneChild(); // 克隆元素---cloneChild(deep)---*deep(可选)**表示是否采用深度克隆,如果为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身.
a.replaceChild(new_b, old_b); // 替换袁术


a.setAttribute('id', 'app'); // 添加、更新属性
a.getAttribute('id'); // 获取属性
a.hasAttribute('id'); // 判断属性是否存在
a.removeAttribute('id') // 移除属性

// 插入html片段-比innerHTML要快
// beforebegin：元素自身的前面。 afterbegin：插入元素内部的第一个子节点之前。 beforeend：插入元素内部的最后一个子节点之后。 afterend：元素自身的后面。
var list = document.querySelector('ul');
list.insertAdjacentHTML('afterbegin', '<li id="first-item">First</li>');