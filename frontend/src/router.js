import Vue from 'vue'
import Router from 'vue-router'

import Businesses from './views/businesses/Businesses.vue';
import Business from './views/businesses/Business.vue';

Vue.use(Router)

const router = new Router({
  base: process.env.VUE_APP_ROUTE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'businesses',
      component: Businesses,
    },
    {
      path: '/:id',
      name: 'business',
      component: Business,
    },
    // {
    //   // will match everything
    //   path: '*',
    //   component: Rates
    // }
  ]
})

export default router;