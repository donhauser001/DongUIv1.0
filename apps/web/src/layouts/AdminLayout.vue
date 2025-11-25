<script setup lang="ts">
import { themeConfig } from '@/config/theme'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// 定义菜单项类型
interface MenuItem {
  name: string
  icon?: string
  path: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { name: '控制台', icon: 'i-carbon-dashboard', path: '/admin' },
  {
    name: '用户管理',
    icon: 'i-carbon-user',
    path: '/admin/user',
    children: [
      { name: '用户列表', path: '/admin/user/list' },
      { name: '角色设置', path: '/admin/user/roles' },
      { name: '权限管理', path: '/admin/user/permissions' },
    ]
  },
  {
    name: '开发管理',
    icon: 'i-carbon-code',
    path: '/admin/dev',
    children: [
      { name: '组件画廊', path: '/admin/dev/gallery' },
      { name: '开发文档', path: '/admin/dev/guide' },
    ]
  },
  { name: '系统设置', icon: 'i-carbon-settings', path: '/admin/settings' },
]

const route = useRoute()

// 控制展开状态 (默认展开所有匹配当前路由的父级)
// 简单起见，这里用一个 Map 记录哪些父菜单是展开的
const expandedKeys = ref<Record<string, boolean>>({})

const toggleExpand = (path: string) => {
  expandedKeys.value[path] = !expandedKeys.value[path]
}

// 判断菜单项是否激活
const isActive = (item: MenuItem) => {
  if (item.children) {
    // 如果有子菜单，只要当前路由包含父级路径就算激活（用于保持高亮）
    return route.path.startsWith(item.path)
  }
  return route.path === item.path
}

// 获取当前页面标题
const currentTitle = computed(() => {
  // 简单遍历查找标题
  for (const item of menuItems) {
    if (item.path === route.path) return item.name
    if (item.children) {
      const sub = item.children.find(c => c.path === route.path)
      if (sub) return `${item.name} / ${sub.name}`
    }
  }
  return '概览'
})

// 判断是否为深色背景的简单辅助函数 (仅支持 Hex)
const isDarkBackground = (hex: string) => {
  if (!hex || !hex.startsWith('#')) return false
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  // YIQ 亮度计算
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq < 128
}

// 计算 Logo URL
const logoUrl = computed(() => {
  const adminConfig = themeConfig.app.admin
  if (!adminConfig) return themeConfig.app.logo // Fallback

  const bg = themeConfig.sidebar.backgroundColor
  const isDark = isDarkBackground(bg)
  
  return isDark ? adminConfig.logoDark : adminConfig.logoLight
})

// 是否显示 Logo 图片
const showLogoImage = computed(() => {
  const adminConfig = themeConfig.app.admin
  return adminConfig?.logoMode === 'logo'
})

// Logo 边距样式
const logoMarginStyle = computed(() => {
  // 收起时，强制居中并忽略用户配置的边距
  if (isCollapsed.value) {
    return {
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0'
    }
  }

  const margins = themeConfig.app.admin?.logoMargins
  if (!margins) return {}
  return {
    marginTop: margins.top,
    marginRight: margins.right,
    marginBottom: margins.bottom,
    marginLeft: margins.left
  }
})
</script>

