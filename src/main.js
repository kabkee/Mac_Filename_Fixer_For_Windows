import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import fixPath from 'fix-path';

import './plugins/vue-notification';
import './plugins/moment';

fixPath();

Vue.config.productionTip = false

window.App = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
