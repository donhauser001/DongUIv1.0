<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  config: any
  components?: Array<{ id: string; name: string }>
  activeComponent?: string
}>(), {
  components: () => [],
  activeComponent: 'tag'
})

const emit = defineEmits<{
  (e: 'update:active-component', value: string): void
}>()

const activeTagType = ref<'default' | 'success' | 'warning' | 'danger'>('default')

const sizeOptions = [
  { label: '小', value: 'small' },
  { label: '标准', value: 'medium' },
  { label: '大', value: 'large' },
]

const radiusOptions = [
  { label: '无圆角 (0px)', value: '0px' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.375rem)', value: '0.375rem' },
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
      
      <!-- 标签类型子切换 -->
      <div class="text-tab-group">
        <button
          @click="activeTagType = 'default'"
          class="text-tab-btn"
          :class="{ 'active': activeTagType === 'default' }"
        >
          默认
        </button>
        <button
          @click="activeTagType = 'success'"
          class="text-tab-btn"
          :class="{ 'active': activeTagType === 'success' }"
        >
          成功
        </button>
        <button
          @click="activeTagType = 'warning'"
          class="text-tab-btn"
          :class="{ 'active': activeTagType === 'warning' }"
        >
          警告
        </button>
        <button
          @click="activeTagType = 'danger'"
          class="text-tab-btn"
          :class="{ 'active': activeTagType === 'danger' }"
        >
          危险
        </button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 尺寸与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">尺寸与形状</label>
            <span class="settings-section-desc">标签的基础尺寸设置</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">大小</label>
              <select v-model="config.tag[activeTagType].size" class="form-input">
                <option v-for="opt in sizeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.tag[activeTagType].radius" class="form-input">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">颜色</label>
            <span class="settings-section-desc">标签的颜色配置</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.tag[activeTagType].backgroundColor" type="color" class="color-preview" />
                <input v-model="config.tag[activeTagType].backgroundColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">文字颜色</label>
              <div class="form-color-row">
                <input v-model="config.tag[activeTagType].textColor" type="color" class="color-preview" />
                <input v-model="config.tag[activeTagType].textColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.tag[activeTagType].borderColor" type="color" class="color-preview" />
                <input v-model="config.tag[activeTagType].borderColor" type="text" class="form-input color-text" />
              </div>
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
          <span class="preview-label">小号标签</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span :class="`tag-${activeTagType}`" data-size="small">标签</span>
            <span :class="`tag-${activeTagType}`" data-size="small">✓ 已完成</span>
            <span :class="`tag-${activeTagType}`" data-size="small">新</span>
          </div>
        </div>
        <div class="preview-row">
          <span class="preview-label">标准标签</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span :class="`tag-${activeTagType}`" data-size="medium">标签</span>
            <span :class="`tag-${activeTagType}`" data-size="medium">✓ 已完成</span>
            <span :class="`tag-${activeTagType}`" data-size="medium">新功能</span>
          </div>
        </div>
        <div class="preview-row">
          <span class="preview-label">大号标签</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span :class="`tag-${activeTagType}`" data-size="large">标签</span>
            <span :class="`tag-${activeTagType}`" data-size="large">✓ 已完成</span>
            <span :class="`tag-${activeTagType}`" data-size="large">新功能上线</span>
          </div>
        </div>
        <div class="preview-row">
          <span class="preview-label">所有类型对比</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="tag-default" data-size="medium">默认</span>
            <span class="tag-success" data-size="medium">成功</span>
            <span class="tag-warning" data-size="medium">警告</span>
            <span class="tag-danger" data-size="medium">危险</span>
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

