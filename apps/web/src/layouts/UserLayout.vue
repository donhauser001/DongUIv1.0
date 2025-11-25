<script setup lang="ts">
import { themeConfig } from '@/config/theme'
import { computed } from 'vue'

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
  const webConfig = themeConfig.app.web
  if (!webConfig) return themeConfig.app.logo // Fallback

  // Header 默认为白色，但可以配置
  const bg = themeConfig.header.backgroundColor
  const isDark = isDarkBackground(bg)
  
  return isDark ? webConfig.logoDark : webConfig.logoLight
})

// 是否显示 Logo 图片
const showLogoImage = computed(() => {
  const webConfig = themeConfig.app.web
  return webConfig?.logoMode === 'logo'
})

// Logo 边距样式
const logoMarginStyle = computed(() => {
  const margins = themeConfig.app.web?.logoMargins
  if (!margins) return {}
  return {
    marginTop: margins.top,
    marginRight: margins.right,
    marginBottom: margins.bottom,
    marginLeft: margins.left
  }
})

// Footer Logo URL
const footerLogoUrl = computed(() => {
  const footerConfig = themeConfig.app.web?.footerLogo
  // Footer is usually light background (white or gray), using logoLight
  return footerConfig?.logoLight || '/logo.svg'
})
</script>

<template>
  <div class="user-layout">
    <!-- Simple Navbar -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="brand">
          <!-- Logo Logic -->
          <div v-if="showLogoImage" class="logo-wrapper" :style="logoMarginStyle">
             <img :src="logoUrl" alt="Logo" class="logo-img" />
          </div>
          <div v-else class="logo-placeholder" :style="logoMarginStyle">
             <span class="i-carbon-cube"></span>
          </div>
          
          <div class="brand-text">
            <span v-if="themeConfig.app.web?.showName" class="brand-name">{{ themeConfig.app.web?.name || themeConfig.app.name }}</span>
            <p v-if="themeConfig.app.web?.showTagline" class="brand-tagline">
              {{ themeConfig.app.tagline }}
            </p>
          </div>
      </div>
        <div class="nav-links">
          <a href="#" class="nav-link">首页</a>
          <a href="#" class="nav-link">产品功能</a>
          <a href="#" class="nav-link">关于我们</a>
      </div>
        <div class="nav-actions">
          <router-link to="/admin" class="btn-outline small-btn">
          进入控制台
        </router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <div class="content-wrapper">
      <router-view></router-view>
      </div>
    </main>

    <footer class="footer">
      <!-- Footer Logo -->
      <div v-if="themeConfig.app.web?.footerLogo?.show" class="footer-brand">
        <img :src="footerLogoUrl" alt="Footer Logo" class="footer-logo" />
      </div>
      <p>© 2023 Dong Framework. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.user-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
  font-family: var(--font-family);
}

.navbar {
  height: var(--web-header-height);
  border-bottom: var(--border-width) solid var(--web-header-border-color);
  background-color: var(--web-header-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-container {
  width: 100%;
  max-width: var(--layout-web-width);
  padding: 0 var(--web-header-padding-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
}

.logo-wrapper {
  width: var(--spacing-lg, 1.5rem);
  height: var(--spacing-lg, 1.5rem);
  /* margin-right: var(--spacing-sm, 0.5rem); Removed default margin */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.logo-placeholder {
  width: var(--spacing-lg, 1.5rem);
  height: var(--spacing-lg, 1.5rem);
  border-radius: var(--radius);
  background-color: var(--color-primary);
  /* margin-right: var(--spacing-sm, 0.5rem); Removed default margin */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-inverse, #fff);
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--web-header-text-color);
  letter-spacing: -0.025em;
  display: block;
  line-height: 1.2;
  margin: 0;
}

.brand-tagline {
  font-size: var(--font-size-sm, 0.75rem);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs, 0.125rem);
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg, 1.5rem);
}

.nav-link {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--color-primary);
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs, 0.375rem) var(--spacing-sm, 0.75rem);
  height: auto;
}

.footer {
  padding: var(--spacing-xl, 2rem);
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  border-top: var(--border-width) solid var(--color-border);
  margin-top: var(--spacing-3xl, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md, 1rem);
}

.footer-brand {
  display: flex;
  justify-content: center;
}

.footer-logo {
  height: var(--spacing-xl, 2rem);
  opacity: var(--opacity-80, 0.8);
}

.main-content {
  flex: 1;
  width: 100%;
}

.content-wrapper {
  width: 100%;
  max-width: var(--layout-web-width);
  padding: var(--layout-web-padding);
  margin: 0 auto;
}
</style>
