import zt_fs from './fs';
import zt_log from './log';

export default {
  /**
   * 滑动块数值转换
   * 0-1的小数与1-100的整数互相转换
   * @param number
   * @param isFloat 是否是小数
   * @export number 返回转换后的数值
   */
  rangeNumberConvert(number, isFloat) {
    if (isFloat) {
      return parseInt(number * 100, 10);
    }
    return parseFloat(number / 100).toFixed(2);
  },

  /**
   * 获取时间字符串
   * @param {String | number | undefined} datetime 日期字符串、时间戳
   * @param {Boolean} isFull 是否显示全量日期
   * @return {String} 时间字符串
   */
  getDate(datetime, isFull) {
    const date = datetime ? new Date(datetime) : new Date();
    const year = date.getFullYear();
    const mouth = date.getMonth() + 1;
    const day = date.getDate();
    let dateStr = `${year}-${mouth}-${day}`;
    if (isFull) {
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      dateStr += ` ${hour}:${minute}:${second}`;
    }
    return dateStr;
  },

  /**
   * 获取当前日期
   * @param {Boolean} isFull 是否显示全量日期
   * @return {String} 时间字符串
   */
  getCurrentDate(isFull) {
    return this.getDate('', isFull);
  },
  
  /**
   * 获取计算日期
   * @param {number} days 天数，必须为整数，包含负数
   * @param {Boolean} isFull 是否显示全量日期
   * @return {String} 时间字符串
   */
  getComputeDate(days, isFull) {
    const times = new Date().getTime();
    const date = new Date(times + days * 24 * 60 * 60 * 1000);
    return this.getDate(date, isFull);
  },

  /**
   * 编码数据
   * @param {String} data
   * @return {String}
   *
   */
  encode(data) {
    if (typeof data !== 'string') {
      return '';
    }
    const PASMIXIN = 'xskf45w525fdxdfe6c2w85c24gt5c2x6sew75c2d5w62cxs6';
    const strArr = data.split('').reverse();
    let str = '';
    strArr.forEach(item => {
      const index = parseInt(Math.random() * PASMIXIN.length - 1);
      str += PASMIXIN.substr(index, 2) + item;
    });
    return str;
  },
  
  /**
   * 解码 this.encode 编码的数据
   * @param {String} data
   * @return {String}
   *
   */
  decode(data) {
    if (typeof data !== 'string') {
      return '';
    }
    const strArr = data.split('');
    const res = [];
    for (let i = 2; i < strArr.length; i += 3) {
      res.push(strArr[i]);
    }
    return res.reverse().join('');
  },
  
  /**
   * 小屏的方式，打开文件目录
   * @param {string} path 从path目录打开
   * @export {string | undefined} 返回选中的目录地址
   *
   */
  openDirectory(path, title) {
    title = title || '选择目录';
    const res = window.cep.fs.showOpenDialog(false, true, title, path, '');
    if (res && res.err === 0) {
      return res.data[0];
    }
    return undefined;
  },
  
  /**
   * 大屏的方式，打开文件目录，默认打开上次打开位置
   * @param {string} path 从path目录打开
   * @export {string | undefined} 返回选中的目录地址
   *
   */
  openDirectoryEx(path, title) {
    title = title || '选择目录';
    const res = window.cep.fs.showOpenDialogEx(false, true, title, path, '');
    if (res && res.err === 0) {
      return res.data[0];
    }
    return undefined;
  },
  
  /**
   * 将更改的 config 数据保存到本地文档中
   *
   */
  saveConfig() {
    return zt_fs.writeFileSync(CONFIG.config_address, JSON.stringify(CONFIG, null, 2));
  },
  
  /**
   * 将更改的 config 数据保存到本地文档中
   *
   */
  saveWarehouseConfig(msg) {
    msg = msg || '更改配置文件';
    const path = `${CONFIG.warehouse_config_dir}/config.txt`;
    const data = this.generateConfig(CONFIG.warehouse_config);
    // console.log("data", data);
    // console.log("path", path);
    return new Promise(((resolve, reject) => {
      const bool = zt_fs.writeFileSync(path, data);
      bool ? resolve(bool) : reject(bool);
    })).then(() => zt_svn.commit(msg, path));
  },
  
  /**
   * 调用jsx文件方法
   * @param {string} args 执行函数字符串
   *
   */
  evalScript(args) {
    return new Promise((resolve => {
      zt_log.info('jsx 执行参数：', args);
      csInterface.evalScript(args, result => {
        const res = this.handleJsxResult(result);
        const _result = result.length > 500 ? `${result.substr(0, 500)}...` : result;
        zt_log.info('jsx 执行参数：', args, 'jsx 返回值：', _result);
        resolve(res);
      });
    }));
  },
  
  // 保存psd文件
  saveFile(path, fileName, _isPsdNoTrim, allpsd) {
    return this.evalScript(
      `saveTemplate('${path}','${fileName}', '${CONFIG.isAutoClearPsd}', '${_isPsdNoTrim}', '${allpsd}')`
    );
  },
  
  /**
   * 打开文件夹
   * @param {string} path 文件夹目录地址
   *
   */
  openFolder(path) {
    this.evalScript(`openFolder('${path}')`);
  },
  
  // 打开psd文件
  openPSD(path) {
    createPsdHelper();
    return this.evalScript(`openPSD("${path}","${CONFIG.font_dir}")`);
  },

  // 安装指定字体
  installFont(fontname) {
    return this.evalScript(`installFont("${fontname}","${CONFIG.font_dir}")`);
  },
  
  // 处理jsx执行函数返回结果
  handleJsxResult(result) {
    let res = {};
    try {
      res = JSON.parse(result);
    } catch (error) {
      res.msg = result;
    }
    return res;
  },
  
  /**
   * 排除不渲染的文件夹
   * @param {Array} data 文件夹列表
   * @param {String | Array} folders 排除的文件夹列表
   * @return {Array} 已排除的数据
   */
  exceptFolders(data, folders) {
    if (typeof folders === 'string') {
      folders = [folders];
    }
    if (folders.length === 0) {
      return data;
    }
    const index = data.indexOf(folders.shift());
    if (index > -1) {
      data.splice(index, 1);
    }
    return this.exceptFolders(data, folders);
  },

  /**
   * 过滤文件，返回所有文件夹
   * @param {array} data 文件夹列表
   * @param {string} prefix 路径前缀
   * @return {array} 所有文件夹
   *
   */
  filterFolders(data, prefix) {
    const folders = [];
    data.forEach(item => {
      if (zt_fs.isDirectory(`${prefix}/${item}`)) {
        folders.push(item);
      }
    });
    return folders;
  },

  /**
   * 去除字符串前后空格
   * @param {string} str
   *
   */
  trim(str) {
    return str ? str.replace(/^\s+|\s+$/gm, '') : '';
  },
  
  /**
   * loading 方法
   * start 加载loading
   * close 关闭loading
   *
   */
  loading: {
    start(options = {}) {
      let timeout = 30;
      const isLogin = options.isLogin;
      const isUpload = options.isUpload;
      $('#loading').css({ display: 'flex',
        backgroundColor: isLogin ? '#292929' : 'rgba(0, 0, 0, .6)' });
      let type = 'other';
      if (isLogin) {
        const timer = setInterval(() => {
          timeout -= 1;
          this.countDown(timeout);
        }, 1000);

        $('.loading-time').data('timer', timer).show().find('span')
          .text(`${timeout}s`);
        type = 'login';
      } else if (isUpload) {
        type = 'upload';
        $('.loading-tip').show();
      }
      $('.loading-content').find('img').hide().end()
        .find(`img[type=${type}]`)
        .show();
    },

    close(isLogin) {
      $('#loading').css('display', 'none');
      $('.loading-tip').hide();
      $('.login-loading button').hide();
      $('.loading-time').hide();
      const timer = $('.loading-time').data('timer');
      if (timer) {
        clearInterval(timer);
        $('.loading-time').removeData('timer');
      }
    },
    reLoading() {
      return zt_svn.close();
      // $(".login-loading button").hide()
      // $('.loading-time').show();
      // var timeout = CONFIG.timeout;
      // $('.loading-time span').text(timeout + 's');
    },
    countDown(number) {
      $('.loading-time span').text(`${number}s`);
      if (number === 0) {
        $('.login-loading button').show();
        $('.loading-time').hide();
      }
    }
  },


  /**
   * 处理可关闭弹层显示
   * 例如select选择方法，点击select之外的元素，关闭弹出层
   * @param {Object} event 事件对象
   * @param {Object} node 触发当前事件的节点
   *
   */
  handleCanCloseLayer(event, node) {
    event.stopPropagation();
    if (!node.is(':visible')) {
      $('.window-close').hide();
    }
    node.toggle();
  },
  isArray(data) {
    return Object.prototype.toString.call(data) === '[object Array]';
  },
  isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
  },
  isArguments(data) {
    return Object.prototype.toString.call(data) === '[object Arguments]';
  },
  deepCopy(data) {
    let newData;
    const self = this;
    if (this.isArray(data)) {
      newData = [];
      data.forEach(item => {
        newData.push(self.deepCopy(item));
      });
    } else if (this.isObject(data)) {
      newData = {};
      for (const key in data) {
        newData[key] = self.deepCopy(data[key]);
      }
    } else {
      newData = data;
    }
    return newData;
  },
  // 解析config配置
  parseConfig(config) {
    const field = '@field:';
    const c_key = ' __value__ ';
    const data = config.split('\n');
    const action = {};
    let key = '';
    data.forEach(item => {
      item = this.trim(item);
      if (item.indexOf(field) === 0) {
        item = item.replace(field, '');
        const index = item.indexOf('=');
        if (index > 0) {
          action[item.substring(0, index)] = item.substr(index + 1);
        } else {
          key = item;
        }
      } else if (key && item) {
        const _index = item.indexOf(c_key);
        if (_index > 0) {
          action[key] ? '' : (action[key] = {});
          action[key][item.substring(0, _index)] = item.substr(_index + 11);
        } else {
          action[key] ? action[key].push(item) : (action[key] = [item]);
        }
      }
    });
    return action;
  },
  // 生成config配置
  generateConfig(json) {
    const field = '@field:';
    const c_key = ' __value__ ';
    let str = '';
    for (const key in json) {
      if (this.isArray(json[key])) {
        str += `${field + key}\r\n`;
        json[key].forEach(item => {
          str += `${item}\r\n`;
        });
      } else if (this.isObject(json[key])) {
        str += `${field + key}\r\n`;
        for (const _key in json[key]) {
          str += `${_key + c_key + json[key][_key]}\r\n`;
        }
      } else {
        str += `${field + key}=${json[key]}\r\n`;
      }
    }
    return str;
  },

 
  // 查看日志
  viewLog(path, size) {
    this.loading.start();
    zt_update.checkBatchUpdate(next => {
      zt_svn
        .log(path, size)
        .then(res => {
          $('.dialog-box[data-type=\'log\']').show();
          $('.log-box').text(res.stdout);
        })
        .catch(() => {
          $.message.error('查看日志失败');
        })
        .finally(() => {
          next && next();
          this.loading.close();
        });
    });
  },
  // 远程服务器加密
  buildSercet(data) {
    // 加密key
    const SECRETKEY = 'HPjNuIfUlxSnhzDpKW3oX1LQMsVF2w7emROb60Td8Y4ZkEryt5ivCc9GqBJAga';
    const len = data.length;
    if (len > 52) {
      return '';
    }
    let str = '';
    // 可插入字符串的长度
    const insertLen = 62 - len;
    // 间隔几个字符插入一次
    const interval = len > insertLen ? Math.floor(len / insertLen) : 1;
    // 每次插入字符的数量
    const insertNum = len > insertLen ? 1 : Math.floor(insertLen / len);
    // 可执行插入的次数
    const _len = Math.floor(
      len > insertLen ? insertLen / insertNum : len / interval
    );
    for (let i = 0; i < _len; i++) {
      var _index = Math.ceil(Math.random() * (62 - insertNum)) - 1;
      str += SECRETKEY.substr(_index, insertNum);
      str += data.substr(i * interval, interval);
    }
    if (len > _len * interval) {
      // 对未拼接的字符进行拼接
      str += data.substr(_len * interval);
    }
    if (str.length < 62) {
      // 拼接完成，长度不够，则进行补拼
      var _index = Math.ceil(Math.random() * (62 - str.length)) - 1;
      str += SECRETKEY.substr(_index, 62 - str.length);
    }
    // 标注被插入字符长度
    str += SECRETKEY[len];
    // 标注生成token字符串的日期
    str += SECRETKEY[this.getDateRuleNumber()];
    return str;
  },
  // 获取日期规则数值，用于校验生成的token字符串是否是与服务器时间一致
  getDateRuleNumber() {
    const date = new Date();
    const year = `${date.getFullYear()}`;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return Number(year.slice(year.length - 2)) + month + day;
  },

  dataURLtoFile(data, filename, type) {
    const bstr = atob(data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type });
  },


  clear() {
    // 清除文件
    const dir = CONFIG.current_project_dir;
    this.loading.start();
    zt_update.checkBatchUpdate(next => {
      zt_svn.revert(dir).then(() => zt_svn.status(dir)).then(res => {
        const str = res.stdout;
        const data = str ? str.split('\n') : [];
        data.forEach(item => {
          if (item) {
            const path = item.substring(8, item.length - 1).replace(/\\/g, '/');
            zt_fs.delete(path);
          }
        });
      }).finally(() => {
        this.loading.close();
        next && next();
      });
    });
  },
  
  copyImg(targetNode) {
    if (window.getSelection) {
      // chrome等主流浏览器
      const selection = window.getSelection();
      var range = document.createRange();
      range.selectNode(targetNode);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.body.createTextRange) {
      // ie
      var range = document.body.createTextRange();
      range.moveToElementText(targetNode);
      range.select();
    }
    document.execCommand('copy');
  },
  copyText(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  },
  computeBoxSize() {
    const box = $('#container');
    const renderData = CONFIG.renderData;
    renderData.width = box.width() - 50;
    renderData.height = box.height() - 124;
    renderData.row = Math.floor(renderData.width / renderData.liWidth) || 1;
  },
  computeRenderData(index, isFold) {
    // 子类数据展开折叠功能
    const renderData = CONFIG.renderData;
    const current = renderData.data[index];
    let i = index + 1;
    let totalHeight = current.height[1];
    current.unfold = isFold ? 0 : 1;
    while (i < renderData.data.length) {
      const item = renderData.data[i];
      if (item.isAdd) {
        totalHeight += 20;
        item.height = [totalHeight, totalHeight + 50];
        totalHeight += 50;
        break;
      }
      if (item.title === current.title) {
        item.isFold = !!isFold;
        if (!isFold) {
          item.height = [totalHeight, totalHeight + renderData.liHeight];
          totalHeight += renderData.liHeight;
        }
      } else if (item.type === 1) {
        totalHeight += 20;
        item.height = [totalHeight, totalHeight + 32];
        totalHeight += 32;
      } else if (!item.isFold) {
        item.height = [totalHeight, totalHeight + renderData.liHeight];
        totalHeight += renderData.liHeight;
      }
      i++;
    }
    renderData.totalHeight = totalHeight;
    zt_render.virtualWheel();
  }
};
