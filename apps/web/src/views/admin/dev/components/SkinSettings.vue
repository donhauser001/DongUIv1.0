<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { applyTheme } from '@/utils/theme'
import { initializeColorsFromPrimary } from '@/utils/colorInit'

const props = defineProps<{
  config: any
}>()

const selectedScheme = ref('green')

const colorSchemes = [
  {
    id: 'green',
    name: '孟加拉绿（默认）',
    description: '专业、冷静、适合学习环境',
    colors: {
      primary: '#03624C',
      secondary: '#00cf3f',
      accent: '#26d849',
      dark: '#1a1a1a',
      border: '#211f20',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#f9fafb',
      bgTertiary: '#f3f4f6',
    },
    preview: ['#03624C', '#00cf3f', '#26d849'],
  },
  {
    id: 'blue',
    name: '商务蓝',
    description: '稳重、专业、适合企业应用',
    colors: {
      primary: '#2563eb',
      secondary: '#60a5fa',
      accent: '#93c5fd',
      dark: '#1e3a8a',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#2563eb',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#f9fafb',
      bgTertiary: '#f3f4f6',
    },
    preview: ['#2563eb', '#3b82f6', '#60a5fa'],
  },
  {
    id: 'purple',
    name: '优雅紫',
    description: '优雅、创新、适合创意团队',
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#c4b5fd',
      dark: '#4c1d95',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#f9fafb',
      bgTertiary: '#f3f4f6',
    },
    preview: ['#7c3aed', '#8b5cf6', '#a78bfa'],
  },
  {
    id: 'orange',
    name: '活力橙',
    description: '温暖、适合社交与活动场景',
    colors: {
      primary: '#ea580c',
      secondary: '#fb923c',
      accent: '#fdba74',
      dark: '#7c2d12',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#f9fafb',
      bgTertiary: '#f3f4f6',
    },
    preview: ['#ea580c', '#f97316', '#fb923c'],
  },
  {
    id: 'red',
    name: '经典红',
    description: '醒目、适合电商营销',
    colors: {
      primary: '#dc2626',
      secondary: '#f87171',
      accent: '#fca5a5',
      dark: '#7f1d1d',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#dc2626',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#f9fafb',
      bgTertiary: '#f3f4f6',
    },
    preview: ['#dc2626', '#ef4444', '#f87171'],
  },
  {
    id: 'cyan',
    name: '清新青',
    description: '清爽、科技、适合现代工具',
    colors: {
      primary: '#0891b2',
      secondary: '#22d3ee',
      accent: '#67e8f9',
      dark: '#164e63',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#f9fafb',
      bgTertiary: '#f3f4f6',
    },
    preview: ['#0891b2', '#22d3ee', '#67e8f9'],
  },
  {
    id: 'pink',
    name: '甜心粉',
    description: '柔和、亲切、适合生活服务',
    colors: {
      primary: '#db2777',
      secondary: '#f472b6',
      accent: '#fbcfe8',
      dark: '#831843',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#fff1f2',
      bgTertiary: '#ffe4e6',
    },
    preview: ['#db2777', '#f472b6', '#fbcfe8'],
  },
  {
    id: 'tiffany',
    name: '蒂芙尼蓝',
    description: '经典、浪漫、适合高端品牌',
    colors: {
      primary: '#0ABAB5',
      secondary: '#4DD0E1',
      accent: '#B2EBF2',
      dark: '#004D40',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#F0FDFA',
      bgTertiary: '#E0F2F1',
    },
    preview: ['#0ABAB5', '#4DD0E1', '#B2EBF2'],
  },
  {
    id: 'slate',
    name: '极简灰',
    description: '中性、极简、适合内容阅读',
    colors: {
      primary: '#475569',
      secondary: '#94a3b8',
      accent: '#cbd5e1',
      dark: '#1e293b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#0f172a',
      textSecondary: '#64748b',
      textTertiary: '#94a3b8',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      bgTertiary: '#f1f5f9',
    },
    preview: ['#475569', '#94a3b8', '#cbd5e1'],
  },
  {
    id: 'yellow',
    name: '明亮黄',
    description: '积极、警示、适合工程管理',
    colors: {
      primary: '#ca8a04',
      secondary: '#facc15',
      accent: '#fef08a',
      dark: '#713f12',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      bgPrimary: '#ffffff',
      bgSecondary: '#fefce8',
      bgTertiary: '#fef9c3',
    },
    preview: ['#ca8a04', '#facc15', '#fef08a'],
  },
]

const colorEditors = [
  {
    id: 'brand',
    title: '品牌与边框',
    description: '影响按钮、链接和边框的主视觉',
    items: [
      { key: 'primary', label: '主色' },
      { key: 'secondary', label: '辅助色' },
      { key: 'accent', label: '强调色' },
      { key: 'dark', label: '深色背景' },
      { key: 'border', label: '通用边框' },
    ],
  },
  {
    id: 'functional',
    title: '功能状态色',
    description: '用于成功 / 警告 / 错误等反馈',
    items: [
      { key: 'success', label: '成功' },
      { key: 'warning', label: '警告' },
      { key: 'error', label: '错误' },
      { key: 'info', label: '信息' },
    ],
  },
  {
    id: 'neutral',
    title: '文本与背景',
    description: '控制页面可读性和层次',
    items: [
      { key: 'textPrimary', label: '主文本' },
      { key: 'textSecondary', label: '次文本' },
      { key: 'textTertiary', label: '提示文字' },
      { key: 'bgPrimary', label: '主背景' },
      { key: 'bgSecondary', label: '次背景' },
      { key: 'bgTertiary', label: '三级背景' },
    ],
  },
]

