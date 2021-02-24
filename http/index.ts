import type { AxiosResponse } from 'axios'
import { Toast } from 'vant'
import { errorResult, VAxios } from './Axios'
import { AxiosTransform, CreateAxiosOptions, RequestMethodEnum, RequestOptions, Result, ServerType, UseAxiosTransform } from './types'
import { Sensors } from '../utils/sensors'
import { isObject, isString } from '../utils/is'
import { LoginLocalStorageKey } from '../hooks'

const { baseUrl } = process.env
const ErrorSystemMessage = '系统错误、请稍后尝试！'

let useAxiosOptions: UseAxiosTransform = {
  serverType: ServerType.old
}


/*
* 合并对象
* */
function deepMerge<T = any>(src: any, target: any): T {
  Object.entries(target).forEach(([key, item]) => {
    src[key] = isObject(item) ? deepMerge(item, target[key]) : (src[key] = target[key])
  })
  return src
}

/*
* 请求钩子函数
* */
const transform: AxiosTransform = {
  /*
  * 数据处理
  * */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data
    }
    // 错误的时候返回

    const { data: $data } = res
    if (!$data) {
      return errorResult
    }

    // 服务器返回接口格式
    const { code, data, desc, msg } = $data
    const hasSuccess = $data && Reflect.has($data, 'code') && ((useAxiosOptions.serverType === ServerType.new && code === 0) || (useAxiosOptions.serverType === ServerType.old && code === 200))
    if (!hasSuccess) {
      if (desc || msg) {
        // options.errorMessageMode --根据类型处理信息
        if(options.errorMessageMode === 'message') {
          Toast.fail(desc || msg)
        }
      }

      // 特殊code错误处理
      if (code === 401) {
        console.log('超时')
        return errorResult
      }

      if(useAxiosOptions.serverType === ServerType.new && code === 20103) { // 会话过期
        useAxiosOptions.loginStatusCatch && useAxiosOptions.loginStatusCatch(code)
      }

      return errorResult
    }

    // 接口请求成功
    return data

  },

  /*
  * 请求之前处理config
  * */
  beforeRequestHook: (config, options) => {
    // options可以定义额外config数据处理规则
    const { ignoreCancelToken, isNeedToken } = options
    if (ignoreCancelToken) {
      config.headers = { ...config.headers, ignoreCancelToken }
    }

    if (config.method?.toUpperCase() === RequestMethodEnum.GET) { // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      const now = new Date().getTime()
      const $isString: boolean = isString(config.params)
      if (!$isString) {
        config.data = {
          params: Object.assign(config.params || {}, {
            _t: now
          })
        }
      } else { // 兼容字符串
        config.url = `${config.url + config.params}?_t=${now}`
        config.params = undefined
      }
    }

    if(isNeedToken) {
      if(useAxiosOptions.serverType === ServerType.new) {
        const key = localStorage.getItem(LoginLocalStorageKey.key)
        const SessionId = localStorage.getItem(LoginLocalStorageKey.session)
        const base  = { key, SessionId }
        const data = JSON.stringify(config.data || {})
        config.data = { base, data }
      }

      if(useAxiosOptions.serverType === ServerType.old) {}
    }
    return config
  },

  /*
  * 请求拦截器处理
  * */
  requestInterceptors: config => {
    const { url, method } = config
    Sensors.collectLog({
      id: 'ajaxRequest',
      data: { url, method }
    })
    return config
  },

  /*
  * 请求错误
  * */
  requestInterceptorsCatch: (error: any) => {
    const { message, config = {} } = error
    const { url, method, timeout } = config
    Sensors.pageError({
      id: 'ajax',
      type: 'request',
      data: { url, method, message, timeout }
    })
    return Promise.reject(error)
  },

  /*
  * 响应错误处理
  * */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config = {} } = error || {}
    const msg: string = response?.data?.error ? response.data.error.message : ''
    const err: string = error?.toString()
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        // 错误处理
        console.log('超时')
      }
      if (err?.includes('Network Error')) {
        // 错误处理
        Toast.fail(ErrorSystemMessage)
        console.log('错误处理')
      }
    } catch (error) {
      Toast.fail(ErrorSystemMessage)
      console.log('错误处理')
      throw new Error(error)
    }

    const status = error?.response?.status
    switch (status) {
      case 400:
        // 400 错误提示
        console.log(msg)
        break

      case 500:
        console.log('-----------500')
        break

      default:
    }

    const { url, method, timeout } = config
    Sensors.pageError({
      id: 'ajax',
      type: 'response',
      data: { msg, err, url, method, timeout }
    })
    return Promise.reject(error)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(deepMerge({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 30 * 1000,
    transform,
    requestOptions: {
      isTransformRequestResult: true,
      errorMessageMode: 'message',
      isNeedToken: true
    }
  }, opt || {}))
}

/*
* 安装Axios配置
* */
export const setupAxios = (ops: Partial<UseAxiosTransform> = {}) => {
  useAxiosOptions = { ...useAxiosOptions, ...ops }
}

/*
* 获取当前服务器使用
* */
export const getServerType = (): ServerType => useAxiosOptions.serverType

export const defHttp = createAxios()
