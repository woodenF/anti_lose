<template>
  <div @click="changeOperationStatus(false)" class="chat-page-home">
    <div class="message-wrapper"
    >
      <div class="message-item"
      :style="{transform: `translateX(-${getTranslateX(index)}px)`}"
      :class="{active: isTouch}"
      @touchstart="touchStart($event, index)"
      @touchmove.stop="touchMove($event, index)"
      @touchend.stop="touchEnd"
      v-for="(item, index) in messageList"
      :key="index">
        <div class="content" @click="onLinkToChat(item)">
          <div class="head-img">
            <img :src="item.head_img" alt="">
          </div>
          <div class="message-info">
            <div class="user-info">
              <div class="nick-name">{{item.nickName}}</div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="last-message">
              {{item.lastMessage}}
            </div>
          </div>
        </div>
        <div class="operation">
          <div @click.stop="this.confirm = { text: '确认拉黑', bg: '#FF8A22', type: 'black', status: true }" class="pull-black">
            拉黑TA
          </div>
          <div @click.stop="this.confirm = { text: '确认删除对话', bg: '#FF3000', type: 'delete', status: true }" class="delete">
            删除对话
          </div>
          <div @click.stop="operationForType(confirm.type, index)" v-if="confirm.status" :style="{background: confirm.bg}" class="confirm">
            {{confirm.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../../mixins/antiMixin';

@Component
export default class ChatPageHome extends AntiMixin {
  private activeChat: number = -1;
  private startX: number = 0;
  private startY: number = 0;
  private offsetX: number = 0;
  private isOperation: boolean = false;
  private isTouch: boolean = false;
  private confirm: object = { text: '确认删除对话', bg: '#FF3000', type: 'delete', status: false }
  private messageList: object[] = [
    { id: 1, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀1', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 2, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀2', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 3, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀3', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 4, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀4', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 5, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀5', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
    { id: 6, head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀6', lastMessage: '打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所打撒撒大所多所', time: '上午11.11' },
  ]


  private get getTranslateX(): object {
    return (index: number) => {
      return this.activeChat === index ? this.offsetX : 0;
    }
  }

  private onLinkToChat(data: any) {
    if (this.isOperation) {
      this.changeOperationStatus(false);
      return
    }
    const params = {
      id: data.id,
      nickName: data.nickName
    }
    this.navigateTo('/pages/chatPage/chat', params);
  }
  private operationForType(type: string, index: number) {
    if (type === 'black') {
      this.pullBlack(index);
    } else if (type ==='delete') {
      this.deleteChat(index);
    }
  }
  private pullBlack(index: number) {
    uni.showModal(
      {
        title: '',
        content: '拉黑用户将清除所有聊天记录，并且以后再也无法通过您物品上的二维码联系上您',
        cancelText: '取消',
        confirmText: '确认',
        success: (res) => {
          if (res.confirm) {
          }
        }
      }
    )
  }
  private deleteChat(index: number) {
    this.isTouch = true;
    this.changeOperationStatus(false);
    this.messageList.splice(index, 1);
    this.isTouch = false;
  }
  private touchStart(e: any, index: number) {
    this.startX = e.changedTouches[0].clientX;
  }
  private touchMove(e: any, index: number) {
    const currentX = e.changedTouches[0].clientX;
    if (this.activeChat !== index) {
      this.changeOperationStatus(false)
      this.activeChat = index;
    }
    this.isTouch = false;
    if (this.isOperation) {
      this.offsetX = 200 + (this.startX - currentX)
    } else {
      this.offsetX = this.startX - currentX;
    }
    if (this.offsetX >= 200) {
      this.offsetX = 200
    }
  }
  private touchEnd(e: any) {
    this.isTouch = true;
    if (this.isOperation) {
      if (this.offsetX <= 150) {
        this.changeOperationStatus(false);
      } else {
        this.changeOperationStatus(true);
      }
    } else {
      if (this.offsetX >= 50) {
        this.changeOperationStatus(true);
      } else {
        this.changeOperationStatus(false);
      }
    }
  }

  private changeOperationStatus(operationStatus: boolean) {
    this.isOperation = operationStatus;
    this.offsetX = operationStatus ? 200 : 0;
  }

  @Watch('isOperation')
  private operationStatusChange(operationChange: boolean) {
    if (!operationChange) {
      setTimeout(() => {
        this.confirm = { text: '确认删除对话', bg: '#FF3000', type: 'delete', status: false };
      }, 200);
    }
  }
}
</script>
<style lang='scss' scoped>
.chat-page-home{
  padding-top: 13px;
  height: 100%;
  box-sizing: border-box;
  .message-wrapper{
    overflow-y: scroll;
    overflow-x: hidden;
    .message-item{
      position: relative;
      margin: 10px 0;
      &.active{
        transition: all .2s linear;
      }
      .content{
        display: flex;
        padding: 0 28px;
        .head-img{
          padding-right: 10px;
          img{
            width: 57px;
            height: 57px;
            border-radius: 50%;
          }
        }
        .message-info{
          overflow: hidden;
          flex: 1;
          .user-info{
            display: flex;
            height: 36px;
            align-items: center;
            .nick-name{
              flex: 1;
              font-size: 17px;
              font-weight: bold;
            }
            .time{
              font-size: 12px;
              font-weight: 500;
              color: #bbb;
            }
          }
          .last-message{
            font-size: 14px;
            color: #888;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
          }
        }
      }
      .operation{
        display: flex;
        position: absolute;
        width: 200px;
        height: 100%;
        top: 0;
        left: 100%;
        .pull-black, .delete{
          flex: 1;
          display: flex;
          font-size: 17px;
          color: #fff;
          background: #ff8a22;
          justify-content: center;
          align-items: center;
        }
        .delete{
          background: #ff3000;
        }
        .confirm{
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff3000;
          position: absolute;
          font-size: 17px;
          color: #fff;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
