<script setup lang="ts">
import { watch } from 'vue'
import ActionMenu, { type ActionMenuItem } from '@/components/ActionMenu.vue'

const props = defineProps<{
  config: any
}>()

// 预览用的操作菜单项
const previewActions: ActionMenuItem[] = [
  {
    label: '查看详情',
    icon: 'i-carbon-view',
    onClick: () => {}
  },
  {
    label: '编辑',
    icon: 'i-carbon-edit',
    onClick: () => {}
  },
  { divider: true },
  {
    label: '删除',
    icon: 'i-carbon-trash-can',
    danger: true,
    onClick: () => {}
  }
]

// 初始化颜色值（基于全局主题）
const initializeColors = (force = false) => {
  const primaryColor = props.config.colors.primary || '#03624C'
  
  // 只在需要时初始化（首次加载或强制重置）
  if (force || !props.config.table.headerBackgroundColor || props.config.table.headerBackgroundColor.includes('var(')) {
    props.config.table.headerBackgroundColor = '#f9fafb'
  }
  if (force || !props.config.table.headerTextColor || props.config.table.headerTextColor.includes('var(')) {
    props.config.table.headerTextColor = '#111827'
  }
  if (force || !props.config.table.outerBorderColor || props.config.table.outerBorderColor.includes('var(')) {
    props.config.table.outerBorderColor = '#e5e7eb'
  }
  if (force || !props.config.table.innerBorderColor || props.config.table.innerBorderColor.includes('var(')) {
    props.config.table.innerBorderColor = '#e5e7eb'
  }
  if (force || !props.config.table.zebraStripeColor || props.config.table.zebraStripeColor.includes('var(')) {
    props.config.table.zebraStripeColor = '#f9fafb'
  }
  if (force || !props.config.table.hoverRowBackgroundColor || props.config.table.hoverRowBackgroundColor.includes('var(')) {
    props.config.table.hoverRowBackgroundColor = '#f3f4f6'
  }
  
  // 初始化布尔值和其他默认值
  if (props.config.table.outerBorder === undefined) {
    props.config.table.outerBorder = true
  }
  if (props.config.table.innerBorder === undefined) {
    props.config.table.innerBorder = true
  }
  if (!props.config.table.outerBorderWidth) {
    props.config.table.outerBorderWidth = '1px'
  }
  if (!props.config.table.innerBorderWidth) {
    props.config.table.innerBorderWidth = '1px'
  }
  if (!props.config.table.borderRadius) {
    props.config.table.borderRadius = '0.5rem'
  }
  if (!props.config.table.headerFontSize) {
    props.config.table.headerFontSize = '0.875rem'
  }
  if (!props.config.table.rowFontSize) {
    props.config.table.rowFontSize = '0.875rem'
  }
  if (force || !props.config.table.rowTextColor || props.config.table.rowTextColor.includes('var(')) {
    props.config.table.rowTextColor = '#111827'
  }

  // 初始化操作菜单配置
  if (!props.config.table.actionMenu) {
    props.config.table.actionMenu = {
      triggerSize: '2rem',
      triggerColor: '#6b7280',
      triggerHoverColor: '#111827',
      triggerHoverBg: '#f3f4f6',
      triggerActiveColor: primaryColor,
      menuBg: '#ffffff',
      menuBorder: '#e5e7eb',
      menuShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      menuRadius: '0.5rem',
      menuPadding: '0.25rem',
      itemPadding: '0.625rem 0.875rem',
      itemColor: '#111827',
      itemFontSize: '0.875rem',
      itemFontWeight: '400',
      itemHoverBg: '#f3f4f6',
      itemDangerColor: '#ef4444',
      itemDangerHoverBg: '#fef2f2',
    }
  }
  
  // 初始化操作菜单颜色
  if (force || !props.config.table.actionMenu.triggerColor || props.config.table.actionMenu.triggerColor.includes('var(')) {
    props.config.table.actionMenu.triggerColor = '#6b7280'
  }
  if (force || !props.config.table.actionMenu.triggerHoverBg || props.config.table.actionMenu.triggerHoverBg.includes('var(')) {
    props.config.table.actionMenu.triggerHoverBg = '#f3f4f6'
  }
  if (force || !props.config.table.actionMenu.menuBg || props.config.table.actionMenu.menuBg.includes('var(')) {
    props.config.table.actionMenu.menuBg = '#ffffff'
  }
  if (force || !props.config.table.actionMenu.itemHoverBg || props.config.table.actionMenu.itemHoverBg.includes('var(')) {
    props.config.table.actionMenu.itemHoverBg = '#f3f4f6'
  }
  if (!props.config.table.actionMenu.itemFontSize) {
    props.config.table.actionMenu.itemFontSize = '0.875rem'
  }
  if (!props.config.table.actionMenu.itemFontWeight) {
    props.config.table.actionMenu.itemFontWeight = '400'
  }
}

