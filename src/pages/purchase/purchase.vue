<template>
  <div class="purchase">
    <div class="account-info">
      <div class="title">当前剩余加密通话分钟数</div>
      <div class="surplus">{{userInfo.callMinute}}分钟</div>
    </div>
    <div class="purchase-list">
      <div class="purchase-item"
        :class="{active: activeIndex === index}"
        @click="onActiveChange(index)"
        v-for="(item, index) in rechargeList" :key="index">
        <div class="label">{{item.minute}}分钟</div>
        <div class="price">售价：{{item.price}}元</div>
      </div>
    </div>
    <div class="btn-wrapper">
      <im-button @click="onPurchase" :label="'确认购买'"></im-button>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { getRechargeList, uniformOrder, getUserInfoById } from '../../http/api';
import ImButton from '../../components/im-button.vue';

@Component({
  components: {
    ImButton
  }
})
export default class Purchase extends Vue {
  private rechargeList: any = []
  private activeIndex: number = 0;
  private userInfo: any = {};

  private mounted() {
    this.getRechargeList()
    this.getUserInfo();
  }

  private onActiveChange(index: number) {
    this.activeIndex = index;
  }

  private async getRechargeList() {
    const rechargeList = await getRechargeList();
    this.rechargeList = rechargeList
  }

  private async getUserInfo() {
    this.userInfo = await getUserInfoById();
  }

  private async onPurchase() {
    const id = this.rechargeList[this.activeIndex].id;
    const prize = this.rechargeList[this.activeIndex].prize;
    const params = {
      type: 1,
      rechargeTypeId: id,
      money: prize
    }
    const wxPay: any = await uniformOrder(params);
    uni.requestPayment({
      timeStamp: wxPay.timeStamp + '',
      nonceStr: wxPay.nonceStr,
      package: wxPay.package,
      signType: wxPay.signType,
      paySign: wxPay.paySign
    })
  }
}
</script>
<style lang='scss' scoped>
.purchase{
  padding: 7%;
  .account-info{
    display: flex;
    align-items: center;
    margin-bottom: 22.5px;
    .title{
      flex: 1;
      font-size: 17px;
      color: #888;
      font-weight: 500;
    }
    .surplus{
      font-size: 18px;
      color: #3c342e;
      font-weight: 800;
    }
  }
  .purchase-list{
    padding: 15px 15px 0 15px;
    display: flex;
    flex-wrap: wrap;
    box-shadow:0px 0px 30px 2px rgba(0, 0, 0, 0.06);
    border-radius:25px;
    .purchase-item{
      display: flex;
      text-align: center;
      padding: 15px 11px;
      flex-direction: column;
      justify-content: center;
      background: #ececec;
      border-radius: 10px;
      margin: 0 1.5%;
      margin-bottom: 15px;
      width: 30%;
      box-sizing: border-box;
      &.active{
        background: #ff8a22;
        color: #fff;
      }
      .label{
        font-size: 17px;
        font-weight: bold;
      }
      .price{
        font-size: 14px;
        font-weight: 500px;
      }
    }
  }
  .btn-wrapper{
    height: 49px;
    margin-top: 50px;
  }
}
</style>
