<template>
  <div class="verification">
    <div class="title">
      <label>验证码已发送至:</label>
      <div class="phone">{{hidePhone(phone)}}</div>
    </div>
    <div class="verification-wrapper">
      <div class="verification-item"
        v-for="(item, index) in 4"
        :key="index"
      >
        <div class="text">
          {{verification[index] || ''}}
        </div>
      </div>
      <input maxlength="4" v-model="verification" class="input" type="text">
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../mixins/antiMixin';

@Component
export default class Verification extends AntiMixin {
  private phone: string = '15085622510';
  private verification: string = '';

  private onCheckVerficationChange() {
    this.$emit('success')
  }

  @Watch('verification')
  private verificationChange(verification: string) {
    if (verification.length === 4) {
      this.onCheckVerficationChange()
    }
  }
}
</script>
<style lang='scss' scoped>
.verification{
  .title{
    display: flex;
    font-size: 17px;
    margin-bottom: 38px;
    label{
      color: #888;
      margin-right: 11.5px;
    }
    .phone{
      font-weight: bold;
      font-size: 18px;
    }
  }
  .verification-wrapper{
    position: relative;
    display: flex;
    height: 21.5vw;
    .verification-item{
      flex: 1;
      width: 21.5vw;
      height: 21.5vw;
      box-sizing: border-box;
      padding: 3%;
      .text{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #ececec;
        border-radius: 10px;
        font-weight: bold;
        font-size: 30px;
      }
    }
    .input{
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
