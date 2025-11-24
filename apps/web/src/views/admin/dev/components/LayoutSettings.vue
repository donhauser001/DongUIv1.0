<script setup lang="ts">
defineProps<{
  config: any
}>()

const widthOptions = [
  { label: '窄 (14rem)', value: '14rem' },
  { label: '标准 (16rem)', value: '16rem' },
  { label: '宽 (18rem)', value: '18rem' },
  { label: '超宽 (20rem)', value: '20rem' },
]

const collapsedWidthOptions = [
  { label: '极窄 (3rem)', value: '3rem' },
  { label: '标准 (4rem)', value: '4rem' },
  { label: '宽 (5rem)', value: '5rem' },
]

const heightOptions = [
  { label: '紧凑 (3rem)', value: '3rem' },
  { label: '标准 (4rem)', value: '4rem' },
  { label: '宽敞 (5rem)', value: '5rem' },
]

const paddingOptions = [
  { label: '紧凑 (1rem)', value: '1rem' },
  { label: '舒适 (1.5rem)', value: '1.5rem' },
  { label: '宽敞 (2rem)', value: '2rem' },
]
</script>

<template>
  <section class="grid-2">
    <div class="info-card" style="display: flex; flex-direction: column; gap: 1.5rem;">

      <!-- 侧边栏设置 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">侧边栏宽度</label>
          <span class="stat-label">控制导航栏的宽度</span>
        </div>
        <div class="grid-2" style="gap: 0.75rem;">
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">展开宽度</label>
            <select v-model="config.layout.sidebarWidth" class="form-input">
              <option v-for="opt in widthOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">收起宽度</label>
            <select v-model="config.layout.sidebarCollapsedWidth" class="form-input">
              <option v-for="opt in collapsedWidthOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 头部设置 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">头部高度</label>
          <span class="stat-label">顶部导航栏的高度</span>
        </div>
        <div class="form-group" style="gap: 0.25rem;">
          <label class="stat-label">高度</label>
          <select v-model="config.layout.headerHeight" class="form-input">
            <option v-for="opt in heightOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>

      <!-- 内容区域设置 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">内容内边距</label>
          <span class="stat-label">主内容区域的内边距</span>
        </div>
        <div class="form-group" style="gap: 0.25rem;">
          <label class="stat-label">内边距</label>
          <select v-model="config.layout.contentPadding" class="form-input">
            <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1.5rem;">布局参数预览</h3>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 参数卡片 -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="stat-card" style="background: #f9fafb; border: 1px solid var(--color-border); padding: 1rem; border-radius: 0.75rem;">
            <div class="stat-row" style="width: 100%;">
              <span class="stat-label">侧边栏宽度（展开）</span>
              <span class="stat-val" style="font-size: 1.125rem; color: var(--color-primary);">{{ config.layout.sidebarWidth }}</span>
            </div>
          </div>

          <div class="stat-card" style="background: #f9fafb; border: 1px solid var(--color-border); padding: 1rem; border-radius: 0.75rem;">
            <div class="stat-row" style="width: 100%;">
              <span class="stat-label">侧边栏宽度（收起）</span>
              <span class="stat-val" style="font-size: 1.125rem; color: var(--color-primary);">{{ config.layout.sidebarCollapsedWidth }}</span>
            </div>
          </div>

          <div class="stat-card" style="background: #f9fafb; border: 1px solid var(--color-border); padding: 1rem; border-radius: 0.75rem;">
            <div class="stat-row" style="width: 100%;">
              <span class="stat-label">头部高度</span>
              <span class="stat-val" style="font-size: 1.125rem; color: var(--color-primary);">{{ config.layout.headerHeight }}</span>
            </div>
          </div>

          <div class="stat-card" style="background: #f9fafb; border: 1px solid var(--color-border); padding: 1rem; border-radius: 0.75rem;">
            <div class="stat-row" style="width: 100%;">
              <span class="stat-label">内容内边距</span>
              <span class="stat-val" style="font-size: 1.125rem; color: var(--color-primary);">{{ config.layout.contentPadding }}</span>
            </div>
          </div>
        </div>

        <!-- 布局示意图 -->
        <div style="background: #f9fafb; border: 1px solid var(--color-border); padding: 1.5rem; border-radius: 0.75rem;">
          <p class="stat-label" style="margin-bottom: 1rem; font-weight: 600;">布局结构示意</p>
          <div style="border: 2px solid var(--color-primary); border-radius: 0.5rem; overflow: hidden;">
            <!-- 头部 -->
            <div style="background: color-mix(in srgb, var(--color-primary), white 90%); padding: 0.5rem; text-align: center; border-bottom: 2px solid var(--color-primary);">
              <span class="stat-label" style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600;">
                Header ({{ config.layout.headerHeight }})
              </span>
            </div>
            <!-- 主体 -->
            <div style="display: flex;">
              <!-- 侧边栏 -->
              <div style="background: color-mix(in srgb, var(--color-primary), white 85%); padding: 1rem 0.5rem; border-right: 2px solid var(--color-primary); min-height: 8rem; display: flex; align-items: center; justify-content: center;">
                <span class="stat-label" style="font-size: 0.7rem; color: var(--color-primary); font-weight: 600; writing-mode: vertical-rl; text-orientation: mixed;">
                  Sidebar
                </span>
              </div>
              <!-- 内容区 -->
              <div style="flex: 1; padding: 1rem; background: white;">
                <div style="border: 1px dashed var(--color-border); padding: 1rem; border-radius: 0.375rem; min-height: 6rem; display: flex; align-items: center; justify-content: center;">
                  <span class="stat-label" style="font-size: 0.75rem;">
                    Content Area (Padding: {{ config.layout.contentPadding }})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 提示信息 -->
        <div style="padding: 1rem; background: color-mix(in srgb, var(--color-primary), white 95%); border: 1px solid color-mix(in srgb, var(--color-primary), white 80%); border-radius: 0.75rem; display: flex; align-items: flex-start; gap: 0.5rem;">
          <span class="i-carbon-information" :style="{ color: 'var(--color-primary)', fontSize: '1rem', flexShrink: '0', marginTop: '0.125rem' }"></span>
          <p class="stat-label" :style="{ color: 'var(--color-primary)', margin: '0' }">
            这些设置定义了全局的基础布局参数。前台和后台的特定布局模式（全宽/盒式）会在这些基础参数之上应用。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
