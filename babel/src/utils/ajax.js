import zt_log from './log';
import zt_tool from './tool';


export default {
  request(url, method, data, options) {
    return new Promise(((resolve, reject) => {
      const param = {
        url: CONFIG.domain + url,
        method,
        data,
        success(res) {
          resolve(res);
        },
        error(error) {
          zt_log.local('ajax 请求失败 --->', url, error);
          reject(error);
        }
      };
      if (zt_tool.isObject(options)) {
        for (const key in options) {
          param[key] = options[key];
        }
      }
      $.ajax(param);
    }));
  },

  post(url, data, options) {
    return this.request(url, 'post', data, options);
  },
  get(url, data, options) {
    return this.request(url, 'get', data, options);
  }
};
