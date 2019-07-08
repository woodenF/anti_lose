import { Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { UserInfo } from '../interface/interface';
import { JsonToString } from '../utils/util';

export default class AntiMixin extends Vue {
  @State('userInfo')
  public userInfo!: UserInfo;
  @Mutation('setUserInfo')
  public setUserInfo!: any;

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

  public checkOpenId() {

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
}