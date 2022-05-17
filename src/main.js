import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import friendlyDate from '@/helpers/util';
import { Button, Message, Pagination } from 'element-ui';

Vue.config.productionTip = false;

Vue.use(friendlyDate);
Vue.use(Button, Message);
Vue.use(Pagination);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
