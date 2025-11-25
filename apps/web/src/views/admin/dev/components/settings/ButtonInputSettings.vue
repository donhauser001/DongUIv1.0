<script setup lang="ts">
import { ref, watch } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const props = withDefaults(defineProps<{
  config: any
  activeTab?: 'buttons' | 'inputs'
  components?: Array<{ id: string; name: string }>
  activeComponent?: string
}>(), {
  activeTab: 'buttons',
  components: () => [],
  activeComponent: 'button'
})

const emit = defineEmits<{
  (e: 'update:active-component', value: string): void
}>()

const activeTab = ref<'buttons' | 'inputs'>(props.activeTab)
const activeButtonType = ref<'primary' | 'outline'>('primary')
const activeInputType = ref<'text' | 'textarea' | 'richtext'>('text')
const richTextContent = ref(`<h1>欢迎使用富文本编辑器</h1>
<p>这是一个功能完整、专业的富文本编辑器组件。</p>`)

// 模拟图片上传函数
const mockUploadImage = async (_file: File): Promise<string> => {
  return 'https://via.placeholder.com/150'
}

// 初始化颜色的函数
const initializeColors = (primaryColor: string, force = false) => {
  if (!primaryColor || !primaryColor.startsWith('#')) return
  
  // 计算悬停颜色：主色加深10%
  const r = parseInt(primaryColor.slice(1, 3), 16)
  const g = parseInt(primaryColor.slice(3, 5), 16)
  const b = parseInt(primaryColor.slice(5, 7), 16)
  const hoverColor = `#${Math.floor(r * 0.9).toString(16).padStart(2, '0')}${Math.floor(g * 0.9).toString(16).padStart(2, '0')}${Math.floor(b * 0.9).toString(16).padStart(2, '0')}`
  
  // 按钮颜色初始化：如果是 var() 或未设置，或者强制初始化，则使用实际颜色值
  if (force || !props.config.button?.primary?.backgroundColor || props.config.button.primary.backgroundColor.startsWith('var')) {
    props.config.button.primary.backgroundColor = primaryColor
  }
  if (force || !props.config.button?.primary?.borderColor || props.config.button.primary.borderColor.startsWith('var')) {
    props.config.button.primary.borderColor = primaryColor
  }
  if (force || !props.config.button?.primary?.hoverBackgroundColor || props.config.button.primary.hoverBackgroundColor.startsWith('color-mix') || props.config.button.primary.hoverBackgroundColor.startsWith('var')) {
    props.config.button.primary.hoverBackgroundColor = hoverColor
  }
  if (force || !props.config.button?.primary?.hoverBorderColor || props.config.button.primary.hoverBorderColor.startsWith('var')) {
    props.config.button.primary.hoverBorderColor = primaryColor
  }
  if (force || !props.config.button?.outline?.hoverBorderColor || props.config.button.outline.hoverBorderColor.startsWith('var')) {
    props.config.button.outline.hoverBorderColor = primaryColor
  }
  if (force || !props.config.button?.outline?.hoverTextColor || props.config.button.outline.hoverTextColor.startsWith('var')) {
    props.config.button.outline.hoverTextColor = primaryColor
  }
  if (force || !props.config.input?.text?.focusBorderColor || props.config.input.text.focusBorderColor.startsWith('var')) {
    props.config.input.text.focusBorderColor = primaryColor
  }
  if (force || !props.config.input?.text?.focusRingColor || props.config.input.text.focusRingColor.startsWith('var')) {
    props.config.input.text.focusRingColor = primaryColor
  }
  if (force || !props.config.input?.textarea?.focusBorderColor || props.config.input.textarea.focusBorderColor.startsWith('var')) {
    props.config.input.textarea.focusBorderColor = primaryColor
  }
  if (force || !props.config.input?.textarea?.focusRingColor || props.config.input.textarea.focusRingColor.startsWith('var')) {
    props.config.input.textarea.focusRingColor = primaryColor
  }
  if (force || !props.config.input?.richtext?.editorFocusBorderColor || props.config.input.richtext.editorFocusBorderColor.startsWith('var')) {
    props.config.input.richtext.editorFocusBorderColor = primaryColor
  }
  if (force || !props.config.input?.richtext?.editorFocusRingColor || props.config.input.richtext.editorFocusRingColor.startsWith('var')) {
    props.config.input.richtext.editorFocusRingColor = primaryColor
  }
}

