
const mutations = {
  setOpenId: (state: any, openId: string) => {
    state.openId = openId;
  },
  setToken: (state: any, token: string) => {
    state.token = token;
  },
  setAvatarUrl: (state: any, avatarUrl: string) => {
    state.avatarUrl = avatarUrl;
  }
}

export default mutations;
