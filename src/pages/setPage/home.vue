<template>
  <div class="set-page-home">
    <div class="user-info">
      <div class="head-img">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
      <div class="user-name">
        {{userInfo.nickName}}
      </div>
    </div>
    <div class="account-info">
      <div class="surplus-wrapper">
        <div class="title">剩余加密通话分钟数</div>
        <div class="surplus">{{userInfo.callMinute}}分钟</div>
      </div>
      <div class="purchase">
        <im-button :label="'购买'" @click="onLinkToPath('/pages/purchase/purchase')" class="btn"></im-button>
        <!-- <div @click="onLinkToPath('/pages/purchase/purchase')" class="btn">
          购买
        </div> -->
      </div>
    </div>
    <div class="sets-wrapper">
      <div class="set" @click="onLinkToPath(item.path)" v-for="(item, index) in setOpations" :key="index">
        <div class="label">{{item.label}}</div>
        <div class="icon-wrapper">
          <img src="../../assets/image/setPage/right.png" alt="">
        </div>
      </div>
      <button class="set-btn" open-type="contact">
        <div class="label">意见反馈</div>
        <div class="icon-wrapper">
          <img src="../../assets/image/setPage/right.png" alt="">
        </div>
      </button>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../../mixins/antiMixin';
import ImButton from '../../components/im-button.vue';
import { getUserInfoById } from '../../http/api';

@Component({
  components: {
    ImButton
  }
})
export default class SetPageHome extends AntiMixin {
  private userInfo: any = {};

  private setOpations: object[] = [
    { label: '黑名单', path: '/pages/setPage/blackList' },
    { label: '更改手机号', path: '/pages/bindPhone/changePhone' },
    { label: '关于防丢二维码', path: '/pages/setPage/about' },
    { label: '常见问题', path: '/pages/setPage/problem' },
  ]

  private mounted() {
    this.getUserInfo();
  }

  private onLinkToPath(path: string) {
    if (path === '') return
    this.navigateTo(path);
  }

  private async getUserInfo() {
    this.userInfo = await getUserInfoById();
  }
}
</script>
<style lang='scss' scoped>
.set-page-home{
  padding: 5% 7%;
  .user-info{
    display: flex;
    align-items: center;
    margin-bottom: 6.22%;
    .head-img{
      img{
        border-radius: 50%;
        width: 72.5px;
        height: 72.5px;
      }
    }
    .user-name{
      font-size: 18px;
      font-weight: bold;
    }
  }
  .account-info{
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 46.5px;
    border-bottom: 2px solid #F6F5F1;
    .surplus-wrapper{
      flex: 1;
      .title{
        font-size: 13px;
        color: #b2b2b2;
        margin-bottom: 9px;
      }
      .surplus{
        font-weight: bold;
        font-size: 18px;
      }
    }
    .purchase{
      .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 63px;
        height: 30px;
        background:linear-gradient(264deg,rgba(255,171,72,1),rgba(255,138,34,1));
        box-shadow:0px 0px 32px 8px rgba(255,138,34,0.2);
        border-radius:6px 30px 30px 30px;
        font-size: 15px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
  .sets-wrapper{
    .set{
      display: flex;
      padding-bottom: 38px;
      align-items: flex-start;
      .label{
        flex: 1;
        font-size: 17px;
        font-weight: 500;
      }
      .icon-wrapper{
        img{
          width: 8px;
          height: 15.5px;
        }
      }
    }
    .set-btn{
      display: flex;
      margin: 0;
      padding: 0;
      background: none;
      .label{
        flex: 1;
        font-size: 17px;
        text-align: left;
        font-weight: 500;
      }
      .icon-wrapper{
        img{
          width: 8px;
          height: 15.5px;
        }
      }
    }
  }
}
</style>
