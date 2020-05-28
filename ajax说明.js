/**
 * 兼容全平台的XMLHttpRequest对象
 */
function getXHR() {
    let xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                throw error('您的浏览器暂不支持Ajax!');
            }            
        }
    }

    return xhr;
}

/**
 * xhr对象说明
 * 对象没有自身属性可以用hasOwnProperty来检测、所有属性继承与XMLHttpRequest.prototype
 * xhr << XMLHttpRequest.prototype << XMLHttpRequestEventTarget.prototype << EventTarget.prototype << Object.prototype
 * 所以可以xhr.toString();
 * xhr拥有10个普通属性+9个方法
 */
const xhr = getXHR();

/**
 * 只读属性、readyState记录ajax调用过程中所有可能出现的状态
 * 未初始化：0-对应常量xhr.UNSENT/请求已建立，但未初始化(此时未调用open方法)
 * 初始化: 1-对应常量xhr.OPENED/请求已建立，但未发送(已调用open，但未调用send方法)
 * 发送数据：2-对应常量xhr.HEADERS_RECEIVED/请求已发送(send已调用，已收到响应头)
 * 数据传输中：3-对应常量xhr.LOADING/请求处理中，因响应内容不全，这时通过responseBody和responseText获取可能出现错误
 * 完成：4-对应常量xhr.DONE/数据接收完毕，此时通过responseBody和responseText获取完成的响应资源
 */
xhr.readyState

/**
 * 在readyState状态改变时触发。一个ajax请求周期会触发4次，因此可以在方法中绑定一些事件回调。
 * 默认函数传入event实例
 */
xhr.onreadystatechange = function(e) {}

/**
 * 只读属性、表示HTTP的请求状态，初始值为0。
 * 如果服务器没有显示地指定状态码，那么将被设置默认值，即200
 */
xhr.status

/**
 * 只读属性，表示服务器的响应状态信息，它是一个UTF-16的字符串。
 * status==20x时返回大写的OK，请求失败返回空字符串，其它的情况返回相应的状态描述。比如：301的 Moved Permanently , 302的 Found , 303的 See Other , 307 的 Temporary Redirect , 400的 Bad Request , 401的 Unauthorized 等等。
 */
xhr.statusText

/** 
 * 在ajax请求发送之前触发，触发时机在readyState状态为1之后为2之前。 
 * 默认函数传入一个ProgressEvent事件进度对象：改对象具有三个重要只读属性
 * 1、lengthComputable表示长度是否可以计算，它是一个布尔值，初始值为false
 * 2、loaded表示长度已加载资源的大小，它是一个无符号长整型, 初始值为0.
 * 3、total表示资源总大小,，它是一个无符号长整型, 初始值为0.
*/
xhr.onloadstart = function(e) {}

/****
 * 在ajax数据传输中，即readySate为3时开始触发，默认传入ProgressEvent事件进度对象
 */
xhr.onprogress = function(e) {
    console.log('progress:', e.loaded/e.tatol); // 当前下载进度-注意: 该方法适用于 IE10+ 及其他现代浏览器.
}

/****
 * 在ajax请求成功后触发，即readyState为4之后。
 * 想要捕捉到一个ajax异步请求的成功状态, 并且执行回调, 一般下面的语句就足够了:
 */
xhr.onload = function() {
    const status = xhr.status;
    if((status >= 200 && status < 300) || status == 304) {
        const resp = xhr.responseText;
        // TODO ...
    }
}

/****
 * onloadend事件回调方法在ajax请求完成后触发, 触发时机在 readyState==4 状态之后(收到响应时) 或者 readyState==2 状态之后(未收到响应时).
 * 默认函数传入一个ProgressEvent事件进度对象
 */
xhr.onloadend = function(e) {}

/****
 * timeout属性用于指定ajax的超时时长，可以灵活控制ajax请求时间上限，timeout满足如下规则：
 * 1、通常设置为0时不生效
 * 2、设置为字符串时, 如果字符串中全部为数字, 它会自动将字符串转化为数字, 反之该设置不生效.
 * 3、设置为对象时, 如果该对象能够转化为数字, 那么将设置为转化后的数字.
 */
xhr.timeout = 0; //不生效
xhr.timeout = '123'; //生效, 值为123
xhr.timeout = '123s'; //不生效
xhr.timeout = ['123']; //生效, 值为123
xhr.timeout = {a:123}; //不生效

/****
 * ajax超时处理
 */
xhr.ontimeout = function(e) {
    console.log("请求超时!!!");
}

/****
 * 均为只读属性
 * response表示服务器的响应内容
 * responseText表示服务器响应内容的文本形式
 * responseXML表示xml形式的响应数据，缺省为null，若数据不是有些的xml，则会报错
 * responseType表示响应的类型，缺省为空字符串，可取"arraybuffer" , "blob" , "document" , "json" , and "text" 共五种类型
 * responseURL返回ajax请求的最终URL, 如果请求中存在重定向, 那么responseURL表示重定向之后的URL
 */
xhr.response
xhr.responseText
xhr.responseXML
xhr.responseType
xhr.responseURL

/****
 * withCredentials是一个布尔值, 默认为false, 表示跨域请求中不发送cookies等信息. 当它设置为true时, cookies , authorization headers 或者TLS客户端证书 都可以正常发送和接收. 显然它的值对同域请求没有影响.
 * 注意: 该属性适用于 IE10+, opera12+及其他现代浏览器.
 */
xhr.withCredentials = true;

/****
 * abort方法用于取消ajax请求, 取消后, readyState 状态将被设置为 0 (UNSENT). 调用abort 方法后, 请求将被取消.
 */
xhr.abort();

/****
 * getResponseHeader方法用于获取ajax响应头中指定name的值. 如果response headers中存在相同的name, 那么它们的值将自动以字符串的形式连接在一起.
 */
console.log(xhr.getResponseHeader('Content-Type')); //"text/html"

/****
 * getAllResponseHeaders方法用于获取所有安全的ajax响应头, 响应头以字符串形式返回. 每个HTTP报头名称和值用冒号分隔, 如key:value, 并以\r\n结束.
 */
xhr.onreadystatechange = function() {
    if(this.readyState == this.HEADERS_RECEIVED) {
        console.log(this.getAllResponseHeaders());
    }
    //Content-Type: text/html"
}

/****
 * 设置请求头
 */
xhr.setRequestHeader("Content-type", "application/json"); //指定请求的type为json格式
xhr.setRequestHeader('x-requested-with', '123456'); //除此之外, 还可以设置其他的请求头

/****
 * onerror方法用于在ajax请求出错后执行. 通常只在网络出现问题时或者ERR_CONNECTION_RESET时触发(如果请求返回的是407状态码, chrome下也会触发onerror).
 */
xhr.onerror = function(e) {}

