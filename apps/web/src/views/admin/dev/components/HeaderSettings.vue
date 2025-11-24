<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  config: any
}>()

const activeTab = ref<'admin' | 'web'>('admin')

// Ensure config structure exists
if (!props.config.header) {
  props.config.header = {
    height: '4rem',
    backgroundColor: '#ffffff',
    borderColor: '#211f20',
    textColor: '#111827',
    paddingX: '2rem'
  }
}
// 初始化 admin 和 web 的 header 配置
if (!props.config.header.admin) {
  props.config.header.admin = { ...props.config.header }
}
if (!props.config.header.web) {
  props.config.header.web = { ...props.config.header }
}

const heightOptions = [
  { label: '紧凑 (3rem)', value: '3rem' },
  { label: '标准 (4rem)', value: '4rem' },
  { label: '宽敞 (5rem)', value: '5rem' },
  { label: '超高 (6rem)', value: '6rem' },
]

const paddingOptions = [
  { label: '紧凑 (1rem)', value: '1rem' },
  { label: '标准 (2rem)', value: '2rem' },
  { label: '宽敞 (3rem)', value: '3rem' },
]
</script>

<template>
  <section class="grid-2">
    <div class="info-card" style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Tab 切换 -->
      <div style="display: flex; gap: 0.5rem; background: #f3f4f6; padding: 0.25rem; border-radius: 0.5rem; width: fit-content;">
        <button 
          @click="activeTab = 'admin'"
          class="tab-btn"
          :class="{ 'active': activeTab === 'admin' }"
        >
          后台
        </button>
        <button 
          @click="activeTab = 'web'"
          class="tab-btn"
          :class="{ 'active': activeTab === 'web' }"
        >
          前台
        </button>
      </div>

      <!-- Admin/Web Specific Settings -->
      <div class="fade-in" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 尺寸设置 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">尺寸设置</label>
            <span class="stat-label">头部的高度和间距</span>
          </div>
          <div class="grid-2" style="gap: 0.75rem;">
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">高度</label>
              <select v-model="config.header[activeTab].height" class="form-input">
                <option v-for="opt in heightOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">水平内边距</label>
              <select v-model="config.header[activeTab].paddingX" class="form-input">
                <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 颜色设置 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">颜色设置</label>
            <span class="stat-label">头部的背景和文字颜色</span>
          </div>
          <div class="grid-2" style="gap: 0.75rem;">
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">背景色</label>
              <div class="form-color-row">
                <input type="color" v-model="config.header[activeTab].backgroundColor" class="color-preview" />
                <input v-model="config.header[activeTab].backgroundColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">文字颜色</label>
              <div class="form-color-row">
                <input type="color" v-model="config.header[activeTab].textColor" class="color-preview" />
                <input v-model="config.header[activeTab].textColor" type="text" class="form-input color-text" />
              </div>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label">边框颜色</label>
              <div class="form-color-row">
                <input type="color" v-model="config.header[activeTab].borderColor" class="color-preview" />
                <input v-model="config.header[activeTab].borderColor" type="text" class="form-input color-text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1.5rem;">预览 ({{ activeTab === 'admin' ? '后台' : '前台' }})</h3>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- 实时预览 -->
        <div
          class="preview-header"
          :style="{
            backgroundColor: config.header[activeTab].backgroundColor,
            color: config.header[activeTab].textColor,
            height: config.header[activeTab].height,
            borderBottom: `1px solid ${config.header[activeTab].borderColor}`,
            padding: `0 ${config.header[activeTab].paddingX}`
          }"
        >
          <div style="display: flex; align-items: center; justify-content: space-between; height: 100%; width: 100%;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <!-- Admin Hamburger / Web Logo Placeholder -->
              <span v-if="activeTab === 'admin'" class="i-carbon-menu" style="font-size: 1.25rem; cursor: pointer;"></span>
              <span v-else class="i-carbon-cube" style="font-size: 1.5rem; color: var(--color-primary);"></span>
              
              <span class="nav-title" :style="{ color: config.header[activeTab].textColor, fontSize: '1.125rem', fontWeight: '600' }">
                {{ activeTab === 'admin' ? '页面标题' : '品牌名称' }}
              </span>
            </div>
            
            <div style="display: flex; gap: 1.5rem; font-size: 0.875rem; align-items: center;">
              <template v-if="activeTab === 'admin'">
                <span class="i-carbon-search" style="font-size: 1.25rem; cursor: pointer;"></span>
                <span class="i-carbon-notification" style="font-size: 1.25rem; cursor: pointer;"></span>
                <div style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <div style="width: 2rem; height: 2rem; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.875rem; font-weight: 600;">
                    A
                  </div>
                </div>
              </template>
              <template v-else>
                <span style="cursor: pointer;">首页</span>
                <span style="cursor: pointer;">关于</span>
                <span style="cursor: pointer;">服务</span>
                <span style="padding: 0.375rem 1rem; background: var(--color-primary); color: white; border-radius: 9999px; font-size: 0.875rem; cursor: pointer;">登录</span>
              </template>
            </div>
          </div>
        </div>

        <!-- 参数展示 -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div class="stat-card" style="background: #f9fafb; border: 1px solid var(--color-border); padding: 0.75rem; border-radius: 0.75rem;">
            <div class="stat-row" style="width: 100%;">
              <span class="stat-label">头部高度</span>
              <span class="stat-val" style="font-size: 1rem; color: var(--color-primary);">{{ config.header[activeTab].height }}</span>
            </div>
          </div>
          <div class="stat-card" style="background: #f9fafb; border: 1px solid var(--color-border); padding: 0.75rem; border-radius: 0.75rem;">
            <div class="stat-row" style="width: 100%;">
              <span class="stat-label">水平内边距</span>
              <span class="stat-val" style="font-size: 1rem; color: var(--color-primary);">{{ config.header[activeTab].paddingX }}</span>
            </div>
          </div>
        </div>

        <!-- 提示信息 -->
        <div style="padding: 1rem; background: color-mix(in srgb, var(--color-primary), white 95%); border: 1px solid color-mix(in srgb, var(--color-primary), white 80%); border-radius: 0.75rem; display: flex; align-items: flex-start; gap: 0.5rem;">
          <span class="i-carbon-information" :style="{ color: 'var(--color-primary)', fontSize: '1rem', flexShrink: '0', marginTop: '0.125rem' }"></span>
          <p class="stat-label" :style="{ color: 'var(--color-primary)', margin: '0' }">
            前台和后台的头部导航栏完全独立，可以分别设置不同的高度、颜色和间距。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-btn {
  flex: 1;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all 0.2s;
  min-width: 4rem;
}

.tab-btn.active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  font-weight: 500;
}

.preview-header {
  transition: all 0.3s ease;
  border-radius: 0.75rem;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
