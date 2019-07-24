<template>
  <div class="black-list">
    <div class="black-list-wrapper">
      <div class="black-list-item" v-for="(item, index) in blackList" :key="index">
        <div class="head-img">
          <img :src="item.avatarUrl" alt="">
        </div>
        <div class="nick-name">
          {{item.nickName}}
        </div>
        <div  @click="deleteBlackList(item.id, index)" class="remove">
          <im-button :label="'移出黑名单'" class="btn"></im-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ImButton from '../../components/im-button.vue';
import { getBlackList, deleteBlackList } from '../../http/api';

@Component({
  components: {
    ImButton
  }
})
export default class BlackList extends Vue {
  private blackList: any = []

  private async mounted() {
    const blackList: any = await getBlackList()
    this.blackList = blackList.data;
  }

  private async deleteBlackList(id: string, index: number) {
    console.log('-------')
    const isSuccess = await deleteBlackList({ id: id })
    this.blackList.splice(index, 1);
  }
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
