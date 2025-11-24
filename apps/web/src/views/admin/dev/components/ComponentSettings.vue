<script setup lang="ts">
import { ref } from 'vue'
import ButtonInputSettings from './settings/ButtonInputSettings.vue'
import FormSettings from './settings/FormSettings.vue'
import CardSettings from './settings/CardSettings.vue'
import TagSettings from './settings/TagSettings.vue'
import ModalSettings from './settings/ModalSettings.vue'
import NotificationSettings from './settings/NotificationSettings.vue'

const props = defineProps<{
  config: any
}>()

const activeComponent = ref<'button' | 'input' | 'form' | 'card' | 'tag' | 'modal' | 'notification'>('button')

const components = [
  { id: 'button', name: '按钮' },
  { id: 'input', name: '输入框' },
  { id: 'form', name: '表单元素' },
  { id: 'card', name: '卡片' },
  { id: 'tag', name: '标签' },
  { id: 'modal', name: '模态窗' },
  { id: 'notification', name: '提示组件' },
]
</script>

<template>
  <section class="section-container">
    <!-- 组件内容 -->
    <div class="fade-in">
      <ButtonInputSettings v-if="activeComponent === 'button'" :config="config" active-tab="buttons" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
      <ButtonInputSettings v-else-if="activeComponent === 'input'" :config="config" active-tab="inputs" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
      <FormSettings v-else-if="activeComponent === 'form'" :config="config" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
      <CardSettings v-else-if="activeComponent === 'card'" :config="config" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
      <TagSettings v-else-if="activeComponent === 'tag'" :config="config" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
      <ModalSettings v-else-if="activeComponent === 'modal'" :config="config" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
      <NotificationSettings v-else-if="activeComponent === 'notification'" :config="config" :components="components" :active-component="activeComponent" @update:active-component="(val: any) => activeComponent = val" />
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

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
