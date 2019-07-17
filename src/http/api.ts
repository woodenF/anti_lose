import { urls } from '../utils/urls';
import { fetch, post, put } from './server';

/**
 * 根据code获取用户openId以及token数据
 */
export function getUserByCode(params: any = {}) {
  return fetch(`${urls.getUserByCode}${params.code}.do`);
}

/**
 * 使用获取到的token获取到用户的信息
 * @export
 * @returns
 */
export function getUserInfoById() {
  return fetch(urls.getUserInfoById);
}

/**
 * 发送验证码
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function sendMsnByPhone(params: any = {}) {
  return post(urls.sendMsnByPhone, params);
}

/**
 *
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function bindPhone(params: any = {}) {
  return put(urls.bindPhone, params);
}

/**
 * 根据token获得用户消息列表
 * @export
 * @returns
 */
export function getMessageList() {
  return fetch(urls.getMessageList);
}

/**
 * 根据sendOpenId获取到消息列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getMessageInfo(params: any) {
  return put(urls.getMessageInfo, params);
}

/**
 * 发送消息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function sendMessage(params: any) {
  return post(urls.sendMessage, params);
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