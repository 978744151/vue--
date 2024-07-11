const commonPath = import.meta.env.VITE_APP_PATH
const remainingRouter: AppRouteRecordRaw[] = [
  {
    path: `/`,
    redirect: '/g-back/index',
  },
  {
    path: '/g-back',
    redirect: '/g-back/index',
    children: [
      {
        path: '/g-back/index',
        component: () => import('@/views/home/index.vue'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: { title: '404', icon: 'dashboard'}
  },
  {
    path: `${commonPath}/providerApply/index`,
    component: () => import('@/views/iframe/providerApply/index.vue'),
    meta: {
      title: 'providerApply',
    },
    name: 'providerApply',
  },
  {
    path: `${commonPath}/appDownLoad/index`,
    component: () => import('@/views/iframe/appDownLoad/index.vue'),
    meta: {
      title: 'appDownLoad',
    },
    name: 'appDownLoad',
  },
  {
    path: `${commonPath}/iframe/*`,
    component: () => import('@/views/iframe/index.vue'),
    meta: {
      title: 'iframe',
      link:true
    },
    name: 'iframe-data',
  },
  {
    path: '/redirect',
    // hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]
export default remainingRouter
