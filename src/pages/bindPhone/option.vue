<template>
  <div class="bind-phone-option">
    <div class="container">
      <div class="title">
        该防丢二维码<br/>
        未绑定
      </div>
      <div class="remark">
        绑定微信后不能解绑，仅能修改手机号码
      </div>
      <div class="btn-wrapper">
        <im-button @click="bindQrcode" :label="'去绑定'"></im-button>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ImButton from '../../components/im-button.vue';
import AntiMixin from '../../mixins/antiMixin';
import { saveCode, queryCode, getUserInfoById } from '../../http/api';

@Component({
  components: {
    ImButton
  }
})
export default class BindPhoneOption extends AntiMixin {
  private currentUser: any = {};
  private code: string = '';

  private onLinkToPath(path: string) {
    this.navigateTo(path);
  }
  private async checkCode(code: string) {
    const qrCodeStatus: any = await queryCode({ code });
    // const qrCodeStatus: any = await saveCode({ code });
    this.currentUser = await getUserInfoById();
    if (qrCodeStatus.data) {
      // 该二维码已绑定用户
      if (qrCodeStatus.data.phone === this.currentUser.phone) {
        this.navigateTo('/pages/homePage/home', { code });
      } else {
        this.navigateTo('/pages/contactOwner/contactOwner', { code });
      }
    }
  }

  private async bindQrcode() {
    if (this.currentUser === {}) {
      this.currentUser = await getUserInfoById();
    }
    if (this.currentUser.phone === '') {
      this.navigateTo('/pages/bindPhone/home', { code: this.code });
    } else {
      uni.showModal(
        {
          title: '',
          content: `将该二维码与用户 ${this.currentUser.phone} 绑定吗`,
          cancelText: '取消',
          confirmText: '确定',
          success: (res) => {
            if (res.confirm) {
              this.saveCode();
            }
          }
        }
      )
    }
  }

  private async saveCode() {
    const status: any = await saveCode({ code: this.code });
    if (status.errCode === 200) {
      this.tipToast('绑定成功!')
      setTimeout(() => {
        this.navigateTo('/pages/homePage/home');
      }, 1500);
    }
  }

  private onLoad(options: any) {
    if (options.code) {
      this.code = options.code;
      this.checkCode(options.code);
      return
    }
  }

}
</script>
<style lang='scss' scoped>
.bind-phone-option{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding:  0 10%;
  .container{
    width: 100%;
    .title{
      text-align: center;
      font-size: 30px;
      font-weight: 800;
      color: #3C342E;
      margin-bottom: 87.5px;
    }
    .remark{
      font-size: 15px;
      font-weight: 500;
      text-align: center;
      color: #888;
      margin-bottom: 31px;
    }
    .btn-wrapper{
      width: 100%;
      height: 49px;
    }
  }
}
</style>
