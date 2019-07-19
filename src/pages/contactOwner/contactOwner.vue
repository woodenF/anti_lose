<template>
  <div class="contact-owner">
    <div class="container">
      <div class="no-register">
        <div class="home-wrapper">
          <img @click="navigateTo('/pages/homePage/home')" src="../../assets/image/contactOwner/home.png" alt="">
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
          若电话沟通有问题，请给 ta <label @click="navigateTo('/pages/chatPage/chat', { id: codeOwner.openId, nickName: codeOwner.nickName })">留言  <img src="../../assets/image/contactOwner/right.png" alt=""></label>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { queryCode } from '../../http/api';
import AntiMixin from '../../mixins/antiMixin';

@Component
export default class ContactOwner extends AntiMixin {
  private isAvailable: boolean = true;
  private codeOwner: any = {};
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

  private async getCodeOwner(code: string) {
    this.codeOwner = await queryCode({ code })
    console.log(this.codeOwner)
    this.isAvailable = this.codeOwner.phoneEncryptionStatus
  }

  private onLoad(option: any) {
    this.getCodeOwner(option.code)
    console.log(option)
  }
}
</script>
<style lang='scss' scoped>
.contact-owner{
  padding-bottom: 36px;
  .container{
    padding: 0 7%;
    box-sizing: border-box;
    .no-register{
      .home-wrapper{
        padding-top: 3.37%;
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
  }
}
</style>
