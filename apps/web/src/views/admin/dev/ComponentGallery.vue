<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { themeConfig } from '@/config/theme'
import { getRemoteThemeConfig, saveRemoteThemeConfig } from '@/api/config'
import { applyTheme } from '@/utils/theme'
import { initializeColorsFromPrimary } from '@/utils/colorInit'

// Import sub-components
import SkinSettings from './components/SkinSettings.vue'
import BrandSettings from './components/BrandSettings.vue'
import AppearanceSettings from './components/AppearanceSettings.vue'
import TypographySettings from './components/TypographySettings.vue'
import ComponentSettings from './components/ComponentSettings.vue'
import TableSettings from './components/TableSettings.vue'
import LayoutSettings from './components/LayoutSettings.vue'
import SidebarSettings from './components/SidebarSettings.vue'
import HeaderSettings from './components/HeaderSettings.vue'

// Import shared styles
import './gallery.css'

type MenuKey =
  | 'skin'
  | 'brand'
  | 'appearance'
  | 'typography'
  | 'components'
  | 'table'
  | 'layout'
  | 'sidebar'
  | 'header'

const config = ref<any>(null)
const loading = ref(false)
const activeMenu = ref<MenuKey>('skin')

const menuGroups = [
  {
    title: '全局设置',
    items: [
      { id: 'skin', name: '全局配色', icon: 'i-carbon-paint-brush', desc: '预设方案与自定义调色' },
      { id: 'appearance', name: '全局外观', icon: 'i-carbon-view', desc: '圆角与卡片' },
      { id: 'typography', name: '字体排版', icon: 'i-carbon-text-font', desc: '字号与行高' },
      { id: 'brand', name: '品牌信息', icon: 'i-carbon-badge', desc: '修改名称 / Logo' },
    ]
  },
  {
    title: '布局导航',
    items: [
      { id: 'layout', name: '布局结构', icon: 'i-carbon-grid', desc: '侧边与内容' },
      { id: 'sidebar', name: '侧边导航', icon: 'i-carbon-side-panel-open', desc: '导航样式' },
      { id: 'header', name: '顶部导航', icon: 'i-carbon-application', desc: '顶部信息条' },
    ]
  },
  {
    title: '组件样式',
    items: [
      { id: 'components', name: '基础控件', icon: 'i-carbon-cube-view', desc: '按钮与输入框' },
      { id: 'table', name: '数据表格', icon: 'i-carbon-table', desc: '数据列表风格' },
    ]
  }
]

const currentMenu = computed(() => {
  for (const group of menuGroups) {
    const found = group.items.find(item => item.id === activeMenu.value)
    if (found) return found
  }
  return null
})

function mergeWithDefaults(remote: any) {
  const merged = JSON.parse(JSON.stringify(themeConfig))
  if (!remote || typeof remote !== 'object' || Object.keys(remote).length === 0) {
    return merged
  }

  const deepMerge = (target: any, source: any) => {
    if (!source || typeof source !== 'object') return
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {}
        }
        deepMerge(target[key], source[key])
      } else if (source[key] !== null && source[key] !== undefined) {
        target[key] = source[key]
      }
    })
  }

  deepMerge(merged, remote)
  return merged
}

onMounted(async () => {
  try {
    const remote = await getRemoteThemeConfig()
    config.value = mergeWithDefaults(remote || {})
    
    // 初始化所有颜色相关的配置
    const primaryColor = config.value.colors?.primary || '#03624C'
    initializeColorsFromPrimary(config.value, primaryColor)
    
    applyTheme(config.value)
  } catch (error) {
    console.error('加载配置失败:', error)
    config.value = JSON.parse(JSON.stringify(themeConfig))
    
    // 初始化所有颜色相关的配置
    const primaryColor = config.value.colors?.primary || '#03624C'
    initializeColorsFromPrimary(config.value, primaryColor)
    
    applyTheme(themeConfig)
  }
})

watch(
  config,
  newConfig => {
    if (newConfig) {
      applyTheme(newConfig)
    }
  },
  { deep: true },
)

