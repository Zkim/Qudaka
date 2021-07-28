import Vue from 'vue'
import App from './App'
import mpvueToastRegistry from 'mptoast/src/registry'
import fly from './utils/request'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)
Vue.prototype.$fly = fly

mpvueToastRegistry(Vue)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
