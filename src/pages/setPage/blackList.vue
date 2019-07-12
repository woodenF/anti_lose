<template>
  <div class="black-list">
    <div class="black-list-wrapper">
      <div class="black-list-item" v-for="(item, index) in blackList" :key="index">
        <div class="head-img">
          <img :src="item.head_img" alt="">
        </div>
        <div class="nick-name">
          {{item.nickName}}
        </div>
        <div class="remove">
          <im-button :label="'移出黑名单'" class="btn"></im-button>
          <!-- <div class="btn">
            移出黑名单
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ImButton from '../../components/im-button.vue';

@Component({
  components: {
    ImButton
  }
})
export default class BlackList extends Vue {
  private blackList: object[] = [
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀好大只呀好大只呀' },
    { head_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg', nickName: '好大只呀' },
  ]
}
</script>
<style lang='scss' scoped>
.black-list{
  padding: 28px 7%;
  .black-list-wrapper{
    .black-list-item{
      display: flex;
      align-items: center;
      margin-bottom: 27px;
      .head-img{
        img{
          width: 57px;
          height: 57px;
          border-radius: 50%;
        }
      }
      .nick-name{
        flex: 1;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 17px;
      }
      .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 98px;
        height: 30px;
        background:linear-gradient(264deg,rgba(255,171,72,1),rgba(255,138,34,1));
        box-shadow:0px 0px 32px 8px rgba(255,138,34,0.2);
        border-radius:6px 30px 30px 34px;
        color: #fff;
        font-size: 15px;
      }
    }
  }
}
</style>
