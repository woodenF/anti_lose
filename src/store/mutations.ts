
const mutations = {
  setOpenId: (state: any, openId: string) => {
    state.openId = openId;
  },
  setToken: (state: any, token: string) => {
    state.token = token;
  }
}

export default mutations;
