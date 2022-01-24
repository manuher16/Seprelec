import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import VueCookies from 'vue-cookies'


Vue.use(VueCookies)
if (!Vue.$cookies.get('iplocation')) {
  Vue.$cookies.set('iplocation', false, 60 * 60 * 24)
}

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
