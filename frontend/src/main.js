import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import './custom.scss'
library.add(faUserSecret);
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
