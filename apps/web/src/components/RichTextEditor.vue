<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  minHeight?: string
  maxHeight?: string
  toolbar?: ToolbarButton[]
  showToolbar?: boolean
  uploadImage?: (file: File) => Promise<string>
  maxImageSize?: number // MB
}

interface ToolbarButton {
  command: string
  icon: string
  title: string
  tooltip?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '请输入内容...',
  disabled: false,
  minHeight: '12rem',
  maxHeight: '40rem',
  showToolbar: true,
  maxImageSize: 5, // 默认 5MB
  toolbar: () => [
    // 第一行：文本格式
    { command: 'bold', icon: 'i-carbon-text-bold', title: '粗体', tooltip: '粗体 (Ctrl+B)' },
    { command: 'italic', icon: 'i-carbon-text-italic', title: '斜体', tooltip: '斜体 (Ctrl+I)' },
    { command: 'underline', icon: 'i-carbon-text-underline', title: '下划线', tooltip: '下划线 (Ctrl+U)' },
    { command: 'strikeThrough', icon: 'i-carbon-text-strikethrough', title: '删除线', tooltip: '删除线' },
    { command: 'separator', icon: '', title: '' },
    
    // 段落格式（使用下拉菜单的方式，用不同的图标）
    { command: 'formatBlock', icon: '', title: 'H1', tooltip: '一级标题', value: 'h1' },
    { command: 'formatBlock', icon: '', title: 'H2', tooltip: '二级标题', value: 'h2' },
    { command: 'formatBlock', icon: '', title: 'H3', tooltip: '三级标题', value: 'h3' },
    { command: 'formatBlock', icon: '', title: '正文', tooltip: '正文段落', value: 'p' },
    { command: 'separator', icon: '', title: '' },
    
    // 字体大小
    { command: 'fontSize', icon: '', title: '小号', tooltip: '小字号', value: '3' },
    { command: 'fontSize', icon: '', title: '标准', tooltip: '标准字号', value: '4' },
    { command: 'fontSize', icon: '', title: '大号', tooltip: '大字号', value: '5' },
    { command: 'separator', icon: '', title: '' },
    
    // 列表
    { command: 'insertUnorderedList', icon: 'i-carbon-list', title: '列表', tooltip: '无序列表' },
    { command: 'insertOrderedList', icon: 'i-carbon-list-numbered', title: '编号', tooltip: '有序列表' },
    { command: 'indent', icon: 'i-carbon-text-indent-more', title: '缩进', tooltip: '增加缩进' },
    { command: 'outdent', icon: 'i-carbon-text-indent-less', title: '减少', tooltip: '减少缩进' },
    { command: 'separator', icon: '', title: '' },
    
    // 对齐
    { command: 'justifyLeft', icon: 'i-carbon-align-horizontal-left', title: '左齐', tooltip: '左对齐' },
    { command: 'justifyCenter', icon: 'i-carbon-align-horizontal-center', title: '居中', tooltip: '居中对齐' },
    { command: 'justifyRight', icon: 'i-carbon-align-horizontal-right', title: '右齐', tooltip: '右对齐' },
    { command: 'separator', icon: '', title: '' },
    
    // 行距
    { command: 'lineHeight', icon: '', title: '紧凑', tooltip: '单倍行距', value: '1' },
    { command: 'lineHeight', icon: '', title: '标准', tooltip: '1.5倍行距', value: '1.5' },
    { command: 'lineHeight', icon: '', title: '宽松', tooltip: '双倍行距', value: '2' },
    { command: 'separator', icon: '', title: '' },
    
    // 颜色
    { command: 'foreColor', icon: '', title: 'A', tooltip: '文字颜色' },
    { command: 'hiliteColor', icon: '', title: '背', tooltip: '背景高亮' },
    { command: 'separator', icon: '', title: '' },
    
    // 插入
    { command: 'createLink', icon: 'i-carbon-link', title: '链接', tooltip: '插入链接' },
    { command: 'insertImage', icon: 'i-carbon-image', title: '图片', tooltip: '上传图片' },
    { command: 'insertHorizontalRule', icon: '', title: '—', tooltip: '插入分隔线' },
    { command: 'separator', icon: '', title: '' },
    
    // 其他
    { command: 'removeFormat', icon: 'i-carbon-clean', title: '清除', tooltip: '清除格式' },
    { command: 'undo', icon: 'i-carbon-undo', title: '撤销', tooltip: '撤销 (Ctrl+Z)' },
    { command: 'redo', icon: 'i-carbon-redo', title: '重做', tooltip: '重做 (Ctrl+Y)' },
  ]
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': []
  'blur': []
  'change': [value: string]
}>()

