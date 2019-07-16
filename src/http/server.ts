import axios from 'axios'
import state from '@/store/state';

const service = axios.create({
  baseURL: '/api',
  timeout: 50000
})
/**
 * 解决小程序使用axios没有adapter问题
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
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      token: state.token
    }
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

export function post(url: string, params: any = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      params
    })
    .then((res: any) => {
      if (!res) {
        resolve({});
        return;
      }
      if (res.status === 200) {
        resolve(res);
      }
    })
    .catch((err: any) => {
      reject(err);
    })
  })
}

export function put(url: string, params: any = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'put',
      url,
      params
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

export default service;