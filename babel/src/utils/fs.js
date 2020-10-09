
const fs = require('fs');

/** 自定义fs模块 */
function FS() {}

/** 全局FS实例 */
window.zt_fs = new FS();

/**
   *
   * 由于处理函数返回 undefined
   * 调用 console 会阻塞程序运行
   * 调试工具weiner无法获取后续打印日志
   * 错误一律返回 Boolean: false
   *
   */

/**
   * 判断文件路径是否存在
   * @param {String} path 文件路径js
   * @export {Boolean}
   *
   */
FS.prototype.existsSync = function (path) {
  return fs.existsSync(path);
};

/**
   * 判断是否是文件夹
   * @param {String} path 文件路径
   * @export {Boolean}
   *
   */
FS.prototype.isDirectory = function (path) {
  try {
    const stats = fs.lstatSync(path);
    return stats.isDirectory();
  } catch (error) {
    zt_log.error('fs isDirectory: ', error);
    return false;
  }
};

/**
   * 读取文件夹
   * @param {String} path 文件夹路径
   * @export {String[] | undefined} 文件夹内容列表
   *
   */
FS.prototype.readdirSync = function (path) {
  try {
    return fs.readdirSync(path);
  } catch (error) {
    zt_log.error('fs readdirSync: ', error);
    return [];
  }
};

/**
   * 读取文件
   * @param {String} filePath 文件路径
   * @param {String} encoding 文件编码格式，默认utf-8
   * @export {String | undefined} 文件内容
   *
   */
FS.prototype.readFileSync = function (filePath, encoding) {
  if (encoding !== null) {
    encoding = encoding || 'utf-8';
  }
  try {
    return fs.readFileSync(filePath, {
      encoding
    });
  } catch (error) {
    zt_log.error('fs readFileSync: ', error);
    return undefined;
  }
};

/**
   * 创建文件夹
   * @param {String} path 文件路径
   * @export {Boolean}
   *
   */
FS.prototype.mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
    return true;
  } catch (error) {
    if (path !== CONFIG.log_dir) {
      zt_log.error('fs mkdirSync: ', error);
    }
    return false;
  }
};

/**
   * 创建深层文件夹
   * @param {String} rootPath 文件夹跟目录
   * @param {String[]} dirArr 文件夹名数组
   * @export {Boolean}
   *
   */
FS.prototype.mkdirArrSync = function (rootPath, dirArr) {
  let path = rootPath;
  let isSuccess = true;
  for (let i = 0; i < dirArr.length; i++) {
    path += `/${dirArr[i]}`;
    if (!this.existsSync(path) && !this.mkdirSync(path)) {
      isSuccess = false;
      break;
    }
  }
  return isSuccess;
};

/**
   * 写入文件
   * @param {String} filePath 文件路径
   * @param {String} data json字符串
   * @param {String} encoding 存储编码格式，默认utf-8
   * @export {Boolean}
   *
   */
FS.prototype.writeFileSync = function (filePath, data, encoding) {
  encoding = encoding || 'utf-8';
  try {
    fs.writeFileSync(filePath, data, {
      encoding
    });
    return true;
  } catch (error) {
    zt_log.error('fs writeFileSync: ', error);
    return false;
  }
};

/**
   * 同步地将数据追加到文件，如果文件尚不存在则创建该文件
   * @param {String} path 文件路径
   * @param {String} data 追加的文件数据
   * @param {String} encoding 存储编码格式，默认utf-8
   * @return {Boolean}
   *
   */
FS.prototype.appendFileSync = function (path, data, encoding) {
  encoding = encoding || 'utf-8';
  try {
    fs.appendFileSync(path, data, {
      encoding
    });
    return true;
  } catch (error) {
    if (path.indexOf(CONFIG.log_dir) === -1) {
      zt_log.error('fs appendFileSync: ', error);
    }
    return false;
  }
};

/**
   * 文件重命名
   * @param {String} oldPath 旧的路径名
   * @param {String} newPath 新的路径名
   * @export {Boolean}
   *
   */
FS.prototype.renameSync = function (oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath);
    return true;
  } catch (error) {
    zt_log.error('fs renameSync: ', error);
    return false;
  }
};

/**
   * 删除文件夹
   * @param {String} path 文件夹路径
   * @return {Boolean}
   *
   */
FS.prototype.rmdirSync = function (path) {
  try {
    fs.rmdirSync(path);
    return true;
  } catch (error) {
    zt_log.error('fs rmdirSync: ', error);
    return false;
  }
};

/**
   * 删除文件
   * @param {String} path 文件路径
   * @return {Boolean}
   *
   */
FS.prototype.rmfileSync = function (path) {
  try {
    fs.unlinkSync(path);
    return true;
  } catch (error) {
    zt_log.error('fs rmfileSync: ', error);
    return false;
  }
};

/**
   * 删除文件或文件夹
   * @param {String | String[]} paths 文件路径
   * @return {Boolean}
   *
   */
FS.prototype.delete = function (paths) {
  const self = this;
  if (typeof paths === 'string') {
    paths = [paths];
  }
  function execDelete(paths, prefix) {
    return paths.every(path => {
      path = prefix ? `${prefix}/${path}` : path;
      if (!self.existsSync(path)) return true;
      if (self.isDirectory(path)) {
        const folders = self.readdirSync(path);
        return execDelete(folders, path) && self.rmdirSync(path);
      }
      return self.rmfileSync(path);
    });
  }
  return execDelete(paths);
};

/**
   * 文件深层复制功能
   * @param {String[]} oldPaths 源目录地址
   * @param {String[]} newPaths 复制目录地址
   * @return {Boolean}
   *
   */
FS.prototype.copy = function (oldPaths, newPaths) {
  const self = this;
  if (typeof oldPaths === 'string') {
    oldPaths = [oldPaths];
  }
  if (typeof newPaths === 'string') {
    newPaths = [newPaths];
  }
  function execCopy(oldPath, newPath, suffix) {
    if (self.existsSync(newPath) || self.mkdirSync(newPath)) {
      return suffix.every(fileName => {
        const _oldPath = `${oldPath}/${fileName}`;
        const _newPath = `${newPath}/${fileName}`;
        if (self.isDirectory(_oldPath)) {
          const folders = self.readdirSync(_oldPath);
          return execCopy(_oldPath, _newPath, folders);
        }
        const content = self.readFileSync(_oldPath, 'binary');
        return content && self.writeFileSync(_newPath, content, 'binary');
      });
    }
    return false;
  }
  return oldPaths.every((oldPath, index) => {
    if (self.isDirectory(oldPath)) {
      const folders = self.readdirSync(oldPath);
      return execCopy(oldPath, newPaths[index], folders);
    }
    const content = self.readFileSync(oldPath, 'binary');
    return (
      content && self.writeFileSync(newPaths[index], content, 'binary')
    );
  });
};

export default window.zt_fs;
