<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { themeConfig } from '@/config/theme'
import { getRemoteThemeConfig, saveRemoteThemeConfig } from '@/api/config'
import { applyTheme } from '@/utils/theme'

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
    applyTheme(config.value)
  } catch (error) {
    console.error('加载配置失败:', error)
    config.value = JSON.parse(JSON.stringify(themeConfig))
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
    if (confirm('确定恢复到默认主题吗？当前修改将不会保存。')) {
      // Create a fresh copy of default config
      const freshConfig = JSON.parse(JSON.stringify(themeConfig))
      
      // 获取当前主色，用于重新初始化
      const primaryColor = freshConfig.colors?.primary || '#03624C'
      
      // 深度复制属性
      Object.keys(freshConfig).forEach(key => {
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
      
      await nextTick()
      
      // 手动初始化所有使用主色的组件颜色
      if (primaryColor && primaryColor.startsWith('#')) {
        // 计算悬停颜色
        const r = parseInt(primaryColor.slice(1, 3), 16)
        const g = parseInt(primaryColor.slice(3, 5), 16)
        const b = parseInt(primaryColor.slice(5, 7), 16)
        const hoverColor = `#${Math.floor(r * 0.9).toString(16).padStart(2, '0')}${Math.floor(g * 0.9).toString(16).padStart(2, '0')}${Math.floor(b * 0.9).toString(16).padStart(2, '0')}`
        
        // 强制初始化按钮颜色
        if (config.value.button?.primary) {
          config.value.button.primary.backgroundColor = primaryColor
          config.value.button.primary.borderColor = primaryColor
          config.value.button.primary.hoverBackgroundColor = hoverColor
          config.value.button.primary.hoverBorderColor = primaryColor
        }
        if (config.value.button?.outline) {
          config.value.button.outline.hoverBorderColor = primaryColor
          config.value.button.outline.hoverTextColor = primaryColor
        }
        
        // 强制初始化输入框颜色
        if (config.value.input?.text) {
          config.value.input.text.focusBorderColor = primaryColor
          config.value.input.text.focusRingColor = primaryColor
        }
        if (config.value.input?.textarea) {
          config.value.input.textarea.focusBorderColor = primaryColor
          config.value.input.textarea.focusRingColor = primaryColor
        }
        if (config.value.input?.richtext) {
          config.value.input.richtext.focusBorderColor = primaryColor
          config.value.input.richtext.focusRingColor = primaryColor
        }
        
        // 强制初始化表单元素颜色
        if (config.value.form?.select) {
          config.value.form.select.focusBorderColor = primaryColor
        }
        if (config.value.form?.checkbox) {
          config.value.form.checkbox.checkedBackgroundColor = primaryColor
          config.value.form.checkbox.checkedBorderColor = primaryColor
        }
        if (config.value.form?.radio) {
          config.value.form.radio.checkedBorderColor = primaryColor
          config.value.form.radio.checkedDotColor = primaryColor
        }
        if (config.value.form?.switch) {
          config.value.form.switch.onBackgroundColor = primaryColor
        }
        
        // 强制初始化卡片颜色
        if (config.value.card) {
          config.value.card.hoverBorderColor = primaryColor
        }
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
  background-color: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.gallery-sidebar {
  width: 15rem;
  background-color: #f9fafb; /* gray-50 */
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  height: 5rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--color-border);
  background-color: #ffffff; /* gray-50 */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-title {
  font-weight: bold;
  color: #1f2937; /* gray-800 */
  display: flex;
  align-items: center;
}

.icon-primary {
  margin-right: 0.5rem;
  color: var(--color-primary);
}

.sidebar-desc {
  font-size: 0.75rem;
  color: #6b7280; /* gray-500 */
  margin-top: 0.25rem;
  margin-bottom: 0; /* Remove bottom margin */
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-group-title {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  font-weight: 600;
}

.nav-btn {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 1.5rem; /* rounded-3xl */
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--color-border);
  background-color: transparent;
  cursor: pointer;
  color: #4b5563; /* gray-600 */
}

.nav-btn:hover {
  background-color: #fff;
  color: #111827; /* gray-900 */
}

.nav-btn-active {
  background-color: #fff;
  color: var(--color-primary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-color: var(--color-primary); /* Optional enhancement */
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
  color: #6b7280;
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
  background-color: #fff;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.header-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 1rem; /* Add top margin */
}

.header-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-desc {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: normal;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  color: #374151;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #f9fafb;
}

.action-btn.btn-primary {
  background-color: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.main-content {
  flex: 1;
  overflow: auto;
  background-color: #f9fafb;
  padding: 1.5rem;
}

.loading-state {
  height: 100%;
  border: 1px dashed var(--color-border);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
