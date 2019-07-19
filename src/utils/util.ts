import { getUserByCode } from '../http/api';
import state from '../store/state';
import mutations from '../store/mutations';
export function JsonToString(data: object = {}): string {
  if (data === {}) return '';
  const keys = Object.keys(data);
  const str = keys.map(item => `${item}=${(data as any)[item]}`);
  return str.join('&')
}

export function checkPhone(phone: string) {
  return /^1[3456789]\d{9}$/.test(phone)
}

export async function checkLoginStatus() {
  console.log('检查是否存在token=>', state.token)
  const token = state.token;
  if (token !== '') {
    console.log(`已有Token=>${state.token}`)
    return
  }
  const code = await wxLogin();
  console.log(`获取code=>${code}`)
  const loginInfo: any = await getUserByCode({ code });
  mutations.setOpenId(state, loginInfo.openId);
  mutations.setToken(state, loginInfo.token);
  return
}

export function wxLogin() {
  return new Promise((resolve) => {
    uni.login({
      success: (res) => {
        resolve(res.code)
      }
    })
  })
}