// 监听全局主色变化
watch(() => props.config.colors?.primary, (newPrimary) => {
  if (newPrimary) {
    initializeColors(newPrimary, false)
  }
}, { immediate: true })

// 同时监听按钮配置的变化，如果发现是 var() 就强制重新初始化（恢复默认时）
watch(() => props.config.button?.primary?.backgroundColor, (newValue, oldValue) => {
  console.log('按钮背景色变化:', { oldValue, newValue, primary: props.config.colors?.primary })
  
  // 当值变为 var() 时，说明是恢复默认，需要强制重新初始化
  if (newValue && newValue.startsWith('var') && props.config.colors?.primary) {
    console.log('检测到 var()，强制重新初始化颜色，主色为:', props.config.colors.primary)
    // 强制初始化，覆盖所有值
    initializeColors(props.config.colors.primary, true)
    console.log('初始化后的背景色:', props.config.button?.primary?.backgroundColor)
  }
})

const heightOptions = [
  { label: '自动 (由内边距决定)', value: 'auto' },
  { label: '小 (2rem)', value: '2rem' },
  { label: '标准 (2.5rem)', value: '2.5rem' },
  { label: '大 (3rem)', value: '3rem' },
]

const paddingOptions = [
  { label: '紧凑 (0.5rem)', value: '0.5rem' },
  { label: '标准 (1rem)', value: '1rem' },
  { label: '宽敞 (1.5rem)', value: '1.5rem' },
]

const paddingYOptions = [
  { label: '紧凑 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.5rem)', value: '0.5rem' },
  { label: '宽敞 (0.75rem)', value: '0.75rem' },
  { label: '大 (1rem)', value: '1rem' },
]

const radiusOptions = [
  { label: '无圆角 (0px)', value: '0px' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.375rem)', value: '0.375rem' },
  { label: '大 (0.5rem)', value: '0.5rem' },
  { label: '全圆角 (9999px)', value: '9999px' },
]

