<template>
  <div class="chat-page-chat">
    <div class="content-wrapper">
      <scroll-view
      scroll-y="true"
      :scroll-top="scrollTop"
      id="message-wrapper"
      class="message-wrapper">
        <div class="message-item" v-for="(item, index) in chatMessages" :key="index">
          <div v-if="item.type === 3" class="system-message">
            {{item.content}}
          </div>
          <div v-if="item.sendOpenId === openId" class="own-message">
            <div class="head-img">
              <img :src="item.sendAvatarUrl" alt="">
            </div>
            <div class="message">
              {{item.content}}
            </div>
          </div>
          <div v-if="item.sendOpenId === sendOpenId" class="other-message">
            <div class="head-img">
              <img :src="item.sendAvatarUrl" alt="">
            </div>
            <div class="message">
              {{item.content}}
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
        <img v-if="inputMessage.length === 0" class="more" src="../../assets/image/chatPage/more.png" alt="">
        <div @click="sendMessage(1)" v-else class="send">发送</div>
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

  private inputMessage: string = '好大只呀';
  private scrollTop: number = 0;
  // type 1 文字 2 图片 3 系统消息
  private chatMessages: object[] = []

  private onLoad(option: any) {
    this.changePageTitle(option.nickName)
    this.sendOpenId = option.id;
  }

  private mounted() {
    this.getMessageInfo();
  }
  private sendMessage(type: number) {
    const params = {
      content: this.inputMessage,
      toOpenId: this.sendOpenId,
      type
    }
    sendMessage(params).then((res: any) => {
      if (res.data.errCode === 200) {
        this.chatMessages.push(
          {
            type: 1,
            content: this.inputMessage,
            sendAvatarUrl: 'http://img3.imgtn.bdimg.com/it/u=3361934473,3725527506&fm=26&gp=0.jpg',
            sendOpenId: this.openId,
            toOpenId: this.sendOpenId
          }
        )
        this.inputMessage = '';
        this.scrollTop += 1000;
      }
    })
  }
  private getMessageInfo() {
    getMessageInfo({ sendOpenId: this.sendOpenId }).then((res: any) => {
      this.chatMessages = (res.data as []).reverse();
      this.scrollTop = (res.data as []).length * 500;
    })
  }
}
</script>
<style lang='scss'>
.chat-page-chat{
  height: 100%;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
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
            max-width: 50%;
            border-radius: 19px;
            padding: 11px;
            font-size: 17px;
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
        color: #fff;
        width: 44.5px;
        height: 29px;
        font-size: 16px;
        background: #ff8b23;
        border-radius: 10px;
      }
    }
  }
}
</style>
