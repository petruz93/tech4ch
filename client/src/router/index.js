import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AttractionPower from '../views/AttractionPower.vue'
import VisitorsPerHour from '../views/VisitsPerHour.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/visitors_per_hour',
    name: 'VisitorsPerHour',
    component: VisitorsPerHour
  },
  {
    path: '/attr_power',
    name: 'AttractionPower',
    component: AttractionPower
  },
  {
    path: '/playback',
    name: 'PlayBack',
    component: () => import(/* webpackChunkName: "playback" */ '../views/PlayBack.vue')
  },
  {
    path: '/visitsummary',
    name: 'VisitSummary',
    component: () => import(/* webpackChunkName: "visitsummary" */ '../views/VisitSummary.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
