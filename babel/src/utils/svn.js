
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import zt_fs from './fs';
import zt_log from './log';

const child_process = require('child_process');

/** 自定义SVN模块 */
function SVN() {
  // 是否可执行命令，svn同时只允许执行一条命令
  // this.executable = true;
  // 错误类型
  this.error_types = {
    notInstalled: 1,
    notPermission: 2,
    notControl: 3,
    alreadyControl: 4,
    outOfDate: 5,
    cleanup: 6,
    conflict: 7,
    updating: 8
  };
  // 设置checkout or update depth 类型
  this.depth = {
    empty: 'empty',
    immediates: 'immediates',
    files: 'files',
    infinity: 'infinity'
  };
  // 当前运行子进程
  this.childProcess = null;


  this.openBrowser = url => {
    this.exec({
      command: `start ${url}`,
      type: 'openBrowser'
    });
  };

  /**
   * svn 执行命令方法
   * @param {String} command 所用执行的命令
   * @param {Number | Undefined} type 执行命令类型
   * @param {Boolean} bool 当执行命令发生错误时，是否需要再次执行该命令
   * @export {Promise} 返回执行命令promise对象
   * 执行成功 resolve {object} 命令返回值 stdout / stderr
   * 执行失败 reject {string} 错误对象字符串
   *
   */
  this.exec = (params, bool) => {
    const self = this;
    const encoding = 'gbk';
    const binaryEncoding = 'binary';
    const command = params.command;
    const type = params.type;
    const path = params.path;

    
    return new Promise(((resolve, reject) => {
      if (self.childProcess) {
        return reject({
          command_type: type,
          msg: 'svn同时不允许执行多条命令'
        });
      }
      if (!CONFIG.warehouse_dir) {
        return reject({
          command_type: type,
          msg: '请选择本地仓库'
        });
      }
      try {
        // self.executable = false;
        self.childProcess = child_process.exec(
          command,
          {
            cwd: CONFIG.warehouse_dir,
            encoding: binaryEncoding,
            timeout: 10 * 60 * 1000
            // shell: "cmd.exe",
          },
          (error, stdout, stderr) => {
            self.childProcess = null;
            // self.executable = true;
            if (error) {
              const errorMsg = new Buffer(error.toString(), binaryEncoding);
              const error_str = iconv.decode(
                errorMsg,
                encoding
              );
              const error_obj = self.handleError(error_str, type);
              if (
                error_obj.error_type === self.error_types.outOfDate
                  && error_obj.command_type === 'commit'
                  && !bool
              ) {
                // 发生commit提交out of date错误时，尝试更新所操作的文件，再提交一次
                self
                  .exec(`svn update ${path}`, 'update')
                  .then(() => self.exec(command, type, true))
                  .then(_res => {
                    resolve(_res);
                  })
                  .catch(_err => {
                    reject(_err);
                  });
              } else if (
                error_obj.error_type === self.error_types.notPermission
                  || error_obj.error_type === self.error_types.conflict
              ) {
                self.revert(path).finally(() => {
                  reject(error_obj);
                });
              } else if (
                error_obj.error_type === self.error_types.cleanup
                  && type !== 'cleanup'
                  && !bool
              ) {
                // 发生clearup错误时，先执行clearup，再尝试执行一次命令
                self
                  .revert(path)
                  .then(() => self.cleanup(path))
                  .then(() => self.exec(command, type, true))
                  .then(_res => {
                    resolve(_res);
                  })
                  .catch(_err => {
                    reject(_err);
                  });
              } else if (
                type === 'add'
                  && error_obj.error_type === self.error_types.alreadyControl
              ) {
                // add文件时，已在版本库的文件报错时，默认add成功
                resolve({
                  stdout: '改文件已加入版本控制',
                  command_type: type
                });
              } else {
                reject(error_obj);
              }
            } else {
              stdout = stdout
                ? iconv.decode(new Buffer(stdout, binaryEncoding), encoding)
                : '';
              stderr = stderr
                ? iconv.decode(new Buffer(stderr, binaryEncoding), encoding)
                : '';
              if (stdout.indexOf('conflicts') > -1) {
                self.revert(path).finally(() => {
                  resolve({
                    stdout,
                    stderr,
                    command_type: type
                  });
                });
              } else {
                resolve({
                  stdout,
                  stderr,
                  command_type: type
                });
              }
            }
          }
          
        );
      } catch (error) {
        self.childProcess = null;
        // self.executable = true;
        zt_log.error('child_process exec try catch: ', error);
        reject({
          command_type: type,
          msg: '执行svn命令失败'
        });
      }
    }));
  };

  
  /**
   * 查看仓库目录
   * @param {String} dir 目录地址
   * @param {Boolean} checkAll 是否全量检索，默认为false，只检索直属一级
   * @return {Promise}
   */
  this.list = (dir, checkAll) => {
    dir = `${CONFIG.remoteUrl}/${dir || ''}`;
    checkAll = checkAll ? '-R' : '';
    if (dir.indexOf('@') > -1) {
      dir += '@';
    }
    return this.exec({
      command: `svn ls ${checkAll} "${dir}"`,
      type: 'list',
      path: `"${dir}"`
    });
  };
}


