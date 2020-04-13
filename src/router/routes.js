
const routes = [
  {
    path: '/',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ProductView.vue') }
    ]
  },
  // {
  //   path: '/dashboard',
  //   component: () => import('layouts/DashboardLayout2.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Dashboard/Home.vue') }
  //   ]
  // }
  // {
  //   path: '/login',
  //   component: LoginPage
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
