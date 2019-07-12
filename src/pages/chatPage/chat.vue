<template>
  <div class="chat-page-chat">
    <!-- <scroll-view scroll-y="true" :scroll-top="scrollTop" class="scroll-view">
      <div v-for="(item, index) in 100" :key="index">{{index}}</div>
    </scroll-view> -->
    <div class="content-wrapper">
      <scroll-view scroll-y="true" :scroll-top="scrollTop" id="message-wrapper" class="message-wrapper">
        <div class="message-item" v-for="(item, index) in chatMessages" :key="index">
          <div v-if="item.type === 'system'" class="system-message">
            {{item.content}}
          </div>
          <div v-if="item.type === 'own'" class="own-message">
            <div class="head-img">
              <img :src="item.head_img" alt="">
            </div>
            <div class="message">
              {{item.content}}
            </div>
          </div>
          <div v-if="item.type === 'other'" class="other-message">
            <div class="head-img">
              <img :src="item.head_img" alt="">
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
        <div @click="sendMessage" v-else class="send">发送</div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../../mixins/antiMixin';
import ImTextarea from '../../components/im-textarea.vue';

@Component({
  components:{
    ImTextarea
  }
})
export default class ChatPageChat extends AntiMixin {
  private inputMessage: string = '好大只呀';

  private scrollTop: number = 0;

  private chatMessages: object[] = [
    {
      type: 'system', content: '06-11 下午17:15'
    },
    {
      type: 'own', content: '好大啊之', head_img: 'http://img3.imgtn.bdimg.com/it/u=3361934473,3725527506&fm=26&gp=0.jpg'
    },
    {
      type: 'other', content: '湿的萨德所多撒a', head_img: 'http://img3.imgtn.bdimg.com/it/u=1387403640,627783069&fm=26&gp=0.jpg'
    }
  ]

  private onLoad(option: any) {
    this.changePageTitle(option.nickName)
  }
  private sendMessage() {
    this.chatMessages.push(
      { type: 'own', content: this.inputMessage, head_img: 'http://img3.imgtn.bdimg.com/it/u=3361934473,3725527506&fm=26&gp=0.jpg' }
    )
    this.inputMessage = '';
    this.scrollTop += 1000;
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
