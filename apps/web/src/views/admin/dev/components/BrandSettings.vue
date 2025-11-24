<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  config: any
}>()

// Tab 状态
const activeTab = ref<'admin' | 'web'>('admin')

// 外边距选项
const marginOptions = [
  { value: '0', label: '0' },
  { value: '0.25rem', label: '0.25rem' },
  { value: '0.5rem', label: '0.5rem' },
  { value: '0.75rem', label: '0.75rem' },
  { value: '1rem', label: '1rem' },
  { value: '1.5rem', label: '1.5rem' },
]

// 确保配置结构存在 (防止旧配置报错)
if (!props.config.app.admin) {
  props.config.app.admin = {
    name: props.config.app.name || 'Dong Admin',
    logoMode: 'logo',
    logoLight: props.config.app.logo || '/logo.svg',
    logoDark: props.config.app.logo || '/logo.svg',
    logoMargins: { top: '0', right: '0.75rem', bottom: '0', left: '0' },
    showTagline: false,
    showName: true
  }
}
// 补全 admin 缺失字段
if (!props.config.app.admin.logoMargins) {
    props.config.app.admin.logoMargins = { top: '0', right: '0.75rem', bottom: '0', left: '0' }
}
if (props.config.app.admin.showTagline === undefined) {
    props.config.app.admin.showTagline = false
}
if (props.config.app.admin.showName === undefined) {
    props.config.app.admin.showName = true
}

if (!props.config.app.web) {
  props.config.app.web = {
    name: 'Dong Web',
    logoMode: 'logo',
    logoLight: props.config.app.logo || '/logo.svg',
    logoDark: props.config.app.logo || '/logo.svg',
    logoMargins: { top: '0', right: '0.5rem', bottom: '0', left: '0' },
    showTagline: false,
    showName: true,
    footerLogo: {
      show: true,
      logoLight: props.config.app.logo || '/logo.svg',
      logoDark: props.config.app.logo || '/logo.svg',
      mode: 'logo',
      margins: { top: '0', right: '0.5rem', bottom: '0', left: '0' }
    }
  }
}
// 补全 web 缺失字段
if (!props.config.app.web.logoMargins) {
    props.config.app.web.logoMargins = { top: '0', right: '0.5rem', bottom: '0', left: '0' }
}
if (props.config.app.web.showTagline === undefined) {
    props.config.app.web.showTagline = false
}
if (props.config.app.web.showName === undefined) {
    props.config.app.web.showName = true
}
if (!props.config.app.web.footerLogo) {
    props.config.app.web.footerLogo = {
      show: true,
      logoLight: props.config.app.logo || '/logo.svg',
      logoDark: props.config.app.logo || '/logo.svg',
      mode: 'logo',
      margins: { top: '0', right: '0.5rem', bottom: '0', left: '0' }
    }
}


// 同步更新旧的根字段以保持兼容性（可选）
watch(() => props.config.app.admin.name, (newVal) => {
  props.config.app.name = newVal
})

