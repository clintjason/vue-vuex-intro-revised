import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '@/views/event/Details.vue'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: () =>
      import(/* webpackChunkName: 'eventCreate' */ '@/views/EventCreate.vue'),
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: () =>
      import(/* webpackChunkName: 'errorDisplay' */ '@/views/ErrorDisplay.vue'),
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: () => import('@/views/event/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: '/register',
        name: 'EventRegister',
        component: () => import('@/views/event/Register.vue'),
      },
      {
        path: '/edit',
        name: 'EventEdit',
        component: () => import('@/views/event/Edit.vue'),
      },
    ],
  },
  {
    path: '/about-us',
    name: 'About',
    alias: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/AboutView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: import('@/views/NotFound.vue'),
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: import('@/views/NotFound.vue'),
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: import('@/views/NetworkError.vue'),
  },
  /* {
    path: '/about',
    redirect: { name: 'About' },
  }, */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // scroll to top and return to initial position on back
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