const applyScheme = (scheme: (typeof colorSchemes)[number]) => {
  selectedScheme.value = scheme.id
  
  // We mutate the prop object directly as it is a reactive object passed by reference
  if (!props.config.colors) {
    props.config.colors = {}
  }

  props.config.colors.primary = scheme.colors.primary
  props.config.colors.secondary = scheme.colors.secondary
  props.config.colors.accent = scheme.colors.accent
  props.config.colors.success = scheme.colors.success
  props.config.colors.warning = scheme.colors.warning
  props.config.colors.error = scheme.colors.error
  props.config.colors.info = scheme.colors.info
  props.config.colors.textPrimary = scheme.colors.textPrimary
  props.config.colors.textSecondary = scheme.colors.textSecondary
  props.config.colors.textTertiary = scheme.colors.textTertiary
  props.config.colors.bgPrimary = scheme.colors.bgPrimary
  props.config.colors.bgSecondary = scheme.colors.bgSecondary
  props.config.colors.bgTertiary = scheme.colors.bgTertiary
  props.config.colors.border = scheme.colors.border
  props.config.colors.dark = scheme.colors.dark
  
  // 保存当前选择的配色方案 ID，用于"恢复默认"功能
  props.config._currentSchemeId = scheme.id

  // 使用统一的颜色初始化函数
  // 这样可以确保所有组件的颜色都跟随新选择的配色方案
  initializeColorsFromPrimary(props.config, scheme.colors.primary)

  // Apply immediately for better UX, though parent watcher also handles it
  applyTheme(props.config)
}

// Initialize selected scheme based on current config
onMounted(() => {
  // 优先使用保存的配色方案 ID
  if (props.config?._currentSchemeId) {
    selectedScheme.value = props.config._currentSchemeId
  } else if (props.config?.colors?.primary) {
    // 如果没有保存的 ID，则根据主色推断
    const scheme = colorSchemes.find(s => s.colors.primary === props.config.colors.primary)
    if (scheme) {
      selectedScheme.value = scheme.id
      // 同时保存这个 ID
      props.config._currentSchemeId = scheme.id
    }
  }
})

// Watch for external config changes (e.g. reset) to update selected scheme
watch(() => props.config?._currentSchemeId, (newSchemeId) => {
  if (newSchemeId) {
    selectedScheme.value = newSchemeId
  }
})

// 也监听主色变化（用于手动修改颜色的情况）
watch(() => props.config?.colors?.primary, (newPrimary) => {
  if (newPrimary && !props.config?._currentSchemeId) {
    const scheme = colorSchemes.find(s => s.colors.primary === newPrimary)
    if (scheme) {
      selectedScheme.value = scheme.id
    }
  }
})
</script>

<template>
  <section class="section-container">
    <div>
      <h3 class="nav-title" style="margin-bottom: 0.5rem;">预设方案</h3>
      <p class="stat-label" style="margin-bottom: 1rem;">选择预设配色，一键同步全部主题变量。</p>
      <div class="grid-5">
        <button
          v-for="scheme in colorSchemes"
          :key="scheme.id"
          type="button"
          class="scheme-btn"
          :class="{ 'scheme-active': scheme.id === selectedScheme }"
          @click="applyScheme(scheme)"
        >
          <div class="scheme-header">
            <div>
              <p class="scheme-name">{{ scheme.name }}</p>
              <p class="scheme-desc">{{ scheme.description }}</p>
            </div>
            <span
              v-if="scheme.id === selectedScheme"
              class="scheme-tag"
            >
              已启用
            </span>
          </div>
          <div class="scheme-colors">
            <span
              v-for="colorHex in scheme.preview"
              :key="colorHex"
              class="color-dot"
              :style="{ backgroundColor: colorHex }"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <div style="border-top: 1px dashed var(--color-border); margin: 1rem 0;"></div>

    <div>
      <h3 class="nav-title" style="margin-bottom: 0.5rem;">自定义调色板</h3>
      <p class="stat-label" style="margin-bottom: 1rem;">精细调整特定颜色变量，实时预览生效。</p>
      <div class="grid-3">
        <div
          v-for="editor in colorEditors"
          :key="editor.id"
          class="info-card form-group"
        >
          <div>
            <h3 class="nav-title">{{ editor.title }}</h3>
            <p class="stat-label">{{ editor.description }}</p>
          </div>
          <div class="grid-2">
            <div v-for="item in editor.items" :key="item.key" class="form-group" style="gap: 0.5rem;">
              <label class="form-label">{{ item.label }}</label>
              <div class="form-color-row">
                <input
                  type="color"
                  v-model="config.colors[item.key]"
                  class="color-preview"
                />
                <input
                  type="text"
                  v-model="config.colors[item.key]"
                  class="form-input color-text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scheme-btn {
  background-color: #fff;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  padding: 1.25rem;
  text-align: left;
  transition: box-shadow 0.2s;
  cursor: pointer;
  display: block;
  width: 100%;
}
.scheme-btn:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.scheme-active { box-shadow: 0 0 0 2px var(--color-primary); }
.scheme-header { display: flex; justify-content: space-between; align-items: flex-start; }
.scheme-name { font-weight: 600; color: #111827; }
.scheme-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
.scheme-tag { font-size: 0.75rem; color: var(--color-secondary); padding: 0.25rem 0.75rem; border-radius: 9999px; border: 1px solid var(--color-secondary); }
.scheme-colors { display: flex; gap: 0.5rem; margin-top: 1rem; }
.color-dot { flex: 1; height: 2rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.5); }
</style>
