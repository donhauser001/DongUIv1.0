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
      <div class="settings-group">
        <!-- 提示框 -->
        <div class="info-card-tip">
          <span class="i-carbon-information info-card-tip-icon"></span>
          <p class="info-card-tip-text">
            提示：左侧修改的样式会实时反映在下方的标签预览中。
          </p>
        </div>

        <!-- 预览区域 -->
        <div class="tag-preview-container">
          <!-- 四种类型对比 -->
          <div class="preview-item">
            <label class="preview-label">四种类型对比</label>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <span class="preview-tag" :style="{
                fontSize: config.tag.default.size === 'small' ? '0.75rem' : config.tag.default.size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag.default.size === 'small' ? '0.125rem 0.5rem' : config.tag.default.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag.default.radius,
                backgroundColor: config.tag.default.backgroundColor,
                color: config.tag.default.textColor,
                border: `1px solid ${config.tag.default.borderColor}`,
              }">
                默认
              </span>
              <span class="preview-tag" :style="{
                fontSize: config.tag.success.size === 'small' ? '0.75rem' : config.tag.success.size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag.success.size === 'small' ? '0.125rem 0.5rem' : config.tag.success.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag.success.radius,
                backgroundColor: config.tag.success.backgroundColor,
                color: config.tag.success.textColor,
                border: `1px solid ${config.tag.success.borderColor}`,
              }">
                成功
              </span>
              <span class="preview-tag" :style="{
                fontSize: config.tag.warning.size === 'small' ? '0.75rem' : config.tag.warning.size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag.warning.size === 'small' ? '0.125rem 0.5rem' : config.tag.warning.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag.warning.radius,
                backgroundColor: config.tag.warning.backgroundColor,
                color: config.tag.warning.textColor,
                border: `1px solid ${config.tag.warning.borderColor}`,
              }">
                警告
              </span>
              <span class="preview-tag" :style="{
                fontSize: config.tag.danger.size === 'small' ? '0.75rem' : config.tag.danger.size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag.danger.size === 'small' ? '0.125rem 0.5rem' : config.tag.danger.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag.danger.radius,
                backgroundColor: config.tag.danger.backgroundColor,
                color: config.tag.danger.textColor,
                border: `1px solid ${config.tag.danger.borderColor}`,
              }">
                危险
              </span>
            </div>
          </div>

          <!-- 当前选中类型 - 不同尺寸 -->
          <div class="preview-item">
            <label class="preview-label">{{ activeTagType === 'default' ? '默认' : activeTagType === 'success' ? '成功' : activeTagType === 'warning' ? '警告' : '危险' }}标签 - 三种尺寸</label>
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
              <span class="preview-tag" :style="{
                fontSize: '0.75rem',
                padding: '0.125rem 0.5rem',
                borderRadius: config.tag[activeTagType].radius,
                backgroundColor: config.tag[activeTagType].backgroundColor,
                color: config.tag[activeTagType].textColor,
                border: `1px solid ${config.tag[activeTagType].borderColor}`,
              }">
                小号
              </span>
              <span class="preview-tag" :style="{
                fontSize: '0.875rem',
                padding: '0.25rem 0.75rem',
                borderRadius: config.tag[activeTagType].radius,
                backgroundColor: config.tag[activeTagType].backgroundColor,
                color: config.tag[activeTagType].textColor,
                border: `1px solid ${config.tag[activeTagType].borderColor}`,
              }">
                标准
              </span>
              <span class="preview-tag" :style="{
                fontSize: '1rem',
                padding: '0.375rem 0.875rem',
                borderRadius: config.tag[activeTagType].radius,
                backgroundColor: config.tag[activeTagType].backgroundColor,
                color: config.tag[activeTagType].textColor,
                border: `1px solid ${config.tag[activeTagType].borderColor}`,
              }">
                大号
              </span>
            </div>
          </div>

          <!-- 当前选中类型 - 带图标 -->
          <div class="preview-item">
            <label class="preview-label">{{ activeTagType === 'default' ? '默认' : activeTagType === 'success' ? '成功' : activeTagType === 'warning' ? '警告' : '危险' }}标签 - 带图标</label>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <span class="preview-tag" :style="{
                fontSize: config.tag[activeTagType].size === 'small' ? '0.75rem' : config.tag[activeTagType].size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag[activeTagType].size === 'small' ? '0.125rem 0.5rem' : config.tag[activeTagType].size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag[activeTagType].radius,
                backgroundColor: config.tag[activeTagType].backgroundColor,
                color: config.tag[activeTagType].textColor,
                border: `1px solid ${config.tag[activeTagType].borderColor}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }">
                <span :class="activeTagType === 'success' ? 'i-carbon-checkmark-filled' : activeTagType === 'warning' ? 'i-carbon-warning-alt-filled' : activeTagType === 'danger' ? 'i-carbon-close-filled' : 'i-carbon-information-filled'"></span>
                {{ activeTagType === 'default' ? '信息' : activeTagType === 'success' ? '已完成' : activeTagType === 'warning' ? '待处理' : '已关闭' }}
              </span>
              <span class="preview-tag" :style="{
                fontSize: config.tag[activeTagType].size === 'small' ? '0.75rem' : config.tag[activeTagType].size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag[activeTagType].size === 'small' ? '0.125rem 0.5rem' : config.tag[activeTagType].size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag[activeTagType].radius,
                backgroundColor: config.tag[activeTagType].backgroundColor,
                color: config.tag[activeTagType].textColor,
                border: `1px solid ${config.tag[activeTagType].borderColor}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }">
                <span class="i-carbon-user"></span>
                管理员
              </span>
              <span class="preview-tag" :style="{
                fontSize: config.tag[activeTagType].size === 'small' ? '0.75rem' : config.tag[activeTagType].size === 'large' ? '1rem' : '0.875rem',
                padding: config.tag[activeTagType].size === 'small' ? '0.125rem 0.5rem' : config.tag[activeTagType].size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem',
                borderRadius: config.tag[activeTagType].radius,
                backgroundColor: config.tag[activeTagType].backgroundColor,
                color: config.tag[activeTagType].textColor,
                border: `1px solid ${config.tag[activeTagType].borderColor}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }">
                <span class="i-carbon-tag"></span>
                标签
              </span>
            </div>
          </div>

          <!-- 实际应用场景 -->
          <div class="preview-item">
            <label class="preview-label">实际应用场景</label>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <!-- 用户状态 -->
              <div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0 0 0.5rem 0;">用户状态：</p>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.success.radius,
                    backgroundColor: config.tag.success.backgroundColor,
                    color: config.tag.success.textColor,
                    border: `1px solid ${config.tag.success.borderColor}`,
                  }">
                    在线
                  </span>
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.warning.radius,
                    backgroundColor: config.tag.warning.backgroundColor,
                    color: config.tag.warning.textColor,
                    border: `1px solid ${config.tag.warning.borderColor}`,
                  }">
                    离开
                  </span>
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.default.radius,
                    backgroundColor: config.tag.default.backgroundColor,
                    color: config.tag.default.textColor,
                    border: `1px solid ${config.tag.default.borderColor}`,
                  }">
                    离线
                  </span>
                </div>
              </div>

              <!-- 任务优先级 -->
              <div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0 0 0.5rem 0;">任务优先级：</p>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.danger.radius,
                    backgroundColor: config.tag.danger.backgroundColor,
                    color: config.tag.danger.textColor,
                    border: `1px solid ${config.tag.danger.borderColor}`,
                  }">
                    紧急
                  </span>
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.warning.radius,
                    backgroundColor: config.tag.warning.backgroundColor,
                    color: config.tag.warning.textColor,
                    border: `1px solid ${config.tag.warning.borderColor}`,
                  }">
                    重要
                  </span>
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.default.radius,
                    backgroundColor: config.tag.default.backgroundColor,
                    color: config.tag.default.textColor,
                    border: `1px solid ${config.tag.default.borderColor}`,
                  }">
                    普通
                  </span>
                </div>
              </div>

              <!-- 文章分类 -->
              <div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0 0 0.5rem 0;">文章分类：</p>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.default.radius,
                    backgroundColor: config.tag.default.backgroundColor,
                    color: config.tag.default.textColor,
                    border: `1px solid ${config.tag.default.borderColor}`,
                  }">
                    技术
                  </span>
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.default.radius,
                    backgroundColor: config.tag.default.backgroundColor,
                    color: config.tag.default.textColor,
                    border: `1px solid ${config.tag.default.borderColor}`,
                  }">
                    设计
                  </span>
                  <span class="preview-tag" :style="{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: config.tag.default.radius,
                    backgroundColor: config.tag.default.backgroundColor,
                    color: config.tag.default.textColor,
                    border: `1px solid ${config.tag.default.borderColor}`,
                  }">
                    产品
                  </span>
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

.tag-preview-container {
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

.preview-tag {
  display: inline-block;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  transition: all 0.2s ease;
}
</style>

