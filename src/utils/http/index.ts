import Axios, {
    type AxiosInstance,
    // type CustomParamsSerializer,
    type AxiosRequestConfig,
} from 'axios';
import type { DongMethod, DongRequestConfig, DongResponse } from './types';
import { stringify } from 'qs';
// 初始化实例默认值
const InitInstanceDefault: AxiosRequestConfig = {
    timeout: 10000,
    baseURL: 'http://127.0.0.1:9000',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    paramsSerializer: (params) => {
        return stringify(params, {
            arrayFormat: 'brackets',
        });
    },
};
class DongHttp {
    constructor() {
        this.interceptorRequest();
        this.interceptResponse();
    }
    //token过期后，请求缓存
    private static requests: any[] = [];
    // 初始化配置对象
    private static initConfig: DongRequestConfig = {};
    // 重新连接原始请求
    private static retryOriginalRequest(config: DongRequestConfig) {
        return new Promise((resolve) => {
            DongHttp.requests.push((token: string) => {
                if (config.headers) {
                    config.headers.Authorization = token;
                    resolve(config);
                }
            });
        });
    }
    //  防止重复刷新
    private static isRefreshing: boolean = false;
    // 保存Axios实例对象
    private static axiosInstance: AxiosInstance =
        Axios.create(InitInstanceDefault);

    // 请求拦截
    private interceptorRequest() {
        DongHttp.axiosInstance.interceptors.request.use(
            async (config: DongRequestConfig): Promise<any> => {
                // 拦截请求
                // console.log("请求拦截");
                //检查请求config里面的拦截函数是否存在
                if (typeof config.beforeRequestCallback === 'function') {
                    config.beforeRequestCallback(config);
                    return config;
                }

                if (DongHttp.initConfig.beforeRequestCallback) {
                    DongHttp.initConfig.beforeRequestCallback(config);
                    return config;
                }

                // 设置请求需要token验证的，并且配置白名单（既不需要身份验证的接口）
                const white = ['/login'];
                white.map((item) => {
                    item === config.url
                        ? config
                        : new Promise((resolve) => {
                              // 执行一系列获取token，传递、设置token的方法
                              const token = 'token'; //这里写获取token的方法
                              if (token) {
                                  // 验证token是否过去
                                  const expired = true; //进行判断是否过期
                                  if (expired) {
                                      if (!DongHttp.isRefreshing) {
                                          DongHttp.isRefreshing = true;
                                          // 重新获取token，并设置token
                                          // 获取到后
                                          DongHttp.isRefreshing = false;
                                      } else {
                                          DongHttp.retryOriginalRequest(config);
                                      }
                                  } else {
                                      // 如果没有过期
                                      if (config.headers) {
                                          config.headers.Authorization =
                                              'Bearer ' + token;
                                          resolve(config);
                                      }
                                  }
                              } else {
                                  // 获取token失败，跳转登录页
                                  // this.$router.push({
                                  //   path: "/login",
                                  // });
                              }
                          });
                });
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );
    }

    //  响应拦截
    private interceptResponse(): void {
        DongHttp.axiosInstance.interceptors.response.use(
            (response: DongResponse) => {
                const $config = response.config;

                // 判断config中回调参数是否执行初始化
                if (typeof $config.beforeResponseCallback === 'function') {
                    $config.beforeResponseCallback(response);
                    return response;
                }

                if (DongHttp.initConfig.beforeResponseCallback) {
                    DongHttp.initConfig.beforeResponseCallback(response);
                    return response;
                }
                // 拦截响应
                // console.log("响应拦截");
                return response.data;
            },
            (err) => {
                console.log(err);
                return Promise.reject(err);
            },
        );
    }
    //默认请求
    public request<P>(
        url: string,
        method: DongMethod,
        params?: any,
        DongRequestConfig?: DongRequestConfig,
    ): Promise<P> {
        const config = {
            url,
            method,
            ...params,
            ...DongRequestConfig,
        };
        return new Promise((resolve, reject) => {
            DongHttp.axiosInstance
                .request(config)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // 单独封装get请求
    public get<T, P>(url: string, params?: T, config?: DongRequestConfig) {
        return this.request<P>(url, 'get', params, config);
    }
    // 单独封装post请求
    public post<T, P>(url: string, params?: T, config?: DongRequestConfig) {
        return this.request<P>(url, 'post', params, config);
    }
}

export default new DongHttp();