/**
   * svn命令执行错误处理
   * @param {string} error_str 错误信息
   * @param {number} type 执行方式类型
   * @export {string} 可提示的错误信息
   *
   */
SVN.prototype.handleError = function (error_str, type) {
  zt_log.error(`svn exec error: code [${type}] `, error_str);
  let error_type = '';
  let msg = '';
  if (
    error_str.indexOf('不是内部或外部命令') > -1
      || error_str.indexOf('not recognized as an internal or external command')
        > -1
  ) {
    error_type = this.error_types.notInstalled;
    msg = 'svn命令无法执行，请检查电脑是否安装了svn';
  } else if (
    error_str.indexOf('Access to') > -1
      && error_str.indexOf('forbidden') > 0
  ) {
    error_type = this.error_types.notPermission;
    msg = 'svn操作权限不足';
  } else if (error_str.indexOf('cleanup') > 0) {
    error_type = this.error_types.cleanup;
    msg = 'cleanup错误，svn命令无法执行';
  } else if (error_str.indexOf('is out of date') > -1) {
    error_type = this.error_types.outOfDate;
    msg = 'svn命令执行出错，需要更新文件';
  } else if (error_str.indexOf('some targets are already versioned') > 0) {
    error_type = this.error_types.alreadyControl;
    msg = '操作目标已在版本控制内';
  } else if (error_str.indexOf('conflict') > 0) {
    error_type = this.error_types.conflict;
    msg = '文件冲突，请重新尝试';
  } else if (error_str.indexOf('try updating it first') > 0) {
    error_type = this.error_types.updating;
    msg = '文件需要更新，请刷新重试';
  } else if (error_str.indexOf('does not exist') > 0) {
    msg = '文件不存在或不在版本控制内';
  }
  return {
    command_type: type,
    error_type,
    msg
  };
};

/**
   * 将文件更新到最新版本
   * @param {String} dir 需要更新的文件目录
   * @param {String} depth 更新depth类型
   * @return {Promise}
   *
   */
SVN.prototype.update = function (dir, depth) {
  const path = this.handleExecParams(dir);
  depth = depth || this.depth.infinity;
  return this.exec({
    command: `svn update --set-depth=${depth} ${path}`,
    type: 'update',
    path
  });
};

/**
   * 解决文件锁定，报cleanup错误
   * @return {Promise}
   *
   */
SVN.prototype.cleanup = function (path) {
  var path = path || `"${CONFIG.current_project_dir}"`;
  return this.exec({
    command: `svn cleanup ${path}`,
    type: 'cleanup',
    path
  });
};


/**
   * 撤销所有文件修改
   * @return {Promise}
   *
   */
SVN.prototype.revert = function (path) {
  path = path || CONFIG.current_library_dir;
  return this.exec({
    command: 'svn revert -R ' + `"${path}"`,
    type: 'revert',
    path: `"${path}"`
  });
};

/**
   * svn status 获取本地svn文件状态
   * @return {Promise} 返回执行命令的promise对象
   *
   */
SVN.prototype.status = function (path) {
  path = path ? `"${path}"` : '';
  return this.exec({
    command: `svn status ${path}`,
    type: 'status',
    path
  });
};

/**
   * svn add 将本地仓库文件加入版本库
   * @return {Promise} 返回执行命令的promise对象
   *
   */
SVN.prototype.add = function (path) {
  path = path ? this.handleExecParams(path) : '.';
  return this.exec({
    command: `svn add ${path} --no-ignore --force`,
    type: 'add',
    path
  });
};

/**
   * svn delete 删除远程本地仓库文件
   * @param {string} filesPath 所删除文件的字符串组合
   * @return {Promise} 返回执行命令的promise对象
   *
   */