const editorRef = ref<HTMLDivElement | null>(null)
const imageInputRef = ref<HTMLInputElement | null>(null)
const textColorInputRef = ref<HTMLInputElement | null>(null)
const bgColorInputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const internalValue = ref(props.modelValue)
const isUploading = ref(false)
let savedSelection: Range | null = null

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value && editorRef.value) {
    internalValue.value = newValue
    editorRef.value.innerHTML = newValue
  }
})

// 初始化编辑器内容
onMounted(() => {
  if (editorRef.value && props.modelValue) {
    editorRef.value.innerHTML = props.modelValue
  }
  
  // 监听编辑器内的图片点击事件，使图片可调整大小
  if (editorRef.value) {
    editorRef.value.addEventListener('click', handleImageClick)
  }
})

// 处理图片点击，使其可调整大小
const handleImageClick = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'IMG') {
    e.stopPropagation()
    
    // 移除其他图片的选中状态
    const allImages = editorRef.value?.querySelectorAll('img')
    allImages?.forEach(img => {
      img.classList.remove('selected-image')
    })
    
    // 选中当前图片
    target.classList.add('selected-image')
    
    // 创建调整大小的控制点
    addResizeHandles(target as HTMLImageElement)
  } else {
    // 点击其他地方，取消图片选中
    const allImages = editorRef.value?.querySelectorAll('img')
    allImages?.forEach(img => {
      img.classList.remove('selected-image')
    })
    removeResizeHandles()
  }
}

// 添加调整大小的控制点
const addResizeHandles = (img: HTMLImageElement) => {
  // 移除已存在的控制点
  removeResizeHandles()
  
  // 创建包装器
  const wrapper = document.createElement('div')
  wrapper.className = 'image-resize-wrapper'
  wrapper.style.position = 'relative'
  wrapper.style.display = 'inline-block'
  wrapper.style.maxWidth = '100%'
  
  // 包装图片
  img.parentNode?.insertBefore(wrapper, img)
  wrapper.appendChild(img)
  
  // 创建右下角调整手柄
  const handle = document.createElement('div')
  handle.className = 'resize-handle'
  handle.style.position = 'absolute'
  handle.style.bottom = '0'
  handle.style.right = '0'
  handle.style.width = '12px'
  handle.style.height = '12px'
  handle.style.background = 'var(--color-primary)'
  handle.style.cursor = 'nwse-resize'
  handle.style.borderRadius = '2px'
  handle.style.zIndex = '10'
  wrapper.appendChild(handle)
  
  // 添加拖拽调整功能
  let startX = 0
  let startY = 0
  let startWidth = 0
  let startHeight = 0
  
  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    startX = e.clientX
    startY = e.clientY
    startWidth = img.offsetWidth
    startHeight = img.offsetHeight
    
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  
  const onMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX
    let newWidth = startWidth + deltaX
    
    // 限制最小和最大宽度
    newWidth = Math.max(100, Math.min(newWidth, editorRef.value?.offsetWidth || 800))
    
    img.style.width = `${newWidth}px`
    img.style.height = 'auto'
  }
  
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    
    // 触发内容变化
    handleInput()
  }
  
  handle.addEventListener('mousedown', onMouseDown)
}

// 移除调整大小的控制点
const removeResizeHandles = () => {
  const wrappers = editorRef.value?.querySelectorAll('.image-resize-wrapper')
  wrappers?.forEach(wrapper => {
    const img = wrapper.querySelector('img')
    if (img) {
      wrapper.parentNode?.insertBefore(img, wrapper)
      wrapper.remove()
    }
  })
}