<template>
  <div class="layout-container">
    <!-- Sidebar -->
    <aside class="layout-sidebar">
      <div class="sidebar-header" :class="{ 'sidebar-header-collapsed': isCollapsed }">
        <!-- Logo Display Logic -->
        <div v-if="showLogoImage" class="sidebar-logo-wrapper" :style="logoMarginStyle">
           <img :src="logoUrl" alt="Logo" class="sidebar-logo-img" />
        </div>
        <div v-else class="sidebar-logo-placeholder" :style="logoMarginStyle">
           <span class="i-carbon-cube"></span>
        </div>
        
        <div class="sidebar-brand-text" v-show="!isCollapsed">
          <h1 v-if="themeConfig.app.admin?.showName" class="sidebar-title">{{ themeConfig.app.admin?.name || themeConfig.app.name }}</h1>
          <!-- Tagline -->
          <p v-if="themeConfig.app.admin?.showTagline" class="sidebar-tagline">
            {{ themeConfig.app.tagline }}
          </p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div v-for="item in menuItems" :key="item.path">
          
          <!-- 1. 没有子菜单的情况 -->
          <router-link 
            v-if="!item.children"
            :to="item.path"
            class="menu-item"
            :class="{ 'menu-item-active': isActive(item), 'menu-item-collapsed': isCollapsed }"
            :title="isCollapsed ? item.name : ''"
          >
            <span :class="item.icon" class="menu-icon"></span>
            <span v-show="!isCollapsed">{{ item.name }}</span>
          </router-link>

          <!-- 2. 有子菜单的情况 -->
          <div v-else>
            <button 
              @click="toggleExpand(item.path)"
              class="menu-item menu-parent"
              :class="{ 'menu-parent-active': isActive(item), 'menu-item-collapsed': isCollapsed }"
              :title="isCollapsed ? item.name : ''"
            >
              <div class="menu-label">
                <span :class="item.icon" class="menu-icon"></span>
                <span v-show="!isCollapsed">{{ item.name }}</span>
              </div>
              <span 
                v-show="!isCollapsed"
                class="i-carbon-chevron-down menu-arrow"
                :class="{ 'menu-arrow-expanded': expandedKeys[item.path] }"
              ></span>
            </button>

            <!-- 子菜单区域 -->
            <div 
              v-show="expandedKeys[item.path] && !isCollapsed"
              class="submenu-container"
            >
              <router-link 
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="submenu-item"
                :class="{ 'submenu-item-active': route.path === child.path }"
              >
                {{ child.name }}
              </router-link>
            </div>
          </div>

        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile" :class="{ 'user-profile-collapsed': isCollapsed }">
          <div class="user-avatar"></div>
          <div class="user-info" v-show="!isCollapsed">
            <p class="user-name">管理员</p>
            <p class="user-email">admin@dong.com</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="layout-main">
      <header class="layout-header">
        <div style="display: flex; align-items: center; gap: var(--spacing-md, 1rem);">
          <button class="header-btn" @click="toggleSidebar">
            <span :class="isCollapsed ? 'i-carbon-menu' : 'i-carbon-menu'"></span>
          </button>
          <h2 class="page-title">
          {{ currentTitle }}
        </h2>
        </div>
        <div class="header-actions">
          <button class="header-btn">
            <span class="i-carbon-notification"></span>
          </button>
          <button class="header-btn">
            <span class="i-carbon-logout"></span>
          </button>
        </div>
      </header>

      <div class="layout-content">
        <div class="content-wrapper">
        <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  background-color: var(--color-bg-secondary);
}

/* Sidebar Styles */
.layout-sidebar {
  display: flex;
  flex-direction: column;
  width: v-bind("isCollapsed ? 'var(--layout-sidebar-collapsed-width)' : 'var(--layout-sidebar-width)'");
  background-color: var(--sidebar-bg-color);
  border-right: var(--border-width) solid var(--sidebar-border-color);
  transition: width 0.3s ease;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-header {
  height: var(--layout-header-height);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg, 1.5rem);
  border-bottom: var(--border-width) solid var(--sidebar-border-color);
  flex-shrink: 0;
}

.sidebar-header-collapsed {
  padding: 0;
  justify-content: center;
}

.sidebar-logo-wrapper {
  width: var(--spacing-xl, 2rem);
  height: var(--spacing-xl, 2rem);
  /* margin-right: var(--spacing-sm, 0.75rem); Removed default margin to allow override */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevent logo shrinking */
}

