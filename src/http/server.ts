import axios from 'axios'
import state from '@/store/state';
import { checkLoginStatus } from '@/utils/util';

const service = axios.create({
  baseURL: '/api',
  timeout: 50000
})
/**
 * 为小程序中使用axios配置adapter
 */
service.defaults.adapter = (config: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.url,
      method: config.method,
      data: config.params,
      header: config.headers,
      success: (res: any) => {
        return resolve(res);
      },
      fail: (err) => {
        return reject(err);
      }
    })
  })
}

service.interceptors.request.use(
  (config: any) => {
    config.data = JSON.stringify(config.data);
    config.headers = Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      token: state.token
    }, config.headers);
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
)

service.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    return Promise.reject(error);
  }
)

export function fetch(url: string, params: any = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params
    })
    .then((res: any) => {
      resolve(res.data);
    })
    .catch((err: any) => {
      reject(err);
    });
  });
}
/**
 * 在发送请求前判断token是否存在,不存在则请求token再发送请求
 * method => Get
 * @export
 * @param {string} url
 * @param {*} [params={}]
 * @returns
 */
export async function fetchCheckToken(url: string, params: any = {}) {
  await checkLoginStatus()
  return fetch(url, params);
}


export function post(url: string, params: any = {}, headers: any = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      params,
      headers
      // headers: {
      //   'Content-Type': 'application/json;charset=UTF-8',
      // }
    })
    .then((res: any) => {
      if (!res) {
        resolve({});
        return;
      }
      resolve(res);
    })
    .catch((err: any) => {
      reject(err);
    })
  })
}

export async function postCheckToken(url: string, params: any = {}, headers: any = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) {
  await checkLoginStatus()
  return post(url, params, headers);
}

export function put(url: string, params: any = {}, headers: any) {
  return new Promise((resolve, reject) => {
    service({
      method: 'put',
      url,
      params,
      headers
    })
    .then((res: any) => {
      if (!res) {
        resolve({});
        return;
      }
      resolve(res.data);
    })
    .catch((err: any) => {
      reject(err);
    })
  })
}

export async function putCheckToken(url: string, params: any = {}, headers: any = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) {
  await checkLoginStatus()
  return put(url, params, headers);
}

export default service;