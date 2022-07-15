import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'

import './libraries/array';
import './libraries/number';
import './libraries/string';

import router from './router'

Vue.use(Notifications);

import InputGroup from './components/common/form/input/InputGroup.vue';
import Spinner from './components/common/spinner/Spinner.vue';

Vue.config.productionTip = false

Vue.component('InputGroup', InputGroup);
Vue.component('Spinner', Spinner);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

if (process.env.NODE_ENV === 'development') window['thisVue'] = Vue;