<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  config: any
  components?: Array<{ id: string; name: string }>
  activeComponent?: string
}>(), {
  components: () => [],
  activeComponent: 'card'
})

const emit = defineEmits<{
  (e: 'update:active-component', value: string): void
}>()

// 初始化卡片颜色的函数
const initializeCardColors = (primaryColor: string, force = false) => {
  if (!primaryColor || !primaryColor.startsWith('#')) return
  
  if (force || !props.config.card?.hoverBorderColor || props.config.card.hoverBorderColor.startsWith('var')) {
    props.config.card.hoverBorderColor = primaryColor
  }
}

// 监听全局主色变化，初始化卡片颜色
watch(() => props.config.colors?.primary, (newPrimary) => {
  if (newPrimary) {
    initializeCardColors(newPrimary, false)
  }
}, { immediate: true })

// 监听卡片配置变化，如果发现是 var() 就强制重新初始化
watch(() => props.config.card?.hoverBorderColor, (newValue) => {
  if (newValue && newValue.startsWith('var') && props.config.colors?.primary) {
    initializeCardColors(props.config.colors.primary, true)
  }
})

const radiusOptions = [
  { label: '无圆角 (0px)', value: '0px' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.5rem)', value: '0.5rem' },
  { label: '大 (0.75rem)', value: '0.75rem' },
  { label: '超大 (1rem)', value: '1rem' },
]

const paddingOptions = [
  { label: '紧凑 (0.75rem)', value: '0.75rem' },
  { label: '标准 (1rem)', value: '1rem' },
  { label: '宽敞 (1.5rem)', value: '1.5rem' },
  { label: '超宽 (2rem)', value: '2rem' },
]

const shadowOptions = [
  { label: '无阴影', value: 'none' },
  { label: '小阴影', value: '0 1px 3px rgba(0,0,0,0.1)' },
  { label: '标准阴影', value: '0 2px 8px rgba(0,0,0,0.1)' },
  { label: '大阴影', value: '0 4px 16px rgba(0,0,0,0.1)' },
]
</script>

<template>
  <section class="grid-2">
    <div class="info-card settings-group">
      <!-- 组件类型切换 -->
      <div style="display: flex; gap: 0.5rem; background: #f3f4f6; padding: 0.25rem; border-radius: 0.5rem; width: fit-content; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <button
          v-for="comp in components"
          :key="comp.id"
          type="button"
          @click="emit('update:active-component', comp.id)"
          class="tab-btn"
          :class="{ 'active': activeComponent === comp.id }"
        >
          {{ comp.name }}
        </button>
      </div>
      
      <!-- 尺寸与形状 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <label class="settings-section-title">尺寸与形状</label>
          <span class="settings-section-desc">卡片的基础尺寸设置</span>
        </div>
        <div class="settings-section-content">
          <div class="settings-field">
            <label class="settings-field-label">圆角</label>
            <select v-model="config.card.radius" class="form-input">
              <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">内边距</label>
            <select v-model="config.card.padding" class="form-input">
              <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">边框宽度</label>
            <input v-model="config.card.borderWidth" type="text" class="form-input" />
          </div>
          <div class="settings-field">
            <label class="settings-field-label">阴影</label>
            <select v-model="config.card.shadow" class="form-input">
              <option v-for="opt in shadowOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 颜色 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <label class="settings-section-title">颜色</label>
          <span class="settings-section-desc">卡片的颜色配置</span>
        </div>
        <div class="settings-section-content">
          <div class="settings-field">
            <label class="settings-field-label">背景颜色</label>
            <div class="form-color-row">
              <input v-model="config.card.backgroundColor" type="color" class="color-preview" />
              <input v-model="config.card.backgroundColor" type="text" class="form-input color-text" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">边框颜色</label>
            <div class="form-color-row">
              <input v-model="config.card.borderColor" type="color" class="color-preview" />
              <input v-model="config.card.borderColor" type="text" class="form-input color-text" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">标题颜色</label>
            <div class="form-color-row">
              <input v-model="config.card.titleColor" type="color" class="color-preview" />
              <input v-model="config.card.titleColor" type="text" class="form-input color-text" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">内容颜色</label>
            <div class="form-color-row">
              <input v-model="config.card.contentColor" type="color" class="color-preview" />
              <input v-model="config.card.contentColor" type="text" class="form-input color-text" />
            </div>
          </div>
        </div>
      </div>

      <!-- 悬停效果 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <label class="settings-section-title">悬停效果</label>
          <span class="settings-section-desc">鼠标悬停时的样式</span>
        </div>
        <div class="settings-section-content">
          <div class="settings-field">
            <label class="settings-field-label">悬停阴影</label>
            <select v-model="config.card.hoverShadow" class="form-input">
              <option v-for="opt in shadowOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">悬停边框颜色</label>
            <div class="form-color-row">
              <input v-model="config.card.hoverBorderColor" type="color" class="color-preview" />
              <input v-model="config.card.hoverBorderColor" type="text" class="form-input color-text" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">实时预览</h3>
      
      <div class="preview-section">
        <div class="preview-row">
          <span class="preview-label">正常状态</span>
          <div class="card-base">
            <h4 class="card-title">卡片标题</h4>
            <p class="card-content">这是卡片的内容区域，可以放置任何内容。</p>
          </div>
        </div>
        <div class="preview-row">
          <span class="preview-label">悬停状态</span>
          <div class="card-base" style="
            box-shadow: var(--card-hover-shadow);
            border-color: var(--card-hover-border-color);
          ">
            <h4 class="card-title">卡片标题</h4>
            <p class="card-content">鼠标悬停时的效果展示。</p>
          </div>
        </div>
        <div class="preview-row">
          <span class="preview-label">带图标的卡片</span>
          <div class="card-base">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem;">📊</span>
              <h4 class="card-title" style="margin: 0;">数据统计</h4>
            </div>
            <p class="card-content">本月访问量：<strong>12,345</strong></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #374151;
}

.tab-btn.active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  font-weight: 500;
}
</style>

