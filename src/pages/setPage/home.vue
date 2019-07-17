<template>
  <div class="set-page-home">
    <div class="user-info">
      <div class="head-img">
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4248235115,2201748940&fm=27&gp=0.jpg" alt="">
      </div>
      <div class="user-name">
        好大只呀
      </div>
    </div>
    <div class="account-info">
      <div class="surplus-wrapper">
        <div class="title">剩余加密通话分钟数</div>
        <div class="surplus">13分钟</div>
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
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../../mixins/antiMixin';
import ImButton from '../../components/im-button.vue';

@Component({
  components: {
    ImButton
  }
})
export default class SetPageHome extends AntiMixin {
  private setOpations: object[] = [
    { label: '黑名单', path: '/pages/setPage/blackList' },
    { label: '更改手机号', path: '' },
    { label: '关于防丢二维码', path: '/pages/setPage/about' },
    { label: '常见问题', path: '' },
    { label: '意见反馈', path: '' },
  ]

  private onLinkToPath(path: string) {
    if (path === '') return
    this.navigateTo(path);
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
  }
}
</style>
