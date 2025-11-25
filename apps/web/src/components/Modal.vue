<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
  closeOnClickOutside?: boolean
}>(), {
  size: 'medium',
  showFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmLoading: false,
  closeOnClickOutside: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnClickOutside) {
    close()
  }
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleConfirm = () => {
  emit('confirm')
}

// 阻止 body 滚动
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="handleOverlayClick">
        <Transition name="modal-slide">
          <div v-if="modelValue" class="modal-content" :class="`modal-${size}`">
            <!-- 头部 -->
            <div v-if="title || $slots.header" class="modal-header">
              <slot name="header">
                <h3 class="modal-title">{{ title }}</h3>
              </slot>
              <button class="modal-close" @click="close" type="button">
                <span class="i-carbon-close"></span>
              </button>
            </div>

            <!-- 内容 -->
            <div class="modal-body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="showFooter || $slots.footer" class="modal-footer">
              <slot name="footer">
                <button 
                  class="btn-outline" 
                  @click="handleCancel" 
                  :disabled="confirmLoading"
                  type="button"
                >
                  {{ cancelText }}
                </button>
                <button 
                  class="btn-primary" 
                  @click="handleConfirm" 
                  :disabled="confirmLoading"
                  type="button"
                >
                  <span v-if="confirmLoading" class="i-carbon-loading loading-spin"></span>
                  {{ confirmLoading ? '处理中...' : confirmText }}
                </button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md, 1rem);
}

.modal-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--modal-overlay-color, color-mix(in srgb, black 50%, transparent 50%));
  opacity: var(--modal-overlay-opacity, 1);
  backdrop-filter: blur(var(--modal-overlay-blur, 4px));
}

.modal-content {
  position: relative;
  background: var(--modal-bg-color, var(--color-bg-primary));
  border-radius: var(--modal-radius, var(--radius));
  box-shadow: var(--modal-shadow, var(--shadow-xl));
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  padding: var(--modal-header-padding, 1.5rem);
  border-bottom: var(--modal-header-border-bottom, var(--border-width) solid var(--color-border));
  background: var(--modal-header-bg-color, transparent);
  flex-shrink: 0;
}

.modal-title {
  font-size: var(--modal-title-font-size, 1.25rem);
  font-weight: var(--modal-title-font-weight, 600);
  color: var(--modal-title-color, var(--color-text-primary));
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-h2-size, 1.5rem);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs, 0.25rem);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  flex-shrink: 0;
}

.modal-close:hover {
  color: var(--color-text-primary);
}

.modal-body {
  padding: var(--modal-content-padding, 1.5rem);
  overflow-y: auto;
  flex: 1;
  background: var(--modal-content-bg-color, transparent);
  color: var(--modal-content-color, var(--color-text-primary));
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm, 0.75rem);
  padding: var(--modal-footer-padding, 1.5rem);
  border-top: var(--modal-footer-border-top, var(--border-width) solid var(--color-border));
  background: var(--modal-footer-bg-color, transparent);
  flex-shrink: 0;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm, 0.5rem);
  cursor: pointer;
  transition: all 0.2s;
  font-size: var(--font-body-size, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
}

.btn-primary {
  min-height: var(--btn-primary-height, 2.5rem);
  padding: var(--btn-primary-padding-y, 0.5rem) var(--btn-primary-padding-x, 1rem);
  border-radius: var(--btn-primary-radius, var(--radius));
  border: var(--btn-primary-border-width, var(--border-width)) solid var(--btn-primary-border-color, var(--color-primary));
  background: var(--btn-primary-bg-color, var(--color-primary));
  color: var(--btn-primary-text-color, var(--color-text-inverse, #ffffff));
}

.btn-primary:hover:not(:disabled) {
  background: var(--btn-primary-hover-bg-color, color-mix(in srgb, var(--color-primary), black 10%));
  color: var(--btn-primary-hover-text-color, var(--color-text-inverse, #ffffff));
  border-color: var(--btn-primary-hover-border-color, var(--color-primary));
}

.btn-primary:disabled {
  background: var(--btn-primary-disabled-bg-color, var(--color-gray-200));
  color: var(--btn-primary-disabled-text-color, var(--color-gray-400));
  border-color: var(--btn-primary-disabled-border-color, transparent);
  cursor: not-allowed;
}

.btn-outline {
  min-height: var(--btn-outline-height, 2.5rem);
  padding: var(--btn-outline-padding-y, 0.5rem) var(--btn-outline-padding-x, 1rem);
  border-radius: var(--btn-outline-radius, var(--radius));
  border: var(--btn-outline-border-width, var(--border-width)) solid var(--btn-outline-border-color, var(--color-border));
  background: var(--btn-outline-bg-color, transparent);
  color: var(--btn-outline-text-color, var(--color-text-primary));
}

.btn-outline:hover:not(:disabled) {
  background: var(--btn-outline-hover-bg-color, var(--color-bg-secondary));
  color: var(--btn-outline-hover-text-color, var(--color-primary));
  border-color: var(--btn-outline-hover-border-color, var(--color-primary));
}

.btn-outline:disabled {
  background: var(--btn-outline-disabled-bg-color, transparent);
  color: var(--btn-outline-disabled-text-color, var(--color-gray-400));
  border-color: var(--btn-outline-disabled-border-color, var(--color-gray-200));
  cursor: not-allowed;
}

.loading-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.modal-slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.modal-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

