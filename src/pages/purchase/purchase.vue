<template>
  <div class="purchase">
    <div class="account-info">
      <div class="title">当前剩余加密通话分钟数</div>
      <div class="surplus">13分钟</div>
    </div>
    <div class="purchase-list">
      <div class="purchase-item" v-for="(item, index) in purchaseList" :key="index">
        <div class="label">{{item.label}}</div>
        <div class="price">售价：{{item.price}}元</div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Purchase extends Vue {
  private purchaseList: object[] = [
    { label: '30分钟', price: 3 },
    { label: '60分钟', price: 5 },
    { label: '120分钟', price: 8 },
  ]
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
}
</style>
