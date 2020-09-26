const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/login.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('pages/Accounts.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/accounts',
        name: 'accounts',
        component: () => import('pages/Accounts.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/permissions',
        name: 'permissions',
        component: () => import('pages/Permissions.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('pages/Roles.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
