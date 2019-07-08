<template>
	<div class="home">
		<div class="container">
		</div>
	</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import AntiMixin from '@/mixins/antiMixin';

@Component
export default class Home extends AntiMixin {

	private mounted() {
		this.navigateTo('/pages/contactOwner/contactOwner', { a: 1, b: 2 })
	}
}
</script>
<style lang='scss'>
</style>
