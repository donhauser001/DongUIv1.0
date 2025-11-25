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

const activeCardType = ref<'white' | 'primary' | 'dark'>('white')

// 初始化卡片颜色的函数
const initializeCardColors = (primaryColor: string, force = false) => {
  if (!primaryColor || !primaryColor.startsWith('#')) return
  
  // 白底卡片
  if (force || !props.config.card?.white?.hoverBorderColor || props.config.card.white.hoverBorderColor.startsWith('var')) {
    props.config.card.white.hoverBorderColor = primaryColor
  }
  
  // 主色底卡片
  if (force || !props.config.card?.primary?.backgroundColor || props.config.card.primary.backgroundColor.startsWith('var')) {
    props.config.card.primary.backgroundColor = primaryColor
  }
  if (force || !props.config.card?.primary?.borderColor || props.config.card.primary.borderColor.startsWith('var')) {
    props.config.card.primary.borderColor = primaryColor
  }
  
  // 黑底卡片
  if (force || !props.config.card?.dark?.hoverBorderColor || props.config.card.dark.hoverBorderColor.startsWith('var')) {
    props.config.card.dark.hoverBorderColor = primaryColor
  }
}

// 监听全局主色变化，初始化卡片颜色
watch(() => props.config.colors?.primary, (newPrimary) => {
  if (newPrimary) {
    initializeCardColors(newPrimary, false)
  }
}, { immediate: true })