const saveConfig = async () => {
  if (!config.value) return
  loading.value = true
  try {
    await saveRemoteThemeConfig(config.value)
    alert('配置已保存！')
  } catch (error) {
    alert('保存失败，请检查后端连接')
    console.error(error)
  } finally {
    loading.value = false
  }
}

  const resetToDefault = async () => {
    if (!config.value) return
    if (confirm('确定恢复到默认主题吗？这将清除所有自定义配置，并保存到数据库。')) {
      // Create a fresh copy of default config
      const freshConfig = JSON.parse(JSON.stringify(themeConfig))
      
      // 保留当前选择的配色方案（如果有的话）
      const currentSchemeId = config.value._currentSchemeId || 'green'
      const currentPrimaryColor = config.value.colors?.primary || '#03624C'
      
      // 获取当前主色，用于重新初始化（使用当前配色的主色，而不是默认的孟加拉绿）
      const primaryColor = currentPrimaryColor
      
      // 深度复制属性，但保留当前的颜色配置
      Object.keys(freshConfig).forEach(key => {
        // 跳过 colors，因为我们要保留当前选择的配色方案
        if (key === 'colors') {
          return
        }
        if (typeof freshConfig[key] === 'object' && freshConfig[key] !== null && !Array.isArray(freshConfig[key])) {
          if (!config.value[key]) {
            config.value[key] = {}
          }
          Object.keys(freshConfig[key]).forEach(subKey => {
            if (typeof freshConfig[key][subKey] === 'object' && freshConfig[key][subKey] !== null && !Array.isArray(freshConfig[key][subKey])) {
              if (!config.value[key][subKey]) {
                config.value[key][subKey] = {}
              }
              Object.assign(config.value[key][subKey], freshConfig[key][subKey])
            } else {
              config.value[key][subKey] = freshConfig[key][subKey]
            }
          })
        } else {
          config.value[key] = freshConfig[key]
        }
      })
      
      // 恢复配色方案 ID
      config.value._currentSchemeId = currentSchemeId
      
      await nextTick()
      
      // 使用统一的颜色初始化函数
      initializeColorsFromPrimary(config.value, primaryColor)
      
      // 自动保存到数据库，确保默认配置被持久化
      try {
        loading.value = true
        await saveRemoteThemeConfig(config.value)
        alert('已成功恢复默认配置并保存！')
      } catch (error) {
        console.error('保存默认配置失败:', error)
        alert('恢复默认成功，但保存到数据库失败。请手动点击"保存配置"按钮。')
      } finally {
        loading.value = false
      }
      
      applyTheme(config.value)
    }
  }
</script>