// 执行编辑命令
const executeCommand = (command: string, value?: string) => {
  if (props.disabled) return

  // 特殊命令处理
  if (command === 'createLink') {
    const url = prompt('请输入链接地址:', 'https://')
    if (url) {
      document.execCommand(command, false, url)
    }
    return
  }

  if (command === 'insertImage') {
    // 触发文件选择
    imageInputRef.value?.click()
    return
  }

  // 行距命令（自定义实现）
  if (command === 'lineHeight') {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      let element = range.commonAncestorContainer as HTMLElement
      
      // 找到最近的块级元素
      while (element && element !== editorRef.value) {
        if (element.nodeType === 1 && ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(element.nodeName)) {
          (element as HTMLElement).style.lineHeight = value || '1.6'
          break
        }
        element = element.parentElement as HTMLElement
      }
    }
    editorRef.value?.focus()
    return
  }

  // 文字颜色
  if (command === 'foreColor') {
    saveSelection()
    textColorInputRef.value?.click()
    return
  }

  // 背景颜色
  if (command === 'hiliteColor' || command === 'backColor') {
    saveSelection()
    bgColorInputRef.value?.click()
    return
  }

  // 清除格式命令需要特殊处理
  if (command === 'removeFormat') {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      // 先尝试标准命令
      document.execCommand('removeFormat', false, undefined)
      // 再尝试清除内联样式
      document.execCommand('unlink', false, undefined)
      // 清除字体颜色
      document.execCommand('foreColor', false, 'inherit')
      document.execCommand('backColor', false, 'transparent')
    }
    editorRef.value?.focus()
    return
  }

  // 标准命令
  try {
    document.execCommand(command, false, value)
  } catch (error) {
    console.warn(`命令执行失败: ${command}`, error)
  }
  editorRef.value?.focus()
}

// 处理图片上传
const handleImageSelect = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    input.value = ''
    return
  }

  // 验证文件大小
  const maxSize = props.maxImageSize * 1024 * 1024 // 转换为字节
  if (file.size > maxSize) {
    alert(`图片大小不能超过 ${props.maxImageSize}MB`)
    input.value = ''
    return
  }

  isUploading.value = true

  try {
    let imageUrl: string

    // 如果提供了上传函数，使用自定义上传
    if (props.uploadImage) {
      imageUrl = await props.uploadImage(file)
    } else {
      // 否则转换为 Base64
      imageUrl = await fileToBase64(file)
    }

    // 插入图片
    document.execCommand('insertImage', false, imageUrl)
    
    // 等待图片插入到 DOM
    setTimeout(() => {
      // 找到刚插入的图片并设置为可调整大小
      const images = editorRef.value?.querySelectorAll('img')
      if (images && images.length > 0) {
        const lastImage = images[images.length - 1] as HTMLImageElement
        // 设置图片可调整大小
        lastImage.style.maxWidth = '100%'
        lastImage.style.height = 'auto'
        lastImage.style.cursor = 'pointer'
        lastImage.classList.add('resizable-image')
      }
    }, 100)
    
    editorRef.value?.focus()
  } catch (error) {
    console.error('图片上传失败:', error)
    alert('图片上传失败，请重试')
  } finally {
    isUploading.value = false
    input.value = '' // 清空 input，允许重复选择同一文件
  }
}

// 将文件转换为 Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 保存当前选区
const saveSelection = () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0)
  }
}

// 恢复选区
const restoreSelection = () => {
  if (savedSelection) {
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(savedSelection)
    }
  }
}

// 处理文字颜色选择
const handleTextColorChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const color = input.value
  
  restoreSelection()
  document.execCommand('foreColor', false, color)
  editorRef.value?.focus()
  savedSelection = null
}

// 处理背景颜色选择
const handleBgColorChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const color = input.value
  
  restoreSelection()
  // 不同浏览器支持不同的命令
  try {
    document.execCommand('hiliteColor', false, color)
  } catch {
    document.execCommand('backColor', false, color)
  }
  editorRef.value?.focus()
  savedSelection = null
}

