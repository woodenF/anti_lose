<template>
  <div class="set-page-about">
    <img mode="widthFix" src="../../assets/image/setPage/about.jpg" alt="">
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SetPageAbout extends Vue {
}
</script>
<style lang='scss' scoped>
.set-page-about{
  img{
    width: 100%;
  }
}
</style>
