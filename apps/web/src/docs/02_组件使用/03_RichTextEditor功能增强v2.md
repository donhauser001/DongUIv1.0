# RichTextEditor v2.0 - 功能增强版

## 🎉 新增功能

### 1. **完整的标题层级**
- ✅ H1 - 一级标题（带下边框）
- ✅ H2 - 二级标题（带下边框）
- ✅ H3 - 三级标题
- ✅ 正文 - 标准段落格式

### 2. **字体大小控制**
- ✅ 小字号
- ✅ 中字号（默认）
- ✅ 大字号

### 3. **行距调整**
- ✅ 1.0 倍行距（紧凑）
- ✅ 1.5 倍行距（标准）
- ✅ 2.0 倍行距（宽松）

### 4. **文字颜色**
- ✅ 文字颜色
- ✅ 背景高亮颜色

### 5. **增强的对齐方式**
- ✅ 左对齐
- ✅ 居中对齐
- ✅ 右对齐
- ✅ 两端对齐（新增）

### 6. **列表缩进控制**
- ✅ 增加缩进
- ✅ 减少缩进

### 7. **插入元素**
- ✅ 水平分隔线
- ✅ 链接
- ✅ 图片（文件上传）

### 8. **统一的图标系统**
- ✅ 所有按钮使用 UnoCSS Carbon 图标
- ✅ 统一的视觉风格
- ✅ 清晰的中文标签

## 🎨 工具栏布局

```
[粗] [斜] [下] [删] | [H1] [H2] [H3] [正文] | [小] [中] [大] | 
[•] [1.] [→] [←] | [左] [中] [右] [齐] | [1.0] [1.5] [2.0] | 
[A] [背] | [链] [图] [—] | [清] [撤] [重]
```

### 分组说明
1. **文本格式**：粗体、斜体、下划线、删除线
2. **段落格式**：H1、H2、H3、正文
3. **字体大小**：小、中、大
4. **列表**：无序列表、有序列表、增加缩进、减少缩进
5. **对齐**：左、中、右、两端对齐
6. **行距**：1.0、1.5、2.0倍
7. **颜色**：文字颜色、背景颜色
8. **插入**：链接、图片、分隔线
9. **其他**：清除格式、撤销、重做

## 📝 样式改进

### 标题样式
```css
H1: 2em, 粗体, 带底部边框
H2: 1.5em, 粗体, 带底部边框
H3: 1.25em, 粗体
```

### 段落样式
```css
正文: 1.8倍行距, 段落间距 0.8em
列表: 1.8倍行距, 列表项间距 0.4em
```

### 特殊元素
```css
分隔线: 2px实线, 上下间距 1.5em
引用块: 左侧4px主色边框, 浅色背景
图片: 自动宽度, 圆角, 块级显示
```

## 🚀 使用示例

### 基础用法
```vue
<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const content = ref('')
</script>

<template>
  <RichTextEditor
    v-model="content"
    placeholder="开始编写..."
  />
</template>
```

### 完整配置
```vue
<template>
  <RichTextEditor
    v-model="content"
    placeholder="开始编写..."
    min-height="20rem"
    max-height="50rem"
    :upload-image="handleUpload"
    :max-image-size="10"
  />
</template>
```

## 🎯 快捷键

| 功能 | Windows/Linux | Mac |
|------|---------------|-----|
| 粗体 | Ctrl + B | ⌘ + B |
| 斜体 | Ctrl + I | ⌘ + I |
| 下划线 | Ctrl + U | ⌘ + U |
| 撤销 | Ctrl + Z | ⌘ + Z |
| 重做 | Ctrl + Y | ⌘ + Y |

## 📊 功能对比

| 功能 | v1.0 | v2.0 |
|------|------|------|
| 标题层级 | 2级 | 4级（H1-H3 + 正文） |
| 字体大小 | ❌ | ✅ 3档 |
| 行距调整 | ❌ | ✅ 3档 |
| 文字颜色 | ❌ | ✅ |
| 背景颜色 | ❌ | ✅ |
| 两端对齐 | ❌ | ✅ |
| 缩进控制 | ❌ | ✅ |
| 水平线 | ❌ | ✅ |
| 图标系统 | 混合 | 统一 |
| 文件上传 | ❌ | ✅ |

## 🎨 自定义工具栏

如果你需要简化工具栏，可以自定义：

```vue
<script setup lang="ts">
const customToolbar = [
  { command: 'bold', icon: 'i-carbon-text-bold', title: '粗', tooltip: '粗体' },
  { command: 'italic', icon: 'i-carbon-text-italic', title: '斜', tooltip: '斜体' },
  { command: 'separator', icon: '', title: '' },
  { command: 'formatBlock', icon: 'i-carbon-text-heading', title: 'H2', tooltip: '标题', value: 'h2' },
  { command: 'formatBlock', icon: 'i-carbon-text-font', title: '正文', tooltip: '正文', value: 'p' },
]
</script>

<template>
  <RichTextEditor
    v-model="content"
    :toolbar="customToolbar"
  />
</template>
```

## 💡 最佳实践

### 1. 内容结构
- 使用 H1 作为文档标题（每篇文章只用一次）
- 使用 H2 作为主要章节标题
- 使用 H3 作为子章节标题
- 正文使用标准段落格式

### 2. 行距选择
- **1.0倍**：适合代码、表格等紧凑内容
- **1.5倍**：适合正文阅读（推荐）
- **2.0倍**：适合需要批注的文档

### 3. 图片处理
- 建议图片大小不超过 5MB
- 使用自定义上传函数将图片存储到服务器
- 避免使用 Base64（会增加内容体积）

### 4. 颜色使用
- 谨慎使用颜色，保持文档专业性
- 文字颜色建议使用深色系
- 背景高亮适合标记重点内容

## 🔧 技术细节

### 行距实现
行距通过动态设置元素的 `line-height` 样式实现：
```javascript
element.style.lineHeight = '1.5'
```

### 颜色选择
使用浏览器原生的 `prompt` 输入颜色值，支持：
- 十六进制：`#ff0000`
- 颜色名：`red`
- RGB：`rgb(255, 0, 0)`

### 浏览器兼容性
- 基于标准的 `document.execCommand` API
- 支持所有现代浏览器
- 部分功能在不同浏览器中可能有细微差异

## 📦 完整功能列表

✅ 文本格式：粗体、斜体、下划线、删除线
✅ 段落格式：H1、H2、H3、正文
✅ 字体大小：小、中、大
✅ 行距：1.0、1.5、2.0倍
✅ 对齐：左、中、右、两端
✅ 列表：有序、无序
✅ 缩进：增加、减少
✅ 颜色：文字、背景
✅ 插入：链接、图片、分隔线
✅ 编辑：撤销、重做、清除格式
✅ 上传：本地文件选择
✅ 验证：文件类型、大小
✅ 样式：完全可配置
✅ 主题：自动跟随系统主题

## 🎓 示例页面

完整的使用示例请访问：`/admin/examples/richtext`

