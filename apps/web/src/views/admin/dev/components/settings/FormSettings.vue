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
  if (force || !props.config.form?.select?.focusBorderColor || props.config.form.select.focusBorderColor.startsWith('var')) {
    props.config.form.select.focusBorderColor = primaryColor
  }
  // 复选框
  if (force || !props.config.form?.checkbox?.checkedBackgroundColor || props.config.form.checkbox.checkedBackgroundColor.startsWith('var')) {
    props.config.form.checkbox.checkedBackgroundColor = primaryColor
  }
  if (force || !props.config.form?.checkbox?.checkedBorderColor || props.config.form.checkbox.checkedBorderColor.startsWith('var')) {
    props.config.form.checkbox.checkedBorderColor = primaryColor
  }
  // 单选框
  if (force || !props.config.form?.radio?.checkedBorderColor || props.config.form.radio.checkedBorderColor.startsWith('var')) {
    props.config.form.radio.checkedBorderColor = primaryColor
  }
  if (force || !props.config.form?.radio?.checkedDotColor || props.config.form.radio.checkedDotColor.startsWith('var')) {
    props.config.form.radio.checkedDotColor = primaryColor
  }
  // 开关
  if (force || !props.config.form?.switch?.onBackgroundColor || props.config.form.switch.onBackgroundColor.startsWith('var')) {
    props.config.form.switch.onBackgroundColor = primaryColor
  }
}

// 监听全局主色变化，初始化表单元素颜色
watch(() => props.config.colors?.primary, (newPrimary) => {
  if (newPrimary) {
    initializeFormColors(newPrimary, false)
  }
}, { immediate: true })

// 监听表单配置变化，如果发现是 var() 就强制重新初始化
watch(() => props.config.form?.select?.focusBorderColor, (newValue) => {
  if (newValue && newValue.startsWith('var') && props.config.colors?.primary) {
    initializeFormColors(props.config.colors.primary, true)
  }
})

const sizeOptions = [
  { label: '小 (2rem)', value: '2rem' },
  { label: '标准 (2.5rem)', value: '2.5rem' },
  { label: '大 (3rem)', value: '3rem' },
]