SVN.prototype.delete = function (filesPath) {
  filesPath = this.handleExecParams(filesPath);
  return this.exec({
    command: `svn delete ${filesPath}`,
    type: 'delete',
    path: filesPath
  });
};

/**
   * svn checkout 拉取远程代码
   * @param {String} depth checkout depth 类型
   * @return {Promise} 返回执行命令的promise对象
   *
   */
SVN.prototype.checkout = function (warehouse, depth) {
  depth = depth ? `--depth=${depth}` : '';
  return this.exec({
    command: `svn checkout ${depth} ${this.remoteUrl}/${warehouse} --username ${CONFIG.account} --password ${CONFIG.password}`,
    type: 'checkout'
  });
};

/**
   *
   * svn login 插件登录，svn远程仓库验证
   * 如果仓库不存在，则拉取远程并建立本地仓库；如果存在，则拉取远程文件到本地
   * @param {String} username svn 用户名称
   * @param {String} password svn 用户密码
   * @return {Promise} 返回执行命令的promise对象
   *
   */
SVN.prototype.login = function (username, password) {
  if (zt_fs.existsSync(`${CONFIG.warehouse_config_dir}/.svn`)) {
    return this.exec({
      command: `svn update "${CONFIG.warehouse_config_dir}" --username "${username}" --password "${password}"`,
      type: 'login',
      path: `"${CONFIG.warehouse_config_dir}"`
    });
  }
  return this.checkout('config');
};

/**
   * svn commit 提交文件到远程仓库
   * @param {String} msg 该次提交的备注信息
   * @return 返回执行命令的promise对象
   *
   */
SVN.prototype.commit = function (msg, paths) {
  const path = paths ? this.handleExecParams(paths) : '';
  msg = msg || '同步文件';
  return this.exec({
    command: `svn commit ${path} -m "${msg}"`,
    type: 'commit',
    path
  });
};

/**
   * 执行删除
   * @param {String|String[]} paths 文件路径
   * @return {Promise}
   *
   */
SVN.prototype.exec_delete = function (paths) {
  const self = this;
  return new Promise(((resolve, reject) => {
    if (zt_fs.delete(paths)) {
      self
        .delete(paths)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          if (error.type === self.error_types.notControl) {
            resolve({
              stdout: '文件已删除'
            });
          } else {
            reject(error);
          }
        });
    } else {
      reject('删除文件失败');
    }
  }));
};

/**
   * 执行文件移动
   * @param {Array} [原路径, 新路径]
   *
   */
SVN.prototype.move = function (paths) {
  const str = this.handleExecParams(paths);
  const self = this;
  return self.exec({
    command: `svn move ${str}`,
    type: 'move',
    path: str
  });
};

/**
   * 查看文件日志
   * @param {String} path 查看日志的文件路径
   * @param {Number | undefined} size 日志条数
   *
   */
SVN.prototype.log = function (path, size) {
  size = size || 10;
  return this.exec({
    command: `svn log -l ${size} "${path}"`,
    type: 'log',
    path: `"${path}"`
  });
};

/**
   * 处理执行参数，为命令路径参数加上“”双引号，防止带空格的文件名称无法解析
   * @param {String | String[]} data
   * @return {String}
   *
   */
SVN.prototype.handleExecParams = function (data) {
  if (typeof data === 'string') {
    data = [data];
  }
  let param = '';
  data.forEach(item => {
    if (item.indexOf('@') > -1) {
      item += '@';
    }
    param += ` "${item}"`;
  });
  return param;
};

SVN.prototype.close = function () {
  const self = this;
  return new Promise((resolve => {
    if (self.childProcess) {
      // self.childProcess.on('close', function (/* code, signal */) {
      //   console.log('---------------关闭执行');
      //   self.childProcess = null;
      //   resolve();
      // });
      self.childProcess.kill();
      self.childProcess = null;
      resolve();
    } else {
      resolve();
    }
  }));
};

SVN.prototype.isVersionControl = function (path) {
  const self = this;
  return new Promise((resolve => {
    self.status(path).then(res => {
      const not = res.stdout.indexOf('?') === 0;
      resolve(!not);
    }).catch(() => {
      resolve(false);
    });
  }));
};

/**
 * 打开默认浏览器
 * @param {String} url
 * @return {Promise}
 *
*/

const zt_svn = new SVN();

export default zt_svn;
