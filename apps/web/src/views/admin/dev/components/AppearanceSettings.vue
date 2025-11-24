<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  config: any
}>()

const activeTab = ref<'global' | 'admin' | 'web'>('global')

// Initialize defaults if missing
if (!props.config.layout.admin) {
  props.config.layout.admin = { mode: 'full', width: '100%', padding: '1.5rem' }
}
if (!props.config.layout.web) {
  props.config.layout.web = { mode: 'boxed', width: '1200px', padding: '2rem' }
}
if (!props.config.style.dividerStyle) {
  props.config.style.dividerStyle = 'solid'
}

const paddingOptions = [
  { label: '紧凑 (1rem)', value: '1rem' },
  { label: '默认 (1.5rem)', value: '1.5rem' },
  { label: '宽敞 (2rem)', value: '2rem' },
  { label: '超宽 (3rem)', value: '3rem' },
]

const widthOptions = [
  { label: '1024px', value: '1024px' },
  { label: '1200px', value: '1200px' },
  { label: '1280px', value: '1280px' },
  { label: '1440px', value: '1440px' },
  { label: '100% (全宽)', value: '100%' },
]

const radiusOptions = [
  { label: '无圆角', value: '0px' },
  { label: '极小 (2px)', value: '0.125rem' },
  { label: '小 (4px)', value: '0.25rem' },
  { label: '中 (6px)', value: '0.375rem' },
  { label: '大 (8px)', value: '0.5rem' },
  { label: '加大 (12px)', value: '0.75rem' },
  { label: '极大 (16px)', value: '1rem' },
  { label: '全圆角', value: '9999px' },
]
</script>

