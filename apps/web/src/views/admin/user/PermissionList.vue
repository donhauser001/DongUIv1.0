<script setup lang="ts">
// 模拟树形结构数据
const permissions = [
  { 
    id: 1, 
    name: '用户管理', 
    code: 'user', 
    type: '菜单',
    children: [
      { id: 11, name: '用户列表', code: 'user:list', type: '页面' },
      { id: 12, name: '新增用户', code: 'user:create', type: '按钮' },
      { id: 13, name: '编辑用户', code: 'user:update', type: '按钮' },
      { id: 14, name: '删除用户', code: 'user:delete', type: '按钮' },
    ]
  },
  { 
    id: 2, 
    name: '订单管理', 
    code: 'order', 
    type: '菜单',
    children: [
      { id: 21, name: '订单列表', code: 'order:list', type: '页面' },
      { id: 22, name: '导出订单', code: 'order:export', type: '按钮' },
    ]
  }
]
</script>

<template>
  <div class="perm-list-container">
    <div class="list-header card-base">
       <div class="header-info">
         <span class="i-carbon-information info-icon"></span>
         权限点配置仅供开发人员使用，请谨慎操作。
       </div>
       <button class="btn-primary small-btn">新增权限</button>
    </div>

    <div class="card-base table-container">
      <table class="table-base">
        <thead>
          <tr>
            <th>权限名称</th>
            <th>权限标识 (Code)</th>
            <th>类型</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="p in permissions" :key="p.id">
            <!-- Parent Row -->
            <tr class="parent-row">
              <td class="name-cell parent-name">
                <span class="i-carbon-caret-down expand-icon"></span>
                {{ p.name }}
              </td>
              <td class="code-cell">{{ p.code }}</td>
              <td><span class="type-badge type-menu">{{ p.type }}</span></td>
              <td class="text-right action-cell">
                 <button class="text-link small-text mr-2">添加子项</button>
              </td>
            </tr>
            <!-- Child Rows -->
            <tr v-for="c in p.children" :key="c.id" class="child-row">
              <td class="name-cell child-name">
                 {{ c.name }}
              </td>
              <td class="code-cell small-code">{{ c.code }}</td>
              <td>
                <span v-if="c.type === '页面'" class="type-badge type-page">{{ c.type }}</span>
                <span v-else class="type-badge type-btn">{{ c.type }}</span>
              </td>
              <td class="text-right action-cell">
                <button class="text-link small-text">编辑</button>
                <button class="text-link-danger small-text">删除</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.perm-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
}

.info-icon {
  color: var(--color-primary);
  margin-right: 0.25rem;
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
}

.table-container {
  padding: 0;
  overflow: hidden;
}

.parent-row {
  background-color: var(--color-bg-tertiary); /* Light gray background for parents */
  background-color: color-mix(in srgb, var(--color-bg-tertiary), white 50%);
}

.child-row:hover {
  background-color: var(--color-bg-secondary);
}

.name-cell {
  display: flex;
  align-items: center;
}

.parent-name {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.expand-icon {
  margin-right: 0.5rem;
  color: var(--color-text-tertiary);
}

.child-name {
  padding-left: 3rem;
  color: var(--color-text-secondary);
  border-left: 2px solid transparent;
}

.child-row:hover .child-name {
  border-left-color: var(--color-primary);
}

.code-cell {
  color: var(--color-text-secondary);
  font-family: monospace;
}

.small-code {
  font-size: 0.75rem;
}

.type-badge {
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.75rem;
  border: 1px solid transparent;
}

.type-menu { background-color: color-mix(in srgb, var(--color-info), white 90%); color: var(--color-info); border-color: color-mix(in srgb, var(--color-info), white 80%); }
.type-page { background-color: color-mix(in srgb, var(--color-success), white 90%); color: var(--color-success); border-color: color-mix(in srgb, var(--color-success), white 80%); }
.type-btn { background-color: var(--color-bg-tertiary); color: var(--color-text-secondary); border-color: var(--color-border); }

.action-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.text-link {
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.text-link:hover {
  text-decoration: underline;
}

.text-link-danger {
  color: var(--color-error);
  background: none;
  border: none;
  cursor: pointer;
}

.text-link-danger:hover {
  text-decoration: underline;
}

.small-text {
  font-size: 0.75rem;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>