const radiusOptions = [
  { label: '无圆角 (0px)', value: '0px' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.375rem)', value: '0.375rem' },
  { label: '大 (0.5rem)', value: '0.5rem' },
  { label: '全圆角 (9999px)', value: '9999px' },
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
      
      <!-- 表单类型子切换 -->
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
      <div v-if="activeFormType === 'select'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 尺寸与形状 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">尺寸与形状</label>
            <span class="stat-label">下拉框的基础尺寸设置</span>
          </div>
          <div class="grid-2" style="gap: 0.75rem;">
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">高度</label>
              <select v-model="config.form.select.height" class="form-input">
                <option v-for="opt in sizeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">圆角</label>
              <select v-model="config.form.select.radius" class="form-input">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">边框宽度</label>
              <input v-model="config.form.select.borderWidth" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">颜色</label>
            <span class="stat-label">下拉框的颜色配置</span>
          </div>
          <div class="grid-2" style="gap: 0.75rem;">
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.backgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.select.backgroundColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">文字颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.textColor" type="color" class="color-preview" />
                <input v-model="config.form.select.textColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.borderColor" type="color" class="color-preview" />
                <input v-model="config.form.select.borderColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">聚焦边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.focusBorderColor" type="color" class="color-preview" />
                <input v-model="config.form.select.focusBorderColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">聚焦光圈颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.select.focusRingColor" type="color" class="color-preview" />
                <input v-model="config.form.select.focusRingColor" type="text" class="form-input color-text" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 复选框设置 -->
      <div v-else-if="activeFormType === 'checkbox'" class="settings-group">
        <h5 class="section-title">尺寸与形状</h5>
        <div class="grid-2" style="gap: 1rem;">
          <div class="form-group">
            <label class="form-label">大小</label>
            <input v-model="config.form.checkbox.size" type="text" class="form-input" placeholder="1.25rem" />
          </div>
          <div class="form-group">
            <label class="form-label">圆角</label>
            <select v-model="config.form.checkbox.radius" class="form-input">
              <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">边框宽度</label>
            <input v-model="config.form.checkbox.borderWidth" type="text" class="form-input" />
          </div>
        </div>

        <h5 class="section-title">颜色</h5>
        <div class="grid-2" style="gap: 1rem;">
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">未选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.borderColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.borderColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">选中背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.checkedBackgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.checkedBackgroundColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.checkedBorderColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.checkedBorderColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">勾选标记颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.checkbox.checkmarkColor" type="color" class="color-preview" />
                <input v-model="config.form.checkbox.checkmarkColor" type="text" class="form-input color-text" />
              </div>
          </div>
        </div>
      </div>

      <!-- 单选框设置 -->
      <div v-else-if="activeFormType === 'radio'" class="settings-group">
        <h5 class="section-title">尺寸</h5>
        <div class="grid-2" style="gap: 1rem;">
          <div class="form-group">
            <label class="form-label">大小</label>
            <input v-model="config.form.radio.size" type="text" class="form-input" placeholder="1.25rem" />
          </div>
          <div class="form-group">
            <label class="form-label">边框宽度</label>
            <input v-model="config.form.radio.borderWidth" type="text" class="form-input" />
          </div>
        </div>

        <h5 class="section-title">颜色</h5>
        <div class="grid-2" style="gap: 1rem;">
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">未选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.radio.borderColor" type="color" class="color-preview" />
                <input v-model="config.form.radio.borderColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">选中边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.radio.checkedBorderColor" type="color" class="color-preview" />
                <input v-model="config.form.radio.checkedBorderColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">选中圆点颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.radio.checkedDotColor" type="color" class="color-preview" />
                <input v-model="config.form.radio.checkedDotColor" type="text" class="form-input color-text" />
              </div>
          </div>
        </div>
      </div>

      <!-- 开关设置 -->
      <div v-else-if="activeFormType === 'switch'" class="settings-group">
        <h5 class="section-title">尺寸</h5>
        <div class="grid-2" style="gap: 1rem;">
          <div class="form-group">
            <label class="form-label">宽度</label>
            <input v-model="config.form.switch.width" type="text" class="form-input" placeholder="2.75rem" />
          </div>
          <div class="form-group">
            <label class="form-label">高度</label>
            <input v-model="config.form.switch.height" type="text" class="form-input" placeholder="1.5rem" />
          </div>
        </div>

        <h5 class="section-title">颜色</h5>
        <div class="grid-2" style="gap: 1rem;">
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">关闭背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.switch.offBackgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.switch.offBackgroundColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">开启背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.switch.onBackgroundColor" type="color" class="color-preview" />
                <input v-model="config.form.switch.onBackgroundColor" type="text" class="form-input color-text" />
              </div>
          </div>
          <div class="form-group" style="gap: 0.5rem;">
              <label class="form-label">滑块颜色</label>
              <div class="form-color-row">
                <input v-model="config.form.switch.thumbColor" type="color" class="color-preview" />
                <input v-model="config.form.switch.thumbColor" type="text" class="form-input color-text" />
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">实时预览</h3>
      
      <div class="preview-section">
        <!-- 下拉框预览 -->
        <div v-if="activeFormType === 'select'">
          <div class="preview-row">
            <span class="preview-label">正常状态</span>
            <select class="select-base">
              <option>请选择选项</option>
              <option>选项 1</option>
              <option>选项 2</option>
              <option>选项 3</option>
            </select>
          </div>
          <div class="preview-row">
            <span class="preview-label">聚焦状态</span>
            <select class="select-base" style="
              border-color: var(--select-focus-border-color);
              box-shadow: 0 0 0 3px color-mix(in srgb, var(--select-focus-border-color), transparent 80%);
            ">
              <option>已选择的选项</option>
            </select>
          </div>
          <div class="preview-row">
            <span class="preview-label">禁用状态</span>
            <select class="select-base" disabled>
              <option>禁用的下拉框</option>
            </select>
          </div>
        </div>

        <!-- 复选框预览 -->
        <div v-else-if="activeFormType === 'checkbox'">
          <div class="preview-row">
            <label class="checkbox-label">
              <input type="checkbox" class="checkbox-base" />
              <span>未选中状态</span>
            </label>
          </div>
          <div class="preview-row">
            <label class="checkbox-label">
              <input type="checkbox" class="checkbox-base" checked />
              <span>选中状态</span>
            </label>
          </div>
          <div class="preview-row">
            <label class="checkbox-label">
              <input type="checkbox" class="checkbox-base" disabled />
              <span>禁用状态</span>
            </label>
          </div>
        </div>

        <!-- 单选框预览 -->
        <div v-else-if="activeFormType === 'radio'">
          <div class="preview-row">
            <label class="radio-label">
              <input type="radio" name="preview-radio" class="radio-base" />
              <span>选项 1</span>
            </label>
          </div>
          <div class="preview-row">
            <label class="radio-label">
              <input type="radio" name="preview-radio" class="radio-base" checked />
              <span>选项 2（选中）</span>
            </label>
          </div>
          <div class="preview-row">
            <label class="radio-label">
              <input type="radio" name="preview-radio" class="radio-base" disabled />
              <span>选项 3（禁用）</span>
            </label>
          </div>
        </div>

        <!-- 开关预览 -->
        <div v-else-if="activeFormType === 'switch'">
          <div class="preview-row">
            <label class="switch-label">
              <input type="checkbox" class="switch-base" />
              <span class="switch-slider"></span>
              <span class="switch-text">关闭状态</span>
            </label>
          </div>
          <div class="preview-row">
            <label class="switch-label">
              <input type="checkbox" class="switch-base" checked />
              <span class="switch-slider"></span>
              <span class="switch-text">开启状态</span>
            </label>
          </div>
          <div class="preview-row">
            <label class="switch-label">
              <input type="checkbox" class="switch-base" disabled />
              <span class="switch-slider"></span>
              <span class="switch-text">禁用状态</span>
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

.checkbox-label,
.radio-label,
.switch-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.switch-label {
  position: relative;
}

.switch-text {
  margin-left: 0.5rem;
}
</style>

