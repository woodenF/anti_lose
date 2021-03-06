// const baseURL = 'http://172.17.0.85:8080/lostfound-api';
const baseURL = 'https://sign.ei-marketing.net/lostfound-api';

export const urls = {
  getUserByCode: `${baseURL}/login/getSession/`,
  getUserInfoById: `${baseURL}/user/info/getById.do`,
  sendMsnByPhone: `${baseURL}/user/info/sendMSN.do`,
  bindPhone: `${baseURL}/user/anti-lost-info/save.do`,
  getMessageList: `${baseURL}/message/messages-info/getList.do`,
  getMessageInfo: `${baseURL}/message/messages-info/getInfo.do`,
  sendMessage: `${baseURL}/message/messages-info/save.do`,
  deleteMessage: `${baseURL}/message/messages-info/delete.do`,
  saveCode: `${baseURL}/user/anti-lost-info/save.do`,
  saveBlackList: `${baseURL}/user/blacklist-info/save.do`,
  queryCode: `${baseURL}/user/anti-lost-info/getUser.do`,
  wxPayUnifiedorder: `${baseURL}/wxpay/unifiedorder.do`,
  getRechargeList: `${baseURL}/user/recharge-type/getList.do`,
  setUserInfo: `${baseURL}/user/info/update.do`,
  bindFormId: `${baseURL}/user/info/bingdingFormId.do`,
  changeEncryStatus: `${baseURL}/user/info/phoneEncryptionStatus.do`,
  getBlackList: `${baseURL}/user/blacklist-info/getList.do`,
  deleteBlackList: `${baseURL}/user/blacklist-info/delete.do`,
  changePhone: `${baseURL}/user/info/bindingPhone.do`
}