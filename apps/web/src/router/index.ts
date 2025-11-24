import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Home from '../views/user/Home.vue'

const routes: Array<RouteRecordRaw> = [
  // 前台路由
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '', component: Home },
    ]
  },
  // 后台路由
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'docs', component: () => import('../views/admin/Dashboard.vue') },

      // 列表示例
      {
        path: 'list-example',
        redirect: '/admin/list-example/basic',
        children: [
          { path: 'basic', component: () => import('../views/admin/list/BasicList.vue') },
          { path: 'card', component: () => import('../views/admin/list/CardList.vue') },
          { path: 'media', component: () => import('../views/admin/list/MediaList.vue') },
        ]
      },

      // 文档示例 (CRUD 完整流程)
      {
        path: 'doc-example',
        redirect: '/admin/doc-example/list',
        children: [
          { path: 'list', component: () => import('../views/admin/doc/DocList.vue') },
          { path: 'detail/:id', component: () => import('../views/admin/doc/DocDetail.vue') },
          { path: 'edit/:id', component: () => import('../views/admin/doc/DocEdit.vue') },
        ]
      },

      // 订单示例
      {
        path: 'order-example',
        redirect: '/admin/order-example/list',
        children: [
          { path: 'list', component: () => import('../views/admin/order/OrderList.vue') },
          { path: 'data', component: () => import('../views/admin/order/DataCenter.vue') },
          { path: 'detail/:id', component: () => import('../views/admin/order/OrderDetail.vue') },
          { path: 'product/list', component: () => import('../views/admin/order/ProductList.vue') },
          { path: 'product/edit/:id', component: () => import('../views/admin/order/ProductEdit.vue') },
        ]
      },

      // 用户管理 (RBAC)
      {
        path: 'user',
        redirect: '/admin/user/list',
        children: [
          { path: 'list', component: () => import('../views/admin/user/UserList.vue') },
          { path: 'detail/:id', component: () => import('../views/admin/user/UserDetail.vue') },
          { path: 'roles', component: () => import('../views/admin/user/RoleList.vue') },
          { path: 'permissions', component: () => import('../views/admin/user/PermissionList.vue') },
        ]
      },

      // 开发管理
      {
        path: 'dev',
        redirect: '/admin/dev/gallery',
        children: [
          { path: 'gallery', component: () => import('../views/admin/dev/ComponentGallery.vue') },
          { path: 'guide', component: () => import('../views/admin/dev/DevGuide.vue') },
        ]
      },

      // 系统设置
      { path: 'settings', component: () => import('../views/admin/Dashboard.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
