<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Modal from '@/components/Modal.vue'
import { applyTheme } from '@/utils/theme'

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

// 初始化时检查并修复内边距值
onMounted(() => {
  if (props.config?.modal) {
    let needsUpdate = false
    
    // 如果头部内边距是旧的值，更新为新的默认值
    if (props.config.modal.headerPadding === '0 0 1rem 0') {
      props.config.modal.headerPadding = '1.5rem'
      needsUpdate = true
    }
    // 如果内容内边距是旧的值（只有上下边距），更新为新的默认值
    if (props.config.modal.contentPadding === '1rem 0') {
      props.config.modal.contentPadding = '1.5rem'
      needsUpdate = true
    }
    // 如果底部内边距是旧的值，更新为新的默认值
    if (props.config.modal.footerPadding === '1rem 0 0 0') {
      props.config.modal.footerPadding = '1.5rem'
      needsUpdate = true
    }
    
    // 如果有更新，重新应用主题
    if (needsUpdate) {
      applyTheme(props.config)
    }
  }
})

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

// 辅助函数：判断颜色是否为透明
const isTransparent = (color: string) => {
  return !color || color === 'transparent' || color.includes('rgba(0') || color.includes('rgba(0,0,0,0)')
}

// 辅助函数：获取颜色选择器的值（透明时返回白色）
const getColorPickerValue = (color: string) => {
  return isTransparent(color) ? '#ffffff' : color
}

