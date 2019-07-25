<template>
  <div
  form-type="submit"
  @click="onClickBtn"
  :class="{active: isActive}"
  @touchstart="isActive = true"
  @touchend="isActive = false"
  class="im-button">
    {{label}}
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AntiMixin from '../mixins/antiMixin';

@Component
export default class ImButton extends AntiMixin {
  @Prop()
  private label!: string;

  private isActive: boolean = false;

  private onClickBtn() {
    this.$emit('click')
  }
}
</script>
<style lang='scss' scoped>
.im-button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background:linear-gradient(264deg,rgba(255,171,72,1),rgba(255,138,34,1));
  box-shadow:0px 0px 16px 4px rgba(255,138,34,0.2);
  border-radius:10px 49px 49px 49px;
  color: #fff;
  &.active{
    background:linear-gradient(264deg,rgba(255,139,35,1),rgba(223,110,10,1));
    box-shadow:0px 0px 16px 4px rgba(255,138,34,0.2);
    border-radius:10px 49px 49px 49px;
  }
}
</style>
