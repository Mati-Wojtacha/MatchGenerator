import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TwoVsTwoView from '../views/TwoVsTwoView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {titleKey: 'title.home'}
  },
  {
    path: '/2vs2',
    name: 'TwoVsTwoView',
    component: TwoVsTwoView,
    meta: {titleKey: 'title.twoVsTwo'}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {titleKey: 'title.about'}
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
