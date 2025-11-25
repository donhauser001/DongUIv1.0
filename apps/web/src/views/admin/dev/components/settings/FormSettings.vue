<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  config: any
  components?: Array<{ id: string; name: string }>
  activeComponent?: string
}>(), {
  components: () => [],
  activeComponent: 'form'
})

const emit = defineEmits<{
  (e: 'update:active-component', value: string): void
}>()

const activeFormType = ref<'select' | 'checkbox' | 'radio' | 'switch'>('select')

// 初始化表单颜色的函数
const initializeFormColors = (primaryColor: string, force = false) => {
  if (!primaryColor || !primaryColor.startsWith('#')) return
  
  // 下拉框
  if (force || !props.config.form?.select?.focusBorderColor || 
      props.config.form.select.focusBorderColor === '' || 
      props.config.form.select.focusBorderColor.includes('var(')) {
    props.config.form.select.focusBorderColor = primaryColor
  }
  if (force || !props.config.form?.select?.focusRingColor || 
      props.config.form.select.focusRingColor === '' || 
      props.config.form.select.focusRingColor.includes('var(')) {
    props.config.form.select.focusRingColor = primaryColor
  }
  
  // 复选框
  if (force || !props.config.form?.checkbox?.checkedBackgroundColor || 
      props.config.form.checkbox.checkedBackgroundColor === '' || 
      props.config.form.checkbox.checkedBackgroundColor.includes('var(')) {
    props.config.form.checkbox.checkedBackgroundColor = primaryColor
  }
  if (force || !props.config.form?.checkbox?.checkedBorderColor || 
      props.config.form.checkbox.checkedBorderColor === '' || 
      props.config.form.checkbox.checkedBorderColor.includes('var(')) {
    props.config.form.checkbox.checkedBorderColor = primaryColor
  }
  
  // 单选框
  if (force || !props.config.form?.radio?.checkedBorderColor || 
      props.config.form.radio.checkedBorderColor === '' || 
      props.config.form.radio.checkedBorderColor.includes('var(')) {
    props.config.form.radio.checkedBorderColor = primaryColor
  }
  if (force || !props.config.form?.radio?.checkedDotColor || 
      props.config.form.radio.checkedDotColor === '' || 
      props.config.form.radio.checkedDotColor.includes('var(')) {
    props.config.form.radio.checkedDotColor = primaryColor
  }
  
  // 开关
  if (force || !props.config.form?.switch?.onBackgroundColor || 
      props.config.form.switch.onBackgroundColor === '' || 
      props.config.form.switch.onBackgroundColor.includes('var(')) {
    props.config.form.switch.onBackgroundColor = primaryColor
  }
}

// 监听全局主色变化 - 主色变化时更新所有表单颜色
watch(() => props.config.colors?.primary, (newPrimary, oldPrimary) => {
  if (newPrimary && newPrimary.startsWith('#')) {
    // 如果主色发生变化，强制更新所有表单颜色
    if (oldPrimary && oldPrimary !== newPrimary) {
      initializeFormColors(newPrimary, true)
    } else {
      // 首次加载时，检查是否需要初始化
      initializeFormColors(newPrimary, false)
    }
  }
}, { immediate: true, deep: true })

// 检测到 var() 值时强制初始化 - 确保页面加载时替换 var() 值
watch(() => [
  props.config.form?.select?.focusBorderColor,
  props.config.form?.select?.focusRingColor,
  props.config.form?.checkbox?.checkedBackgroundColor,
  props.config.form?.checkbox?.checkedBorderColor,
  props.config.form?.radio?.checkedBorderColor,
  props.config.form?.radio?.checkedDotColor,
  props.config.form?.switch?.onBackgroundColor
], (newValues) => {
  const primaryColor = props.config.colors?.primary
  if (primaryColor && primaryColor.startsWith('#')) {
    // 检查是否有任何值包含 var()
    const hasVarValues = newValues.some(val => val && typeof val === 'string' && val.includes('var('))
    if (hasVarValues) {
      // 延迟执行，确保 config 已完全加载
      setTimeout(() => {
        initializeFormColors(primaryColor, true)
      }, 0)
    }
  }
}, { immediate: true, deep: true })

const sizeOptions = [
  { label: '小 (2rem)', value: '2rem' },
  { label: '标准 (2.5rem)', value: '2.5rem' },
  { label: '大 (3rem)', value: '3rem' },
]

const radiusOptions = [
  { label: '无圆角 (0)', value: '0' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.375rem)', value: '0.375rem' },
  { label: '大 (0.5rem)', value: '0.5rem' },
  { label: '全圆角 (9999px)', value: '9999px' },
]
</script>

