<template>
  <div class="im-textarea">
    <text class="mask">{{inputValue}}</text>
    <textarea @input="inputChange" placeholder="请输入文字" v-model="inputValue" name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch, Emit, Model } from 'vue-property-decorator';

@Component
export default class ImTextarea extends Vue {
  @Model ('change', { type: String }) inputMessage!: string;
  private inputValue: string = this.inputMessage;

  @Emit('input')
  private inputChange() {
    return this.inputValue;
  }
  @Watch('inputMessage')
  private modelDataChange(value: string) {
    this.inputValue = value;
  }
}
</script>
<style lang='scss' scoped>
.im-textarea{
  position: relative;
  min-height: 38px;
  max-height: 115px;
  width: 100%;
  overflow: hidden;
  textarea{
    position: absolute;
    top: 0;
    z-index: 99;
    padding: 0 19px;
    padding-top: 5px;
    font-size: 17px;
    background: #fff;
    box-sizing: border-box;
    height: 100%;
    min-height: 38px;
    width: 100%;
    border-radius:19px;
  }
  .mask{
    display: flex;
    padding: 0 19px;
    word-break: break-word;
  }
}
</style>