<template>
  <div class="gallery-layout">
    <aside class="gallery-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">
          <span class="i-carbon-settings icon-primary"></span>
          设置与预览
        </h3>
        <p class="sidebar-desc">所有修改实时应用到 CSS 变量</p>
      </div>

      <nav class="sidebar-nav">
        <template v-for="group in menuGroups" :key="group.title">
          <div class="nav-group-title">{{ group.title }}</div>
        <button
            v-for="menu in group.items"
          :key="menu.id"
            type="button"
            @click="activeMenu = menu.id as MenuKey"
            class="nav-btn"
            :class="{ 'nav-btn-active': activeMenu === menu.id }"
          >
            <span :class="menu.icon" class="nav-icon"></span>
            <div class="nav-content">
              <p class="nav-title">{{ menu.name }}</p>
              <p class="nav-desc">{{ menu.desc }}</p>
            </div>
          </button>
        </template>
      </nav>
    </aside>

    <div class="gallery-main">
      <header class="main-header">
        <div>
          <p class="header-subtitle">THEME CONTROL</p>
          <h2 class="header-title">
            {{ currentMenu?.name || '组件画廊' }}
            <span class="header-desc">{{ currentMenu?.desc || '实时配置主题变量' }}</span>
          </h2>
        </div>
        <div class="header-actions">
          <button
            type="button"
            class="action-btn"
            @click="resetToDefault"
          >
            恢复默认
          </button>
          <button
            type="button"
            class="action-btn btn-primary"
            :disabled="loading"
            @click="saveConfig"
          >
            {{ loading ? '保存中...' : '保存配置' }}
          </button>
        </div>
      </header>

      <div class="main-content">
        <div
          v-if="!config"
          class="loading-state"
        >
          <div class="spinner"></div>
          <p>配置加载中...</p>
        </div>

        <div v-else class="content-sections">
          <SkinSettings v-show="activeMenu === 'skin'" :config="config" />
          <BrandSettings v-show="activeMenu === 'brand'" :config="config" />
          <AppearanceSettings v-show="activeMenu === 'appearance'" :config="config" />
          <TypographySettings v-show="activeMenu === 'typography'" :config="config" />
          <ComponentSettings v-show="activeMenu === 'components'" :config="config" />
          <TableSettings v-show="activeMenu === 'table'" :config="config" />
          <LayoutSettings v-show="activeMenu === 'layout'" :config="config" />
          <SidebarSettings v-show="activeMenu === 'sidebar'" :config="config" />
          <HeaderSettings v-show="activeMenu === 'header'" :config="config" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-layout {
  display: flex;
  height: calc(100vh - 120px);
  background-color: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.gallery-sidebar {
  width: 15rem;
  background-color: var(--color-gray-50);
  border-right: var(--border-width) solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  height: 5rem;
  padding: 0 var(--spacing-md);
  border-bottom: var(--border-width) solid var(--color-border);
  background-color: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-title {
  font-weight: bold;
  color: var(--color-gray-800);
  display: flex;
  align-items: center;
}

.icon-primary {
  margin-right: var(--spacing-sm);
  color: var(--color-primary);
}

.sidebar-desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
  margin-bottom: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.nav-group-title {
  font-size: 0.75rem;
  color: var(--color-gray-400);
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-md);
  font-weight: 600;
}

.nav-btn {
  width: 100%;
  text-align: left;
  padding: 0.75rem var(--spacing-md);
  border-radius: var(--btn-outline-radius, var(--radius));
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: var(--btn-outline-border-width, var(--border-width)) solid var(--btn-outline-border-color, var(--color-border));
  background-color: transparent;
  cursor: pointer;
  color: var(--btn-outline-text-color, var(--color-gray-600));
}

.nav-btn:hover {
  background-color: var(--btn-outline-hover-bg-color, var(--color-bg-primary));
  color: var(--btn-outline-hover-text-color, var(--color-text-primary));
  border-color: var(--btn-outline-hover-border-color, var(--color-border));
}

.nav-btn-active {
  background-color: var(--color-bg-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  border-color: var(--color-primary);
}

.nav-icon {
  font-size: 1.125rem;
}

.nav-content {
  display: flex;
  flex-direction: column;
}

.nav-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.nav-desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: 0;
  margin-bottom: 0;
}

.gallery-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-header {
  height: 5rem;
  background-color: var(--color-bg-primary);
  border-bottom: var(--border-width) solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xl);
}

.header-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: var(--spacing-md);
}

.header-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-weight: normal;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  height: var(--btn-outline-height, 2rem);
  padding: 0 var(--btn-outline-padding-x, var(--spacing-lg));
  border-radius: var(--btn-outline-radius, var(--radius));
  border: var(--btn-outline-border-width, var(--border-width)) solid var(--btn-outline-border-color, var(--color-border));
  font-size: 0.875rem;
  color: var(--btn-outline-text-color, var(--color-gray-700));
  background-color: var(--btn-outline-bg-color, var(--color-bg-primary));
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background-color: var(--btn-outline-hover-bg-color, var(--color-bg-secondary));
  color: var(--btn-outline-hover-text-color, var(--color-text-primary));
  border-color: var(--btn-outline-hover-border-color, var(--color-border));
}

.action-btn.btn-primary {
  height: var(--btn-primary-height, 2rem);
  padding: 0 var(--btn-primary-padding-x, var(--spacing-lg));
  background-color: var(--btn-primary-bg-color, var(--color-primary));
  color: var(--btn-primary-text-color, #ffffff);
  border-color: var(--btn-primary-border-color, var(--color-primary));
  border-radius: var(--btn-primary-radius, var(--radius));
}

.action-btn.btn-primary:hover {
  background-color: var(--btn-primary-hover-bg-color, color-mix(in srgb, var(--color-primary), black 10%));
  color: var(--btn-primary-hover-text-color, #ffffff);
  border-color: var(--btn-primary-hover-border-color, var(--color-primary));
}

.action-btn:disabled {
  opacity: var(--opacity-60);
  cursor: not-allowed;
}

.main-content {
  flex: 1;
  overflow: auto;
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-lg);
}

.loading-state {
  height: 100%;
  border: var(--border-width) dashed var(--color-border);
  border-radius: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-sm);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.loading::after {
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-sm);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