// 处理输入事件
const handleInput = () => {
  if (!editorRef.value) return
  
  const content = editorRef.value.innerHTML
  internalValue.value = content
  emit('update:modelValue', content)
  emit('change', content)
}

// 处理粘贴事件（清理格式）
const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

// 聚焦事件
const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

// 失焦事件
const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

// 计算编辑器样式
const editorStyle = computed(() => ({
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
}))

// 清空内容
const clear = () => {
  if (editorRef.value) {
    editorRef.value.innerHTML = ''
    handleInput()
  }
}

// 获取纯文本内容
const getTextContent = () => {
  return editorRef.value?.textContent || ''
}

// 设置内容
const setContent = (html: string) => {
  if (editorRef.value) {
    editorRef.value.innerHTML = html
    handleInput()
  }
}

// 暴露方法给父组件
defineExpose({
  clear,
  getTextContent,
  setContent,
  focus: () => editorRef.value?.focus(),
  blur: () => editorRef.value?.blur(),
})
</script>

<template>
  <div 
    class="richtext-editor-wrapper"
    :class="{ 
      'is-focused': isFocused, 
      'is-disabled': disabled 
    }"
  >
    <!-- 工具栏 -->
    <div v-if="showToolbar" class="richtext-toolbar">
      <template v-for="(btn, index) in toolbar" :key="index">
        <div v-if="btn.command === 'separator'" class="toolbar-separator"></div>
        <button
          v-else
          type="button"
          class="toolbar-button"
          :class="{ 'is-loading': isUploading && btn.command === 'insertImage' }"
          :title="btn.tooltip || btn.title"
          :disabled="disabled || (isUploading && btn.command === 'insertImage')"
          @click.prevent="executeCommand(btn.command, btn.value)"
        >
          <span v-if="isUploading && btn.command === 'insertImage'" class="toolbar-button-text">上传中...</span>
          <template v-else>
            <span v-if="btn.icon" :class="btn.icon" class="toolbar-icon"></span>
            <span v-if="!btn.icon" class="toolbar-button-text">{{ btn.title }}</span>
          </template>
        </button>
      </template>
    </div>

    <!-- 隐藏的图片上传输入框 -->
    <input
      ref="imageInputRef"
      type="file"
      accept="image/*"
      style="display: none;"
      @change="handleImageSelect"
    />

    <!-- 隐藏的文字颜色选择器 -->
    <input
      ref="textColorInputRef"
      type="color"
      style="position: absolute; opacity: 0; pointer-events: none;"
      @change="handleTextColorChange"
    />

    <!-- 隐藏的背景颜色选择器 -->
    <input
      ref="bgColorInputRef"
      type="color"
      value="#ffff00"
      style="position: absolute; opacity: 0; pointer-events: none;"
      @change="handleBgColorChange"
    />

    <!-- 编辑区域 -->
    <div
      ref="editorRef"
      class="richtext-editor"
      :style="editorStyle"
      :contenteditable="!disabled"
      :data-placeholder="placeholder"
      @input="handleInput"
      @paste="handlePaste"
      @focus="handleFocus"
      @blur="handleBlur"
    ></div>
  </div>
</template>

<style scoped>
.richtext-editor-wrapper {
  display: flex;
  flex-direction: column;
  border: var(--richtext-border-width, 1px) solid var(--richtext-border-color, var(--input-border-color));
  border-radius: var(--richtext-radius, var(--input-radius));
  background-color: var(--richtext-bg-color, var(--input-bg-color));
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.richtext-editor-wrapper.is-focused {
  border-color: var(--richtext-focus-border-color, var(--input-focus-border-color));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--richtext-focus-ring-color, var(--input-focus-ring-color)), transparent 80%);
}

.richtext-editor-wrapper.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--input-disabled-bg-color);
}

