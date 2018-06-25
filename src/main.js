import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import qs from 'qs'
import 'normalize.css'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';
import api, { domain } from './js/api.js'
import axios from 'axios'
import VueScroller from 'vue-scroller'
import "../static/css/global.css"
import { LoadingPlugin, ToastPlugin, WechatPlugin } from 'vux'
axios.defaults.baseURL = domain;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true; //允许携带cookie
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$qs = qs;
const querystring = require('querystring');
Vue.use(WechatPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(VueScroller)
Vue.use(YDUI);
Vue.config.productionTip = false

console.log(Vue.wechat) // 可以直接访问 wx 对象。
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'

})