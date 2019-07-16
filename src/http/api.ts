import { urls } from '../utils/urls';
import { fetch, post, put } from './server';

export function getUserByCode(params: any = {}) {
  return fetch(`${urls.getUserByCode}${params.code}.do`)
}

export function getUserInfoById() {
  return fetch(urls.getUserInfoById)
}

export function sendMsnByPhone(params: any = {}) {
  return post(urls.sendMsnByPhone, params)
}

export function bindPhone(params: any = {}) {
  return put(urls.bindPhone, params)
}