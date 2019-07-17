const baseURL = 'http://172.17.0.85:8080/lostfound-api';

export const urls = {
  getUserByCode: `${baseURL}/login/getSession/`,
  getUserInfoById: `${baseURL}/user/info/getById.do`,
  sendMsnByPhone: `${baseURL}/user/info/sendMSN.do`,
  bindPhone: `${baseURL}/user/info/bindingPhone.do`,
  getMessageList: `${baseURL}/message/messages-info/getList.do`,
  getMessageInfo: `${baseURL}/message/messages-info/getInfo.do`,
  sendMessage: `${baseURL}/message/messages-info/save.do`,
  deleteMessage: `${baseURL}/message/messages-info/delete.do`
}