# 统一高度与表单控件规范化

## ✅ 已完成的修改

### 1. 统一所有表单元素高度为 `2rem`

#### 按钮
- **主按钮 (primary)**：`height: '2rem'`
- **边框按钮 (outline)**：`height: '2rem'`
- 移除了垂直内边距，使用固定高度

#### 输入框
- **单行输入框 (text)**：`height: '2rem'`

#### 下拉框
- **下拉框 (select)**：`height: '2rem'`

### 2. 统一所有数值设置项为下拉菜单

#### FormSettings.vue 新增下拉选项

**高度选项 (sizeOptions)**：
- 小 (2rem)
- 标准 (2.5rem)
- 大 (3rem)

**圆角选项 (radiusOptions)**：
- 无圆角 (0)
- 小 (0.25rem)
- 标准 (0.375rem)
- 大 (0.5rem)
- 全圆角 (9999px)

**边框宽度选项 (borderWidthOptions)**：
- 无边框 (0)
- 细 (1px)
- 标准 (2px)
- 粗 (3px)

**内边距选项 (paddingOptions)**：
- 极小 (0.5rem)
- 小 (0.75rem)
- 标准 (1rem)
- 大 (1.5rem)
- 超大 (2rem / 2.5rem / 3rem)

**箭头位置选项 (arrowPositionOptions)**：
- 靠近 (0.75rem)
- 标准 (1rem)
- 远 (1.25rem)
- 很远 (1.5rem)

**复选框/单选框大小 (checkboxSizeOptions)**：
- 小 (1rem)
- 标准 (1.25rem)
- 大 (1.5rem)

**单选框圆点大小 (radioDotSizeOptions)**：
- 小 (0.375rem)
- 标准 (0.5rem)
- 大 (0.625rem)

**开关尺寸**：
- **宽度 (switchWidthOptions)**：小 (2.25rem) / 标准 (2.75rem) / 大 (3.25rem)
- **高度 (switchHeightOptions)**：小 (1.25rem) / 标准 (1.5rem) / 大 (1.75rem)

#### 已统一改为下拉菜单的设置项

**下拉框设置**：
- ✅ 高度
- ✅ 圆角
- ✅ 右侧内边距
- ✅ 箭头位置
- ✅ 边框宽度

**复选框设置**：
- ✅ 大小
- ✅ 圆角
- ✅ 边框宽度

**单选框设置**：
- ✅ 大小
- ✅ 边框宽度
- ✅ 选中圆点大小

**开关设置**：
- ✅ 宽度
- ✅ 高度

## 📋 需要的操作步骤

### 步骤1：重启后端服务器

```bash
# 在后端终端按 Ctrl+C 停止
# 然后重新启动
cd apps/server
pnpm start:dev
```

### 步骤2：保存新配置

1. 访问组件画廊页面
2. 所有设置项现在都是下拉菜单形式
3. 点击右上角 **"保存到远程"** 按钮 💾

### 步骤3：刷新前端

强制刷新浏览器（`Ctrl + Shift + R` 或 `Cmd + Shift + R`）

## 🎯 效果预览

### 修改前
```
按钮高度: auto (约 2.2rem)
输入框高度: auto (约 2.2rem)
下拉框高度: 2.5rem
设置项: 混用输入框和下拉菜单
```

### 修改后
```
按钮高度: 2rem ✅
输入框高度: 2rem ✅
下拉框高度: 2rem ✅
设置项: 统一使用下拉菜单 ✅
```

## 📁 修改的文件

- ✅ `apps/web/src/config/theme.ts` - 统一高度为 2rem
- ✅ `apps/web/src/views/admin/dev/components/settings/FormSettings.vue` - 添加下拉选项，统一表单控件
- ✅ `apps/server/src/config/config.controller.ts` - 开放保存权限（开发阶段）

## 🎨 统一规范

### 表单控件使用规范

1. **数值设置** → 使用下拉菜单（高度、圆角、边框等）
2. **颜色设置** → 使用颜色选择器 + 文本输入框
3. **文本设置** → 使用文本输入框（品牌名称、标语等）

### 默认值规范

- **高度**：2rem（小）
- **圆角**：0.375rem（标准）
- **边框**：1px（细）
- **内边距**：0.75rem（小）

---

**修改时间**：2025-11-25  
**目标**：统一表单元素高度，规范化设置界面


