
import zt_fs from './fs';
import zt_tool from './tool';

const zt_log = {
  /**
   * 检测日志文件夹是否存在
   * @return {Boolean}
   *
   */
  existsLogDir() {
    if (zt_fs.existsSync(CONFIG.log_dir)) {
      return true;
    }
    return zt_fs.mkdirSync(CONFIG.log_dir);
  },
  /**
   * 处理日志文件，七天前的日志将被删除
   *
   */
  handleLogFile() {
    if (!this.existsLogDir()) return;
    const logFiles = zt_fs.readdirSync(CONFIG.log_dir);
    if (logFiles) {
      logFiles.forEach(file => {
        const filePath = `${CONFIG.log_dir}/${file}`;
        if (
          zt_fs.isDirectory(filePath)
          || file.substr(file.length - 4) !== '.txt'
        ) {
          return zt_fs.delete(filePath);
        }
        const current_timer = new Date().getTime();
        const file_timer = new Date(file.replace('.txt', '')).getTime();
        if (current_timer - file_timer > 7 * 24 * 60 * 60 * 1000) {
          return zt_fs.delete(filePath);
        }
      });
    }
  },
  // 本地日志
  local() {
    if (!CONFIG.isProduct) {
      const info = this.handleData(arguments);
      if (!info) return;
      console.log(info);
    }
  },
  /**
   * 记录错误日志
   * @param {*} error 错误信息
   *
   */
  error() {
    const info = this.handleData(arguments);
    if (!info) return;
    this.log(info, '错误');
  },
  /**
   * 记录一般信息
   * @param {*} info 操作信息
   * @param {string} key 当前记录关键key信息
   *
   */
  info() {
    const info = this.handleData(arguments);
    if (!info) return;
    this.log(info);
  },
  /**
   * 处理日志数据
   * @param {Array} data
   * @return {String}
   */
  handleData(data) {
    if (!data || (!zt_tool.isArray(data) && !zt_tool.isArguments(data))) return;
    let msg = '';
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) continue;
      if (typeof data[i] !== 'string' || typeof data[i] !== 'number') {
        msg += JSON.stringify(data[i]);
      } else {
        msg += data[i];
      }
    }
    return msg;
  },
  /**
   * 记录日志，写入磁盘文件
   * @param {String} log 日志内容
   * @param {String} key 日志标识
   *
   */
  log(log, key) {
    key = key || '信息';
    this.local(`【${key}日志】`, log);
    if (
      typeof log !== 'string'
      || typeof key !== 'string'
      || !this.existsLogDir()
    ) {
      return;
    }
    const date = zt_tool.getCurrentDate(true);
    const msg = `【${key}】[${date}] ${log} \r\n`;
    const path = `${CONFIG.log_dir}/${date.split(' ')[0]}.txt`;
    zt_fs.appendFileSync(path, msg);
  }
};

export default zt_log;
