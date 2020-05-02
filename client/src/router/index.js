import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AttractionPower from '../views/AttractionPower.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/attr_power',
    name: 'AttractionPower',
    component: AttractionPower
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
