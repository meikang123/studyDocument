import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export abstract class AxiosTransform {
  /**
   * @description: 请求之前处理配置
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description: 请求成功处理
   */
  transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatch?: (e: Error) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}

/*
* 附加参数类型
* */
export interface RequestOptions {
  // 是否取消重复请求
  ignoreCancelToken?: boolean
  // 是否处理数据、还是无伤返回
  isTransformRequestResult?: boolean
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode
  // 是否需要添加验证信息
  isNeedToken?: boolean
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

/*
* 服务器返回类型
* */
export interface Result<T = any> {
  code: number
  desc?: string
  msg?: string
  data: T
}

/*
* 请求方法
* */
export enum RequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/*
* 服务器版本
* odl --- 鬼哥服务器版本、new --- 强哥服务器版本
* */
export enum ServerType { old, new }

/*
* 使用转换
* */
export interface UseAxiosTransform {
  serverType: ServerType
  loginStatusCatch?: (code: number) => void
}