<template>
  <section class="grid-2">
    <!-- 左侧：设置区域 -->
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

      <!-- 表单类型切换 -->
      <div class="text-tab-group">
        <button
          @click="activeFormType = 'select'"
          class="text-tab-btn"
          :class="{ 'active': activeFormType === 'select' }"
        >
          下拉框
        </button>
        <button
          @click="activeFormType = 'checkbox'"
          class="text-tab-btn"
          :class="{ 'active': activeFormType === 'checkbox' }"
        >
          复选框
        </button>
        <button
          @click="activeFormType = 'radio'"
          class="text-tab-btn"
          :class="{ 'active': activeFormType === 'radio' }"
        >
          单选框
        </button>
        <button
          @click="activeFormType = 'switch'"
          class="text-tab-btn"
          :class="{ 'active': activeFormType === 'switch' }"
        >
          开关
        </button>
      </div>

      <!-- 下拉框设置 -->
      <template v-if="activeFormType === 'select'">
        <!-- 尺寸与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">尺寸与形状</h4>
              <p class="settings-section-desc">设置下拉框的基础尺寸</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">高度</label>
              <select v-model="config.form.select.height" class="form-input input-base">
                <option v-for="opt in sizeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.form.select.radius" class="form-input input-base">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框宽度</label>
              <input v-model="config.form.select.borderWidth" type="text" class="form-input input-base" placeholder="1px" />
            </div>
          </div>
        </div>

        <!-- 颜色设置 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">颜色设置</h4>
              <p class="settings-section-desc">设置下拉框的颜色配置</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.backgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.select.backgroundColor" type="text" class="form-input color-text" placeholder="#ffffff" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">文字颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.textColor" type="color" class="color-preview" />
                <input v-model="config.form.select.textColor" type="text" class="form-input color-text" placeholder="#111827" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.borderColor" type="color" class="color-preview" />
                <input v-model="config.form.select.borderColor" type="text" class="form-input color-text" placeholder="#e5e7eb" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">聚焦边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.focusBorderColor" type="color" class="color-preview" />
                <input v-model="config.form.select.focusBorderColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">聚焦光圈颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.focusRingColor" type="color" class="color-preview" />
                <input v-model="config.form.select.focusRingColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 复选框设置 -->
      <template v-else-if="activeFormType === 'checkbox'">
        <!-- 尺寸与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">尺寸与形状</h4>
              <p class="settings-section-desc">设置复选框的基础尺寸</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">大小</label>
              <input v-model="config.form.checkbox.size" type="text" class="form-input input-base" placeholder="1.25rem" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.form.checkbox.radius" class="form-input input-base">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框宽度</label>
              <input v-model="config.form.checkbox.borderWidth" type="text" class="form-input input-base" placeholder="1px" />
            </div>
          </div>
        </div>

        <!-- 颜色设置 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">颜色设置</h4>
              <p class="settings-section-desc">设置复选框的颜色配置</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">未选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.borderColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.borderColor" type="text" class="form-input color-text" placeholder="#d1d5db" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">选中背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.checkedBackgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.checkedBackgroundColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.checkedBorderColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.checkedBorderColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">勾选标记颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.checkmarkColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.checkmarkColor" type="text" class="form-input color-text" placeholder="#ffffff" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 单选框设置 -->
      <template v-else-if="activeFormType === 'radio'">
        <!-- 尺寸与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">尺寸与形状</h4>
              <p class="settings-section-desc">设置单选框的基础尺寸</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">大小</label>
              <input v-model="config.form.radio.size" type="text" class="form-input input-base" placeholder="1.25rem" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框宽度</label>
              <input v-model="config.form.radio.borderWidth" type="text" class="form-input input-base" placeholder="1px" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">选中圆点大小</label>
              <input v-model="config.form.radio.dotSize" type="text" class="form-input input-base" placeholder="0.5rem" />
            </div>
          </div>
        </div>

        <!-- 颜色设置 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">颜色设置</h4>
              <p class="settings-section-desc">设置单选框的颜色配置</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">未选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.radio.borderColor" type="color" class="color-preview" />
                <input v-model="config.form.radio.borderColor" type="text" class="form-input color-text" placeholder="#d1d5db" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.radio.checkedBorderColor" type="color" class="color-preview" />
                <input v-model="config.form.radio.checkedBorderColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">选中圆点颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.radio.checkedDotColor" type="color" class="color-preview" />
                <input v-model="config.form.radio.checkedDotColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 开关设置 -->
      <template v-else-if="activeFormType === 'switch'">
        <!-- 尺寸与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">尺寸与形状</h4>
              <p class="settings-section-desc">设置开关的基础尺寸</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">宽度</label>
              <input v-model="config.form.switch.width" type="text" class="form-input input-base" placeholder="2.75rem" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">高度</label>
              <input v-model="config.form.switch.height" type="text" class="form-input input-base" placeholder="1.5rem" />
            </div>
          </div>
        </div>

        <!-- 颜色设置 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">颜色设置</h4>
              <p class="settings-section-desc">设置开关的颜色配置</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">关闭背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.switch.offBackgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.switch.offBackgroundColor" type="text" class="form-input color-text" placeholder="#d1d5db" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">开启背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.switch.onBackgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.switch.onBackgroundColor" type="text" class="form-input color-text" placeholder="#03624C" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">滑块颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.switch.thumbColor" type="color" class="color-preview" />
                <input v-model="config.form.switch.thumbColor" type="text" class="form-input color-text" placeholder="#ffffff" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 右侧：实时预览 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">实时预览</h3>
      <div class="settings-group">
        <!-- 提示框 -->
        <div class="info-card-tip">
          <span class="i-carbon-information info-card-tip-icon"></span>
          <p class="info-card-tip-text">
            提示：左侧修改的样式会实时反映在下方的预览中。
          </p>
        </div>

        <!-- 预览区域 -->
        <div class="form-preview-container">
          <!-- 下拉框预览 -->
          <div v-if="activeFormType === 'select'" class="preview-item">
            <label class="preview-label">选择选项</label>
            <select class="preview-select" :style="{
              height: config.form.select.height,
              borderRadius: config.form.select.radius,
              borderWidth: config.form.select.borderWidth,
              backgroundColor: config.form.select.backgroundColor,
              color: config.form.select.textColor,
              borderColor: config.form.select.borderColor,
            }">
              <option>选项 1</option>
              <option>选项 2</option>
              <option>选项 3</option>
            </select>
          </div>

          <!-- 复选框预览 -->
          <div v-if="activeFormType === 'checkbox'" class="preview-item">
            <label class="preview-checkbox-label">
              <input type="checkbox" class="preview-checkbox" checked :style="{
                width: config.form.checkbox.size,
                height: config.form.checkbox.size,
                borderRadius: config.form.checkbox.radius,
                borderWidth: config.form.checkbox.borderWidth,
              }" />
              <span>已选中的复选框</span>
            </label>
            <label class="preview-checkbox-label">
              <input type="checkbox" class="preview-checkbox" :style="{
                width: config.form.checkbox.size,
                height: config.form.checkbox.size,
                borderRadius: config.form.checkbox.radius,
                borderWidth: config.form.checkbox.borderWidth,
              }" />
              <span>未选中的复选框</span>
            </label>
          </div>

          <!-- 单选框预览 -->
          <div v-if="activeFormType === 'radio'" class="preview-item">
            <label class="preview-radio-label">
              <input type="radio" name="preview-radio" class="preview-radio" checked :style="{
                width: config.form.radio.size,
                height: config.form.radio.size,
                borderWidth: config.form.radio.borderWidth,
              }" />
              <span>已选中的单选框</span>
            </label>
            <label class="preview-radio-label">
              <input type="radio" name="preview-radio" class="preview-radio" :style="{
                width: config.form.radio.size,
                height: config.form.radio.size,
                borderWidth: config.form.radio.borderWidth,
              }" />
              <span>未选中的单选框</span>
            </label>
          </div>

          <!-- 开关预览 -->
          <div v-if="activeFormType === 'switch'" class="preview-item">
            <label class="preview-switch-label">
              <div class="preview-switch" :class="{ 'on': true }" :style="{
                width: config.form.switch.width,
                height: config.form.switch.height,
                backgroundColor: config.form.switch.onBackgroundColor,
              }">
                <div class="preview-switch-thumb" :style="{
                  backgroundColor: config.form.switch.thumbColor,
                }"></div>
              </div>
              <span>开启状态</span>
            </label>
            <label class="preview-switch-label">
              <div class="preview-switch" :style="{
                width: config.form.switch.width,
                height: config.form.switch.height,
                backgroundColor: config.form.switch.offBackgroundColor,
              }">
                <div class="preview-switch-thumb" :style="{
                  backgroundColor: config.form.switch.thumbColor,
                }"></div>
              </div>
              <span>关闭状态</span>
            </label>
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

