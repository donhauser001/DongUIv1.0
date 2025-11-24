<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  config: any
  components?: Array<{ id: string; name: string }>
  activeComponent?: string
}>(), {
  components: () => [],
  activeComponent: 'modal'
})

const emit = defineEmits<{
  (e: 'update:active-component', value: string): void
}>()

const showPreviewModal = ref(false)

const sizeOptions = [
  { label: '小 (400px)', value: 'small' },
  { label: '标准 (600px)', value: 'medium' },
  { label: '大 (800px)', value: 'large' },
  { label: '超大 (1000px)', value: 'xlarge' },
]

const radiusOptions = [
  { label: '无圆角 (0px)', value: '0px' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.5rem)', value: '0.5rem' },
  { label: '大 (0.75rem)', value: '0.75rem' },
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
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 尺寸与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">尺寸与形状</label>
            <span class="settings-section-desc">模态窗的基础尺寸设置</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">默认尺寸</label>
              <select v-model="config.modal.size" class="form-input">
                <option v-for="opt in sizeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.modal.radius" class="form-input">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内边距</label>
              <input v-model="config.modal.padding" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">颜色</label>
            <span class="settings-section-desc">模态窗的颜色配置</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.backgroundColor" type="color" class="color-preview" />
                <input v-model="config.modal.backgroundColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">标题颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.titleColor" type="color" class="color-preview" />
                <input v-model="config.modal.titleColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内容颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.contentColor" type="color" class="color-preview" />
                <input v-model="config.modal.contentColor" type="text" class="form-input color-text" />
              </div>
            </div>
          </div>
        </div>

        <!-- 遮罩层 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">遮罩层</label>
            <span class="settings-section-desc">背景遮罩的样式</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">遮罩颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.overlayColor" type="color" class="color-preview" />
                <input v-model="config.modal.overlayColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">遮罩透明度</label>
              <input v-model="config.modal.overlayOpacity" type="range" min="0" max="1" step="0.1" class="form-input" />
              <span style="font-size: 0.75rem; color: var(--color-text-secondary);">{{ config.modal.overlayOpacity }}</span>
            </div>
          </div>
        </div>

        <!-- 阴影 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">阴影</label>
            <span class="settings-section-desc">模态窗的阴影效果</span>
          </div>
          <div class="settings-section-content" style="grid-template-columns: 1fr;">
            <div class="settings-field">
              <label class="settings-field-label">阴影效果</label>
              <input v-model="config.modal.shadow" type="text" class="form-input" placeholder="0 8px 32px rgba(0,0,0,0.2)" />
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
          <span class="preview-label">点击按钮查看模态窗效果</span>
          <button class="btn-primary" @click="showPreviewModal = true">打开模态窗</button>
        </div>

        <div class="preview-row">
          <span class="preview-label">模态窗示例</span>
          <div style="position: relative; height: 300px; border: 1px dashed var(--color-border); border-radius: 0.5rem; overflow: hidden;">
            <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
              <div class="modal-base" style="position: relative; max-width: 90%;">
                <div class="modal-header">
                  <h3 style="margin: 0; color: var(--modal-title-color);">模态窗标题</h3>
                  <button style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                </div>
                <div class="modal-body">
                  <p style="color: var(--modal-content-color); margin: 0;">这是模态窗的内容区域。</p>
                </div>
                <div class="modal-footer">
                  <button class="btn-outline">取消</button>
                  <button class="btn-primary">确定</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实际模态窗 -->
      <div v-if="showPreviewModal" class="modal-overlay" @click="showPreviewModal = false">
        <div class="modal-base" @click.stop>
          <div class="modal-header">
            <h3 style="margin: 0; color: var(--modal-title-color);">模态窗预览</h3>
            <button style="background: none; border: none; font-size: 1.5rem; cursor: pointer;" @click="showPreviewModal = false">×</button>
          </div>
          <div class="modal-body">
            <p style="color: var(--modal-content-color);">这是一个真实的模态窗示例。</p>
            <p style="color: var(--modal-content-color);">您可以在左侧调整样式，实时查看效果。</p>
          </div>
          <div class="modal-footer">
            <button class="btn-outline" @click="showPreviewModal = false">取消</button>
            <button class="btn-primary" @click="showPreviewModal = false">确定</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, var(--modal-overlay-opacity, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-body {
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

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

