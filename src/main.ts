import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.devtools = true;

new Vue({
  el: '#aws-workbench-app',
  data: {
  },
  router,
  components: { App },
  template: '<App/>'
})