.richtext-toolbar {
  display: flex;
  gap: var(--spacing-xs, 0.25rem);
  padding: var(--spacing-sm, 0.5rem);
  background-color: var(--richtext-toolbar-bg-color, var(--color-gray-50));
  border-bottom: var(--border-width, 1px) solid var(--richtext-toolbar-border-color, var(--color-gray-200));
  align-items: center;
  flex-wrap: wrap;
}

.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--spacing-xl, 2rem);
  height: var(--spacing-xl, 2rem);
  padding: 0 var(--spacing-xs, 0.375rem);
  border: var(--border-width, 1px) solid transparent;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius, 0.25rem);
  transition: all 0.2s;
  font-size: var(--font-size-sm, 0.8125rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text-primary);
  line-height: 1;
  white-space: nowrap;
}

/* 只有文字的按钮需要更多宽度 */
.toolbar-button:has(.toolbar-button-text):not(:has(.toolbar-icon)) {
  min-width: 2.5rem;
  padding: 0 var(--spacing-sm, 0.5rem);
}

.toolbar-button:hover:not(:disabled) {
  background-color: var(--richtext-toolbar-button-hover-color, var(--color-gray-200));
  border-color: var(--color-border);
}

.toolbar-button:active:not(:disabled) {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.toolbar-button:disabled {
  opacity: var(--opacity-40, 0.4);
  cursor: not-allowed;
}

.toolbar-button.is-loading {
  position: relative;
  pointer-events: none;
}

.toolbar-button.is-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--spacing-md, 1rem);
  height: var(--spacing-md, 1rem);
  margin: calc(-1 * var(--spacing-sm, 0.5rem)) 0 0 calc(-1 * var(--spacing-sm, 0.5rem));
  border: calc(var(--border-width, 1px) * 2) solid var(--color-primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.toolbar-icon {
  font-size: var(--font-h4-size, 1.125rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.toolbar-button-text {
  font-size: var(--font-size-sm, 0.8125rem);
  font-weight: var(--font-weight-medium, 500);
  white-space: nowrap;
  line-height: 1;
}

/* 特殊样式的文字按钮 */
.toolbar-button:has(.toolbar-button-text):not(:has(.toolbar-icon)) {
  font-weight: var(--font-weight-semibold, 600);
}

/* 分隔线按钮 */
.toolbar-button .toolbar-button-text:contains('—') {
  font-size: var(--font-h3-size, 1.25rem);
  font-weight: var(--font-weight-normal, 400);
}

/* 颜色按钮 - 文字颜色 */
.toolbar-button[title*="文字颜色"] {
  position: relative;
}

.toolbar-button[title*="文字颜色"] .toolbar-button-text {
  font-weight: var(--font-weight-bold, 700);
  font-size: var(--font-size-base, 1rem);
}

.toolbar-button[title*="文字颜色"]::after {
  content: '';
  position: absolute;
  bottom: var(--spacing-xs, 0.25rem);
  left: 50%;
  transform: translateX(-50%);
  width: var(--spacing-lg, 1.25rem);
  height: 3px;
  background: var(--color-primary);
  border-radius: var(--border-width, 2px);
}

/* 颜色按钮 - 背景高亮 */
.toolbar-button[title*="背景高亮"] {
  position: relative;
}

.toolbar-button[title*="背景高亮"] .toolbar-button-text {
  font-weight: var(--font-weight-bold, 700);
  position: relative;
}

.toolbar-button[title*="背景高亮"] .toolbar-button-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: var(--color-warning, #ffeb3b);
  z-index: -1;
}

.toolbar-separator {
  width: var(--border-width, 1px);
  height: var(--spacing-lg, 1.5rem);
  background-color: var(--color-border);
  margin: 0 var(--spacing-xs, 0.25rem);
}

.richtext-editor {
  flex: 1;
  padding: var(--richtext-editor-padding-y, 0.75rem) var(--richtext-editor-padding-x, 1rem);
  color: var(--richtext-editor-text-color, var(--input-text-color));
  overflow-y: auto;
  outline: none;
  line-height: 1.6;
}

.richtext-editor:empty::before {
  content: attr(data-placeholder);
  color: var(--input-placeholder-color, var(--color-gray-400));
  pointer-events: none;
}

.richtext-editor[contenteditable="false"] {
  cursor: not-allowed;
}

/* 编辑器内容样式 */
.richtext-editor :deep(h1),
.richtext-editor :deep(h2),
.richtext-editor :deep(h3),
.richtext-editor :deep(h4),
.richtext-editor :deep(h5),
.richtext-editor :deep(h6) {
  margin: 1em 0 0.5em 0;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-primary);
}

.richtext-editor :deep(h1) { 
  font-size: 2em;
  border-bottom: calc(var(--border-width, 1px) * 2) solid var(--color-border);
  padding-bottom: 0.3em;
}
.richtext-editor :deep(h2) { 
  font-size: 1.5em;
  border-bottom: var(--border-width, 1px) solid var(--color-border);
  padding-bottom: 0.3em;
}
.richtext-editor :deep(h3) { font-size: 1.25em; }
.richtext-editor :deep(h4) { font-size: 1.1em; }
.richtext-editor :deep(h5) { font-size: 1em; }
.richtext-editor :deep(h6) { font-size: 0.9em; }

.richtext-editor :deep(p) {
  margin: 0.8em 0;
  line-height: 1.8;
}

.richtext-editor :deep(p:first-child) {
  margin-top: 0;
}

.richtext-editor :deep(p:last-child) {
  margin-bottom: 0;
}

.richtext-editor :deep(ul),
.richtext-editor :deep(ol) {
  margin: 0.8em 0;
  padding-left: 2em;
  line-height: 1.8;
}

.richtext-editor :deep(li) {
  margin: 0.4em 0;
}

.richtext-editor :deep(li > p) {
  margin: 0.2em 0;
}

.richtext-editor :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.richtext-editor :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius, 0.25rem);
  margin: 1em 0;
  display: block;
  cursor: pointer;
  transition: all 0.2s;
}

