<template>
  <div class="reward">
    <div class="container">
      <div class="title">选择打赏额度</div>
      <div class="optation-wrapper">
        <div class="optation"
        v-for="(item, index) in optation"
        @click="onChangeActivaOpation(index)"
        :key="index">
          <div class="prize"
          :class="{active: index === activeOptation}" >
            {{item.prize}}元
          </div>
        </div>
        <div class="optation">
          <div class="prize" :class="{'custom-active': isCustom}">
            <div @click="onCustomFocus" v-if="!isCustom" class="default">
              自定义金额
            </div>
            <div v-else class="custom">
              <input v-model="customPrize" @blur="onBlur" class="custom-prize" :focus="isFocus" type="number">
              <div class="text">元</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrapper">
        <im-button @click="rewardForWxPay" :label="'确认支付'"></im-button>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { uniformOrder } from '../../http/api';
import ImButton from '../../components/im-button.vue';

@Component({
  components: {
    ImButton
  }
})
export default class Reward extends Vue {
  private isCustom: boolean = false;
  private customPrize: number = 0;
  private activeOptation: number = 1;
  private isFocus: boolean = false;
  private optation: any= [
    { prize: 2 },
    { prize: 5 },
    { prize: 10 },
    { prize: 100 },
  ]

  private async rewardForWxPay() {
    const prize = this.optation[this.activeOptation].prize;
    const params = {
      type: 0,
      money: prize
    }
    const wxPay: any = await uniformOrder(params);
    uni.requestPayment({
      timeStamp: wxPay.timeStamp + '',
      nonceStr: wxPay.nonceStr,
      package: wxPay.package,
      signType: wxPay.signType,
      paySign: wxPay.paySign,
      success: () => {
        console.log('====')
      }
    })
    console.log(wxPay)
  }

  private onChangeActivaOpation(index: number) {
    this.activeOptation = index;
  }

  private onBlur() {
    this.optation.push(
      { prize: this.customPrize }
    )
    this.customPrize = 0;
    this.isCustom = false;
    this.activeOptation = this.optation.length - 1;
    console.log('onBlur')
  }

  private onCustomFocus() {
    this.isCustom = true;
    this.isFocus = true;
  }
}
</script>
<style lang='scss' scoped>
.reward{
  height: 100%;
  padding: 0 7%;
  box-sizing: border-box;
  .container{
    padding-top: 48px;
    .title{
      font-size: 17px;
      color: #888;
    }
    .optation-wrapper{
      margin-top: 22.5px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 30px 2px rgba(0, 0, 0, 0.06);
      border-radius:25px;
      padding: 24px 15px;
      padding-bottom: 9px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .optation{
        width: 33.33%;
        box-sizing: border-box;
        padding: 0 5%;
        margin-bottom: 15px;
        .prize{
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ececec;
          font-size: 14px;
          height: 45px;
          border-radius: 10px;
          box-sizing: border-box;
          &.active{
            background: #ff8a22;
            color: #fff;
          }
          &.custom-active{
            border: 1.5px solid #ff8a22;
            background: #fff;
          }
          .custom{
            display: flex;
            .custom-prize{
              flex: 1;
              padding: 0 5%;
              box-sizing: border-box;
              text-align: center;
            }
            .text{
              display: flex;
              align-items: center;
              width: 30%;
            }
          }
        }
      }
    }
    .btn-wrapper{
      margin-top: 50px;
      height: 49px;
    }
  }
}
</style>