.sidebar-logo-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.sidebar-logo-placeholder {
  width: var(--spacing-xl, 2rem);
  height: var(--spacing-xl, 2rem);
  border-radius: var(--radius);
  background-color: var(--color-primary);
  /* margin-right: var(--spacing-sm, 0.75rem); Removed default margin */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-inverse, #fff);
  flex-shrink: 0; /* Prevent placeholder shrinking */
}

.sidebar-brand-text {
  flex: 1;
  min-width: 0; /* Enable flex truncation */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  margin: 0;
}

.sidebar-tagline {
  font-size: var(--font-size-sm, 0.75rem);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs, 0.125rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
}

.sidebar-nav {
  flex: 1;
  padding: var(--spacing-md, 1rem);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0.25rem);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: var(--sidebar-menu-item-padding-y) var(--sidebar-menu-item-padding-x);
  min-height: var(--sidebar-menu-item-height);
  border-radius: var(--sidebar-menu-item-radius);
  color: var(--sidebar-menu-item-text-color);
  text-decoration: none;
  transition: all 0.2s;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  cursor: pointer;
  width: 100%;
}

.menu-item:hover {
  background-color: var(--sidebar-menu-item-hover-bg-color);
  color: var(--sidebar-menu-item-hover-text-color);
}

.menu-item-active {
  background-color: var(--sidebar-menu-item-active-bg-color);
  color: var(--sidebar-menu-item-active-text-color);
  border-color: var(--sidebar-menu-item-active-border-color);
}

.menu-icon {
  font-size: var(--font-h4-size, 1.125rem);
  margin-right: var(--spacing-sm, 0.75rem);
}

.menu-item-collapsed {
  justify-content: center;
  padding: var(--sidebar-menu-item-padding-y) 0;
}

.menu-item-collapsed .menu-icon {
  margin-right: 0;
  font-size: var(--font-h3-size, 1.25rem);
}

.menu-item-collapsed .menu-label {
  justify-content: center;
  width: 100%;
}

.user-profile-collapsed {
  justify-content: center;
}

.user-profile-collapsed .user-avatar {
  width: var(--spacing-xl, 2rem);
  height: var(--spacing-xl, 2rem);
}

.menu-parent {
  justify-content: space-between;
  background: none;
  border: none;
}

.menu-label {
  display: flex;
  align-items: center;
}

.menu-parent-active {
  color: var(--color-primary);
}

.menu-arrow {
  font-size: var(--font-size-sm, 0.75rem);
  transition: transform 0.2s;
}

.menu-arrow-expanded {
  transform: rotate(180deg);
}

.submenu-container {
  margin-left: var(--spacing-md, 1rem);
  padding-left: var(--spacing-md, 1rem);
  border-left: var(--border-width, 1px) solid var(--color-border);
  margin-top: var(--spacing-xs, 0.25rem);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0.25rem);
}

.submenu-item {
  display: block;
  padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
  border-radius: var(--radius);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s;
}

.submenu-item:hover {
  color: var(--color-text-primary);
  background-color: var(--sidebar-menu-item-hover-bg-color);
}

.submenu-item-active {
  color: var(--color-primary);
  background-color: var(--sidebar-menu-item-active-bg-color);
  font-weight: var(--font-weight-medium);
}

.sidebar-footer {
  padding: 1rem;
  border-top: var(--border-width) solid var(--sidebar-border-color);
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-bg-tertiary);
  border: var(--border-width) solid var(--color-border);
}

.user-info {
  margin-left: 0.75rem;
}

.user-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.user-email {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* Main Content Styles */
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-header {
  height: var(--header-admin-height);
  background-color: var(--header-admin-bg-color);
  border-bottom: var(--border-width) solid var(--header-admin-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--header-admin-padding-x);
  flex-shrink: 0;
}

.page-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--header-admin-text-color);
  margin-bottom: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: var(--radius);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-btn:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-secondary);
}

.layout-content {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  width: 100%;
  max-width: var(--layout-admin-width);
  padding: var(--layout-admin-padding);
  margin: 0 auto;
}
</style>
