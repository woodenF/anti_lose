<template>
  <!-- <mescroll-uni @down="downCallback" @up="upCallback">
    <div class="item" v-for="(item, index) in testData" :key="index">{{item}}</div>
  </mescroll-uni>-->
  <div class="chat-message">
    <div class="scroll-wrapper">
      <mescroll-uni
        ref="mescroll"
        class="scroll"
        :down="{use: false}"
        :up="upOption"
        :top="20"
        :bottom="scrollFixBottom"
        @up="upCallback"
      >
        <div class="chat" v-for="(item, index) in chatDatas" :key="index">
          <div v-if="item.type === messageType.SYSTEM" class="system">
            {{item.content}}
          </div>
          <div class="user-message" v-else>
            <div class="avatarUrl">
              <img :src="item.sendAvatarUrl" alt />
            </div>
            <div class="container">
              <div class="header">
                <div class="nickname">{{item.sendNickName}}</div>
                <div class="empty"></div>
                <div class="time">{{item.inTime}}</div>
              </div>
              <div class="content">{{item.content}}</div>
            </div>
          </div>
        </div>
      </mescroll-uni>
    </div>
    <div class="operate-wrapper">
      <div class="input-wrapper">
        <im-textarea v-model="inputChat" :inputMessage="inputChat" class="input">
        </im-textarea>
      </div>
      <div class="smile-wrapper">
        <img class="smile" src="../../assets/image/chatPage/smile.png" alt="">
      </div>
      <div class="more-wrapper">
        <img @click="isShow = !isShow" v-if="inputChat.length === 0" class="more" src="../../assets/image/chatPage/more.png" alt="">
        <form v-else report-submit="true" @submit="formSubmit">
          <button form-type="submit" @click="sendMessage(1, inputChat)" class="send">发送</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import { getMessageInfo, sendMessage } from "../../http/api";
import AntiMixin from "../../mixins/antiMixin";
import ImTextarea from '../../components/im-textarea.vue';

@Component({
  components: {
    MescrollUni,
    ImTextarea
  }
})
export default class ChatTest extends AntiMixin {
  private upOption: any = {
    use: true,
    textNoMore: '加载完成!',
    toTop: false,
    offset: 0
  }

  // 内容区域距离底部的距离
  private scrollFixBottom: number = 100;
  private chatDatas: object[] = [];
  private sendOpenId: string = '';
  private inputChat: string = '';
  private isShow: boolean = true;
  private mescroll: any = null;

  private onLoad(option: any) {
    this.sendOpenId = "o3od65e9YGUfQlsKsIa1bVzCxAW0";
  }

  private mounted() {
    //   this.getChatData(this.sendOpenId);
    // this.$nextTick(() => {
    //   this.mescroll =  (this.$refs.mescroll as any).mescroll;
    //   this.mescroll.scrollTo(10, 0)
    // })
  }

  private async getChatData(openId: string) {
    const chatDatas: any = await getMessageInfo({
      sendOpenId: openId
    });
    this.chatDatas = (chatDatas.data || ([] as [])).reverse();
    setTimeout(() => {
      console.log(this.mescroll.viewId)
      this.mescroll.endSuccess();
      this.mescroll.hideUpScroll();
      const y = this.mescroll.getScrollHeight() === 0 ? 1000000 : this.mescroll.getScrollHeight() - this.mescroll.getClientHeight() + 70;
      this.mescroll.scrollTo(y, 50);
    }, 200);
  }

  private async sendMessage(type: number, content: string, src: string = '') {
    const params = {
      content,
      toOpenId: this.sendOpenId,
      type
    }
    const isSuccess: any = await sendMessage(params);
    this.getChatData(this.sendOpenId);
    this.inputChat = '';
  }

  private async upCallback(mescroll: any) {
    this.mescroll = mescroll;
    mescroll.hideTopBtn();
    mescroll.showUpScroll();
    await this.getChatData(this.sendOpenId);
  }
}
</script>
<style lang='scss'>
.chat-message {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #f8f8f8;
  .scroll-wrapper {
    flex: 1;
    .scroll {
      .chat {
        width: 100%;
        .user-message {
          display: flex;
          width: 100%;
          .avatarUrl {
            margin-left: 7%;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          .container {
            flex: 1;
            .header {
              display: flex;
              align-items: center;
              width: 100%;
              height: 40px;
              padding: 0 28px 0 10px;
              box-sizing: border-box;
              .nickname {
                font-size: 13px;
                color: #888;
              }
              .empty {
                flex: 1;
              }
              .time {
                font-size: 13px;
                color: #888;
              }
            }
            .content {
              width: 100%;
              padding: 0 28px 23px 10px;
              word-break: break-word;
              box-sizing: border-box;
              font-size: 14px;
              border-bottom: 1px solid #ececec;
            }
          }
        }
      }
    }
  }
  .operate-wrapper {
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
}
</style>
