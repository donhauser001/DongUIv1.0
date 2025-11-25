# ActionMenu 操作菜单组件

统一的列表操作菜单组件，使用三点图标触发，点击后显示浮动菜单。

## 📋 功能特性

### 核心功能
- ✅ 三点图标触发器
- ✅ 浮动菜单显示
- ✅ 点击外部自动关闭
- ✅ 支持图标和文字
- ✅ 支持禁用状态
- ✅ 支持危险操作样式
- ✅ 支持分隔线
- ✅ 平滑过渡动画

### 位置选项
- ✅ `bottom-end` - 右下方（默认）
- ✅ `bottom-start` - 左下方
- ✅ `top-end` - 右上方
- ✅ `top-start` - 左上方

## 🚀 基础使用

### 导入组件

```vue
<script setup lang="ts">
import ActionMenu, { type ActionMenuItem } from '@/components/ActionMenu.vue'

const menuItems: ActionMenuItem[] = [
  {
    label: '查看详情',
    icon: 'i-carbon-view',
    onClick: () => console.log('查看详情')
  },
  {
    label: '编辑',
    icon: 'i-carbon-edit',
    onClick: () => console.log('编辑')
  },
  { divider: true },
  {
    label: '删除',
    icon: 'i-carbon-trash-can',
    danger: true,
    onClick: () => console.log('删除')
  }
]
</script>

<template>
  <ActionMenu :items="menuItems" />
</template>
```

## 📖 API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `ActionMenuItem[]` | **必填** | 菜单项数组 |
| `placement` | `'bottom-end' \| 'bottom-start' \| 'top-end' \| 'top-start'` | `'bottom-end'` | 菜单显示位置 |

### ActionMenuItem 类型

```typescript
interface ActionMenuItem {
  label: string          // 菜单项文字
  icon?: string          // 图标类名（UnoCSS）
  onClick: () => void    // 点击回调
  disabled?: boolean     // 是否禁用
  danger?: boolean       // 是否为危险操作（红色）
  divider?: boolean      // 是否为分隔线
}
```

## 💡 使用示例

### 示例 1: 基础菜单

```vue
<script setup lang="ts">
import ActionMenu, { type ActionMenuItem } from '@/components/ActionMenu.vue'

const actions: ActionMenuItem[] = [
  {
    label: '查看',
    icon: 'i-carbon-view',
    onClick: () => handleView()
  },
  {
    label: '编辑',
    icon: 'i-carbon-edit',
    onClick: () => handleEdit()
  }
]
</script>

<template>
  <ActionMenu :items="actions" />
</template>
```

### 示例 2: 带分隔线和危险操作

```vue
<script setup lang="ts">
const actions: ActionMenuItem[] = [
  {
    label: '复制',
    icon: 'i-carbon-copy',
    onClick: () => handleCopy()
  },
  {
    label: '下载',
    icon: 'i-carbon-download',
    onClick: () => handleDownload()
  },
  { divider: true },  // 分隔线
  {
    label: '删除',
    icon: 'i-carbon-trash-can',
    danger: true,  // 危险操作（红色）
    onClick: () => handleDelete()
  }
]
</script>
```

### 示例 3: 条件禁用

```vue
<script setup lang="ts">
const canEdit = ref(false)

const actions: ActionMenuItem[] = [
  {
    label: '编辑',
    icon: 'i-carbon-edit',
    disabled: !canEdit.value,  // 条件禁用
    onClick: () => handleEdit()
  }
]
</script>
```

### 示例 4: 在表格中使用

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActionMenu, { type ActionMenuItem } from '@/components/ActionMenu.vue'

const router = useRouter()