// 处理文件上传并转换为 Base64
const handleFileUpload = (event: Event, type: 'light' | 'dark', target: 'main' | 'footer' = 'main') => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      
      if (target === 'footer') {
        // 处理页脚 Logo 上传
        if (type === 'light') props.config.app.web.footerLogo.logoLight = result
        else props.config.app.web.footerLogo.logoDark = result
        return
      }

      // 处理主 Logo 上传
      if (activeTab.value === 'admin') {
        if (type === 'light') props.config.app.admin.logoLight = result
        else props.config.app.admin.logoDark = result
      } else {
        if (type === 'light') props.config.app.web.logoLight = result
        else props.config.app.web.logoDark = result
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <section class="grid-2">
    <div class="info-card form-group">
      <!-- Tab 切换 -->
      <div style="display: flex; gap: 0.5rem; background: #f3f4f6; padding: 0.25rem; border-radius: 0.5rem; width: fit-content; margin-bottom: 1rem;">
        <button 
          @click="activeTab = 'admin'"
          class="tab-btn"
          :class="{ 'active': activeTab === 'admin' }"
        >
          后台管理
        </button>
        <button 
          @click="activeTab = 'web'"
          class="tab-btn"
          :class="{ 'active': activeTab === 'web' }"
        >
          前台门户
        </button>
      </div>

      <!-- 通用设置字段 (根据 activeTab 动态绑定) -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;" class="fade-in">
        <!-- Logo 显示模式 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">Logo 显示模式</label>
            <span class="stat-label">选择导航栏的 Logo 展示方式</span>
          </div>
          <div style="display: flex; gap: 1rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="radio" v-model="config.app[activeTab].logoMode" value="logo" />
              <span class="stat-label">Logo 图片</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="radio" v-model="config.app[activeTab].logoMode" value="text" />
              <span class="stat-label">仅文字标题</span>
            </label>
          </div>
        </div>

        <!-- 系统名称 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">系统名称</label>
            <span class="stat-label">显示在导航栏的系统标题</span>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
            <input type="checkbox" v-model="config.app[activeTab].showName" id="showName" />
            <label for="showName" class="stat-label" style="cursor: pointer;">在导航栏显示名称</label>
          </div>
          <input
            v-model="config.app[activeTab].name"
            type="text"
            class="form-input"
            placeholder="请输入系统名称"
          />
        </div>

        <!-- Logo 图片 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">Logo 图片</label>
            <span class="stat-label">上传浅色和深色两个版本</span>
          </div>
          
          <!-- Logo Light -->
          <div class="form-group" style="gap: 0.25rem; margin-bottom: 1rem;">
            <label class="stat-label">浅色背景用</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <div style="flex: 1;">
                <input
                  v-model="config.app[activeTab].logoLight"
                  type="text"
                  class="form-input"
                  placeholder="/logo.svg"
                  style="margin-bottom: 0.5rem;"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  class="form-input" 
                  style="padding: 0.25rem; font-size: 0.75rem;" 
                  @change="(e) => handleFileUpload(e, 'light')"
                />
              </div>
              <div style="width: 3.5rem; height: 3.5rem; border: 1px solid var(--color-border); border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; background: #fff; flex-shrink: 0;">
                <img :src="config.app[activeTab].logoLight" alt="Preview" style="max-width: 100%; max-height: 100%; padding: 4px;" />
              </div>
            </div>
          </div>

          <!-- Logo Dark -->
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">深色背景用</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <div style="flex: 1;">
                <input
                  v-model="config.app[activeTab].logoDark"
                  type="text"
                  class="form-input"
                  placeholder="/logo-dark.svg"
                  style="margin-bottom: 0.5rem;"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  class="form-input" 
                  style="padding: 0.25rem; font-size: 0.75rem;"
                  @change="(e) => handleFileUpload(e, 'dark')"
                />
              </div>
              <div style="width: 3.5rem; height: 3.5rem; border: 1px solid var(--color-border); border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; background: #1a1a1a; flex-shrink: 0;">
                <img :src="config.app[activeTab].logoDark" alt="Preview" style="max-width: 100%; max-height: 100%; padding: 4px;" />
              </div>
            </div>
          </div>
        </div>

        <!-- Logo 外边距 -->
        <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label class="form-label" style="font-weight: 600; margin: 0;">Logo 外边距</label>
            <span class="stat-label">调整 Logo 在导航栏中的位置</span>
          </div>
          <div class="grid-4" style="gap: 0.5rem;">
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label" style="font-size: 0.7rem;">上 (Top)</label>
              <select v-model="config.app[activeTab].logoMargins.top" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                <option v-for="m in marginOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label" style="font-size: 0.7rem;">右 (Right)</label>
              <select v-model="config.app[activeTab].logoMargins.right" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                <option v-for="m in marginOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label" style="font-size: 0.7rem;">下 (Bottom)</label>
              <select v-model="config.app[activeTab].logoMargins.bottom" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                <option v-for="m in marginOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
            <div class="form-group" style="gap: 0.25rem;">
              <label class="stat-label" style="font-size: 0.7rem;">左 (Left)</label>
              <select v-model="config.app[activeTab].logoMargins.left" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                <option v-for="m in marginOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 品牌标语 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">品牌标语</label>
          <span class="stat-label">显示在系统名称下方的辅助文字</span>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
          <input type="checkbox" v-model="config.app[activeTab].showTagline" id="showTagline" />
          <label for="showTagline" class="stat-label" style="cursor: pointer;">在导航栏显示标语</label>
        </div>
        <input
          v-model="config.app.tagline"
          type="text"
          class="form-input"
          placeholder="专注学习体验"
        />
      </div>

      <!-- 页脚 Logo 设置 (仅前台门户) -->
      <div v-if="activeTab === 'web'" class="form-group fade-in" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <label class="form-label" style="font-weight: 600; margin: 0;">页脚 Logo</label>
          <span class="stat-label">显示在页面底部的 Logo</span>
        </div>
        
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
          <input type="checkbox" v-model="config.app.web.footerLogo.show" id="showFooterLogo" />
          <label for="showFooterLogo" class="stat-label" style="cursor: pointer;">显示页脚 Logo</label>
        </div>

        <div v-if="config.app.web.footerLogo.show" class="fade-in" style="display: flex; flex-direction: column; gap: 1rem;">
          <!-- Footer Logo Light -->
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">浅色背景用</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <div style="flex: 1;">
                <input 
                  type="file" 
                  accept="image/*" 
                  class="form-input" 
                  style="padding: 0.25rem; font-size: 0.75rem;" 
                  @change="(e) => handleFileUpload(e, 'light', 'footer')"
                />
              </div>
              <div style="width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border); border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; background: #fff; flex-shrink: 0;">
                <img :src="config.app.web.footerLogo.logoLight" alt="Preview" style="max-width: 100%; max-height: 100%; padding: 2px;" />
              </div>
            </div>
          </div>

          <!-- Footer Logo Dark -->
          <div class="form-group" style="gap: 0.25rem;">
            <label class="stat-label">深色背景用</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <div style="flex: 1;">
                <input 
                  type="file" 
                  accept="image/*" 
                  class="form-input" 
                  style="padding: 0.25rem; font-size: 0.75rem;" 
                  @change="(e) => handleFileUpload(e, 'dark', 'footer')"
                />
              </div>
              <div style="width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border); border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; background: #1a1a1a; flex-shrink: 0;">
                <img :src="config.app.web.footerLogo.logoDark" alt="Preview" style="max-width: 100%; max-height: 100%; padding: 2px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：实时预览 -->
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">预览 ({{ activeTab === 'admin' ? '后台' : '前台' }})</h3>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        
        <!-- 浅色主题预览 -->
        <div class="preview-card">
          <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
            <span class="stat-label">浅色背景效果</span>
            <span class="stat-label" style="font-size: 0.7rem;">Bg: #FFFFFF</span>
          </div>
          <div class="preview-container" style="background: #ffffff; border: 1px solid #e5e7eb; color: #111827;">
            <div class="flex items-center" style="display: flex; align-items: center;">
              <!-- Logo Preview -->
              <div class="logo-preview-area" :style="{
                marginTop: config.app[activeTab].logoMargins.top,
                marginRight: config.app[activeTab].logoMargins.right,
                marginBottom: config.app[activeTab].logoMargins.bottom,
                marginLeft: config.app[activeTab].logoMargins.left,
              }">
                <template v-if="config.app[activeTab].logoMode === 'logo'">
                   <img :src="config.app[activeTab].logoLight" alt="logo" style="height: 2rem; object-fit: contain;" />
                </template>
                <span v-else class="nav-title" :style="{ color: 'var(--color-primary)', fontSize: '1.5rem' }">
                   <span class="i-carbon-cube"></span>
                </span>
              </div>
              
              <!-- Text Preview -->
              <div>
                <p v-if="config.app[activeTab].showName" class="scheme-name" style="font-size: 1.125rem; font-weight: bold; margin: 0;">
                  {{ config.app[activeTab].name }}
                </p>
                <!-- Tagline Preview -->
                <p v-if="config.app[activeTab].showTagline" class="stat-label" style="font-size: 0.75rem; color: inherit; opacity: 0.7; margin: 0.125rem 0 0 0;">
                  {{ config.app.tagline }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 深色主题预览 -->
        <div class="preview-card">
           <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
            <span class="stat-label">深色背景效果</span>
             <span class="stat-label" style="font-size: 0.7rem;">Bg: #1a1a1a</span>
          </div>
          <div class="preview-container" style="background: #1a1a1a; border: 1px solid #374151; color: #ffffff;">
            <div class="flex items-center" style="display: flex; align-items: center;">
              <!-- Logo Preview -->
              <div class="logo-preview-area" :style="{
                marginTop: config.app[activeTab].logoMargins.top,
                marginRight: config.app[activeTab].logoMargins.right,
                marginBottom: config.app[activeTab].logoMargins.bottom,
                marginLeft: config.app[activeTab].logoMargins.left,
              }">
                <template v-if="config.app[activeTab].logoMode === 'logo'">
                   <img :src="config.app[activeTab].logoDark" alt="logo" style="height: 2rem; object-fit: contain;" />
                </template>
                <span v-else class="nav-title" :style="{ color: '#ffffff', fontSize: '1.5rem' }">
                   <span class="i-carbon-cube"></span>
                </span>
              </div>
              
              <!-- Text Preview -->
              <div>
                <p v-if="config.app[activeTab].showName" class="scheme-name" style="font-size: 1.125rem; font-weight: bold; margin: 0;">
                  {{ config.app[activeTab].name }}
                </p>
                <!-- Tagline Preview -->
                <p v-if="config.app[activeTab].showTagline" class="stat-label" style="font-size: 0.75rem; color: inherit; opacity: 0.7; margin: 0.125rem 0 0 0;">
                  {{ config.app.tagline }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Logo Preview (Web Only) -->
        <div v-if="activeTab === 'web' && config.app.web.footerLogo.show" class="preview-card fade-in">
           <div style="margin-bottom: 0.5rem;">
            <span class="stat-label">页脚 Logo 预览 (深色)</span>
          </div>
          <div class="preview-container" style="background: #ffffff; border: 1px solid #e5e7eb; text-align: center;">
             <img :src="config.app.web.footerLogo.logoLight" alt="Footer Logo" style="height: 1.5rem; opacity: 0.5;" />
             <p class="stat-label" style="font-size: 0.7rem; margin-top: 0.5rem;">© 2023 Company</p>
          </div>
        </div>

      </div>
      
      <div style="margin-top: 1.5rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
        <p class="stat-label">
          提示：外边距设置会直接影响 Logo 在导航栏中的位置。标语仅在开启后显示在系统名称下方或旁边。
        </p>
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
}

.tab-btn.active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  font-weight: 500;
}

.preview-container {
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

