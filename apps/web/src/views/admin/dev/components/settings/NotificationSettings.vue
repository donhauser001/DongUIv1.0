<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  config: any
  components?: Array<{ id: string; name: string }>
  activeComponent?: string
}>(), {
  components: () => [],
  activeComponent: 'notification'
})

const emit = defineEmits<{
  (e: 'update:active-component', value: string): void
}>()

const activeNotifType = ref<'toast' | 'alert' | 'message'>('toast')
const showToast = ref(false)

const positionOptions = [
  { label: '顶部居中', value: 'top-center' },
  { label: '顶部右侧', value: 'top-right' },
  { label: '底部居中', value: 'bottom-center' },
  { label: '底部右侧', value: 'bottom-right' },
]

const radiusOptions = [
  { label: '无圆角 (0px)', value: '0px' },
  { label: '小 (0.25rem)', value: '0.25rem' },
  { label: '标准 (0.375rem)', value: '0.375rem' },
  { label: '大 (0.5rem)', value: '0.5rem' },
]

const showToastPreview = () => {
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
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
      
      <!-- 提示类型子切换 -->
      <div class="text-tab-group">
        <button
          @click="activeNotifType = 'toast'"
          class="text-tab-btn"
          :class="{ 'active': activeNotifType === 'toast' }"
        >
          Toast 提示
        </button>
        <button
          @click="activeNotifType = 'alert'"
          class="text-tab-btn"
          :class="{ 'active': activeNotifType === 'alert' }"
        >
          Alert 警告
        </button>
        <button
          @click="activeNotifType = 'message'"
          class="text-tab-btn"
          :class="{ 'active': activeNotifType === 'message' }"
        >
          Message 消息
        </button>
      </div>

      <!-- Toast 设置 -->
      <div v-if="activeNotifType === 'toast'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 位置与形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">位置与形状</label>
            <span class="settings-section-desc">Toast 的显示位置和样式</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">默认位置</label>
              <select v-model="config.notification.toast.position" class="form-input">
                <option v-for="opt in positionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.notification.toast.radius" class="form-input">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内边距</label>
              <input v-model="config.notification.toast.padding" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">颜色</label>
            <span class="settings-section-desc">Toast 的颜色配置</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.toast.backgroundColor" type="color" class="color-preview" />
                <input v-model="config.notification.toast.backgroundColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">文字颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.toast.textColor" type="color" class="color-preview" />
                <input v-model="config.notification.toast.textColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">成功颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.toast.successColor" type="color" class="color-preview" />
                <input v-model="config.notification.toast.successColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">错误颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.toast.errorColor" type="color" class="color-preview" />
                <input v-model="config.notification.toast.errorColor" type="text" class="form-input color-text" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert 设置 -->
      <div v-else-if="activeNotifType === 'alert'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">形状</label>
            <span class="settings-section-desc">Alert 的基础样式</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.notification.alert.radius" class="form-input">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内边距</label>
              <input v-model="config.notification.alert.padding" type="text" class="form-input" />
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框宽度</label>
              <input v-model="config.notification.alert.borderWidth" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">颜色</label>
            <span class="settings-section-desc">不同类型 Alert 的背景色</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">信息背景</label>
              <div class="form-color-row">
                <input v-model="config.notification.alert.infoBgColor" type="color" class="color-preview" />
                <input v-model="config.notification.alert.infoBgColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">成功背景</label>
              <div class="form-color-row">
                <input v-model="config.notification.alert.successBgColor" type="color" class="color-preview" />
                <input v-model="config.notification.alert.successBgColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">警告背景</label>
              <div class="form-color-row">
                <input v-model="config.notification.alert.warningBgColor" type="color" class="color-preview" />
                <input v-model="config.notification.alert.warningBgColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">错误背景</label>
              <div class="form-color-row">
                <input v-model="config.notification.alert.errorBgColor" type="color" class="color-preview" />
                <input v-model="config.notification.alert.errorBgColor" type="text" class="form-input color-text" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message 设置 -->
      <div v-else-if="activeNotifType === 'message'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 形状 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">形状</label>
            <span class="settings-section-desc">Message 的基础样式</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">圆角</label>
              <select v-model="config.notification.message.radius" class="form-input">
                <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">内边距</label>
              <input v-model="config.notification.message.padding" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="settings-section-card">
          <div class="settings-section-header">
            <label class="settings-section-title">颜色</label>
            <span class="settings-section-desc">Message 的颜色配置</span>
          </div>
          <div class="settings-section-content">
            <div class="settings-field">
              <label class="settings-field-label">背景颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.message.backgroundColor" type="color" class="color-preview" />
                <input v-model="config.notification.message.backgroundColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">文字颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.message.textColor" type="color" class="color-preview" />
                <input v-model="config.notification.message.textColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="settings-field">
              <label class="settings-field-label">边框颜色</label>
              <div class="form-color-row">
                <input v-model="config.notification.message.borderColor" type="color" class="color-preview" />
                <input v-model="config.notification.message.borderColor" type="text" class="form-input color-text" />
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
        <!-- Toast 预览 -->
        <div v-if="activeNotifType === 'toast'">
          <div class="preview-row">
            <span class="preview-label">点击按钮查看 Toast 效果</span>
            <button class="btn-primary" @click="showToastPreview">显示 Toast</button>
          </div>
          <div class="preview-row">
            <span class="preview-label">Toast 样式示例</span>
            <div class="toast-base">
              <span>✓</span>
              <span>操作成功！</span>
            </div>
          </div>
        </div>

        <!-- Alert 预览 -->
        <div v-else-if="activeNotifType === 'alert'">
          <div class="preview-row">
            <span class="preview-label">信息提示</span>
            <div class="alert-base alert-info">
              <span>ℹ️</span>
              <span>这是一条信息提示</span>
            </div>
          </div>
          <div class="preview-row">
            <span class="preview-label">成功提示</span>
            <div class="alert-base alert-success">
              <span>✓</span>
              <span>操作成功完成</span>
            </div>
          </div>
          <div class="preview-row">
            <span class="preview-label">警告提示</span>
            <div class="alert-base alert-warning">
              <span>⚠️</span>
              <span>请注意这个警告信息</span>
            </div>
          </div>
          <div class="preview-row">
            <span class="preview-label">错误提示</span>
            <div class="alert-base alert-error">
              <span>✕</span>
              <span>操作失败，请重试</span>
            </div>
          </div>
        </div>

        <!-- Message 预览 -->
        <div v-else-if="activeNotifType === 'message'">
          <div class="preview-row">
            <span class="preview-label">普通消息</span>
            <div class="message-base">
              <strong>系统通知</strong>
              <p style="margin: 0.5rem 0 0 0;">您有一条新消息</p>
            </div>
          </div>
          <div class="preview-row">
            <span class="preview-label">带关闭按钮</span>
            <div class="message-base">
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <strong>系统通知</strong>
                  <p style="margin: 0.5rem 0 0 0;">您有一条新消息</p>
                </div>
                <button style="background: none; border: none; font-size: 1.25rem; cursor: pointer;">×</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast 实际显示 -->
      <Transition name="toast">
        <div v-if="showToast" class="toast-overlay">
          <div class="toast-base">
            <span>✓</span>
            <span>这是一个 Toast 提示！</span>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.toast-overlay {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
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

