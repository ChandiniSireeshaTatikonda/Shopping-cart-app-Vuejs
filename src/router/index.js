import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import ItemDetailsPage from '../views/ItemDetailsPage.vue'
import CartItems from '../views/CartItems.vue';
import ThankyouPage from '../views/ThankyouPage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/itemDetailsPage/:id',
    name: 'ItemDetailsPage',
    component: ItemDetailsPage
  },
  {
    path: '/cartItems',
    name: 'CartItems',
    component: CartItems
  },
  {
    path: '/thankyouPage',
    name: 'ThankyouPage',
    component: ThankyouPage
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
