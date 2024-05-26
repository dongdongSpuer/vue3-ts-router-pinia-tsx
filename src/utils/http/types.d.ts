import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export interface DongResponse extends AxiosResponse {}

export type DongResult = {
    code: number;
    data: any;
    message: string;
};

export type DongMethod = Extract<
    Method,
    'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>;

export interface DongResponse extends AxiosResponse {
    config: DongRequestConfig;
}

export interface DongRequestConfig extends AxiosRequestConfig {
    // 请求拦截
    beforeRequestCallback?: (request: DongRequestConfig) => void;
    // 响应拦截
    beforeResponseCallback?: (response: DongResponse) => void;
}
