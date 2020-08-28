### file使用文档说明

1、 fileList对象来自input元素的files属性

-----------

```html
    <input type="file" id="file" />
```

```js
    const files = document.getElementById('file').files;
    console.log(files.item(0)); // 可以通过item来获取属性
```

2、 file对象来自fileList对象的属性、可以用item获取。基于Blob对象

--------

```js
    const file = new File(["foo"], 'foo.text', {type: 'text/plain'});
    flie.name; // 当前file对象引用的文件名字
    file.size; // 当前file对象文件的大小
    file.type; // 当前file对象的MIME type
    file.lastModifiedDate; //当前file对象最后修改时间的date对象
```

3、Blob对象表示不可变、原始数据的类文件对象

--------

```js
    var debug = {hello: "world"};
    var blob = new Blob([JSON.stringify(debug)], {type: 'application/json'});
    blob.size; // Blob对象中所包含数据的大小(字节)
    blob.type; // 一个字符串、表示blob对象的MIME type
```

4、FileReader对象允许异步读取File对象或者Blob对象

--------

```js
    const reader = new FileReader(file);

    // 属性
    reader.error; // 表示读取文件时发生的错误
    reader.readyState; // 表示读取状态的数字
    reader.result; // 表示读取完成的文件内容
    reader.onabort; // 表示阻止读取文件需要处理的程序--即执行render.abort();
    
    // 事件处理
    reader.onerror = function() {} // 处理读取错误时触发
    reader.onload = function() {} // 处理读取操作完成时触发
    reader.onloadstart = function() {} // 处理读取开始
    reader.onloadend = function() {} // 处理读取结束-不论成功失败都会执行
    reader.onprogress = function() {} // 该事件在读取Blob时触发
    
    // 方法
    reader.abort() // 中止读取操作、readyState属性为DONE
    reader.readAsArrayBuffer() // 读取成功后数据结果是ArrayBuffer数据对象
    reader.readAsBinaryString() // 读取完成后数据结果是原始二进制数据
    reader.readAsDataURL() // 读取完成后数据是data:URL格式的访问地址
    reader.readAsText() // 读取完成后数据是字符串表示的文件内容
    
```

5、URL对象--可以用来访问文件

--------

```js
    var objectURL = window.URL.createObjectURL(fileObj); // 创建一个唯一的blob连接
    window.URL.revokeObjectURL(objectURL); // 销毁之前创建的链接
```

6、FormData对象用来文件上传

--------

```js
    var formData = new FormData();
    formData.append("fileName", fileInputElement.files[0]); // HTML 文件类型input，由用户选择
```




























