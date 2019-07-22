import { Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { JsonToString } from '../utils/util';
import { setUserInfo, bindFormId } from '../http/api';

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

  // 是否可跳转状态
  public isNavigate: boolean = true;

  public changePageTitle(title: string): void {
    uni.setNavigationBarTitle({
			title,
		});
  }

  public async bindGetUserInfo(e: any, path: string = '') {
    console.log(e)
    if (!this.isNavigate) {
      return
    }
    this.isNavigate = true;
    const userInfo = e.target.userInfo || false;
    if (userInfo) {
      this.setAvatarUrl(userInfo.avatarUrl);
      const isSuccess: any = await setUserInfo(userInfo);
      if(isSuccess.errCode === 200) {
        this.navigateTo(path)
        this.isNavigate = false;
      }
    }
  }

  public async formSubmit(e: any) {
    const formId = e.target.formId;
    await bindFormId({ formId });
    console.log(e);
  }

  /**
   * 跳转页面
   * @param url 跳转路径
   * @param params 携带参数
   */
  public navigateTo(url: string, params: object = {}): void {
    if (!this.isNavigate) {
      return;
    }
    this.isNavigate = false;
    const query = JsonToString(params);
    uni.navigateTo({
      url: `${url}?${query}`,
      success: () => {
        this.isNavigate = true;
      }
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