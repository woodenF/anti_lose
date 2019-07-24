<template>
  <div class="chat-page-chat">
    <div class="content-wrapper">
      <scroll-view
      scroll-y="true"
      :scroll-top="scrollTop"
      id="message-wrapper"
      class="message-wrapper">
        <div class="message-item" v-for="(item, index) in chatMessages" :key="index">
          <div v-if="item.type === messageType.SYSTEM" class="system-message">
            {{item.content}}
          </div>
          <div v-if="item.sendType === sendType.SEND" class="own-message">
            <div class="head-img">
              <img :src="item.sendAvatarUrl" alt="">
            </div>
            <div class="message">
              <div v-if="item.type === messageType.TEXT" class="text">{{item.content}}</div>
              <div v-else-if="item.type === messageType.IMG" class="img">
                <img mode="widthFix" :src="item.content" alt="">
              </div>
            </div>
          </div>
          <div v-if="item.sendType === sendType.RECEIVE" class="other-message">
            <div class="head-img">
              <img :src="item.sendAvatarUrl" alt="">
            </div>
            <div class="message">
              <div v-if="item.type === messageType.TEXT" class="text">{{item.content}}</div>
              <div v-else-if="item.type === messageType.IMG" class="img">
                <img mode="widthFix" :src="item.content" alt="">
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="operation-wrapper">
      <div class="input-wrapper">
        <im-textarea v-model="inputMessage" :inputMessage="inputMessage" class="input"></im-textarea>
      </div>
      <div class="smile-wrapper">
        <img class="smile" src="../../assets/image/chatPage/smile.png" alt="">
      </div>
      <div class="more-wrapper">
        <img @click="isShow = !isShow" v-if="inputMessage.length === 0" class="more" src="../../assets/image/chatPage/more.png" alt="">
        <form v-else report-submit="true" @submit="formSubmit">
          <button form-type="submit" @click="sendMessage(1, inputMessage)" class="send">发送</button>
        </form>
      </div>
    </div>
    <div :animation="animationData" class="select-wrapper">
      <div class="option">
        <div @click="chooseImage" class="option-item">
          <img src="../../assets/image/chatPage/photo.png" alt="">
          <div class="text">相册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../../mixins/antiMixin';
import ImTextarea from '../../components/im-textarea.vue';
import { getMessageInfo, sendMessage } from '../../http/api';

@Component({
  components:{
    ImTextarea
  }
})
export default class ChatPageChat extends AntiMixin {
  private sendOpenId: string = '';
  private isShow: boolean = false;
  private inputMessage: string = '';
  private scrollTop: number = 0;
  // type 1 文字 2 图片 3 系统消息
  private chatMessages: object[] = []
  private animationData: any = {};

  private timer: any = null;

  private onLoad(option: any) {
    this.changePageTitle(option.nickName)
    this.sendOpenId = option.id;
  }

  private beforeDestroy() {
    clearInterval(this.timer);
  }

  private mounted() {
    this.getMessageInfo();
    this.timer = setInterval(() => {
      this.getMessageInfo();
    }, 5000)
  }

  private async sendMessage(type: number, content: string, src: string = '') {
    const params = {
      content,
      toOpenId: this.sendOpenId,
      type
    }
    const isSuccess: any = await sendMessage(params);
    if (isSuccess.errCode === 200) {
      content = type === 2 ? src : content;
      this.chatMessages.push(
        {
          type,
          content,
          sendAvatarUrl: this.avatarUrl,
          sendOpenId: this.openId,
          toOpenId: this.sendOpenId,
          sendType: this.sendType.SEND
        }
      )
      this.inputMessage = '';
      this.scrollTop += 1000;
    }
  }
  private async getMessageInfo() {
    const messageInfo: any = await getMessageInfo({ sendOpenId: this.sendOpenId });
    this.chatMessages = (messageInfo.data || [] as []).reverse();
    this.scrollTop = (messageInfo.data|| [] as []).length * 500;
  }

  private selectShow() {
    const animation: any = uni.createAnimation();
    animation.height(200).step({ duration: 100, timingFunction: 'linear' });
    this.animationData = animation.export();
  }
  private selectHide() {
    const animation: any = uni.createAnimation();
    animation.height(0).step({ duration: 100, timingFunction: 'linear' });
    this.animationData = animation.export();
  }
  private chooseImage() {
    uni.chooseImage(
      {
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res: any) => {
          const src = res.tempFilePaths[0];
          console.log(src)
          this.imageToBase64(src).then((base: any) => {
            this.sendMessage(2, base, src);
          });
        }
      }
    )
  }

  private imageToBase64(file: string) {
    return new Promise((resolve, reject) => {
      const base = (uni as any).getFileSystemManager().readFileSync(file, 'base64');
      resolve(base)
    })
  }

  @Watch('isShow')
  private isShowChange(isShow: boolean) {
    console.log('==========')
    if (isShow) {
      this.selectShow();
    } else {
      this.selectHide();
    }
  }
}
</script>
<style lang='scss'>
.chat-page-chat{
  height: 100%;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content-wrapper{
    background: #f8f8f8;
    overflow: hidden;
    flex: 1;
    .message-wrapper{
      height: 100%;
      .message-item{
        .system-message{
          text-align: center;
          font-size: 14px;
          color: #bbb;
          padding: 21px;
        }
        .own-message, .other-message{
          padding: 20px;
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
          .head-img{
            width: 55px;
            text-align: center;
            img{
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
          .message{
            background: #fff;
            word-break: break-word;
            max-width: 60%;
            border-radius: 19px;
            padding: 11px;
            font-size: 17px;
            .img{
              width: 100%;
              img{
                border-radius: 19px;
                width: 50vw;
              }
            }
          }
        }
        .other-message{
          display: flex;
          flex-direction: row;
        }
      }
    }
  }
  .operation-wrapper{
    display: flex;
    align-items: flex-end;
    padding: 0 18px 18px 18px;
    box-sizing: border-box;
    .input-wrapper{
      flex: 1;
      .input{
        width: 100%;
        height: 38px;
        color: #b2b2b2;
        box-sizing: border-box;
      }
    }
    .smile-wrapper, .more-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 38px;
      width: 40px;
      .smile{
        width: 32px;
        height: 32px;
      }
      .more{
        width: 29px;
        height: 29px;
      }
      .send{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        color: #fff;
        width: 44.5px;
        height: 29px;
        font-size: 16px;
        background: #ff8b23;
        border-radius: 10px;
      }
    }
  }
  .select-wrapper{
    background: #fff;
    height: 0px;
    .option{
      padding: 2% 3%;
      box-sizing: border-box;
      .option-item{
        text-align: center;
        width: 40px;
        img{
          width: 30px;
          height: 25.5px;
        }
        .text{
          font-size: 14px;
        }
      }
    }
  }
}
</style>