/* 可调整大小的图片 */
.richtext-editor :deep(img.resizable-image) {
  max-width: 100%;
  height: auto;
}

/* 选中的图片 */
.richtext-editor :deep(img.selected-image) {
  outline: calc(var(--border-width, 1px) * 2) solid var(--color-primary);
  outline-offset: calc(var(--border-width, 1px) * 2);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary), transparent 80%);
}

/* 图片悬停效果 */
.richtext-editor :deep(img:hover) {
  opacity: var(--opacity-95, 0.95);
  box-shadow: var(--shadow-sm);
}

/* 图片调整包装器 */
.richtext-editor :deep(.image-resize-wrapper) {
  position: relative;
  display: inline-block;
  max-width: 100%;
  margin: 1em 0;
}

.richtext-editor :deep(.image-resize-wrapper img) {
  display: block;
  margin: 0;
}

/* 调整手柄 */
.richtext-editor :deep(.resize-handle) {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  cursor: nwse-resize;
  border-radius: var(--border-width, 2px);
  border: calc(var(--border-width, 1px) * 2) solid var(--color-text-inverse, #fff);
  box-shadow: var(--shadow-sm);
  z-index: 10;
}

.richtext-editor :deep(.resize-handle:hover) {
  transform: scale(1.2);
  box-shadow: var(--shadow-md);
}

.richtext-editor :deep(hr) {
  margin: 1.5em 0;
  border: none;
  border-top: calc(var(--border-width, 1px) * 2) solid var(--color-border);
}

.richtext-editor :deep(blockquote) {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 4px solid var(--color-primary);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  border-radius: 0 var(--radius, 0.25rem) var(--radius, 0.25rem) 0;
}

.richtext-editor :deep(code) {
  padding: var(--spacing-xs, 0.125rem) var(--spacing-xs, 0.25rem);
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius, 0.25rem);
  font-family: monospace;
  font-size: 0.875em;
}

.richtext-editor :deep(pre) {
  margin: 1em 0;
  padding: 1em;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius, 0.25rem);
  overflow-x: auto;
}

.richtext-editor :deep(pre code) {
  padding: 0;
  background: none;
}
</style>

