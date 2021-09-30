import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import FlUi from '../dist/index.min.js';
// import FlUi from "./component/main";
import FlUi from 'flyingd-ui';

Vue.use(FlUi);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
