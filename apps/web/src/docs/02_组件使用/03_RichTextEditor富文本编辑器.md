# RichTextEditor 富文本编辑器组件

一个功能完整、样式可配置的富文本编辑器组件，基于浏览器原生的 `contenteditable` 和 `document.execCommand` API 实现。

## 特性

- ✅ 完整的文本格式化功能（粗体、斜体、下划线、删除线）
- ✅ 多级标题支持（H1、H2、H3、正文）
- ✅ 字体大小调整（小号、标准、大号）
- ✅ 行距调整（紧凑、标准、宽松）
- ✅ 有序和无序列表
- ✅ 文本对齐（左、中、右、两端）
- ✅ 缩进控制
- ✅ 文字颜色和背景高亮（拾色器）
- ✅ 插入链接和图片（支持文件上传）
- ✅ **图片大小调整（拖拽调整）** 🆕
- ✅ 插入分隔线
- ✅ 清除格式
- ✅ 撤销/重做
- ✅ 样式完全可配置（通过 CSS 变量）
- ✅ 支持禁用状态
- ✅ 响应式设计
- ✅ TypeScript 支持

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const content = ref('<p>初始内容</p>')
</script>

<template>
  <RichTextEditor
    v-model="content"
    placeholder="请输入内容..."
  />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string` | `''` | 编辑器内容（HTML 格式） |
| `placeholder` | `string` | `'请输入内容...'` | 占位文本 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `minHeight` | `string` | `'12rem'` | 最小高度 |
| `maxHeight` | `string` | `'40rem'` | 最大高度 |
| `showToolbar` | `boolean` | `true` | 是否显示工具栏 |
| `toolbar` | `ToolbarButton[]` | 默认工具栏 | 自定义工具栏按钮 |
| `uploadImage` | `(file: File) => Promise<string>` | - | 自定义图片上传函数 |
| `maxImageSize` | `number` | `5` | 图片最大大小（MB） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `(value: string)` | 内容变化时触发 |
| `change` | `(value: string)` | 内容变化时触发 |
| `focus` | - | 获得焦点时触发 |
| `blur` | - | 失去焦点时触发 |

## Methods

通过 `ref` 访问组件实例可以调用以下方法：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const editorRef = ref<InstanceType<typeof RichTextEditor> | null>(null)

const clearContent = () => {
  editorRef.value?.clear()
}

const getPlainText = () => {
  const text = editorRef.value?.getTextContent()
  console.log(text)
}
</script>

<template>
  <RichTextEditor ref="editorRef" v-model="content" />
</template>
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `clear()` | - | `void` | 清空编辑器内容 |
| `getTextContent()` | - | `string` | 获取纯文本内容（不含 HTML 标签） |
| `setContent(html)` | `html: string` | `void` | 设置编辑器内容 |
| `focus()` | - | `void` | 聚焦编辑器 |
| `blur()` | - | `void` | 失焦编辑器 |

## 高级用法

### 自定义工具栏

```vue
<script setup lang="ts">
const customToolbar = [
  { command: 'bold', icon: 'i-carbon-text-bold', title: '粗体' },
  { command: 'italic', icon: 'i-carbon-text-italic', title: '斜体' },
  { command: 'separator', icon: '', title: '' },
  { command: 'insertUnorderedList', icon: 'i-carbon-list', title: '列表' },
]
</script>

<template>
  <RichTextEditor
    v-model="content"
    :toolbar="customToolbar"
  />
</template>
```

### 禁用工具栏

```vue
<template>
  <RichTextEditor
    v-model="content"
    :show-toolbar="false"
  />
</template>
```

### 设置高度限制

```vue
<template>
  <RichTextEditor
    v-model="content"
    min-height="20rem"
    max-height="50rem"
  />
</template>
```

### 禁用状态

```vue
<template>
  <RichTextEditor
    v-model="content"
    :disabled="true"
  />
</template>
```

### 监听内容变化

```vue
<script setup lang="ts">
const handleChange = (value: string) => {
  console.log('内容已变化:', value)
  // 可以在这里保存草稿等
}
</script>

<template>
  <RichTextEditor
    v-model="content"
    @change="handleChange"
  />
</template>
```

### 图片功能

#### 插入图片
点击工具栏的"图片"按钮，选择本地图片文件即可插入。

#### 调整图片大小 🆕
1. **点击图片**：图片会被选中，显示蓝色边框
2. **拖拽手柄**：右下角会出现蓝色小方块
3. **调整大小**：按住小方块拖动，图片会等比例缩放
4. **完成调整**：松开鼠标，大小调整完成

详细说明请查看：[RichTextEditor-IMAGE-RESIZE.md](./RichTextEditor-IMAGE-RESIZE.md)

### 自定义图片上传

```vue
<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const content = ref('')

// 自定义图片上传函数
const handleImageUpload = async (file: File): Promise<string> => {
  // 上传到服务器
  const formData = new FormData()
  formData.append('image', file)
  
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData
  })
  
  const data = await response.json()
  return data.url // 返回图片 URL
}
</script>