// 监听全局主色变化
watch(() => props.config.colors.primary, () => {
  // 主色变化时不需要重新初始化表格颜色，因为表格通常使用中性色
}, { immediate: true, deep: true })

// 初始化
initializeColors()

const rowHeightOptions = [
  { label: '紧凑 (2.5rem)', value: '2.5rem' },
  { label: '标准 (3rem)', value: '3rem' },
  { label: '宽松 (3.5rem)', value: '3.5rem' },
  { label: '超宽松 (4rem)', value: '4rem' },
]

const radiusOptions = [
  { label: '无圆角 (0)', value: '0' },
  { label: '小圆角 (0.25rem)', value: '0.25rem' },
  { label: '标准圆角 (0.5rem)', value: '0.5rem' },
  { label: '大圆角 (0.75rem)', value: '0.75rem' },
  { label: '超大圆角 (1rem)', value: '1rem' },
]
</script>

<template>
  <section class="grid-2">
    <!-- 左侧：设置区域 -->
    <div class="info-card settings-group">
      <!-- 表头样式 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">表头样式</h4>
            <p class="settings-section-desc">设置表格表头的外观</p>
          </div>
        </div>
        <div class="settings-section-content">
          <!-- 表头背景色 -->
          <div class="settings-field">
            <label class="settings-field-label">背景颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.headerBackgroundColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.headerBackgroundColor"
                type="text"
                class="form-input color-text"
                placeholder="#f9fafb"
              />
            </div>
          </div>

          <!-- 表头文字颜色 -->
          <div class="settings-field">
            <label class="settings-field-label">文字颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.headerTextColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.headerTextColor"
                type="text"
                class="form-input color-text"
                placeholder="#111827"
              />
            </div>
          </div>

          <!-- 表头字重 -->
          <div class="settings-field">
            <label class="settings-field-label">字体粗细</label>
            <select v-model="config.table.headerFontWeight" class="form-input input-base">
              <option value="400">常规 (400)</option>
              <option value="500">中等 (500)</option>
              <option value="600">半粗 (600)</option>
              <option value="700">粗体 (700)</option>
            </select>
          </div>

          <!-- 表头字号 -->
          <div class="settings-field">
            <label class="settings-field-label">字体大小</label>
            <select v-model="config.table.headerFontSize" class="form-input input-base">
              <option value="0.75rem">小号 (12px)</option>
              <option value="0.8125rem">较小 (13px)</option>
              <option value="0.875rem">标准 (14px)</option>
              <option value="0.9375rem">较大 (15px)</option>
              <option value="1rem">大号 (16px)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 行样式 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">行样式</h4>
            <p class="settings-section-desc">设置表格行的高度和间距</p>
          </div>
        </div>
        <div class="settings-section-content">
          <!-- 行高 -->
          <div class="settings-field">
            <label class="settings-field-label">行高</label>
            <select v-model="config.table.rowHeight" class="form-input input-base">
              <option v-for="opt in rowHeightOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>

          <!-- 水平内边距 -->
          <div class="settings-field">
            <label class="settings-field-label">水平内边距</label>
            <input
              v-model="config.table.rowPaddingX"
              type="text"
              class="form-input input-base"
              placeholder="1rem"
            />
          </div>

          <!-- 垂直内边距 -->
          <div class="settings-field">
            <label class="settings-field-label">垂直内边距</label>
            <input
              v-model="config.table.rowPaddingY"
              type="text"
              class="form-input input-base"
              placeholder="0.75rem"
            />
          </div>

          <!-- 悬停背景色 -->
          <div class="settings-field">
            <label class="settings-field-label">悬停背景色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.hoverRowBackgroundColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.hoverRowBackgroundColor"
                type="text"
                class="form-input color-text"
                placeholder="#f3f4f6"
              />
            </div>
          </div>

          <!-- 行文字颜色 -->
          <div class="settings-field">
            <label class="settings-field-label">文字颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.rowTextColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.rowTextColor"
                type="text"
                class="form-input color-text"
                placeholder="#111827"
              />
            </div>
          </div>

          <!-- 行字号 -->
          <div class="settings-field">
            <label class="settings-field-label">字体大小</label>
            <select v-model="config.table.rowFontSize" class="form-input input-base">
              <option value="0.75rem">小号 (12px)</option>
              <option value="0.8125rem">较小 (13px)</option>
              <option value="0.875rem">标准 (14px)</option>
              <option value="0.9375rem">较大 (15px)</option>
              <option value="1rem">大号 (16px)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 外围边框 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">外围边框</h4>
            <p class="settings-section-desc">设置表格最外层边框</p>
          </div>
          <label class="form-toggle-switch">
            <input
              v-model="config.table.outerBorder"
              type="checkbox"
              class="form-toggle-input"
            />
            <span class="form-toggle-slider"></span>
          </label>
        </div>
        <div v-if="config.table.outerBorder" class="settings-section-content">
          <!-- 外围边框宽度 -->
          <div class="settings-field">
            <label class="settings-field-label">边框宽度</label>
            <input
              v-model="config.table.outerBorderWidth"
              type="text"
              class="form-input input-base"
              placeholder="1px"
            />
          </div>

          <!-- 外围边框颜色 -->
          <div class="settings-field">
            <label class="settings-field-label">边框颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.outerBorderColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.outerBorderColor"
                type="text"
                class="form-input color-text"
                placeholder="#e5e7eb"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 内部单元格边框 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">内部单元格边框</h4>
            <p class="settings-section-desc">设置单元格之间的分隔线</p>
          </div>
          <label class="form-toggle-switch">
            <input
              v-model="config.table.innerBorder"
              type="checkbox"
              class="form-toggle-input"
            />
            <span class="form-toggle-slider"></span>
          </label>
        </div>
        <div v-if="config.table.innerBorder" class="settings-section-content">
          <!-- 内部边框宽度 -->
          <div class="settings-field">
            <label class="settings-field-label">边框宽度</label>
            <input
              v-model="config.table.innerBorderWidth"
              type="text"
              class="form-input input-base"
              placeholder="1px"
            />
          </div>

          <!-- 内部边框颜色 -->
          <div class="settings-field">
            <label class="settings-field-label">边框颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.innerBorderColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.innerBorderColor"
                type="text"
                class="form-input color-text"
                placeholder="#e5e7eb"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 圆角设置 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">圆角设置</h4>
            <p class="settings-section-desc">设置表格四个角的圆角大小</p>
          </div>
        </div>
        <div class="settings-section-content">
          <!-- 圆角大小 -->
          <div class="settings-field">
            <label class="settings-field-label">圆角大小</label>
            <select v-model="config.table.borderRadius" class="form-input input-base">
              <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- 斑马纹 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">斑马纹</h4>
            <p class="settings-section-desc">交替行背景色以提高可读性</p>
          </div>
          <label class="form-toggle-switch">
            <input
              v-model="config.table.zebraStripe"
              type="checkbox"
              class="form-toggle-input"
            />
            <span class="form-toggle-slider"></span>
          </label>
        </div>
        <div v-if="config.table.zebraStripe" class="settings-section-content">
          <!-- 斑马纹颜色 -->
          <div class="settings-field">
            <label class="settings-field-label">交替行颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.zebraStripeColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.zebraStripeColor"
                type="text"
                class="form-input color-text"
                placeholder="#f9fafb"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 操作菜单 -->
      <div class="settings-section-card">
        <div class="settings-section-header">
          <div>
            <h4 class="settings-section-title">操作菜单</h4>
            <p class="settings-section-desc">表格行操作按钮样式</p>
          </div>
        </div>
        <div class="settings-section-content">
          <!-- 触发按钮大小 -->
          <div class="settings-field">
            <label class="settings-field-label">按钮大小</label>
            <select v-model="config.table.actionMenu.triggerSize" class="form-input input-base">
              <option value="1.5rem">小 (24px)</option>
              <option value="2rem">标准 (32px)</option>
              <option value="2.5rem">大 (40px)</option>
            </select>
          </div>

          <!-- 触发按钮颜色 -->
          <div class="settings-field">
            <label class="settings-field-label">按钮颜色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.actionMenu.triggerColor"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.actionMenu.triggerColor"
                type="text"
                class="form-input color-text"
                placeholder="#6b7280"
              />
            </div>
          </div>

          <!-- 悬停背景色 -->
          <div class="settings-field">
            <label class="settings-field-label">悬停背景色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.actionMenu.triggerHoverBg"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.actionMenu.triggerHoverBg"
                type="text"
                class="form-input color-text"
                placeholder="#f3f4f6"
              />
            </div>
          </div>

          <!-- 菜单背景色 -->
          <div class="settings-field">
            <label class="settings-field-label">菜单背景色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.actionMenu.menuBg"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.actionMenu.menuBg"
                type="text"
                class="form-input color-text"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <!-- 菜单圆角 -->
          <div class="settings-field">
            <label class="settings-field-label">菜单圆角</label>
            <select v-model="config.table.actionMenu.menuRadius" class="form-input input-base">
              <option value="0.25rem">小 (4px)</option>
              <option value="0.5rem">标准 (8px)</option>
              <option value="0.75rem">大 (12px)</option>
            </select>
          </div>

          <!-- 菜单项悬停色 -->
          <div class="settings-field">
            <label class="settings-field-label">菜单项悬停色</label>
            <div class="form-color-row">
              <input
                v-model="config.table.actionMenu.itemHoverBg"
                type="color"
                class="color-preview"
              />
              <input
                v-model="config.table.actionMenu.itemHoverBg"
                type="text"
                class="form-input color-text"
                placeholder="#f3f4f6"
              />
            </div>
          </div>

          <!-- 菜单项字号 -->
          <div class="settings-field">
            <label class="settings-field-label">菜单项字号</label>
            <select v-model="config.table.actionMenu.itemFontSize" class="form-input input-base">
              <option value="0.75rem">小号 (12px)</option>
              <option value="0.8125rem">较小 (13px)</option>
              <option value="0.875rem">标准 (14px)</option>
              <option value="0.9375rem">较大 (15px)</option>
              <option value="1rem">大号 (16px)</option>
            </select>
          </div>

          <!-- 菜单项字重 -->
          <div class="settings-field">
            <label class="settings-field-label">菜单项字重</label>
            <select v-model="config.table.actionMenu.itemFontWeight" class="form-input input-base">
              <option value="400">常规 (400)</option>
              <option value="500">中等 (500)</option>
              <option value="600">半粗 (600)</option>
              <option value="700">粗体 (700)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：实时预览 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">实时预览</h3>
      <div class="settings-group">
        <!-- 提示框 -->
        <div class="info-card-tip">
          <span class="i-carbon-information info-card-tip-icon"></span>
          <p class="info-card-tip-text">
            提示：左侧修改的样式会实时反映在下方的表格预览中。
          </p>
        </div>

        <!-- 表格预览 -->
        <div 
          class="table-preview-wrapper"
          :style="{
            border: config.table.outerBorder ? `${config.table.outerBorderWidth} solid ${config.table.outerBorderColor}` : 'none',
            borderRadius: config.table.borderRadius,
            overflow: 'hidden',
          }"
        >
          <table class="table-preview">
            <thead>
              <tr :style="{
                backgroundColor: config.table.headerBackgroundColor,
                color: config.table.headerTextColor,
                fontWeight: config.table.headerFontWeight,
                fontSize: config.table.headerFontSize,
                height: config.table.rowHeight,
              }">
                <th :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  姓名
                </th>
                <th :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  邮箱
                </th>
                <th :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  角色
                </th>
                <th :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  状态
                </th>
                <th :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                  textAlign: 'right',
                }">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in [
                  { name: '张三', email: 'zhangsan@dong.com', role: '管理员', status: '启用' },
                  { name: '李四', email: 'lisi@dong.com', role: '教师', status: '启用' },
                  { name: '王五', email: 'wangwu@dong.com', role: '学生', status: '启用' },
                  { name: '赵六', email: 'zhaoliu@dong.com', role: '学生', status: '禁用' },
                  { name: '钱七', email: 'qianqi@dong.com', role: '教师', status: '启用' },
                ]"
                :key="index"
                class="table-preview-row"
                :style="{
                  backgroundColor: config.table.zebraStripe && index % 2 === 1 ? config.table.zebraStripeColor : 'transparent',
                  color: config.table.rowTextColor,
                  fontSize: config.table.rowFontSize,
                  height: config.table.rowHeight,
                }"
              >
                <td :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder && index < 4 ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  {{ row.name }}
                </td>
                <td :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder && index < 4 ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  {{ row.email }}
                </td>
                <td :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder && index < 4 ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  <span class="role-badge" :class="{
                    'role-admin': row.role === '管理员',
                    'role-teacher': row.role === '教师',
                    'role-student': row.role === '学生',
                  }">
                    {{ row.role }}
                  </span>
                </td>
                <td :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder && index < 4 ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                }">
                  <span class="status-badge" :class="{
                    'status-active': row.status === '启用',
                    'status-inactive': row.status === '禁用',
                  }">
                    {{ row.status }}
                  </span>
                </td>
                <td :style="{
                  paddingLeft: config.table.rowPaddingX,
                  paddingRight: config.table.rowPaddingX,
                  paddingTop: config.table.rowPaddingY,
                  paddingBottom: config.table.rowPaddingY,
                  borderBottom: config.table.innerBorder && index < 4 ? `${config.table.innerBorderWidth} solid ${config.table.innerBorderColor}` : 'none',
                  textAlign: 'right',
                }">
                  <ActionMenu :items="previewActions" placement="bottom-end" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.table-preview-wrapper {
  width: 100%;
  margin-top: 1rem;
  /* 边框和圆角通过内联样式动态设置 */
  box-sizing: border-box;
}

.table-preview {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--color-bg-primary);
  display: table;
}

.table-preview th {
  text-align: left;
  font-size: 0.875rem;
}

.table-preview td {
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.table-preview-row {
  transition: background-color 0.2s ease;
}

.table-preview-row:hover {
  background-color: v-bind('config.table.hoverRowBackgroundColor') !important;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.role-admin {
  background-color: #fef3c7;
  color: #92400e;
}

.role-teacher {
  background-color: #dbeafe;
  color: #1e40af;
}

.role-student {
  background-color: #d1fae5;
  color: #065f46;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
