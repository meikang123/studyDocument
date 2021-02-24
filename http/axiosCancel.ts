import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'

let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

export class AxiosCanceler {
  /*
  * 添加请求
  * */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel)
      }
    })
  }

  /*
  * 清空所有pending
  * */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && cancel()
    })
    pendingMap.clear()
  }

  /*
  * 移除请求
  * */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /*
  * 重置
  * */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
