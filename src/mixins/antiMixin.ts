import { Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { UserInfo } from '../interface/interface';
import { JsonToString, wxLogin } from '../utils/util';
import { getUserByCode, setUserInfo } from '../http/api';

export default class AntiMixin extends Vue {
  @State('openId')
  public openId!: string;
  @Mutation('setOpenId')
  public setOpenId!: any;

  @State('token')
  public token!: string;
  @Mutation('setToken')
  public setToken!: any;

  @State('avatarUrl')
  public avatarUrl!: string;
  @Mutation('setAvatarUrl')
  public setAvatarUrl!: any;

  public changePageTitle(title: string): void {
    uni.setNavigationBarTitle({
			title,
		});
  }

  public async bindGetUserInfo(e: any, path: string = '') {
    console.log(e)
    console.log(path)
    const userInfo = e.target.userInfo || false;
    if (userInfo) {
      console.log('success')
      this.setAvatarUrl(userInfo.avatarUrl);
      const isSuccess: any = await setUserInfo(userInfo);
      if(isSuccess.errCode === 200) {
        this.navigateTo(path)
      }
    }
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
  public async checkOpenId() {
    if (this.openId !== '') {
      return
    }
    const code = await wxLogin();
    const loginInfo: any = await getUserByCode({ code });
    this.setOpenId(loginInfo.data.openId);
    this.setToken(loginInfo.data.token);
    return
  }

  public errorToast(title: string) {
    uni.showToast(
      {
        icon: 'none',
        title
      }
    )
  }

  public tipToast(title: string) {
      uni.showToast(
        {
          icon: 'success',
          title,
          duration: 1500
        }
      )
  }

  public hidePhone(str: string, char: string) {
    const reg =  /^(\d{3})\d*(\d{4})$/;
    return str.replace(reg, '$1****$2')
  }
}