<template>
  <RichTextEditor
    v-model="content"
    :upload-image="handleImageUpload"
    :max-image-size="10"
  />
</template>
```

**注意**：
- 如果不提供 `uploadImage` 函数，图片会自动转换为 Base64 格式嵌入内容中
- `uploadImage` 函数必须返回一个 Promise，resolve 时返回图片的 URL
- `maxImageSize` 单位为 MB，默认 5MB

## 样式配置

编辑器的样式完全通过 CSS 变量控制，可以在"组件画廊 > 基础控件设置 > 输入框 > 富文本编辑器"中进行可视化配置。

### CSS 变量列表

```css
/* 编辑器容器 */
--richtext-border-width: 1px;
--richtext-border-color: #211f20;
--richtext-bg-color: #ffffff;
--richtext-radius: 0.375rem;
--richtext-min-height: 12rem;

/* 工具栏 */
--richtext-toolbar-bg-color: #f9fafb;
--richtext-toolbar-border-color: #e5e7eb;
--richtext-toolbar-button-hover-color: #e5e7eb;

/* 编辑区域 */
--richtext-editor-padding-x: 1rem;
--richtext-editor-padding-y: 0.75rem;
--richtext-editor-text-color: #111827;

/* 聚焦状态 */
--richtext-focus-border-color: var(--color-primary);
--richtext-focus-ring-color: var(--color-primary);
```

### 手动覆盖样式

```vue
<template>
  <RichTextEditor
    v-model="content"
    style="
      --richtext-border-color: #3b82f6;
      --richtext-toolbar-bg-color: #eff6ff;
    "
  />
</template>
```

## 工具栏按钮说明

| 命令 | 图标 | 功能 |
|------|------|------|
| `bold` | 粗体图标 | 加粗文本 |
| `italic` | 斜体图标 | 斜体文本 |
| `underline` | 下划线图标 | 下划线文本 |
| `strikeThrough` | 删除线图标 | 删除线文本 |
| `formatBlock` | 标题图标 | 设置标题（h1-h6） |
| `insertUnorderedList` | 列表图标 | 无序列表 |
| `insertOrderedList` | 编号列表图标 | 有序列表 |
| `justifyLeft` | 左对齐图标 | 左对齐 |
| `justifyCenter` | 居中图标 | 居中对齐 |
| `justifyRight` | 右对齐图标 | 右对齐 |
| `createLink` | 链接图标 | 插入链接 |
| `insertImage` | 图片图标 | 插入图片 |
| `removeFormat` | 清除图标 | 清除格式 |
| `undo` | 撤销图标 | 撤销 |
| `redo` | 重做图标 | 重做 |
| `separator` | - | 分隔线 |

## 实际应用场景

### 1. 文章编辑器

```vue
<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const article = ref({
  title: '',
  content: ''
})

const handleSubmit = async () => {
  await api.post('/articles', article.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="article.title" placeholder="文章标题" />
    <RichTextEditor v-model="article.content" />
    <button type="submit">发布</button>
  </form>
</template>
```

### 2. 评论编辑器

```vue
<template>
  <RichTextEditor
    v-model="comment"
    placeholder="写下你的评论..."
    min-height="8rem"
    max-height="20rem"
  />
</template>
```

### 3. 邮件编辑器

```vue
<template>
  <div class="email-editor">
    <input v-model="email.subject" placeholder="主题" />
    <input v-model="email.to" placeholder="收件人" />
    <RichTextEditor
      v-model="email.body"
      placeholder="邮件正文..."
      min-height="20rem"
    />
  </div>
</template>
```

## 注意事项

1. **内容格式**：编辑器使用 HTML 格式存储内容，如果需要纯文本，请使用 `getTextContent()` 方法。

2. **XSS 防护**：在显示用户生成的 HTML 内容时，请务必进行 XSS 过滤处理。

3. **图片上传**：默认的图片插入功能使用 URL，如需上传功能，请自定义工具栏按钮并实现上传逻辑。

4. **浏览器兼容性**：基于 `document.execCommand` API，现代浏览器均支持，但该 API 已被标记为过时（deprecated）。如需更强大的功能，建议使用 Quill、TinyMCE 等成熟的富文本编辑器库。

5. **粘贴处理**：默认会清除粘贴内容的格式，保留纯文本。如需保留格式，请修改 `handlePaste` 方法。

## 示例页面

查看完整的使用示例：`/admin/examples/richtext`

## 未来改进

- [ ] 添加代码块支持
- [ ] 添加表格插入功能
- [ ] 添加颜色选择器
- [ ] 添加字体大小调整
- [ ] 添加图片上传功能
- [ ] 添加全屏模式
- [ ] 添加 Markdown 快捷输入
- [ ] 添加自动保存功能
- [ ] 添加字数统计
- [ ] 添加导出 PDF/Word 功能

