import { Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { UserInfo } from '../interface/interface';
import { JsonToString } from '../utils/util';
import { getUserByCode } from '../http/api';

export default class AntiMixin extends Vue {
  @State('openId')
  public openId!: string;
  @Mutation('setOpenId')
  public setOpenId!: any;

  @State('token')
  public token!: string;
  @Mutation('setToken')
  public setToken!: any;

  public changePageTitle(title: string): void {
    uni.setNavigationBarTitle({
			title,
		});
  }
  /**
   * 跳转页面
   * @param url 跳转路径
   * @param params 携带参数
   */
  public navigateTo(url: string, params: object = {}): void {
    const query = JsonToString(params);
    uni.navigateTo({
      url: `${url}?${query}`
    })
  }
  /**
   * 检查openId是否存在
   */
  public checkOpenId() {
    return new Promise((resolve) => {
      if (this.openId !== '') {
        resolve()
        return
      }
      this.wxLogin().then((code: any) => {
        getUserByCode({ code }).then((res: any) => {
          this.setOpenId(res.data.openId);
          this.setToken(res.data.token);
          resolve()
        })
      })
    })
  }

  public errorToast(title: string) {
    uni.showToast(
      {
        icon: 'none',
        title
      }
    )
  }

  public hidePhone(str: string, char: string) {
    const reg =  /^(\d{3})\d*(\d{4})$/;
    return str.replace(reg, '$1****$2')
  }

  private wxLogin() {
    return new Promise((resolve) => {
      uni.login({
        success: (res) => {
          resolve(res.code)
        }
      })
    })
  }
}