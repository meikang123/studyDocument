// 冒泡排序
// 1、依次对比相邻2个数字，前者比后者大就调换位置
// 2、重复第一步操作，直到所有数字都按顺序排列
// 执行n-1轮，就可以完成排序
// 时间复杂度：O(n^2) 空间复杂度：O(1) 稳定性：冒泡排序是稳定的排序算法，因为可以实现值相等的元素的相对位置不变

const arr = [10, 3, 1, 2, 8, 12, 6]

function bubbleSort(arr) {
  arr = [...arr]
  const len = arr.length - 1
  for(let i = 0; i < len; i ++) {
    for(let j = 0; j < len - i; j ++) {
      if(arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

const d = bubbleSort(arr);

console.log('冒泡排序结果：', d)


/**
 * @description 选择排序
 * @desc
 * 1、找到数组中的最小值，选中它并将它放到第一位。
 * 2、接着找到第二小的值，选中它并将它放到第二位。
 * 3、以此类推，执行n-1轮
 * 时间复杂度：O(n^2) 空间复杂度：O(1) 稳定性：选择排序是不稳定的排序算法，因为无法保证值相等的元素的相对位置不变，例如 [3, 4, 3, 1, 5]这个数组，第一次交换，此时原来两个3的相对位置发生了变化。
 * */

function selectSort(arr) {
  arr = [...arr]
  for(let i = 0; i < arr.length - 1; i ++) {
    let minIndex = i;
    for(let j = i; j < arr.length; j ++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    const temp = arr[minIndex]
    arr[minIndex] = arr[i];
    arr[i] = temp
  }

  return arr
}

const d1 = selectSort(arr);

console.log('选择排序结果：', d1)

/**
 * @description 插入排序
 * @desc
 * 1、将数组的左边看作已经排序好的有序序列，每次将一个数字插入该有序序列；
 * 2、从第二个书开始往前比，如果有比它大的就往后排，第二个数比完比第三个数，把第三个数与前面的比较；
 * 3、从排序好的数组最右侧开始比较，若比被比较的数较大，被比较的数后移一位，比较的数插入其中
 * 4、以此类推进行到最后一个数
 * 时间复杂度：O(n^2) 空间复杂度:O(1) 稳定性：插入排序稳定的排序算法，满足条件arr[target] < arr[j]才发生交换，这个条件可以保证值相等的元素的相对位置不变。
 * */

function insertSort(arr) {
  arr = [...arr]
  for(let i = 1; i < arr.length; i ++) {
    let temp = arr[i]
    let j = i

    while (j > 0) {
      if(temp < arr[j - 1]) {
        arr[j] = arr[j - 1];
      } else {
        break;
      }

      j --;
    }
    arr[j] = temp
  }

  return arr
}

const d2 = insertSort(arr)

console.log('插入排序结果：', d2)

/**
 * @description 归并排序
 * @desc
 * 1、利用归并的思想实现的排序方法。
 * 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。（分治法将问题分成一些小的问题然后递归求解，而治的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。
 * 分：把数组从中点进行分割，分为左、右两个数组，再递归地对子数组进行”分操作“，直到数组长度小于2，成一个个单独的数
 * 合：把两个数合并为有序数组，再对有序数组进行合并，直到全部子数组合并为一个完整数组，如果需要合并，那么左右两数组已经有序了。
 * */

function mergeSort(arr) {
  arr = [...arr]
  //第一步，分，将数组分为长度小于2的数组，长度小于2代表这个数组已经有序
  const rec = (arr) => {
    if (arr.length < 2) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2); //获取数组中间下标，将数组分为左右两个数组
    const left = arr.slice(0, mid); //左边数组
    const right = arr.slice(mid, arr.length); //右边数组
    //调用递归将左右两边的数组继续拆分，直到数组长度小于2
    const orderLeft = rec(left); //有序的左边数组，最后return出来的长度为1
    const orderRight = rec(right); //有序的右边数组
    const res = [];
    //当左边或者右边数组有值的情况下
    while (orderLeft.length || orderRight.length) {
      //当左边数组和右边数组都有值的情况下，比较左右两边数组的第一个数，将较小的数推入res中
      if (orderLeft.length && orderRight.length) {
        res.push(
          orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift()
        );
      }
      //如果右边数组值为空，左边不为空，将左边的数全部推入res
      else if (orderLeft.length) {
        res.push(orderLeft.shift()); //删除并返回数组的第一个元素
      } else if (orderRight.length) {
        res.push(orderRight.shift());
      }
    }
    //返回合并后的有序数组作为递归的结果
    return res;
  };

  const res = rec(arr)

  res.forEach((n, i) => {
    arr[i] = n;
  });
  console.log(rec(arr))

  return arr;
}

const d3 = mergeSort(arr)

console.log('归并排序结果：', d3)


/**
 * @description 快速排序
 * @desc 快速排序也是采用分治思想
 * 分区：
 * 从数组中任意选择一个“基准”（一般选第一个数），所有比基准小的元素放在基准前面，比基准大的元素放在基准后面，此时的基准元素已经找到合适的位置了，基准前面的数都比他小，后面的数都比他大
 * 递归：递归地对基准前后的子数组进行分区，这样就可以在子数组中找到一个“基准”将他放在合适的位置，递归到数组的长度小于2，结束递归，等所有的子数组都排序好了，排序完成
 * 时间复杂度：平均O(nlogn)，最坏O(n2)，实际上大多数情况下小于O(nlogn) 空间复杂度:O(logn)（递归调用消耗） 稳定性：不稳定，无法保证相等的元素的相对位置不变
 * */

function quickSort(arr) {
  arr = [...arr]
  const sort = (arr) => {
    if(arr.length < 2) {
      return arr
    }
    const left = []
    const right = []
    let temp = arr[0]
    let i = 1
    while(i < arr.length) {
      if(arr[i] < temp) left.push(arr[i])
      else right.push(arr[i])
      i++
    }
    return [...sort(left), temp, ...sort(right)]
  }
  return sort(arr)
}

const d4 = quickSort(arr)

console.log('快速排序结果：', d4)


/**
 * @description 二分搜索   -是一种在有序数组中查找元素的算法
 * @desc
 * 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束，返回中间元素下标值
 * 如果目标值大于或者小于中间元素，则在大于或者小于中间元素的那一半数组搜索
 * 递归重复第一步直到找到元素，否则返回-1
 * */

function binarySearch(arr, item) {
  let min = 0;
  let max = arr.length - 1;


  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    const element = arr[mid]; //中间元素
    if (element < item) {
      //目标元素在较大的那一半中，最小下边为mid+1
      min = mid + 1;
    } else if (element > item) {
      //目标元素在较小的那一半中，最大下边为mid-1
      max = mid - 1;
    } else {
      return mid;
    }
  }

  return -1
}

const d5 = binarySearch([1, 2, 3], 4)

console.log('二分搜索结果：', d5)


/**
 * @description BFS：广度优先  DFS：深度优先
 * @desc
 * 深度优先就是自上而下的遍历搜索 广度优先则是逐层遍历
 *
 * 两者的区别-对于算法来说 无非就是时间换空间 空间换时间
 * 深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
 * 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
 *
 * 深度优先采用的是堆栈的形式, 即先进后出
 * 广度优先则采用的是队列的形式, 即先进先出
 * */

const data = [
  {
    name: 'a',
    children: [
      { name: 'b', children: [{ name: 'e' }] },
      { name: 'c', children: [{ name: 'f' }] },
      { name: 'd', children: [{ name: 'g' }] },
    ],
  },
  {
    name: 'a2',
    children: [
      { name: 'b2', children: [{ name: 'e2' }] },
      { name: 'c2', children: [{ name: 'f2' }] },
      { name: 'd2', children: [{ name: 'g2' }] },
    ],
  }
]

// 深度优先，使用递归

function dfsFun(data) {
  const result = [];
  data.forEach(item => {
    const map = data => {
      result.push(data.name);
      data.children && data.children.forEach(child => map(child));
    }
    map(item)
  })

  return result
}

const d6 = dfsFun(data)

console.log('DFS深度优先结果：', d6)

// 深度优先

function dfsFun1(data) {
  const result = []
  const arr = [...data].reverse()
  while (arr.length) {
    const d = arr.pop()
    if(!d) continue;
    result.push(d.name);
    if(d.children) {
      for(let i = d.children.length-1; i >= 0; i--) {
        arr.push(d.children[i])
      }
    }
  }

  return result;
}

const d7 = dfsFun1(data)

console.log('DFS深度优先结果：', d7)

// 广度
function bfsFun(data) {
  const result = [];
  const queue = data;
  while (queue.length > 0) {
    [...queue].forEach(child => {
      queue.shift();
      result.push(child.name);
      child.children && (queue.push(...child.children));
    });
  }

  return result;
}

const d8 = bfsFun(data)

console.log('BFS广度优先结果：', d8)
