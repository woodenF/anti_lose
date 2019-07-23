import { urls } from '../utils/urls';
import { fetch, post, put, fetchCheckToken, postCheckToken, putCheckToken } from './server';

/**
 * 根据code获取用户openId以及token数据
 */
export function getUserByCode(params: any = {}) {
  return new Promise((resolve, reject) => {
    fetch(`${urls.getUserByCode}${params.code}.do`)
      .then((res: any) => {
        resolve(res.data)
      })
  })
}

/**
 * 使用获取到的token获取到用户的信息
 * @export
 * @returns
 */
export function getUserInfoById() {
  return new Promise((resolve, reject) => {
    fetchCheckToken(urls.getUserInfoById).then((res: any) => {
      resolve(res.data);
    })
  })
}

/**
 * 发送验证码
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function sendMsnByPhone(params: any = {}) {
  return postCheckToken(urls.sendMsnByPhone, params);
}

/**
 *
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function bindPhone(params: any = {}) {
  return new Promise((resolve, reject) => {
    postCheckToken(urls.bindPhone, params).then((res: any) => {
      resolve(res.data);
    })
  })
}

/**
 * 根据token获得用户消息列表
 * @export
 * @returns
 */
export function getMessageList() {
  return new Promise((resolve, reject) => {
    fetchCheckToken(urls.getMessageList).then((res: any) => {
      resolve(res)
    })
  })
  // return fetch(urls.getMessageList);
}

/**
 * 根据sendOpenId获取到消息列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getMessageInfo(params: any) {
  return new Promise((resolve, reject) => {
    putCheckToken(urls.getMessageInfo, params).then((res: any) => {
      resolve(res)
    })
  })
}

/**
 * 发送消息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function sendMessage(params: any) {
  return new Promise((resolve, reject) => {
    postCheckToken(urls.sendMessage, params, {'Content-Type': 'application/json;charset=UTF-8'}).then((res: any) => {
      resolve(res.data);
    })
  })
}

/**
 * 删除留言对话
 * @export
 * @param {*} params
 * @returns
 */
export function deleteMessage(params: any) {
  return post(urls.deleteMessage, params);
}

/**
 * 查询当前二维码是否已经绑定账户
 * @export
 * @param {*} params
 * @returns
 */
export function saveCode(params: any) {
  return new Promise((resolve, reject) => {
    postCheckToken(urls.saveCode, params).then((res: any) => {
      resolve(res.data);
    })
  })
}
/**
 * 根据二维码中的code查询主人
 *
 * @export
 * @param {*} params
 * @returns
 */
export function queryCode(params: any) {
  return new Promise((resolve, reject) => {
    postCheckToken(urls.queryCode, params).then((res: any) => {
      resolve(res.data)
    })
  })
}

/**
 * 获取微信支付统一下单凭证
 *
 * @export
 * @param {*} params
 * @returns
 */
export function uniformOrder(params: any) {
  return new Promise((resolve, reject) => {
    fetchCheckToken(urls.wxPayUnifiedorder, params).then((res: any) => {
      resolve(res);
    })
  })
}

/**
 * 获取充值类型列表
 *
 * @export
 * @returns
 */
export function getRechargeList() {
  return new Promise((resolve, reject) => {
    fetchCheckToken(urls.getRechargeList).then((res: any) => {
      resolve(res.data);
    })
  })
}

export function setUserInfo(params: any) {
  return new Promise((resolve, reject) => {
    putCheckToken(urls.setUserInfo, params,  {'Content-Type': 'application/json;charset=UTF-8'}).then((res: any) => {
      resolve(res);
    })
  })
}

export function bindFormId(params: any) {
  return new Promise((resolve, reject) => {
    postCheckToken(urls.bindFormId, params).then((res: any) => {
      resolve(res);
    })
  })
}