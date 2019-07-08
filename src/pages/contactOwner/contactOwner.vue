<template>
  <div class="contact-owner">
    <div v-if="!isRegister" class="no-register">
      <div class="home-wrapper">
        <img src="../../assets/image/contactOwner/home.png" alt="">
      </div>
      <div class="card-wrapper">
        <div class="title">我的物品遗失了<br/>谢谢你能主动联系我</div>
        <div class="img-wrapper">
          <img mode="widthFix" src="../../assets/image/contactOwner/find.png" alt="">
        </div>
      </div>
      <div class="btn-wrapper">
        <div @click="onCall" :class="{active: isAvailable}" class="btn">
          {{btnText}}
        </div>
      </div>
      <div class="remark">
        采用通话加密技术，呼叫双方不能看到对方的真实号码，不会泄漏您的隐私
      </div>
      <div class="leave-message">
        若电话沟通有问题，请给 ta <label>留言  <img src="../../assets/image/contactOwner/right.png" alt=""></label>
      </div>
    </div>
    <div v-else class="is-register">
      <div class="header">
        <img class="set" src="../../assets/image/contactOwner/set.png" alt="">
        <div class="space"></div>
        <div class="notice-wrapper">
          <img class="notice" src="../../assets/image/contactOwner/notice.png" alt="">
        </div>
      </div>
      <div class="card-wrapper">
        <div class="title">允许被呼叫</div>
        <div class="content">关闭后，扫码将无法被呼叫</div>
        <div class="btn-wrapper">
          <div @click="callStatus = !callStatus" class="btn" :class="{active: callStatus}">
            <div :class="{left: !callStatus, right: callStatus}" class="status">
            </div>
          </div>
        </div>
      </div>
      <div class="more-qrcode">
        <div class="btn">
          购买更多防丢二维码
        </div>
      </div>
      <div class="more-minutes">
        <div class="btn">
          购买加密通话分钟数
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ContactOwner extends Vue {
  private isAvailable: boolean = true;
  private isRegister: boolean = true;
  // 是否允许被呼叫
  private callStatus: boolean = false;
  private get btnText(): string {
    return this.isAvailable ? '电话联系' : '对方关闭了被呼叫功能';
  }

  private onCall() {
    if(!this.isAvailable) return;
    uni.showModal(
      {
        title: '',
        content: '对方加密通话分钟数已用完将使用真实号码拨打',
        cancelText: '取消',
        confirmText: '拨打',
        success: (res) => {
          if(res.confirm) {
            // Todo 点击确认
          }
        }
      }
    )
  }
}
</script>
<style lang='scss' scoped>
.contact-owner{
  padding: 0 7%;
  box-sizing: border-box;
  .no-register{
    .home-wrapper{
      margin-top: 3.37%;
      img{
        width: 23.5px;
        height: 23.5px;
      }
    }
    .card-wrapper{
      padding: 10%;
      box-sizing: border-box;
      width: 86vw;
      height: 86vw;
      margin-top: 4.72%;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 30px 1px rgba(0, 0, 0, 0.06);
      border-radius:25px;
      .title{
        text-align: center;
        font-size: 24px;
        font-weight: 800;
        color:rgba(60,52,46,1);
      }
      .img-wrapper{
        margin: 12px 0;
        img{
          width: 100%;
        }
      }
    }
    .btn-wrapper{
      margin-top: 4.95%;
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        height: 49px;
        color: #888;
        background:rgba(236,236,236,1);
        border-radius:10px 49px 49px 49px;
      }
      .active{
        color: #fff;
        box-shadow:0px 0px 32px 8px rgba(255,138,34,0.2);
        background:linear-gradient(264deg,rgba(255,171,72,1),rgba(255,138,34,1));
      }
    }
    .remark{
      margin-top: 4.95%;
      padding: 0 10%;
      box-sizing: border-box;
      font-size: 12px;
      color: #b2b2b2;
      text-align: center;
    }
    .leave-message{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 6.9%;
      font-size: 14px;
      font-weight:500;
      color:rgba(136,136,136,1);
      text-align: center;
      label{
        color: #ff8a22;
        display: flex;
        align-items: center;
        margin: 0 4px;
        img{
          margin-left: 4px;
          width: 13px;
          height: 13px;
        }
      }
    }
  }
  .is-register{
    .header{
      margin-top: 3.6%;
      display: flex;
      justify-content: center;
      .set{
        width: 23px;
        height: 22px;
      }
      .space{
        flex: 1;
      }
      .notice{
        width: 21px;
        height: 22px;
      }
    }
    .card-wrapper{
      display: flex;
      flex-direction: column;
      margin-top: 31.5px;
      box-sizing: border-box;
      width: 86vw;
      height: 86vw;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 30px 1px rgba(0, 0, 0, 0.06);
      border-radius:25px;
      margin-bottom: 38.5px;
      .title{
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex: 1;
        text-align: center;
        font-size: #3c342e;
        font-size: 24px;
        font-weight: 800;
      }
      .content{
        margin-top: 3%;
        text-align: center;
        color: #b2b2b2;
        font-size: 17px;
      }
      .btn-wrapper{
        flex: 1.5;
        display: flex;
        align-items: center;
        justify-content: center;
        .btn{
          position: relative;
          width: 66.5px;
          height: 30px;
          background: #888;
          border-radius:30px;
          &.active{
            background:rgba(255,138,34,1);
          }
          .status{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #fff;
            transition: all .5s linear;
          }
          .left{
            left: 2px;
            &.btn{
              background: #888;
            }
          }
          .right{
            right: 2px;
          }
        }
      }
    }
    .more-qrcode, .more-minutes{
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 49px;
        background:rgba(236,236,236,1);
        border-radius:10px 49px 49px 49px;
        color: #FF8A22;
      }
      &.more-qrcode{
        margin-bottom: 13px;
      }
    }
  }
}
</style>
