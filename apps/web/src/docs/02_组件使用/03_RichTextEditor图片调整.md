# 富文本编辑器 - 图片大小调整功能

## 🖼️ 功能说明

插入到编辑器中的图片现在可以通过拖拽来调整大小！

## 📝 使用方法

### 1. 插入图片
1. 点击工具栏的 **图片** 按钮
2. 选择本地图片文件
3. 图片自动插入到编辑器中

### 2. 调整图片大小
1. **点击图片**：图片会被选中，显示蓝色边框
2. **拖拽手柄**：右下角会出现一个蓝色小方块
3. **调整大小**：按住小方块向右下拖动，图片会等比例缩放
4. **完成调整**：松开鼠标，大小调整完成

### 3. 取消选中
- 点击编辑器的其他地方，图片选中状态会自动取消

## 🎯 视觉效果

### 未选中状态
```
┌─────────────┐
│             │
│   图片内容   │
│             │
└─────────────┘
```

### 选中状态
```
┌─────────────┐ ← 蓝色边框
│             │
│   图片内容   │
│             │
└─────────────■ ← 蓝色调整手柄
```

### 调整中
```
┌──────────────────┐
│                  │
│    图片内容      │
│                  │
└──────────────────■ ← 拖动这里
```

## ✨ 功能特性

### 1. 智能约束
- ✅ **最小宽度**：100px，确保图片不会太小
- ✅ **最大宽度**：编辑器宽度，图片不会超出容器
- ✅ **等比例缩放**：保持图片原始宽高比，不变形
- ✅ **自适应高度**：高度自动计算，无需手动调整

### 2. 视觉反馈
- ✅ **选中边框**：2px 蓝色边框 + 阴影
- ✅ **调整手柄**：12px 蓝色方块，白色边框
- ✅ **悬停效果**：手柄放大 1.2 倍
- ✅ **拖动光标**：`nwse-resize` 光标提示

### 3. 用户体验
- ✅ **即时预览**：拖动时实时看到大小变化
- ✅ **平滑过渡**：所有动画都有 0.2s 过渡效果
- ✅ **自动保存**：调整完成后自动触发内容更新

## 🔧 技术实现

### 图片插入
```javascript
// 插入图片后自动设置为可调整大小
document.execCommand('insertImage', false, imageUrl)

setTimeout(() => {
  const lastImage = images[images.length - 1]
  lastImage.style.maxWidth = '100%'
  lastImage.style.height = 'auto'
  lastImage.classList.add('resizable-image')
}, 100)
```

### 点击选中
```javascript
const handleImageClick = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'IMG') {
    // 选中图片
    target.classList.add('selected-image')
    // 添加调整手柄
    addResizeHandles(target)
  }
}
```

### 拖拽调整
```javascript
const onMouseMove = (e: MouseEvent) => {
  const deltaX = e.clientX - startX
  let newWidth = startWidth + deltaX
  
  // 限制宽度范围
  newWidth = Math.max(100, Math.min(newWidth, maxWidth))
  
  // 应用新宽度
  img.style.width = `${newWidth}px`
  img.style.height = 'auto'
}
```

### CSS 样式
```css
/* 选中的图片 */
.richtext-editor :deep(img.selected-image) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary), transparent 80%);
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
  border-radius: 2px;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

## 💡 使用技巧

### 1. 快速调整
```
小图片：拖到 200-300px
中等图片：拖到 400-600px
大图片：拖到 800px 以上
```

### 2. 精确控制
- 慢速拖动：更精确的大小控制
- 快速拖动：快速调整到目标大小

### 3. 最佳实践
```
文章配图：建议 600-800px
缩略图：建议 200-300px
全宽展示：拖到编辑器最大宽度
```

## 🎨 样式定制

### 修改选中边框颜色
```css
.richtext-editor :deep(img.selected-image) {
  outline-color: #ff0000; /* 改为红色 */
}
```

### 修改手柄样式
```css
.richtext-editor :deep(.resize-handle) {
  width: 16px;          /* 更大的手柄 */
  height: 16px;
  background: #ff0000;  /* 红色手柄 */
  border-radius: 50%;   /* 圆形手柄 */
}
```

### 修改图片悬停效果
```css
.richtext-editor :deep(img:hover) {
  opacity: 0.8;
  transform: scale(1.02);
}
```

## 📊 功能对比

| 功能 | 之前 | 现在 |
|------|------|------|
| 插入图片 | ✅ | ✅ |
| 调整大小 | ❌ | ✅ |
| 等比例缩放 | ❌ | ✅ |
| 可视化调整 | ❌ | ✅ |
| 最小/最大限制 | ❌ | ✅ |
| 实时预览 | ❌ | ✅ |

## 🔮 未来改进

可能的增强功能：
- [ ] 图片旋转
- [ ] 图片裁剪
- [ ] 图片滤镜
- [ ] 图片对齐方式（左、中、右）
- [ ] 图片说明文字
- [ ] 图片链接
- [ ] 批量调整多张图片
- [ ] 图片压缩优化

## 🐛 已知限制

1. **单次调整**：一次只能调整一张图片
2. **等比例**：只支持等比例缩放，不支持自由变形
3. **方向**：只能从右下角拖动，不支持其他方向
4. **移动端**：移动设备上的触摸调整可能不够流畅

## 📱 移动端支持

在移动设备上：
- 点击图片仍然可以选中
- 调整手柄会自动放大，方便触摸
- 拖动手势与桌面端一致

## 🎯 示例场景

### 场景 1：文章配图
```
1. 插入图片（原始 2000px）
2. 点击图片选中
3. 拖动到 600px
4. 完成 ✅
```

### 场景 2：缩略图
```
1. 插入图片
2. 拖动到 200px
3. 放在段落旁边
4. 完成 ✅
```

### 场景 3：全宽展示
```
1. 插入图片
2. 拖动到编辑器最大宽度
3. 作为横幅使用
4. 完成 ✅
```

---

现在图片可以自由调整大小了！🎉

