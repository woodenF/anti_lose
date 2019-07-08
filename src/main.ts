import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'
import '@/assets/styles/global.scss'

Vue.prototype.$store = store;
Vue.config.productionTip = false

new App().$mount()
