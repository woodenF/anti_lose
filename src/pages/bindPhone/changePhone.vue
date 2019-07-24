<template>
  <div class="change-phone">
    <div class="phone">
      <div class="label">手机号码</div>
      <input v-model="phone" placeholder="输入手机号码" maxlength="11" class="input" type="text">
      <div @click="getVerification" class="send">{{getText}}</div>
    </div>
    <div class="verification">
      <div class="label">验证码</div>
      <input maxlength="4" v-model="veri" placeholder="输入验证码" class="input" type="text">
    </div>
    <div class="submit-wrapper">
      <div @click="submit" :class="{active: isSuccess}" class="sumbit">
        完成
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { sendMsnByPhone, changePhone } from '../../http/api';
import { checkPhone } from '../../utils/util';
import AntiMixin from '../../mixins/antiMixin';

@Component
export default class ChangePhone extends AntiMixin {
  private isSend: boolean = false;
  private time: number = 60000;
  private phone: string = '';
  private timer: any = null;
  private veri: string = '';

  private get isSuccess() {
    return this.phone.length === 11 && this.veri.length === 4;
  }

  private get getText() {
    return this.isSend ? `重新发送(${this.time / 1000}s)` : '获取验证码'
  }

  private async getVerification() {
    const status = checkPhone(this.phone)
    if (!status) {
      this.errorToast('请输入正确的手机号码!');
      return
    }
    sendMsnByPhone({ phone: this.phone })
    this.isSend = true
    this.timer = setInterval(() => {
      this.time -= 1000;
      if (this.time === 0) {
        this.isSend = false;
      }
    }, 1000)
    console.log()
  }

  private async submit() {
    const isSuccess: any = await changePhone({ phone: this.phone, code: this.veri });
    if (isSuccess.errCode === 200) {
      this.errorToast('修改成功!');
      setTimeout(() => {
        this.navigateTo('/pages/homePage/home');
      }, 1500);
    } else {
      this.errorToast(isSuccess.errMsg);
    }
  }
}
</script>
<style lang='scss' scoped>
.change-phone{
  background: #e5e5e5;
  height: 100%;
  padding: 15px 0;
  .phone{
    display: flex;
    background: #fff;
    padding: 0px 15px;
    height: 45px;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    .label{
      font-size: 17px;
      width: 90px;
    }
    input{
      flex: 1;
      font-size: 17px;
      height: 100%;
      border-right: 1px solid #e5e5e5;
      box-sizing: border-box
    }
    .send{
      display: flex;
      justify-content: center;
      font-size: 16px;
      color:rgba(26,173,25,1);
      width: 115px;
    }
  }
  .verification{
    display: flex;
    padding: 10px 15px;
    background: #fff;
    .label{
      display: flex;
      width: 90px;
      align-items: center;
      font-size: 17px;
      text-align: left;
    }
    input{
      font-size: 17px;
      flex: 1;
      height: 100%;
    }
  }
  .submit-wrapper{
    padding: 0 7%;
    .sumbit{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 47px;
      background:rgba(26,173,25,1);
      border-radius: 5px;
      opacity: .5;
      margin-top: 25px;
      color: #fff;
      &.active{
        opacity: 1;
      }
    }
  }
}
</style>