// 监听卡片配置变化，如果发现是 var() 就强制重新初始化
watch(() => [
  props.config.card?.white?.hoverBorderColor,
  props.config.card?.primary?.backgroundColor,
  props.config.card?.dark?.hoverBorderColor
], (newValues) => {
  const hasVar = newValues.some(val => val && val.startsWith('var'))
  if (hasVar && props.config.colors?.primary) {
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

      <!-- 卡片配色类型切换 -->
      <div class="text-tab-group">
        <button
          @click="activeCardType = 'white'"
          class="text-tab-btn"
          :class="{ 'active': activeCardType === 'white' }"
        >
          白底卡片
        </button>
        <button
          @click="activeCardType = 'primary'"
          class="text-tab-btn"
          :class="{ 'active': activeCardType === 'primary' }"
        >
          主色底卡片
        </button>
        <button
          @click="activeCardType = 'dark'"
          class="text-tab-btn"
          :class="{ 'active': activeCardType === 'dark' }"
        >
          黑底卡片
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

      <!-- 颜色设置 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">颜色设置</h4>
            <p class="settings-section-desc">{{ activeCardType === 'white' ? '白底' : activeCardType === 'primary' ? '主色底' : '黑底' }}卡片的颜色配置</p>
          </div>
        </div>
        <div class="settings-section-content">
          <div class="settings-field">
            <label class="settings-field-label">背景颜色</label>
            <div class="form-color-row">
              <input v-model="config.card[activeCardType].backgroundColor" type="color" class="color-preview" />
              <input v-model="config.card[activeCardType].backgroundColor" type="text" class="form-input color-text" placeholder="#ffffff" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">边框颜色</label>
            <div class="form-color-row">
              <input v-model="config.card[activeCardType].borderColor" type="color" class="color-preview" />
              <input v-model="config.card[activeCardType].borderColor" type="text" class="form-input color-text" placeholder="#e5e7eb" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">标题颜色</label>
            <div class="form-color-row">
              <input v-model="config.card[activeCardType].titleColor" type="color" class="color-preview" />
              <input v-model="config.card[activeCardType].titleColor" type="text" class="form-input color-text" placeholder="#111827" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">内容颜色</label>
            <div class="form-color-row">
              <input v-model="config.card[activeCardType].contentColor" type="color" class="color-preview" />
              <input v-model="config.card[activeCardType].contentColor" type="text" class="form-input color-text" placeholder="#6b7280" />
            </div>
          </div>
          <div class="settings-field">
            <label class="settings-field-label">悬停边框颜色</label>
            <div class="form-color-row">
              <input v-model="config.card[activeCardType].hoverBorderColor" type="color" class="color-preview" />
              <input v-model="config.card[activeCardType].hoverBorderColor" type="text" class="form-input color-text" placeholder="var(--color-primary)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">实时预览</h3>
      <div class="settings-group">
        <!-- 提示框 -->
        <div class="info-card-tip">
          <span class="i-carbon-information info-card-tip-icon"></span>
          <p class="info-card-tip-text">
            提示：左侧修改的样式会实时反映在下方的卡片预览中。
          </p>
        </div>

        <!-- 预览区域 -->
        <div class="card-preview-container">
          <!-- 三种配色对比 -->
          <div class="preview-item">
            <label class="preview-label">三种配色对比</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              <!-- 白底卡片 -->
              <div class="preview-card" :style="{
                borderRadius: config.card.radius,
                padding: config.card.padding,
                borderWidth: config.card.borderWidth,
                backgroundColor: config.card.white.backgroundColor,
                borderColor: config.card.white.borderColor,
                boxShadow: config.card.shadow,
              }">
                <h4 class="preview-card-title" :style="{ color: config.card.white.titleColor, fontSize: '0.875rem' }">
                  白底卡片
                </h4>
                <p class="preview-card-content" :style="{ color: config.card.white.contentColor, fontSize: '0.75rem' }">
                  清晰易读
                </p>
              </div>

              <!-- 主色底卡片 -->
              <div class="preview-card" :style="{
                borderRadius: config.card.radius,
                padding: config.card.padding,
                borderWidth: config.card.borderWidth,
                backgroundColor: config.card.primary.backgroundColor,
                borderColor: config.card.primary.borderColor,
                boxShadow: config.card.shadow,
              }">
                <h4 class="preview-card-title" :style="{ color: config.card.primary.titleColor, fontSize: '0.875rem' }">
                  主色底卡片
                </h4>
                <p class="preview-card-content" :style="{ color: config.card.primary.contentColor, fontSize: '0.75rem' }">
                  醒目突出
                </p>
              </div>

              <!-- 黑底卡片 -->
              <div class="preview-card" :style="{
                borderRadius: config.card.radius,
                padding: config.card.padding,
                borderWidth: config.card.borderWidth,
                backgroundColor: config.card.dark.backgroundColor,
                borderColor: config.card.dark.borderColor,
                boxShadow: config.card.shadow,
              }">
                <h4 class="preview-card-title" :style="{ color: config.card.dark.titleColor, fontSize: '0.875rem' }">
                  黑底卡片
                </h4>
                <p class="preview-card-content" :style="{ color: config.card.dark.contentColor, fontSize: '0.75rem' }">
                  高级感强
                </p>
              </div>
            </div>
          </div>

          <!-- 当前选中类型 - 正常状态 -->
          <div class="preview-item">
            <label class="preview-label">{{ activeCardType === 'white' ? '白底' : activeCardType === 'primary' ? '主色底' : '黑底' }}卡片 - 正常状态</label>
            <div class="preview-card" :style="{
              borderRadius: config.card.radius,
              padding: config.card.padding,
              borderWidth: config.card.borderWidth,
              backgroundColor: config.card[activeCardType].backgroundColor,
              borderColor: config.card[activeCardType].borderColor,
              boxShadow: config.card.shadow,
            }">
              <h4 class="preview-card-title" :style="{ color: config.card[activeCardType].titleColor }">
                {{ activeCardType === 'white' ? '用户信息' : activeCardType === 'primary' ? '重要通知' : 'VIP 专享' }}
              </h4>
              <p class="preview-card-content" :style="{ color: config.card[activeCardType].contentColor }">
                {{ activeCardType === 'white' ? '这是白底卡片，适合大多数场景使用。背景为白色，文字为深色，清晰易读。' : activeCardType === 'primary' ? '这是主色底卡片，用于强调重要信息。背景为主色，文字为白色，醒目突出。' : '这是黑底卡片，适合深色主题或特殊场景。背景为深色，文字为浅色，高级感强。' }}
              </p>
            </div>
          </div>

          <!-- 当前选中类型 - 悬停状态 -->
          <div class="preview-item">
            <label class="preview-label">{{ activeCardType === 'white' ? '白底' : activeCardType === 'primary' ? '主色底' : '黑底' }}卡片 - 悬停状态</label>
            <div class="preview-card hover" :style="{
              borderRadius: config.card.radius,
              padding: config.card.padding,
              borderWidth: config.card.borderWidth,
              backgroundColor: config.card[activeCardType].backgroundColor,
              borderColor: config.card[activeCardType].hoverBorderColor,
              boxShadow: config.card.hoverShadow,
            }">
              <h4 class="preview-card-title" :style="{ color: config.card[activeCardType].titleColor }">
                悬停效果展示
              </h4>
              <p class="preview-card-content" :style="{ color: config.card[activeCardType].contentColor }">
                鼠标悬停时，边框颜色变为 {{ activeCardType === 'white' ? '主色' : activeCardType === 'primary' ? '白色' : '主色' }}，阴影增强，提供清晰的交互反馈。
              </p>
            </div>
          </div>

          <!-- 当前选中类型 - 带图标 -->
          <div class="preview-item">
            <label class="preview-label">{{ activeCardType === 'white' ? '白底' : activeCardType === 'primary' ? '主色底' : '黑底' }}卡片 - 带图标</label>
            <div class="preview-card" :style="{
              borderRadius: config.card.radius,
              padding: config.card.padding,
              borderWidth: config.card.borderWidth,
              backgroundColor: config.card[activeCardType].backgroundColor,
              borderColor: config.card[activeCardType].borderColor,
              boxShadow: config.card.shadow,
            }">
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                <span class="i-carbon-chart-line" style="font-size: 1.5rem;" :style="{ color: config.card[activeCardType].titleColor }"></span>
                <h4 class="preview-card-title" style="margin: 0;" :style="{ color: config.card[activeCardType].titleColor }">
                  数据统计
                </h4>
              </div>
              <p class="preview-card-content" :style="{ color: config.card[activeCardType].contentColor }">
                本月访问量：<strong>12,345</strong>
              </p>
              <p class="preview-card-content" style="margin-top: 0.5rem;" :style="{ color: config.card[activeCardType].contentColor }">
                较上月增长：<strong :style="{ color: activeCardType === 'white' ? 'var(--color-success)' : config.card[activeCardType].titleColor }">+23%</strong>
              </p>
            </div>
          </div>

          <!-- 当前选中类型 - 复杂内容 -->
          <div class="preview-item">
            <label class="preview-label">{{ activeCardType === 'white' ? '白底' : activeCardType === 'primary' ? '主色底' : '黑底' }}卡片 - 复杂内容</label>
            <div class="preview-card" :style="{
              borderRadius: config.card.radius,
              padding: config.card.padding,
              borderWidth: config.card.borderWidth,
              backgroundColor: config.card[activeCardType].backgroundColor,
              borderColor: config.card[activeCardType].borderColor,
              boxShadow: config.card.shadow,
            }">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <h4 class="preview-card-title" style="margin: 0;" :style="{ color: config.card[activeCardType].titleColor }">
                  任务进度
                </h4>
                <span :style="{ 
                  fontSize: '0.75rem', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem',
                  backgroundColor: activeCardType === 'white' ? 'var(--color-success)' : 'rgba(255,255,255,0.2)',
                  color: activeCardType === 'white' ? '#ffffff' : config.card[activeCardType].titleColor
                }">
                  75%
                </span>
              </div>
              <div :style="{ 
                height: '0.5rem', 
                backgroundColor: activeCardType === 'white' ? '#e5e7eb' : 'rgba(255,255,255,0.2)', 
                borderRadius: '9999px',
                overflow: 'hidden',
                marginBottom: '0.75rem'
              }">
                <div :style="{ 
                  width: '75%', 
                  height: '100%', 
                  backgroundColor: activeCardType === 'white' ? 'var(--color-success)' : config.card[activeCardType].titleColor,
                  transition: 'width 0.3s ease'
                }"></div>
              </div>
              <p class="preview-card-content" :style="{ color: config.card[activeCardType].contentColor, fontSize: '0.875rem' }">
                已完成 15 / 20 项任务
              </p>
            </div>
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

.card-preview-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.preview-card {
  border: 1px solid;
  transition: all 0.3s ease;
}

.preview-card.hover {
  /* 悬停状态已通过 style 绑定实现 */
}

.preview-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.preview-card-content {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}
</style>

