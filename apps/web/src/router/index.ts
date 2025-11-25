import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // 前台路由
  {
    path: '/',
    component: () => import('../layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/user/Home.vue'),
        meta: { title: '首页' }
      },
    ]
  },
  // 后台路由
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: { title: '仪表板', requiresAuth: true }
      },

      // 用户管理 (RBAC)
      {
        path: 'user',
        redirect: '/admin/user/list',
        meta: { requiresAuth: true },
        children: [
          {
            path: 'list',
            component: () => import('../views/admin/user/UserList.vue'),
            meta: { title: '用户列表', requiresAuth: true, roles: ['ADMIN', 'SUPER_ADMIN'] }
          },
          {
            path: 'detail/:id',
            component: () => import('../views/admin/user/UserDetail.vue'),
            meta: { title: '用户详情', requiresAuth: true, roles: ['ADMIN', 'SUPER_ADMIN'] }
          },
          {
            path: 'roles',
            component: () => import('../views/admin/user/RoleList.vue'),
            meta: { title: '角色管理', requiresAuth: true, roles: ['ADMIN', 'SUPER_ADMIN'] }
          },
          {
            path: 'permissions',
            component: () => import('../views/admin/user/PermissionList.vue'),
            meta: { title: '权限管理', requiresAuth: true, roles: ['SUPER_ADMIN'] }
          },
        ]
      },

      // 开发管理
      {
        path: 'dev',
        redirect: '/admin/dev/gallery',
        meta: { requiresAuth: true },
        children: [
          {
            path: 'gallery',
            component: () => import('../views/admin/dev/ComponentGallery.vue'),
            meta: { title: '组件画廊', requiresAuth: true }
          },
          {
            path: 'guide',
            component: () => import('../views/admin/dev/DevGuide.vue'),
            meta: { title: '开发指南', requiresAuth: true }
          },
        ]
      },

      // 系统设置
      {
        path: 'settings',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: { title: '系统设置', requiresAuth: true, roles: ['ADMIN', 'SUPER_ADMIN'] }
      },
    ]
  },

  // 登录页面
  {
    path: '/login',
    component: () => import('../views/auth/Login.vue'),
    meta: { title: '登录' }
  },

  // 404页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/error/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：认证检查
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - DongUI`
  }

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      // 未登录，跳转到登录页
      next('/login')
      return
    }

    // TODO: 可以在这里添加角色权限检查
    // const userRole = localStorage.getItem('userRole')
    // if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    //   next('/403') // 无权限
    //   return
    // }
  }

  next()
})

export default router