.form-preview-container {
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.preview-select {
  padding: 0 2.5rem 0 0.75rem;
  border: 1px solid;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;
}

.preview-select:focus {
  border-color: v-bind('config.form.select.focusBorderColor');
  box-shadow: 0 0 0 3px v-bind('config.form.select.focusRingColor + "33"');
}

.preview-checkbox-label,
.preview-radio-label,
.preview-switch-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.preview-checkbox,
.preview-radio {
  appearance: none;
  flex-shrink: 0;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-checkbox {
  border-color: v-bind('config.form.checkbox.borderColor');
}

.preview-checkbox:checked {
  background-color: v-bind('config.form.checkbox.checkedBackgroundColor');
  border-color: v-bind('config.form.checkbox.checkedBorderColor');
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.preview-radio {
  border-radius: 50%;
  border-color: v-bind('config.form.radio.borderColor');
  position: relative;
}

.preview-radio:checked {
  border-color: v-bind('config.form.radio.checkedBorderColor');
}

.preview-radio:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: v-bind('config.form.radio.dotSize');
  height: v-bind('config.form.radio.dotSize');
  border-radius: 50%;
  background-color: v-bind('config.form.radio.checkedDotColor');
}

.preview-switch {
  position: relative;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.preview-switch-thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(v-bind('config.form.switch.height') - 4px);
  height: calc(v-bind('config.form.switch.height') - 4px);
  border-radius: 50%;
  transition: all 0.2s ease;
  left: 2px;
}

.preview-switch.on .preview-switch-thumb {
  left: calc(v-bind('config.form.switch.width') - v-bind('config.form.switch.height') + 2px);
}
</style>