const resizeOptions = [
  { label: '无', value: 'none' },
  { label: '垂直', value: 'vertical' },
  { label: '水平', value: 'horizontal' },
  { label: '自由', value: 'both' },
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

      <!-- 按钮设置 -->
      <div v-if="activeTab === 'buttons'" class="fade-in settings-group">
        <div class="text-tab-group">
          <button
            @click="activeButtonType = 'primary'"
            class="text-tab-btn"
            :class="{ 'active': activeButtonType === 'primary' }"
          >
            主要按钮
          </button>
          <button
            @click="activeButtonType = 'outline'"
            class="text-tab-btn"
            :class="{ 'active': activeButtonType === 'outline' }"
          >
            次要按钮
          </button>
        </div>

        <!-- 主要按钮设置 -->
        <div v-if="activeButtonType === 'primary'" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- 尺寸与形状 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">尺寸与形状</label>
              <span class="stat-label">按钮的基础尺寸设置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">高度</label>
                <select v-model="config.button.primary.height" class="form-input">
                  <option v-for="opt in heightOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">圆角</label>
                <select v-model="config.button.primary.radius" class="form-input">
                  <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">水平内边距</label>
                <select v-model="config.button.primary.paddingX" class="form-input">
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">垂直内边距</label>
                <select v-model="config.button.primary.paddingY" class="form-input">
                  <option v-for="opt in paddingYOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框宽度</label>
                <input v-model="config.button.primary.borderWidth" type="text" class="form-input" />
              </div>
            </div>
          </div>

          <!-- 正常状态 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">正常状态</label>
              <span class="stat-label">按钮的默认外观</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.backgroundColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.backgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.textColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.textColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.borderColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.borderColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>

          <!-- 悬停状态 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">悬停状态</label>
              <span class="stat-label">鼠标悬停时的样式</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.hoverBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.hoverBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.hoverTextColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.hoverTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.hoverBorderColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.hoverBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>

          <!-- 禁用状态 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">禁用状态</label>
              <span class="stat-label">按钮不可用时的样式</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.disabledBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.disabledBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.disabledTextColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.disabledTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.primary.disabledBorderColor" type="color" class="color-preview" />
                  <input v-model="config.button.primary.disabledBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 次要按钮设置 -->
        <div v-else-if="activeButtonType === 'outline'" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- 尺寸与形状 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">尺寸与形状</label>
              <span class="stat-label">按钮的基础尺寸设置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">高度</label>
                <select v-model="config.button.outline.height" class="form-input">
                  <option v-for="opt in heightOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">圆角</label>
                <select v-model="config.button.outline.radius" class="form-input">
                  <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">水平内边距</label>
                <select v-model="config.button.outline.paddingX" class="form-input">
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">垂直内边距</label>
                <select v-model="config.button.outline.paddingY" class="form-input">
                  <option v-for="opt in paddingYOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框宽度</label>
                <input v-model="config.button.outline.borderWidth" type="text" class="form-input" />
              </div>
            </div>
          </div>

          <!-- 正常状态 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">正常状态</label>
              <span class="stat-label">按钮的默认外观</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.backgroundColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.backgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.textColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.textColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.borderColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.borderColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>

          <!-- 悬停状态 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">悬停状态</label>
              <span class="stat-label">鼠标悬停时的样式</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.hoverBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.hoverBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.hoverTextColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.hoverTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.hoverBorderColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.hoverBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>

          <!-- 禁用状态 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">禁用状态</label>
              <span class="stat-label">按钮不可用时的样式</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.disabledBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.disabledBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.disabledTextColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.disabledTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.button.outline.disabledBorderColor" type="color" class="color-preview" />
                  <input v-model="config.button.outline.disabledBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入框设置 -->
      <div v-if="activeTab === 'inputs'" class="fade-in settings-group">
        <div class="text-tab-group">
          <button
            @click="activeInputType = 'text'"
            class="text-tab-btn"
            :class="{ 'active': activeInputType === 'text' }"
          >
            单行文本
          </button>
          <button
            @click="activeInputType = 'textarea'"
            class="text-tab-btn"
            :class="{ 'active': activeInputType === 'textarea' }"
          >
            多行文本
          </button>
          <button
            @click="activeInputType = 'richtext'"
            class="text-tab-btn"
            :class="{ 'active': activeInputType === 'richtext' }"
          >
            富文本编辑器
          </button>
        </div>

        <!-- 单行文本设置 -->
        <div v-if="activeInputType === 'text'" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- 尺寸与形状 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">尺寸与形状</label>
              <span class="stat-label">输入框的基础尺寸设置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">高度</label>
                <select v-model="config.input.text.height" class="form-input">
                  <option v-for="opt in heightOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">圆角</label>
                <select v-model="config.input.text.radius" class="form-input">
                  <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">水平内边距</label>
                <select v-model="config.input.text.paddingX" class="form-input">
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">垂直内边距</label>
                <select v-model="config.input.text.paddingY" class="form-input">
                  <option v-for="opt in paddingYOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框宽度</label>
                <input v-model="config.input.text.borderWidth" type="text" class="form-input" />
              </div>
            </div>
          </div>

          <!-- 颜色 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">颜色</label>
              <span class="stat-label">输入框的颜色配置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.backgroundColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.backgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.textColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.textColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.borderColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.borderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">占位符颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.placeholderColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.placeholderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">聚焦边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.focusBorderColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.focusBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">聚焦光圈颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.focusRingColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.focusRingColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">禁用背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.disabledBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.disabledBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">禁用文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.text.disabledTextColor" type="color" class="color-preview" />
                  <input v-model="config.input.text.disabledTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 多行文本设置 -->
        <div v-else-if="activeInputType === 'textarea'" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- 尺寸与形状 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">尺寸与形状</label>
              <span class="stat-label">多行文本框的基础尺寸设置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">最小高度</label>
                <input v-model="config.input.textarea.minHeight" type="text" class="form-input" />
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">尺寸调整</label>
                <select v-model="config.input.textarea.resize" class="form-input">
                  <option v-for="opt in resizeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">圆角</label>
                <select v-model="config.input.textarea.radius" class="form-input">
                  <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">水平内边距</label>
                <select v-model="config.input.textarea.paddingX" class="form-input">
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">垂直内边距</label>
                <select v-model="config.input.textarea.paddingY" class="form-input">
                  <option v-for="opt in paddingYOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框宽度</label>
                <input v-model="config.input.textarea.borderWidth" type="text" class="form-input" />
              </div>
            </div>
          </div>

          <!-- 颜色 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">颜色</label>
              <span class="stat-label">多行文本框的颜色配置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.backgroundColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.backgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.textColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.textColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.borderColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.borderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">占位符颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.placeholderColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.placeholderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">聚焦边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.focusBorderColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.focusBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">聚焦光圈颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.focusRingColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.focusRingColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">禁用背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.disabledBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.disabledBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">禁用文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.textarea.disabledTextColor" type="color" class="color-preview" />
                  <input v-model="config.input.textarea.disabledTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 富文本编辑器设置 -->
        <div v-else-if="activeInputType === 'richtext'" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- 整体外观 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">整体外观</label>
              <span class="stat-label">富文本编辑器的基础尺寸</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">最小高度</label>
                <input v-model="config.input.richtext.minHeight" type="text" class="form-input" />
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">最大高度</label>
                <input v-model="config.input.richtext.maxHeight" type="text" class="form-input" />
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">圆角</label>
                <select v-model="config.input.richtext.radius" class="form-input">
                  <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框宽度</label>
                <input v-model="config.input.richtext.borderWidth" type="text" class="form-input" />
              </div>
            </div>
          </div>

          <!-- 颜色 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">颜色</label>
              <span class="stat-label">编辑器和工具栏的颜色配置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.backgroundColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.backgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.borderColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.borderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">工具栏背景颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.toolbarBackgroundColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.toolbarBackgroundColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">工具栏边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.toolbarBorderColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.toolbarBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">工具栏按钮悬停颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.toolbarButtonHoverColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.toolbarButtonHoverColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">编辑器文字颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.editorTextColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.editorTextColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">编辑器聚焦边框颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.editorFocusBorderColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.editorFocusBorderColor" type="text" class="form-input color-text" />
                </div>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">编辑器聚焦光圈颜色</label>
                <div class="form-color-row">
                  <input v-model="config.input.richtext.editorFocusRingColor" type="color" class="color-preview" />
                  <input v-model="config.input.richtext.editorFocusRingColor" type="text" class="form-input color-text" />
                </div>
              </div>
            </div>
          </div>

          <!-- 内边距 -->
          <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="form-label" style="font-weight: 600; margin: 0;">内边距</label>
              <span class="stat-label">编辑区域的内边距设置</span>
            </div>
            <div class="grid-2" style="gap: 0.75rem;">
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">编辑器水平内边距</label>
                <select v-model="config.input.richtext.editorPaddingX" class="form-input">
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">编辑器垂直内边距</label>
                <select v-model="config.input.richtext.editorPaddingY" class="form-input">
                  <option v-for="opt in paddingYOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
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
            提示：{{ activeTab === 'buttons' ? '鼠标悬停在按钮上可以查看悬停效果' : '点击输入框可以查看聚焦效果' }}
          </p>
        </div>

        <!-- 按钮预览 -->
        <div v-if="activeTab === 'buttons'" class="component-preview-container">
          <!-- 主要按钮预览 -->
          <div v-if="activeButtonType === 'primary'">
            <div class="preview-item">
              <label class="preview-label">三种状态对比</label>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <button class="btn-primary">正常状态</button>
                  <p style="font-size: 0.75rem; margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">正常</p>
                </div>
                <div style="text-align: center;">
                  <button class="btn-primary" style="
                    background-color: var(--btn-primary-hover-bg-color);
                    color: var(--btn-primary-hover-text-color);
                    border-color: var(--btn-primary-hover-border-color);
                  ">悬停状态</button>
                  <p style="font-size: 0.75rem; margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">悬停</p>
                </div>
                <div style="text-align: center;">
                  <button class="btn-primary" disabled>禁用状态</button>
                  <p style="font-size: 0.75rem; margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">禁用</p>
                </div>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">带图标按钮</label>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary">
                  <span class="i-carbon-add"></span>
                  新建
                </button>
                <button class="btn-primary">
                  <span class="i-carbon-save"></span>
                  保存
                </button>
                <button class="btn-primary">
                  <span class="i-carbon-upload"></span>
                  上传
                </button>
                <button class="btn-primary">
                  <span class="i-carbon-download"></span>
                  下载
                </button>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">不同尺寸</label>
              <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <button class="btn-primary" style="padding: 0.375rem 0.75rem; font-size: 0.875rem;">小按钮</button>
                <button class="btn-primary">标准按钮</button>
                <button class="btn-primary" style="padding: 0.75rem 1.5rem; font-size: 1rem;">大按钮</button>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">应用场景</label>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                  <button class="btn-outline">取消</button>
                  <button class="btn-primary">确定</button>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn-primary">
                    <span class="i-carbon-add"></span>
                    新建项目
                  </button>
                  <button class="btn-primary">
                    <span class="i-carbon-edit"></span>
                    编辑
                  </button>
                  <button class="btn-primary">
                    <span class="i-carbon-trash-can"></span>
                    删除
                  </button>
                </div>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">当前配置</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
                <div>
                  <strong style="color: var(--color-text-primary);">圆角：</strong>
                  {{ config.button.primary.radius }}
                </div>
                <div>
                  <strong style="color: var(--color-text-primary);">水平内边距：</strong>
                  {{ config.button.primary.paddingX }}
                </div>
                <div>
                  <strong style="color: var(--color-text-primary);">垂直内边距：</strong>
                  {{ config.button.primary.paddingY }}
                </div>
                <div>
                  <strong style="color: var(--color-text-primary);">字号：</strong>
                  {{ config.button.primary.fontSize }}
                </div>
              </div>
            </div>
          </div>

          <!-- 次要按钮预览 -->
          <div v-else-if="activeButtonType === 'outline'">
            <div class="preview-item">
              <label class="preview-label">三种状态对比</label>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <button class="btn-outline">正常状态</button>
                  <p style="font-size: 0.75rem; margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">正常</p>
                </div>
                <div style="text-align: center;">
                  <button class="btn-outline" style="
                    background-color: var(--btn-outline-hover-bg-color);
                    color: var(--btn-outline-hover-text-color);
                    border-color: var(--btn-outline-hover-border-color);
                  ">悬停状态</button>
                  <p style="font-size: 0.75rem; margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">悬停</p>
                </div>
                <div style="text-align: center;">
                  <button class="btn-outline" disabled>禁用状态</button>
                  <p style="font-size: 0.75rem; margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">禁用</p>
                </div>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">带图标按钮</label>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-outline">
                  <span class="i-carbon-close"></span>
                  取消
                </button>
                <button class="btn-outline">
                  <span class="i-carbon-reset"></span>
                  重置
                </button>
                <button class="btn-outline">
                  <span class="i-carbon-view"></span>
                  查看
                </button>
                <button class="btn-outline">
                  <span class="i-carbon-settings"></span>
                  设置
                </button>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">与主要按钮组合</label>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                  <button class="btn-outline">取消</button>
                  <button class="btn-primary">确定</button>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                  <button class="btn-outline">上一步</button>
                  <button class="btn-outline">跳过</button>
                  <button class="btn-primary">下一步</button>
                </div>
              </div>
            </div>

            <div class="preview-item">
              <label class="preview-label">当前配置</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
                <div>
                  <strong style="color: var(--color-text-primary);">圆角：</strong>
                  {{ config.button.outline.radius }}
                </div>
                <div>
                  <strong style="color: var(--color-text-primary);">水平内边距：</strong>
                  {{ config.button.outline.paddingX }}
                </div>
                <div>
                  <strong style="color: var(--color-text-primary);">垂直内边距：</strong>
                  {{ config.button.outline.paddingY }}
                </div>
                <div>
                  <strong style="color: var(--color-text-primary);">字号：</strong>
                  {{ config.button.outline.fontSize }}
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- 输入框预览 -->
        <div v-if="activeTab === 'inputs'" class="component-preview-container">
        <!-- 单行文本预览 -->
        <div v-if="activeInputType === 'text'">
          <div class="preview-item">
            <label class="preview-label">三种状态对比</label>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <input type="text" class="input-base" placeholder="正常状态：请输入内容..." />
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">正常状态</p>
              </div>
              <div>
                <input type="text" class="input-base" placeholder="聚焦状态：点击查看效果..." style="
                  border-color: var(--input-focus-border-color);
                  box-shadow: 0 0 0 3px color-mix(in srgb, var(--input-focus-ring-color), transparent 80%);
                " />
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">聚焦状态（带光圈）</p>
              </div>
              <div>
                <input type="text" class="input-base" placeholder="禁用状态" disabled />
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">禁用状态</p>
              </div>
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">不同类型输入框</label>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <input type="text" class="input-base" placeholder="文本输入框" />
              <input type="email" class="input-base" placeholder="邮箱输入框" />
              <input type="password" class="input-base" placeholder="密码输入框" />
              <input type="number" class="input-base" placeholder="数字输入框" />
              <input type="url" class="input-base" placeholder="网址输入框" />
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">表单应用场景</label>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">用户名</label>
                <input type="text" class="input-base" placeholder="请输入用户名" />
              </div>
              <div>
                <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">邮箱地址</label>
                <input type="email" class="input-base" placeholder="example@email.com" />
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn-outline">取消</button>
                <button class="btn-primary">提交</button>
              </div>
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">当前配置</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
              <div>
                <strong style="color: var(--color-text-primary);">圆角：</strong>
                {{ config.input.text.radius }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">水平内边距：</strong>
                {{ config.input.text.paddingX }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">垂直内边距：</strong>
                {{ config.input.text.paddingY }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">字号：</strong>
                {{ config.input.text.fontSize }}
              </div>
            </div>
          </div>
        </div>

        <!-- 多行文本预览 -->
        <div v-else-if="activeInputType === 'textarea'">
          <div class="preview-item">
            <label class="preview-label">三种状态对比</label>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <textarea class="textarea-base" placeholder="正常状态：请输入多行内容..." rows="3"></textarea>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">正常状态</p>
              </div>
              <div>
                <textarea class="textarea-base" placeholder="聚焦状态：点击查看效果..." rows="3" style="
                  border-color: var(--textarea-focus-border-color);
                  box-shadow: 0 0 0 3px color-mix(in srgb, var(--textarea-focus-ring-color), transparent 80%);
                "></textarea>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">聚焦状态（带光圈）</p>
              </div>
              <div>
                <textarea class="textarea-base" placeholder="禁用状态" rows="3" disabled></textarea>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">禁用状态</p>
              </div>
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">不同高度</label>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <textarea class="textarea-base" placeholder="2行高度" rows="2"></textarea>
              <textarea class="textarea-base" placeholder="4行高度" rows="4"></textarea>
              <textarea class="textarea-base" placeholder="6行高度" rows="6"></textarea>
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">表单应用场景</label>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">项目描述</label>
                <textarea class="textarea-base" placeholder="请输入项目描述..." rows="4"></textarea>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">最多 500 字</p>
              </div>
              <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button class="btn-outline">取消</button>
                <button class="btn-primary">保存</button>
              </div>
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">当前配置</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
              <div>
                <strong style="color: var(--color-text-primary);">圆角：</strong>
                {{ config.input.textarea.radius }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">水平内边距：</strong>
                {{ config.input.textarea.paddingX }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">垂直内边距：</strong>
                {{ config.input.textarea.paddingY }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">字号：</strong>
                {{ config.input.textarea.fontSize }}
              </div>
            </div>
          </div>
        </div>

        <!-- 富文本编辑器预览 -->
        <div v-else-if="activeInputType === 'richtext'">
          <div class="preview-item">
            <label class="preview-label">正常状态</label>
            <RichTextEditor
              v-model="richTextContent"
              placeholder="尝试使用工具栏编辑内容..."
              :min-height="config.input.richtext.minHeight"
              :max-height="config.input.richtext.maxHeight"
              :upload-image="mockUploadImage"
            />
          </div>
          
          <div class="preview-item">
            <label class="preview-label">禁用状态</label>
            <RichTextEditor
              model-value="<p>这是禁用状态的富文本编辑器</p>"
              :disabled="true"
              :min-height="config.input.richtext.minHeight"
              :max-height="config.input.richtext.maxHeight"
            />
          </div>

          <div class="preview-item">
            <label class="preview-label">功能展示</label>
            <div style="padding: 1rem; background: var(--color-bg-secondary); border-radius: 0.5rem;">
              <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">支持的功能</h4>
              <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6;">
                <li>文本格式：粗体、斜体、下划线、删除线</li>
                <li>标题层级：H1、H2、H3、正文</li>
                <li>文本对齐：左对齐、居中、右对齐、两端对齐</li>
                <li>列表：有序列表、无序列表</li>
                <li>缩进：增加缩进、减少缩进</li>
                <li>颜色：文字颜色、背景高亮</li>
                <li>插入：链接、图片、分隔线</li>
                <li>其他：清除格式、撤销、重做</li>
              </ul>
            </div>
          </div>

          <div class="preview-item">
            <label class="preview-label">当前配置</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
              <div>
                <strong style="color: var(--color-text-primary);">最小高度：</strong>
                {{ config.input.richtext.minHeight }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">最大高度：</strong>
                {{ config.input.richtext.maxHeight }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">圆角：</strong>
                {{ config.input.richtext.radius }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">边框宽度：</strong>
                {{ config.input.richtext.borderWidth }}
              </div>
            </div>
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

/* 文本选项卡样式 */
.text-tab-group {
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}

.text-tab-btn {
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
  font-weight: 400;
}

.text-tab-btn:hover {
  color: var(--color-text-primary);
}

.text-tab-btn.active {
  color: var(--color-primary);
  font-weight: 500;
}

.text-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
}

</style>

