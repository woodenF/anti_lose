<template>
  <div class="purchase-qrcode">
    <div class="title">
      购买 <img src="../../assets/image/purchase/right.png" alt=""> 绑定
    </div>
    <div class="card-wrapper">
      <div class="card-title">购买渠道</div>
      <div class="card">
        <img class="icon" src="../../assets/image/purchase/circle.png" alt="">
        <div class="text">
          失物招领服务小店（官方店）
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <im-button @click="onNavigateToMiniProgram" class="btn" :label="'去购买'"></im-button>
    </div>
    <div class="remark">点击后会跳转到官方微信小店</div>
    <div class="card-wrapper">
      <div class="card-title">绑定方法</div>
      <div class="card">
        <img class="process" src="../../assets/image/purchase/process.png" alt="">
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ImButton from '../../components/im-button.vue';

@Component({
  components: {
    ImButton
  }
})
export default class PurchaseQrcode extends Vue {
  private onNavigateToMiniProgram() {
    uni.navigateToMiniProgram({
      appId: 'wx5ab73a39aacf8dc2',
      success () {
        console.log('---')
      }
    })
  }
}
</script>
<style lang='scss' scoped>
.purchase-qrcode{
  padding: 4% 7%;
  .title{
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #3C342E;
    font-weight: 800;
    img{
      width: 59px;
      height: 14.5px;
      margin: 0 10px;
    }
  }
  .card-wrapper{
    .card-title{
      font-size: 17px;
      font-weight: bold;
      color: #3c342e;
      padding: 15px 0;
    }
    .card{
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 30px 1px rgba(0, 0, 0, 0.06);
      border-radius:25px;
      display: flex;
      align-items: center;
      padding: 21px 16px;
      box-sizing: border-box;
      .icon{
        width: 59px;
        height: 59px;
      }
      .process{
        width: 291px;
        height: 127px;
      }
      .text{
        font-size: 17px;
        margin-left: 10px;
      }
    }
  }
  .btn-wrapper{
    padding-top: 34px;
    height: 59px;
    font-size: 18px;
  }
  .remark{
    font-size: 13px;
    color: #888;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 50px;
  }
}
</style>
