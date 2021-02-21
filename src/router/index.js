import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '/',
        name: 'reports',
        component: () => import('@/views/Reports.vue'),
      },
      {
        path: '/save-reports',
        name: 'saveReports',
        component: () => import('@/views/Reports.vue'),
      },
      {
        path: '/report-details/:saved/:id',
        name: 'reportDetails',
        component: () => import('@/views/ReportDetails.vue'),
      },
      {
        path: '/create-report',
        name: 'createReport',
        component: () => import('@/views/CreateReport.vue'),
      },
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'exact-active',
  routes
})

export default router
