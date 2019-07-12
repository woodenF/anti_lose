<template>
  <view class="bind-phone-home">
    <div class="title">
      <div class="text">
        东西丢失后<br/>
        可通过该手机号码<br/>
        联系到您
      </div>
      <div class="remark">
        绑定成功后,将防丢二维码贴在物品上进行使用
      </div>
    </div>
    <im-input v-model="phone"></im-input>
    <div class="agreement">
      <label>防丢二维码用户协议</label>
    </div>
    <im-button class="btn" @click="onAgree" :label="'同意协议并绑定防丢二维码'"></im-button>
  </view>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '@/mixins/antiMixin';
import ImInput from '@/components/im-input.vue';
import { checkPhone } from '@/utils/util';
import ImButton from '../../components/im-button.vue';

@Component({
  components: {
    ImInput,
    ImButton
  }
})
export default class BindPhoneHome extends AntiMixin {
  private phone: string = '';

  private onAgree() {
    const status = checkPhone(this.phone);
    if (!status) {
      this.errorToast('请输入正确的手机号码!');
      return
    }
    this.navigateTo('/pages/bindPhone/check', {
      phone: this.phone
    })
  }
}
</script>
<style lang='scss'>
page{
  width: 100%;
  height: 100%;
  .bind-phone-home{
    padding-top: 18.37%;
    padding-left: 7.33%;
    padding-right: 8.13%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .title{
      font-size: 30px;
      font-weight: bold;
      .remark{
        margin-top: 2.4%;
        font-size:13px;
        font-weight:500;
        margin-bottom: 7.5%;
        color:rgba(136,136,136,1);
      }
    }
    .agreement{
      margin-top: 59px;
      color: rgba(255,138,34,1);
      text-align: center;
      font-size: 13px;
      label{
        border-bottom: 1px rgba(255, 138, 34, 1) solid;
      }
    }
    .btn{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 49px;
      margin-top: 16.5px;
      background:linear-gradient(264deg,rgba(255,171,72,1),rgba(255,138,34,1));
      box-shadow:0px 0px 32px 8px rgba(255,138,34,0.2);
      border-radius:10px 49px 49px 49px;
      font-size: 13px;
      color: #fff;
    }
  }
}
</style>
