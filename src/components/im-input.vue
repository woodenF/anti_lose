<template>
  <div class="im-input">
    <div class="title">请输入手机号码</div>
    <div class="input-wrapper">
      <input v-model="value" @input="phoneChange" maxlength="11" type="text">
      <div @click="clear" class="icon-wrapper">
        <icon v-show="value.length" type="clear" size="17"></icon>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch, Model, Emit } from 'vue-property-decorator';

@Component
export default class ImInput extends Vue {
  private value: string = '';

  @Emit('input')
  private phoneChange() {
    return this.value;
  }

  private clear() {
    this.value = '';
    this.phoneChange()
  }
}
</script>
<style lang='scss' scoped>
.im-input{
  .title{
    font-size: 13px;
    font-weight: 500;
    color: rgba(136, 136, 136, 1);
  }
  .input-wrapper{
    display: flex;
    align-items: center;
    border-bottom: 2px rgba(246, 245, 241, 1) solid;
    height: 44.5px;
    input{
      flex: 1;
      font-size: 17px;
      font-weight: 500;
    }
    .icon-wrapper{
      display: flex;
      align-items: center;
      width: 17px;
      height: 100%;
    }
  }
}
</style>
