import { UserInfo } from '../interface/interface';

const mutations = {
  setUserInfo: (state: any, userInfo: UserInfo) => {
    state.userInfo = userInfo
  }
}

export default mutations;