<template>
  <section class="grid-2">
    <div class="info-card form-group">
      <!-- Tab Navigation -->
      <div class="tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'global' }"
          @click="activeTab = 'global'"
        >
          全局设置
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'admin' }"
          @click="activeTab = 'admin'"
        >
          后台布局
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'web' }"
          @click="activeTab = 'web'"
        >
          前台布局
        </button>
      </div>

      <!-- Global Settings -->
      <div v-if="activeTab === 'global'" class="fade-in settings-group">
        <div class="form-group">
          <label class="form-label">全局圆角 (Radius)</label>
          <select v-model="config.style.radius" class="form-input">
            <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">边框粗细 (Border Width)</label>
          <select v-model="config.style.borderWidth" class="form-input">
            <option value="0px">无边框</option>
            <option value="1px">细边 (1px)</option>
            <option value="2px">强调 (2px)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">分割线样式 (Divider Style)</label>
          <select v-model="config.style.dividerStyle" class="form-input">
            <option value="solid">实线 (Solid)</option>
            <option value="dashed">虚线 (Dashed)</option>
            <option value="dotted">点线 (Dotted)</option>
          </select>
        </div>
        <div class="form-group">
            <label class="form-label">卡片阴影 (Card Shadow)</label>
            <select v-model="config.card.shadow" class="form-input">
              <option value="none">无阴影</option>
              <option value="0 1px 2px 0 rgba(0, 0, 0, 0.05)">极细</option>
              <option value="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)">细腻</option>
              <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">中等</option>
              <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)">强烈</option>
            </select>
          </div>
      </div>

      <!-- Admin Layout Settings -->
      <div v-if="activeTab === 'admin'" class="fade-in settings-group">
        <div class="form-group">
          <label class="form-label">布局模式 (Layout Mode)</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="config.layout.admin.mode" value="full">
              全宽 (Full Width)
            </label>
            <label class="radio-label">
              <input type="radio" v-model="config.layout.admin.mode" value="boxed">
              盒式 (Boxed)
            </label>
          </div>
        </div>
        
        <div v-if="config.layout.admin.mode === 'boxed'" class="form-group">
           <label class="form-label">内容最大宽度 (Max Width)</label>
           <select v-model="config.layout.admin.width" class="form-input">
             <option v-for="opt in widthOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
           </select>
        </div>

        <div class="form-group">
          <label class="form-label">页面内边距 (Page Padding)</label>
          <select v-model="config.layout.admin.padding" class="form-input">
             <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>

      <!-- Web Layout Settings -->
      <div v-if="activeTab === 'web'" class="fade-in settings-group">
        <div class="form-group">
          <label class="form-label">布局模式 (Layout Mode)</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="config.layout.web.mode" value="full">
              全宽 (Full Width)
            </label>
            <label class="radio-label">
              <input type="radio" v-model="config.layout.web.mode" value="boxed">
              盒式 (Boxed)
            </label>
          </div>
        </div>

        <div v-if="config.layout.web.mode === 'boxed'" class="form-group">
           <label class="form-label">内容最大宽度 (Max Width)</label>
           <select v-model="config.layout.web.width" class="form-input">
             <option v-for="opt in widthOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
           </select>
        </div>

        <div class="form-group">
          <label class="form-label">页面内边距 (Page Padding)</label>
           <select v-model="config.layout.web.padding" class="form-input">
             <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>

    </div>

    <!-- Preview Section -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">布局预览 ({{ activeTab === 'web' ? '前台' : (activeTab === 'admin' ? '后台' : '通用') }})</h3>
      
      <div class="preview-container" style="background: #f3f4f6; border: 1px solid #e5e7eb; padding: 1rem; height: 300px; display: flex; flex-direction: column;">
        
        <!-- Header Simulation -->
        <div style="height: 2rem; background: #fff; border-bottom: 1px solid #e5e7eb; margin-bottom: 1rem; display: flex; align-items: center; padding: 0 1rem;">
            <div style="width: 1rem; height: 1rem; background: var(--color-primary); border-radius: 50%;"></div>
            <div style="flex: 1; margin-left: 1rem; height: 0.5rem; background: #e5e7eb; border-radius: 4px;"></div>
        </div>

        <!-- Content Layout Simulation -->
        <div :style="{
            flex: 1,
            padding: activeTab === 'web' ? config.layout.web.padding : (activeTab === 'admin' ? config.layout.admin.padding : '1.5rem'),
            display: 'flex',
            justifyContent: 'center',
            background: '#f9fafb',
            overflow: 'hidden',
            transition: 'all 0.3s'
        }">
            <!-- The Content Box -->
            <div :style="{
                width: activeTab === 'web' 
                    ? (config.layout.web.mode === 'boxed' ? '80%' : '100%') 
                    : (activeTab === 'admin' ? (config.layout.admin.mode === 'boxed' ? '80%' : '100%') : '100%'),
                height: '100%',
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: config.style.radius,
                boxShadow: config.card.shadow,
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                transition: 'all 0.3s'
            }">
                 <h4 class="stat-label" style="margin-bottom: 0.5rem; font-weight: bold;">内容区域</h4>
                 <hr :style="{ margin: '0.5rem 0', border: 'none', borderTop: config.style.borderWidth + ' ' + config.style.dividerStyle + ' var(--color-border)' }"/>
                 <div style="flex: 1; background: #f3f4f6; border-radius: 0.25rem;"></div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 0.5rem;">
            <span class="stat-label">当前模式: {{ 
                activeTab === 'web' 
                ? (config.layout.web.mode === 'boxed' ? '盒式布局' : '全宽布局')
                : (activeTab === 'admin' 
                    ? (config.layout.admin.mode === 'boxed' ? '盒式布局' : '全宽布局') 
                    : '通用样式')
            }}</span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}
.tab-btn {
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all 0.2s;
}
.tab-btn:hover {
  color: var(--color-primary);
  background: var(--color-bg-secondary);
}
.tab-btn.active {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary), white 90%);
  border-color: color-mix(in srgb, var(--color-primary), white 80%);
  font-weight: 600;
}
.radio-group {
  display: flex;
  gap: 1rem;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
