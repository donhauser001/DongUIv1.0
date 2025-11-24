# RichTextEditor 更新日志

## v1.2.0 - 2024-01-XX

### 🎉 新功能

#### 1. 图片大小调整功能 🆕
- ✅ 点击图片即可选中
- ✅ 右下角显示蓝色调整手柄
- ✅ 拖拽手柄即可调整图片大小
- ✅ 自动保持图片宽高比
- ✅ 智能限制最小/最大宽度
- ✅ 实时预览调整效果
- ✅ 选中状态有明显的视觉反馈

#### 2. 颜色选择器优化
- ✅ 修复拾色器位置问题（不再显示在左上角）
- ✅ 修复颜色选择无响应问题
- ✅ 自动保存和恢复文本选区
- ✅ 支持文字颜色和背景颜色

#### 3. 清除格式增强
- ✅ 修复清除格式按钮无响应
- ✅ 彻底清除所有格式（粗体、颜色、链接等）
- ✅ 保留段落结构（标题、列表）

### 🔧 技术实现

#### 图片调整核心代码
```javascript
// 添加调整手柄
const addResizeHandles = (img: HTMLImageElement) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'image-resize-wrapper'
  
  const handle = document.createElement('div')
  handle.className = 'resize-handle'
  
  // 拖拽调整逻辑
  handle.addEventListener('mousedown', onMouseDown)
}

// 拖拽调整
const onMouseMove = (e: MouseEvent) => {
  const deltaX = e.clientX - startX
  let newWidth = startWidth + deltaX
  
  // 限制宽度范围
  newWidth = Math.max(100, Math.min(newWidth, maxWidth))
  
  img.style.width = `${newWidth}px`
  img.style.height = 'auto'
}
```

#### 选区保存与恢复
```javascript
let savedSelection: Range | null = null

const saveSelection = () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0)
  }
}

const restoreSelection = () => {
  if (savedSelection) {
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(savedSelection)
  }
}
```

### 🎨 样式改进

#### 图片选中效果
```css
.richtext-editor :deep(img.selected-image) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary), transparent 80%);
}
```

#### 调整手柄样式
```css
.richtext-editor :deep(.resize-handle) {
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  cursor: nwse-resize;
  border-radius: 2px;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

### 📝 使用示例

#### 调整图片大小
```
1. 点击工具栏的"图片"按钮插入图片
2. 点击图片选中（显示蓝色边框）
3. 拖动右下角的蓝色手柄
4. 图片会等比例缩放
5. 松开鼠标完成调整
```

#### 使用颜色选择器
```
1. 选中要改变颜色的文字
2. 点击"A"（文字颜色）或"背"（背景颜色）按钮
3. 在弹出的拾色器中选择颜色
4. 颜色自动应用到选中的文字
```

### 🐛 修复
- 修复拾色器显示在页面左上角的问题
- 修复颜色选择后无响应的问题
- 修复清除格式按钮点击无效的问题
- 修复图片插入后无法调整大小的问题

### 📚 文档更新
- 添加 `RichTextEditor-IMAGE-RESIZE.md` - 图片调整详细说明
- 添加 `RichTextEditor-FIXES.md` - 问题修复说明
- 更新主文档，添加图片调整功能介绍

---

## v1.1.0 - 2024-01-XX

### 🎉 新功能

#### 1. 真实文件上传功能
- ✅ 点击"Img"按钮会打开文件选择对话框
- ✅ 支持所有图片格式（jpg, png, gif, webp 等）
- ✅ 自动验证文件类型和大小
- ✅ 可配置最大文件大小（默认 5MB）
- ✅ 上传过程中显示加载动画
- ✅ 支持自定义上传函数（上传到服务器）
- ✅ 默认转换为 Base64（无需服务器）

#### 2. 改进的工具栏图标
- ✅ 使用文字符号替代 emoji 图标
- ✅ 更清晰的视觉效果
- ✅ 不依赖外部图标库
- ✅ 链接按钮：`Link`
- ✅ 图片按钮：`Img`

### 🔧 技术实现

#### Props 新增
```typescript
interface Props {
  // ... 原有 props
  uploadImage?: (file: File) => Promise<string>  // 自定义上传函数
  maxImageSize?: number                          // 最大文件大小（MB）
}
```

#### 上传流程
1. 用户点击"Img"按钮
2. 触发隐藏的 `<input type="file">` 
3. 用户选择图片文件
4. 验证文件类型和大小
5. 调用上传函数（自定义或 Base64）
6. 插入图片到编辑器
7. 清空 input，允许重复上传

### 📝 使用示例

#### 基础用法（Base64）
```vue
<template>
  <RichTextEditor v-model="content" />
</template>
```

#### 自定义上传到服务器
```vue
<script setup lang="ts">
const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  const data = await res.json()
  return data.url
}
</script>

<template>
  <RichTextEditor
    v-model="content"
    :upload-image="handleUpload"
    :max-image-size="10"
  />
</template>
```

### 🎨 样式改进
- 工具栏按钮添加边框效果
- Hover 状态更明显
- Active 状态使用主题色
- 上传中显示旋转加载动画

### 🐛 修复
- 修复工具栏图标不可见的问题
- 改进按钮的视觉对比度
- 优化文件选择的用户体验

### 📚 文档更新
- 添加图片上传功能说明
- 添加自定义上传示例
- 更新 Props 列表
- 添加最佳实践建议

---

## v1.0.0 - 初始版本

### 核心功能
- 完整的富文本编辑功能
- 18+ 种编辑命令
- 可自定义工具栏
- 样式完全可配置
- TypeScript 支持
- 响应式设计

