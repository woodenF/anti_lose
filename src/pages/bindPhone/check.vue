<template>
  <div class="bind-phone-check">
    <verification :phone="phone" @success="success"></verification>
    <div class="resend">
      <div @click="resend" class="btn" :class="{active: verificationStatus}">
        重新发送{{timeDown}}
      </div>
    </div>
    <div v-if="isSuccess" class="success">
      <div class="toast">
        <div class="title">绑定成功!</div>
        <div class="message">我们将免费赠送您60分钟的加密通话时长（通话不足1分钟记做1分钟）如果超过60分钟，请尽快充值。</div>
        <div class="submit">
          <im-button @click="onDetermine" class="btn" :label="'确定'"></im-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Verification from '../../components/verification.vue';
import AntiMixin from '../../mixins/antiMixin';
import ImButton from '../../components/im-button.vue';
import { bindPhone, sendMsnByPhone } from '../../http/api';

@Component({
  components: {
    Verification,
    ImButton
  }
})
export default class BindPhoneCheck extends AntiMixin {
  private verificationStatus: boolean = false;
  private time: number = 60000;
  private timer: any = null;
  private isSuccess: boolean = false;
  private phone: string = '';
  private code: string = '';

  private onLoad(option: any) {
    this.phone = option.phone;
    this.code = option.code;
  }
  private mounted() {
    this.countDown();
  }
  /**
   * 转换倒计时get
   */
  private get timeDown(): string {
    return this.verificationStatus ? '' : `(${this.time / 1000}s)`
  }

  private countDown() {
    clearInterval(this.timer);
    this.verificationStatus = false;
    this.time = 60000;
    this.timer = setInterval(() => {
      this.time -= 1000;
      if (this.time <= 0) {
        this.verificationStatus = true;
        clearInterval(this.timer);
      }
    }, 1000)
  }

  private onDetermine() {
    this.navigateTo('/pages/homePage/home');
  }
  private async success(verification: string) {
    const isSuccess: any = await bindPhone({ phone: this.phone, VCode: verification, code: this.code });
    console.log(isSuccess)
    if (isSuccess.errCode === 200) {
      this.isSuccess = true;
      return
    }
    this.errorToast('验证码错误!');
  }

  private resend() {
    if (!this.verificationStatus) return;
    sendMsnByPhone({ phone: this.phone });
    this.countDown()
  }

}
</script>
<style lang='scss' >
.bind-phone-check{
  position: relative;
  height: 100%;
  padding: 20% 7% 0 7%;
  box-sizing: border-box;
  .resend{
    display: flex;
    justify-content: center;
    margin-top: 56px;
    .btn{
      display: flex;
      font-size: 15px;
      color: #888;
      font-weight: 500;
      align-items: center;
      justify-content: center;
      width: 122px;
      height: 32.5px;
      background:rgba(236,236,236,1);
      border-radius:33px;
    }
    .active{
      color: #fff;
      background: rgba(255,138,34,1);
    }
  }
  .success{
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
    animation: fade .5s linear;
    @keyframes fade {
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    .toast{
      width: 86%;
      background: #fff;
      box-shadow:0px 0px 60px 2px rgba(0, 0, 0, 0.06);
      border-radius:25px;
      padding: 0 22.5px 15px 22.5px;
      box-sizing: border-box;
      .title{
        padding: 25px 0;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
      }
      .message{
        font-size: 17px;
        color: #888;
        font-weight: 500;
        text-align: justify;
      }
      .submit{
        display: flex;
        justify-content: center;
        margin-top: 43px;
        width: 100%;
        .btn{
          width: 98px;
          height: 30px;
        }
      }
    }
  }
}
</style>