const getUserActions = (user: User): ActionMenuItem[] => {
  const actions: ActionMenuItem[] = [
    {
      label: '查看详情',
      icon: 'i-carbon-view',
      onClick: () => router.push(`/user/${user.id}`)
    },
    {
      label: '编辑',
      icon: 'i-carbon-edit',
      onClick: () => router.push(`/user/${user.id}/edit`)
    }
  ]

  // 根据条件添加删除选项
  if (user.role !== 'SUPER_ADMIN') {
    actions.push(
      { divider: true },
      {
        label: '删除',
        icon: 'i-carbon-trash-can',
        danger: true,
        onClick: () => handleDelete(user)
      }
    )
  }

  return actions
}
</script>

<template>
  <table class="table-base">
    <thead>
      <tr>
        <th>姓名</th>
        <th>邮箱</th>
        <th class="text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td class="text-right">
          <ActionMenu :items="getUserActions(user)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

### 示例 5: 不同位置

```vue
<template>
  <!-- 右下方（默认） -->
  <ActionMenu :items="actions" placement="bottom-end" />

  <!-- 左下方 -->
  <ActionMenu :items="actions" placement="bottom-start" />

  <!-- 右上方 -->
  <ActionMenu :items="actions" placement="top-end" />

  <!-- 左上方 -->
  <ActionMenu :items="actions" placement="top-start" />
</template>
```

## 🎨 样式定制

### CSS 变量

组件使用以下 CSS 变量，可在全局主题中自定义：

```css
--color-bg-primary      /* 菜单背景色 */
--color-bg-secondary    /* 悬停背景色 */
--color-border          /* 边框颜色 */
--color-text-primary    /* 文字颜色 */
--color-text-secondary  /* 图标颜色 */
--color-primary         /* 激活状态颜色 */
```

### 自定义样式

如需自定义样式，可以覆盖以下类：

```css
/* 触发按钮 */
.action-menu-trigger {
  /* 自定义样式 */
}

/* 菜单容器 */
.action-menu-dropdown {
  /* 自定义样式 */
}

/* 菜单项 */
.menu-item {
  /* 自定义样式 */
}

/* 危险操作 */
.menu-item.danger {
  /* 自定义样式 */
}
```

## 💡 最佳实践

### 1. 菜单项数量

- ✅ **推荐**: 3-7 个菜单项
- ⚠️ **谨慎**: 超过 7 个菜单项（考虑分组或二级菜单）

### 2. 图标使用

- ✅ **推荐**: 为所有菜单项添加图标，提高识别度
- ✅ 使用 UnoCSS Carbon 图标系列保持一致性

### 3. 危险操作

- ✅ 将删除、清空等危险操作放在最后
- ✅ 使用分隔线与其他操作分开
- ✅ 设置 `danger: true` 显示红色警告

### 4. 禁用状态

- ✅ 使用 `disabled` 属性而不是隐藏菜单项
- ✅ 让用户知道功能存在但当前不可用

### 5. 位置选择

- ✅ 表格右侧操作列：使用 `bottom-end`（默认）
- ✅ 表格左侧：使用 `bottom-start`
- ✅ 页面底部：使用 `top-end` 或 `top-start`

## 🔧 常见问题

### Q: 菜单被容器裁剪了怎么办？

A: 确保父容器没有 `overflow: hidden`，或者设置 `overflow: visible`。

### Q: 如何在菜单项中添加二级菜单？

A: 当前版本不支持二级菜单。如需复杂菜单结构，建议拆分为多个独立菜单或使用模态框。

### Q: 如何自定义触发图标？

A: 目前使用固定的三点图标。如需自定义，可以修改组件源码中的图标类名。

### Q: 菜单点击后不关闭怎么办？

A: 确保在 `onClick` 回调中没有调用 `event.stopPropagation()`，这会阻止菜单关闭。

## 📝 相关文档

- [UnoCSS Icons](https://unocss.dev/presets/icons)
- [Carbon Design Icons](https://carbondesignsystem.com/guidelines/icons/library/)
- [用户管理系统](./05_用户管理系统.md)

---

**最后更新**: 2024-11-24

