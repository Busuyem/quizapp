import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import _ from 'lodash'


Vue.use(BootstrapVue)
Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
