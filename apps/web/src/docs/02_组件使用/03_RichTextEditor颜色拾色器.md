# 富文本编辑器 - 颜色拾色器功能

## 🎨 新增功能

### 颜色选择器
现在点击颜色按钮会打开浏览器原生的颜色拾色器，而不是输入框！

## 📝 使用方法

### 1. 文字颜色
1. 选中要改变颜色的文字
2. 点击工具栏的 **A** 按钮（带下划线）
3. 在弹出的颜色拾色器中选择颜色
4. 颜色立即应用到选中的文字

### 2. 背景高亮
1. 选中要高亮的文字
2. 点击工具栏的 **背** 按钮（带黄色背景）
3. 在弹出的颜色拾色器中选择背景颜色
4. 背景颜色立即应用

## 🎯 按钮设计

### 文字颜色按钮 (A)
```
┌─────┐
│  A  │  ← 字母 A
└─────┘
  ▬▬▬    ← 彩色下划线（主题色）
```

### 背景高亮按钮 (背)
```
┌─────┐
│ 背  │  ← 上半部分黑色
│ ▓▓  │  ← 下半部分黄色背景
└─────┘
```

## ✨ 优势

### 相比输入框
- ✅ **可视化**：直接看到颜色，不需要记住颜色代码
- ✅ **方便**：鼠标点选，无需输入
- ✅ **准确**：不会输入错误的颜色值
- ✅ **快速**：一键选择，立即生效

### 相比 prompt
- ✅ **用户友好**：图形界面更直观
- ✅ **跨平台**：所有浏览器都支持
- ✅ **专业**：符合现代编辑器的交互习惯

## 🎨 颜色拾色器特性

### 浏览器原生拾色器支持
- **Chrome/Edge**: 完整的颜色选择器，支持 HSL、RGB、HEX
- **Firefox**: 简洁的颜色选择器
- **Safari**: 系统级颜色选择器

### 功能
- 🎯 精确选择任意颜色
- 📋 显示当前颜色的 HEX 值
- 🔄 支持透明度（部分浏览器）
- 💾 记住最近使用的颜色

## 💡 使用技巧

### 1. 文字颜色建议
```css
标题: #2c3e50 (深灰)
正文: #333333 (黑灰)
链接: #3498db (蓝色)
强调: #e74c3c (红色)
成功: #27ae60 (绿色)
警告: #f39c12 (橙色)
```

### 2. 背景高亮建议
```css
重点: #ffeb3b (黄色)
提示: #b3e5fc (浅蓝)
警告: #ffccbc (浅橙)
成功: #c8e6c9 (浅绿)
```

### 3. 配色原则
- **对比度**：确保文字和背景有足够的对比度
- **一致性**：同类内容使用相同颜色
- **适度**：不要过度使用颜色，保持专业

## 🔧 技术实现

### HTML
```html
<!-- 隐藏的颜色输入框 -->
<input
  ref="textColorInputRef"
  type="color"
  style="display: none;"
  @change="handleTextColorChange"
/>

<input
  ref="bgColorInputRef"
  type="color"
  value="#ffff00"
  style="display: none;"
  @change="handleBgColorChange"
/>
```

### JavaScript
```javascript
// 点击按钮触发颜色选择器
if (command === 'foreColor') {
  textColorInputRef.value?.click()
  return
}

// 处理颜色选择
const handleTextColorChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const color = input.value
  document.execCommand('foreColor', false, color)
  editorRef.value?.focus()
}
```

### CSS
```css
/* 文字颜色按钮样式 */
.toolbar-button[title*="文字颜色"]::after {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  width: 1.25rem;
  height: 3px;
  background: var(--color-primary);
}

/* 背景高亮按钮样式 */
.toolbar-button[title*="背景高亮"] .toolbar-button-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 40%;
  background: #ffeb3b;
}
```

## 🎨 示例效果

### 使用前
```
这是一段普通的文字。
```

### 使用后
```
这是一段<span style="color: #e74c3c">红色</span>的文字。
这是<span style="background-color: #ffeb3b">高亮</span>的内容。
```

## 🌟 最佳实践

### 1. 文章排版
```
标题：使用深色（#2c3e50）
重点：使用红色（#e74c3c）
链接：使用蓝色（#3498db）
```

### 2. 教学文档
```
概念：黄色高亮（#ffeb3b）
注意：橙色高亮（#ffccbc）
提示：蓝色高亮（#b3e5fc）
```

### 3. 代码注释
```
变量：绿色（#27ae60）
函数：蓝色（#3498db）
关键字：紫色（#9b59b6）
```

## 📱 移动端支持

在移动设备上，颜色拾色器会自动适配：
- **iOS**: 使用系统颜色选择器
- **Android**: 使用浏览器内置选择器
- **响应式**: 自动调整界面大小

## 🔮 未来改进

可能的增强功能：
- [ ] 保存常用颜色
- [ ] 颜色历史记录
- [ ] 预设配色方案
- [ ] 取色器（从页面取色）
- [ ] 渐变色支持
- [ ] 透明度调整

---

现在使用颜色功能更加直观和方便了！🎨

