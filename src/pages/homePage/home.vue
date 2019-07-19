<template>
	<div class="home">
    <div v-if="isTips" class="tips">
      <div class="icon-wrapper">
        <img class="tips" src="../../assets/image/contactOwner/tips.png" alt="">
      </div>
      <div class="text-wrapper">
        <div class="text">
          您的加密通话分钟数已经用完，对方将直接拨打您的真实号码，为避免隐私信息泄漏，建议您尽快购买加密通话分钟数!
        </div>
      </div>
      <div @click="isTips = false" class="icon-wrapper">
        <img class="cancel" src="../../assets/image/contactOwner/cancel.png" alt="">
      </div>
    </div>
    <div class="header">
      <button @getuserinfo="bindGetUserInfo($event, '/pages/setPage/home')" open-type="getUserInfo" class="set-btn">
        <img class="set" src="../../assets/image/contactOwner/set.png" alt="">
      </button>
      <div class="space"></div>
      <div class="notice-wrapper">
        <button @getuserinfo="bindGetUserInfo($event, '/pages/chatPage/home')" open-type="getUserInfo" class="set-btn">
          <img class="notice" src="../../assets/image/contactOwner/notice.png" alt="">
        </button>
      </div>
    </div>
		<div class="container">
			<div v-if="isRegister" class="is-register">
        <div class="card-wrapper">
          <div class="title">允许被呼叫</div>
          <div class="content">关闭后，扫码将无法被呼叫</div>
          <div class="btn-wrapper">
            <div @click="isEncryption = !isEncryption" class="btn" :class="{active: isEncryption}">
              <div :class="{left: !isEncryption, right: isEncryption}" class="status">
              </div>
            </div>
          </div>
        </div>
        <div class="more-qrcode">
          <div @click="onLinkToPath('/pages/purchase/purchaseQrcode')" class="btn">
            购买更多防丢二维码
          </div>
        </div>
        <div class="more-minutes">
          <div @click="onLinkToPath('/pages/purchase/purchase')" class="btn">
            购买加密通话分钟数
          </div>
        </div>
      </div>
			<div v-else class="no-register">
				<div class="swiper-wrapper">
          <swiper class="swiper" indicator-dots>
            <swiper-item class="swiper-item" v-for="(item, index) in swipers" :key="index">
              <img mode="widthFix" :src="item.src" alt="">
            </swiper-item>
          </swiper>
        </div>
        <div class="btn-wrapper">
          <button class="author" @getuserinfo="bindGetUserInfo($event, '/pages/purchase/purchaseQrcode')" open-type="getUserInfo">获取防丢二维码</button>
          <!-- <im-button @click="onLinkToPath('/pages/purchase/purchaseQrcode')" @getuserinfo="bindGetUserInfo" open-type="getUserInfo" class="btn" :label="'获取防丢二维码'"></im-button> -->
        </div>
			</div>
		</div>
	</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import AntiMixin from '@/mixins/antiMixin';
import { getUserByCode, getUserInfoById } from '../../http/api';
import ImButton from '../../components/im-button.vue';
import { checkLoginStatus } from '../../utils/util';

@Component({
  components: {
    ImButton
  }
})
export default class Home extends AntiMixin {
  private swipers: object[] = [
    { src: require('../../assets/image/home/banner_1.png') },
    { src: require('../../assets/image/home/banner_2.png') }
  ]
  // 是否有提示信息
  private isTips: boolean = false;
  // 是否是注册用户
  private isRegister: boolean = false;
  // 是否允许被呼叫
	private isEncryption: boolean = false;

  private async mounted() {
    await this.getUserInfo()
  }

  private async getUserInfo() {
    const userInfo: any = await getUserInfoById();
    this.isEncryption = userInfo.phoneEncryptionStatus;
    if (userInfo.phone !== '') {
      this.isRegister = true
    }
  }

  private onLinkToPath(path: string) {
		this.navigateTo(path)
  }

}
</script>
<style lang='scss'>
.home{
  height: 100%;
  display: flex;
  flex-direction: column;
	.tips{
    display: flex;
    align-items: center;
    font-size: 15px;
    height: 42px;
    color:#fff;
    background: #ff8b23;
    .icon-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 47.5px;
      height: 100%;
      .tips{
        width: 22px;
        height: 22px;
      }
      .cancel{
        width: 17px;
        height: 17px;
      }
    }
    .text-wrapper{
      flex: 1;
      overflow: hidden;
      .text{
        white-space: nowrap;
        animation: leftToRight 15s linear infinite;
        @keyframes leftToRight {
          0%{
            transform: translateX(100%)
          }
          100%{
            transform: translateX(-300%)
          }
        }
      }
    }
  }
  .header{
    margin-top: 3.6%;
    padding: 0 7%;
    display: flex;
    justify-content: center;
    .set-btn{
      background: none;
      padding: 0;
      margin: 0;
      &::after{
        border: none;
      }
      .set{
        width: 23px;
        height: 22px;
      }
    }
    .space{
      flex: 1;
    }
    .notice{
      width: 21px;
      height: 22px;
    }
  }
	.container{
    flex: 1;
		.is-register{
      display: flex;
      padding: 0 7%;
      flex-direction: column;
      .tips{
        height: 42px;
        background: #ff8b23;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
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
    .no-register{
      display: flex;
      flex-direction: column;
      height: 100%;
      .swiper-wrapper{
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
        .swiper{
          height: 100vw;
          width: 100%;
          .swiper-item{
            display: flex;
            justify-content: center;
            padding: 0 10%;
            box-sizing: border-box;
            img{
              width: 100%;
              box-shadow:0px 0px 60px 2px rgba(0, 0, 0, 0.06);
            }
          }
        }
      }
      .btn-wrapper{
        padding: 0 10%;
        padding-bottom: 10%;
        height: 49px;
        font-size: 18px;
        .author{
          background:linear-gradient(264deg,rgba(255,171,72,1),rgba(255,138,34,1));
          box-shadow:0px 0px 16px 4px rgba(255,138,34,0.2);
          border-radius:10px 49px 49px 49px;
          color: #fff;
        }
      }
    }
	}
}
</style>