// 辅助函数：获取颜色预览样式
const getColorPreviewStyle = (color: string) => {
  if (isTransparent(color)) {
    return {
      background: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)',
      backgroundSize: '8px 8px',
      backgroundPosition: '0 0, 4px 4px',
      border: '1px solid #e5e7eb'
    }
  }
  return {
    backgroundColor: color
  }
}
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
            <div>
              <h4 class="settings-section-title">遮罩层</h4>
              <p class="settings-section-desc">背景遮罩的样式</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">遮罩颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.overlayColor" type="color" class="color-preview" />
                <input v-model="config.modal.overlayColor" type="text" class="form-input color-text" placeholder="#000000" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">遮罩透明度</label>
              <div class="range-field">
                <input v-model.number="config.modal.overlayOpacity" type="range" min="0" max="1" step="0.05" class="range-base" />
                <span class="range-field-value">{{ config.modal.overlayOpacity }}</span>
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">遮罩模糊度</label>
              <input v-model="config.modal.overlayBlur" type="text" class="form-input input-base" placeholder="0px (如: 4px, 8px)" />
            </div>
          </div>
        </div>

        <!-- 头部样式 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">头部样式</h4>
              <p class="settings-section-desc">模态窗头部区域的样式</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">头部背景色</label>
              <div class="form-color-row">
                <div class="color-preview" :style="getColorPreviewStyle(config.modal.headerBackgroundColor)">
                  <input 
                    v-if="!isTransparent(config.modal.headerBackgroundColor)"
                    v-model="config.modal.headerBackgroundColor" 
                    type="color" 
                    style="opacity: 0; width: 100%; height: 100%; cursor: pointer;" 
                  />
                </div>
                <input v-model="config.modal.headerBackgroundColor" type="text" class="form-input color-text" placeholder="transparent" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">头部下边框</label>
              <input v-model="config.modal.headerBorderBottom" type="text" class="form-input input-base" placeholder="1px solid #e5e7eb" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">头部内边距</label>
              <input v-model="config.modal.headerPadding" type="text" class="form-input input-base" placeholder="1.5rem" />
            </div>
          </div>
        </div>

        <!-- 标题样式 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">标题样式</h4>
              <p class="settings-section-desc">模态窗标题的样式</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">标题颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.titleColor" type="color" class="color-preview" />
                <input v-model="config.modal.titleColor" type="text" class="form-input color-text" placeholder="#111827" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">标题字号</label>
              <input v-model="config.modal.titleFontSize" type="text" class="form-input input-base" placeholder="1.25rem" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">标题字重</label>
              <select v-model="config.modal.titleFontWeight" class="form-input input-base">
                <option value="400">常规 (400)</option>
                <option value="500">中等 (500)</option>
                <option value="600">半粗 (600)</option>
                <option value="700">粗体 (700)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">内容区域</h4>
              <p class="settings-section-desc">模态窗内容区域的样式</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">内容背景色</label>
              <div class="form-color-row">
                <div class="color-preview" :style="getColorPreviewStyle(config.modal.contentBackgroundColor)">
                  <input 
                    v-if="!isTransparent(config.modal.contentBackgroundColor)"
                    v-model="config.modal.contentBackgroundColor" 
                    type="color" 
                    style="opacity: 0; width: 100%; height: 100%; cursor: pointer;" 
                  />
                </div>
                <input v-model="config.modal.contentBackgroundColor" type="text" class="form-input color-text" placeholder="transparent" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内容文字颜色</label>
              <div class="form-color-row">
                <input v-model="config.modal.contentColor" type="color" class="color-preview" />
                <input v-model="config.modal.contentColor" type="text" class="form-input color-text" placeholder="#374151" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内容内边距</label>
              <input v-model="config.modal.contentPadding" type="text" class="form-input input-base" placeholder="1.5rem" />
            </div>
          </div>
        </div>

        <!-- 底部样式 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">底部样式</h4>
              <p class="settings-section-desc">模态窗底部区域的样式</p>
            </div>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">底部背景色</label>
              <div class="form-color-row">
                <div class="color-preview" :style="getColorPreviewStyle(config.modal.footerBackgroundColor)">
                  <input 
                    v-if="!isTransparent(config.modal.footerBackgroundColor)"
                    v-model="config.modal.footerBackgroundColor" 
                    type="color" 
                    style="opacity: 0; width: 100%; height: 100%; cursor: pointer;" 
                  />
                </div>
                <input v-model="config.modal.footerBackgroundColor" type="text" class="form-input color-text" placeholder="transparent" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">底部上边框</label>
              <input v-model="config.modal.footerBorderTop" type="text" class="form-input input-base" placeholder="1px solid #e5e7eb" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">底部内边距</label>
              <input v-model="config.modal.footerPadding" type="text" class="form-input input-base" placeholder="1.5rem" />
            </div>
          </div>
        </div>

        <!-- 阴影 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <div>
              <h4 class="settings-section-title">阴影</h4>
              <p class="settings-section-desc">模态窗的阴影效果</p>
            </div>
          </div>
          <div class="settings-section-content" style="grid-template-columns: 1fr;">
            <div class="settings-field">
              <label class="settings-field-label">阴影效果</label>
              <input v-model="config.modal.shadow" type="text" class="form-input input-base" placeholder="0 8px 32px rgba(0,0,0,0.2)" />
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
            提示：点击下方按钮可以打开真实的模态窗，查看实际效果。
          </p>
        </div>

        <!-- 预览区域 -->
        <div class="modal-preview-container">
          <!-- 打开模态窗按钮 -->
          <div class="preview-item">
            <label class="preview-label">点击打开真实模态窗</label>
            <button class="btn-primary" @click="showPreviewModal = true">
              <span class="i-carbon-launch"></span>
              打开模态窗
            </button>
          </div>

          <!-- 模态窗缩略预览 -->
          <div class="preview-item">
            <label class="preview-label">模态窗缩略预览</label>
            <div class="modal-thumbnail-wrapper">
              <div class="modal-thumbnail-overlay" :style="{
                backgroundColor: config.modal.overlayColor,
                opacity: config.modal.overlayOpacity,
              }"></div>
              <div class="modal-thumbnail-content" :style="{
                width: config.modal.size === 'small' ? '200px' : config.modal.size === 'large' ? '320px' : config.modal.size === 'xlarge' ? '400px' : '240px',
                borderRadius: config.modal.radius,
                padding: 'calc(' + config.modal.padding + ' * 0.5)',
                backgroundColor: config.modal.backgroundColor,
                boxShadow: config.modal.shadow,
              }">
                <!-- 头部 -->
                <div :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: config.modal.headerBackgroundColor,
                  borderBottom: config.modal.headerBorderBottom,
                  padding: 'calc(' + config.modal.headerPadding.split(' ')[0] + ' * 0.5) calc(' + config.modal.headerPadding.split(' ')[1] + ' * 0.5) calc(' + config.modal.headerPadding.split(' ')[2] + ' * 0.5) calc(' + config.modal.headerPadding.split(' ')[3] + ' * 0.5)',
                  marginBottom: '0.25rem',
                }">
                  <h4 :style="{ 
                    color: config.modal.titleColor, 
                    fontSize: 'calc(' + config.modal.titleFontSize + ' * 0.6)',
                    fontWeight: config.modal.titleFontWeight,
                    margin: 0 
                  }">标题</h4>
                  <span style="font-size: 0.75rem; opacity: 0.5;">×</span>
                </div>
                
                <!-- 内容 -->
                <div :style="{
                  backgroundColor: config.modal.contentBackgroundColor,
                  color: config.modal.contentColor,
                  padding: 'calc(' + config.modal.contentPadding.split(' ')[0] + ' * 0.5) calc(' + config.modal.contentPadding.split(' ')[1] + ' * 0.5)',
                  fontSize: '0.625rem',
                  marginBottom: '0.25rem',
                }">
                  内容区域
                </div>
                
                <!-- 底部 -->
                <div :style="{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.25rem',
                  backgroundColor: config.modal.footerBackgroundColor,
                  borderTop: config.modal.footerBorderTop,
                  padding: 'calc(' + config.modal.footerPadding.split(' ')[0] + ' * 0.5) calc(' + config.modal.footerPadding.split(' ')[1] + ' * 0.5) calc(' + config.modal.footerPadding.split(' ')[2] + ' * 0.5) calc(' + config.modal.footerPadding.split(' ')[3] + ' * 0.5)',
                }">
                  <div style="width: 2rem; height: 0.75rem; background: #e5e7eb; border-radius: 0.25rem;"></div>
                  <div :style="{ width: '2rem', height: '0.75rem', background: 'var(--color-primary)', borderRadius: '0.25rem' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 不同尺寸对比 -->
          <div class="preview-item">
            <label class="preview-label">四种尺寸对比</label>
            <div style="display: flex; gap: 0.75rem; align-items: flex-end; flex-wrap: wrap;">
              <div style="text-align: center;">
                <div class="modal-size-preview" :style="{
                  width: '80px',
                  height: '60px',
                  borderRadius: config.modal.radius,
                  backgroundColor: config.modal.backgroundColor,
                  border: `2px solid ${config.modal.size === 'small' ? 'var(--color-primary)' : '#e5e7eb'}`,
                }"></div>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">小 (400px)</p>
              </div>
              <div style="text-align: center;">
                <div class="modal-size-preview" :style="{
                  width: '120px',
                  height: '90px',
                  borderRadius: config.modal.radius,
                  backgroundColor: config.modal.backgroundColor,
                  border: `2px solid ${config.modal.size === 'medium' ? 'var(--color-primary)' : '#e5e7eb'}`,
                }"></div>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">标准 (600px)</p>
              </div>
              <div style="text-align: center;">
                <div class="modal-size-preview" :style="{
                  width: '160px',
                  height: '120px',
                  borderRadius: config.modal.radius,
                  backgroundColor: config.modal.backgroundColor,
                  border: `2px solid ${config.modal.size === 'large' ? 'var(--color-primary)' : '#e5e7eb'}`,
                }"></div>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">大 (800px)</p>
              </div>
              <div style="text-align: center;">
                <div class="modal-size-preview" :style="{
                  width: '200px',
                  height: '150px',
                  borderRadius: config.modal.radius,
                  backgroundColor: config.modal.backgroundColor,
                  border: `2px solid ${config.modal.size === 'xlarge' ? 'var(--color-primary)' : '#e5e7eb'}`,
                }"></div>
                <p style="font-size: 0.75rem; margin: 0.25rem 0 0 0; color: var(--color-text-secondary);">超大 (1000px)</p>
              </div>
            </div>
          </div>

          <!-- 样式说明 -->
          <div class="preview-item">
            <label class="preview-label">当前配置</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
              <div>
                <strong style="color: var(--color-text-primary);">尺寸：</strong>
                {{ config.modal.size === 'small' ? '小 (400px)' : config.modal.size === 'large' ? '大 (800px)' : config.modal.size === 'xlarge' ? '超大 (1000px)' : '标准 (600px)' }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">圆角：</strong>
                {{ config.modal.radius }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">内边距：</strong>
                {{ config.modal.padding }}
              </div>
              <div>
                <strong style="color: var(--color-text-primary);">遮罩透明度：</strong>
                {{ config.modal.overlayOpacity }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实际模态窗 -->
      <Modal
        v-model="showPreviewModal"
        title="模态窗预览"
        :size="config.modal.size"
        confirm-text="确定"
        cancel-text="取消"
      >
        <p style="margin-bottom: 1rem;">
          这是一个真实的模态窗示例。您可以在左侧调整样式，实时查看效果。
        </p>
        <div style="padding: 1rem; background-color: var(--color-bg-secondary); border-radius: 0.5rem; margin-bottom: 1rem;">
          <h4 style="font-size: 0.875rem; margin-top: 0; margin-bottom: 0.5rem;">
            功能特点
          </h4>
          <ul style="font-size: 0.875rem; margin-bottom: 0; padding-left: 1.5rem;">
            <li>支持四种尺寸（小、标准、大、超大）</li>
            <li>可自定义圆角、内边距、颜色</li>
            <li>可调整遮罩层透明度和模糊度</li>
            <li>支持头部、内容、底部独立样式</li>
            <li>支持自定义标题字号和字重</li>
            <li>支持自定义阴影效果</li>
          </ul>
        </div>
        <p style="font-size: 0.875rem; margin: 0;">
          点击遮罩层或关闭按钮可以关闭模态窗。
        </p>
      </Modal>
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
  background: var(--color-bg-primary, #fff);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  font-weight: var(--font-weight-medium, 500);
}

.modal-preview-container {
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

.modal-thumbnail-wrapper {
  position: relative;
  height: 200px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.modal-thumbnail-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.modal-thumbnail-content {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.modal-size-preview {
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.modal-overlay-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

.modal-overlay-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.preview-modal {
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-small {
  max-width: 400px;
}

.modal-medium {
  max-width: 600px;
}

.modal-large {
  max-width: 800px;
}

.modal-xlarge {
  max-width: 1000px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close-btn:hover {
  color: var(--color-text-primary);
}

.modal-body {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>

