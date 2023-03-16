import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../public/static/style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const eventBus = new Vue(); 

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
