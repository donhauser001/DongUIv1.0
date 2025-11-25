<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface ActionMenuItem {
  label: string
  icon?: string
  onClick: () => void
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

const props = defineProps<{
  items: ActionMenuItem[]
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'
}>()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleItemClick = (item: ActionMenuItem) => {
  if (item.disabled) return
  item.onClick()
  closeMenu()
}

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  if (
    menuRef.value &&
    triggerRef.value &&
    !menuRef.value.contains(event.target as Node) &&
    !triggerRef.value.contains(event.target as Node)
  ) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="action-menu-wrapper">
    <button
      ref="triggerRef"
      type="button"
      class="action-menu-trigger"
      @click.stop="toggleMenu"
      :class="{ 'active': isOpen }"
    >
      <span class="i-carbon-overflow-menu-vertical"></span>
    </button>

    <Transition name="menu-fade">
      <div
        v-if="isOpen"
        ref="menuRef"
        class="action-menu-dropdown"
        :class="`placement-${placement || 'bottom-end'}`"
        @click.stop
      >
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.divider" class="menu-divider"></div>
          <button
            v-else
            type="button"
            class="menu-item"
            :class="{
              'disabled': item.disabled,
              'danger': item.danger
            }"
            @click="handleItemClick(item)"
            :disabled="item.disabled"
          >
            <span v-if="item.icon" :class="item.icon" class="menu-item-icon"></span>
            <span class="menu-item-label">{{ item.label }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.action-menu-wrapper {
  position: relative;
  display: inline-block;
}

.action-menu-trigger {
  width: var(--action-menu-trigger-size, 2rem);
  height: var(--action-menu-trigger-size, 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--action-menu-trigger-color, var(--color-text-secondary));
  cursor: pointer;
  border-radius: var(--radius, 0.375rem);
  transition: all 0.2s ease;
}

.action-menu-trigger:hover {
  background-color: var(--action-menu-trigger-hover-bg, var(--color-bg-secondary));
  color: var(--action-menu-trigger-hover-color, var(--color-text-primary));
}

.action-menu-trigger.active {
  background-color: var(--action-menu-trigger-hover-bg, var(--color-bg-secondary));
  color: var(--action-menu-trigger-active-color, var(--color-primary));
}

.action-menu-trigger span {
  font-size: var(--font-h3-size, 1.25rem);
}

.action-menu-dropdown {
  position: absolute;
  z-index: 1000;
  min-width: 10rem;
  background-color: var(--action-menu-bg, var(--color-bg-primary));
  border: var(--border-width, 1px) solid var(--action-menu-border, var(--color-border));
  border-radius: var(--action-menu-radius, var(--radius));
  box-shadow: var(--action-menu-shadow, var(--shadow-md));
  padding: var(--action-menu-padding, var(--spacing-xs));
  margin-top: var(--spacing-xs, 0.25rem);
}

/* 位置变体 */
.action-menu-dropdown.placement-bottom-end {
  top: 100%;
  right: 0;
}

.action-menu-dropdown.placement-bottom-start {
  top: 100%;
  left: 0;
}

.action-menu-dropdown.placement-top-end {
  bottom: 100%;
  right: 0;
  margin-top: 0;
  margin-bottom: var(--spacing-xs, 0.25rem);
}

.action-menu-dropdown.placement-top-start {
  bottom: 100%;
  left: 0;
  margin-top: 0;
  margin-bottom: var(--spacing-xs, 0.25rem);
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 0.75rem);
  padding: var(--action-menu-item-padding, 0.625rem 0.875rem);
  border: none;
  background: transparent;
  color: var(--action-menu-item-color, var(--color-text-primary));
  font-size: var(--action-menu-item-font-size, var(--font-body-size));
  font-weight: var(--action-menu-item-font-weight, var(--font-weight-normal));
  text-align: left;
  cursor: pointer;
  border-radius: var(--radius, 0.375rem);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.menu-item:hover:not(.disabled) {
  background-color: var(--action-menu-item-hover-bg, var(--color-bg-secondary));
}

.menu-item.disabled {
  opacity: var(--opacity-50, 0.5);
  cursor: not-allowed;
}

.menu-item.danger {
  color: var(--action-menu-item-danger-color, var(--color-error));
}

.menu-item.danger:hover:not(.disabled) {
  background-color: var(--action-menu-item-danger-hover-bg, color-mix(in srgb, var(--color-error) 10%, white 90%));
  color: var(--action-menu-item-danger-color, color-mix(in srgb, var(--color-error) 90%, black 10%));
}

.menu-item-icon {
  font-size: var(--font-size-base, 1rem);
  flex-shrink: 0;
}

.menu-item-label {
  flex: 1;
}

.menu-divider {
  height: var(--border-width, 1px);
  background-color: var(--color-border);
  margin: var(--spacing-xs, 0.25rem) 0;
}

/* 过渡动画 */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.2s ease;
}

.menu-fade-enter-from {
  opacity: 0;
  transform: translateY(calc(-1 * var(--spacing-sm, 0.5rem)));
}

.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(calc(-1 * var(--spacing-sm, 0.5rem)));
}

.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