## ✅ 已完成的修改

### 1. 统一所有表单元素高度为 `2rem`

#### 按钮
- **主按钮 (primary)**：`height: '2rem'`
- **边框按钮 (outline)**：`height: '2rem'`
- 移除了垂直内边距，使用固定高度

#### 输入框
- **单行输入框 (text)**：`height: '2rem'`

#### 下拉框
- **下拉框 (select)**：`height: '2rem'`

### 2. 统一所有数值设置项为下拉菜单

#### FormSettings.vue 新增下拉选项

**高度选项 (sizeOptions)**：
- 小 (2rem)
- 标准 (2.5rem)
- 大 (3rem)

**圆角选项 (radiusOptions)**：
- 无圆角 (0)
- 小 (0.25rem)
- 标准 (0.375rem)
- 大 (0.5rem)
- 全圆角 (9999px)

**边框宽度选项 (borderWidthOptions)**：
- 无边框 (0)
- 细 (1px)
- 标准 (2px)
- 粗 (3px)

**内边距选项 (paddingOptions)**：
- 极小 (0.5rem)
- 小 (0.75rem)
- 标准 (1rem)
- 大 (1.5rem)
- 超大 (2rem / 2.5rem / 3rem)

**箭头位置选项 (arrowPositionOptions)**：
- 靠近 (0.75rem)
- 标准 (1rem)
- 远 (1.25rem)
- 很远 (1.5rem)

**复选框/单选框大小 (checkboxSizeOptions)**：
- 小 (1rem)
- 标准 (1.25rem)
- 大 (1.5rem)

**单选框圆点大小 (radioDotSizeOptions)**：
- 小 (0.375rem)
- 标准 (0.5rem)
- 大 (0.625rem)

**开关尺寸**：
- **宽度 (switchWidthOptions)**：小 (2.25rem) / 标准 (2.75rem) / 大 (3.25rem)
- **高度 (switchHeightOptions)**：小 (1.25rem) / 标准 (1.5rem) / 大 (1.75rem)

#### 已统一改为下拉菜单的设置项

**下拉框设置**：
- ✅ 高度
- ✅ 圆角
- ✅ 右侧内边距
- ✅ 箭头位置
- ✅ 边框宽度

**复选框设置**：
- ✅ 大小
- ✅ 圆角
- ✅ 边框宽度

**单选框设置**：
- ✅ 大小
- ✅ 边框宽度
- ✅ 选中圆点大小

**开关设置**：
- ✅ 宽度
- ✅ 高度

## 📋 需要的操作步骤

### 步骤1：重启后端服务器

```bash
# 在后端终端按 Ctrl+C 停止
# 然后重新启动
cd apps/server
pnpm start:dev
```

### 步骤2：保存新配置

1. 访问组件画廊页面
2. 所有设置项现在都是下拉菜单形式
3. 点击右上角 **"保存到远程"** 按钮 💾

### 步骤3：刷新前端

强制刷新浏览器（`Ctrl + Shift + R` 或 `Cmd + Shift + R`）

## 🎯 效果预览

### 修改前
```
按钮高度: auto (约 2.2rem)
输入框高度: auto (约 2.2rem)
下拉框高度: 2.5rem
设置项: 混用输入框和下拉菜单
```

### 修改后
```
按钮高度: 2rem ✅
输入框高度: 2rem ✅
下拉框高度: 2rem ✅
设置项: 统一使用下拉菜单 ✅
```

## 📁 修改的文件

- ✅ `apps/web/src/config/theme.ts` - 统一高度为 2rem
- ✅ `apps/web/src/views/admin/dev/components/settings/FormSettings.vue` - 添加下拉选项，统一表单控件
- ✅ `apps/server/src/config/config.controller.ts` - 开放保存权限（开发阶段）

## 🎨 统一规范

### 表单控件使用规范

1. **数值设置** → 使用下拉菜单（高度、圆角、边框等）
2. **颜色设置** → 使用颜色选择器 + 文本输入框
3. **文本设置** → 使用文本输入框（品牌名称、标语等）

### 默认值规范

- **高度**：2rem（小）
- **圆角**：0.375rem（标准）
- **边框**：1px（细）
- **内边距**：0.75rem（小）

---

**修改时间**：2025-11-25  
**目标**：统一表单元素高度，规范化设置界面

