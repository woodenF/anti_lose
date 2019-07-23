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
  const token = state.token;
  if (token !== '') {
    return
  }
  const code = await wxLogin();
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


export function getParams(url: string, key: string) {
  const search: any = url.split('?')[1];
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
  const result = search.match(reg);
  console.log(result)
  if(result && result[2]) {
    return result[2]
  }
  return ''
}