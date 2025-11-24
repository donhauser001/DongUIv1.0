<script setup lang="ts">
defineProps<{
  config: any
}>()

const paddingOptions = [
  { label: '紧凑 (0.5rem)', value: '0.5rem' },
  { label: '标准 (0.75rem)', value: '0.75rem' },
  { label: '宽敞 (1rem)', value: '1rem' },
]

const radiusOptions = [
  { label: '无圆角', value: '0px' },
  { label: '小 (4px)', value: '0.25rem' },
  { label: '中 (6px)', value: '0.375rem' },
  { label: '大 (8px)', value: '0.5rem' },
  { label: '全圆角', value: '9999px' },
]
</script>

<template>
  <section class="grid-2">
    <div class="info-card" style="display: flex; flex-direction: column; gap: 1.5rem;">

      <!-- 基础样式 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">基础样式</label>
          <span class="stat-label">侧边栏的背景和边框</span>
        </div>
        <div class="grid-2" style="gap: 0.75rem;">
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">侧边栏背景色</label>
            <div class="form-color-row">
              <input type="color" v-model="config.sidebar.backgroundColor" class="color-preview" />
              <input v-model="config.sidebar.backgroundColor" type="text" class="form-input color-text" />
            </div>
          </div>
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">边框颜色</label>
            <div class="form-color-row">
              <input type="color" v-model="config.sidebar.borderColor" class="color-preview" />
              <input v-model="config.sidebar.borderColor" type="text" class="form-input color-text" />
            </div>
          </div>
        </div>
      </div>

      <!-- 菜单项样式 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">菜单项样式</label>
          <span class="stat-label">菜单项的尺寸和外观</span>
        </div>
        <div class="grid-2" style="gap: 0.75rem; margin-bottom: 0.75rem;">
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">垂直内边距</label>
            <select v-model="config.sidebar.menuItemPaddingY" class="form-input">
              <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">菜单圆角</label>
            <select v-model="config.sidebar.menuItemRadius" class="form-input">
              <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="gap: 0.25rem;">
          <label class="stat-label">默认文字颜色</label>
          <div class="form-color-row">
            <input type="color" v-model="config.sidebar.menuItemTextColor" class="color-preview" />
            <input v-model="config.sidebar.menuItemTextColor" type="text" class="form-input color-text" />
          </div>
        </div>
      </div>

      <!-- 交互状态 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">交互状态</label>
          <span class="stat-label">悬停时的颜色变化</span>
        </div>
        <div class="grid-2" style="gap: 0.75rem;">
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">悬停背景色</label>
            <div class="form-color-row">
              <input type="color" v-model="config.sidebar.menuItemHoverBackgroundColor" class="color-preview" />
              <input v-model="config.sidebar.menuItemHoverBackgroundColor" type="text" class="form-input color-text" />
            </div>
          </div>
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">悬停文字颜色</label>
            <div class="form-color-row">
              <input type="color" v-model="config.sidebar.menuItemHoverTextColor" class="color-preview" />
              <input v-model="config.sidebar.menuItemHoverTextColor" type="text" class="form-input color-text" />
            </div>
          </div>
        </div>
        <div style="margin-top: 0.75rem; padding: 0.75rem; background: color-mix(in srgb, var(--color-primary), white 95%); border: 1px solid color-mix(in srgb, var(--color-primary), white 80%); border-radius: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
          <span class="i-carbon-information" :style="{ color: 'var(--color-primary)', fontSize: '1rem', flexShrink: '0', marginTop: '0.125rem' }"></span>
          <p class="stat-label" :style="{ color: 'var(--color-primary)', fontSize: '0.8125rem', margin: '0' }">
            激活状态的颜色默认跟随主色 (Primary Color) 自动调整。
          </p>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1.5rem;">侧边栏预览</h3>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 实时预览 -->
        <div 
          class="sidebar-preview"
          :style="{
            backgroundColor: config.sidebar.backgroundColor,
            borderColor: config.sidebar.borderColor,
            padding: '1rem',
            borderRadius: '0.75rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }"
        >
          <!-- 普通菜单项 -->
          <div 
            class="preview-menu-item"
            :style="{
              padding: `${config.sidebar.menuItemPaddingY} 1rem`,
              borderRadius: config.sidebar.menuItemRadius,
              color: config.sidebar.menuItemTextColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }"
          >
            <span class="i-carbon-home" style="font-size: 1.125rem;"></span>
            <span style="font-size: 0.875rem;">首页</span>
          </div>

          <!-- 悬停菜单项 (模拟) -->
          <div 
            class="preview-menu-item"
            :style="{
              padding: `${config.sidebar.menuItemPaddingY} 1rem`,
              borderRadius: config.sidebar.menuItemRadius,
              backgroundColor: config.sidebar.menuItemHoverBackgroundColor,
              color: config.sidebar.menuItemHoverTextColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }"
          >
            <span class="i-carbon-dashboard" style="font-size: 1.125rem;"></span>
            <span style="font-size: 0.875rem;">数据看板 (悬停)</span>
          </div>

          <!-- 激活菜单项 -->
          <div 
            class="preview-menu-item"
            :style="{
              padding: `${config.sidebar.menuItemPaddingY} 1rem`,
              borderRadius: config.sidebar.menuItemRadius,
              backgroundColor: `color-mix(in srgb, var(--color-primary), white 90%)`,
              color: `var(--color-primary)`,
              border: `1px solid color-mix(in srgb, var(--color-primary), white 80%)`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: '500'
            }"
          >
            <span class="i-carbon-settings" style="font-size: 1.125rem;"></span>
            <span style="font-size: 0.875rem;">系统设置 (激活)</span>
          </div>

          <!-- 分组标题 -->
          <div style="padding: 0.5rem 1rem; margin-top: 0.5rem;">
            <span class="stat-label" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">
              内容管理
            </span>
          </div>

          <!-- 普通菜单项 -->
          <div 
            class="preview-menu-item"
            :style="{
              padding: `${config.sidebar.menuItemPaddingY} 1rem`,
              borderRadius: config.sidebar.menuItemRadius,
              color: config.sidebar.menuItemTextColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }"
          >
            <span class="i-carbon-document" style="font-size: 1.125rem;"></span>
            <span style="font-size: 0.875rem;">文章列表</span>
          </div>

          <div 
            class="preview-menu-item"
            :style="{
              padding: `${config.sidebar.menuItemPaddingY} 1rem`,
              borderRadius: config.sidebar.menuItemRadius,
              color: config.sidebar.menuItemTextColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }"
          >
            <span class="i-carbon-user" style="font-size: 1.125rem;"></span>
            <span style="font-size: 0.875rem;">用户管理</span>
          </div>
        </div>

        <!-- 状态说明 -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; background: #f9fafb; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <p class="stat-label" style="font-weight: 600; margin-bottom: 0.25rem;">状态说明</p>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1rem; height: 1rem; background: transparent; border: 1px solid var(--color-border); border-radius: 0.25rem;"></div>
            <span class="stat-label" style="font-size: 0.8125rem;">默认状态 - 使用默认文字颜色</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div :style="{ width: '1rem', height: '1rem', background: config.sidebar.menuItemHoverBackgroundColor, border: '1px solid var(--color-border)', borderRadius: '0.25rem' }"></div>
            <span class="stat-label" style="font-size: 0.8125rem;">悬停状态 - 鼠标移入时的效果</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1rem; height: 1rem; background: color-mix(in srgb, var(--color-primary), white 90%); border: 1px solid var(--color-primary); border-radius: 0.25rem;"></div>
            <span class="stat-label" style="font-size: 0.8125rem;">激活状态 - 当前选中的菜单项</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
