<script setup lang="ts">
const users = [
  { id: 1001, name: '张三', email: 'zhangsan@dong.com', role: '管理员', status: 'active', lastLogin: '2023-11-20 10:00' },
  { id: 1002, name: '李四', email: 'lisi@dong.com', role: '普通用户', status: 'disabled', lastLogin: '2023-11-19 15:30' },
  { id: 1003, name: '王五', email: 'wangwu@dong.com', role: '编辑', status: 'active', lastLogin: '2023-11-18 09:20' },
  { id: 1004, name: '赵六', email: 'zhaoliu@dong.com', role: '普通用户', status: 'active', lastLogin: '2023-11-20 11:45' },
  { id: 1005, name: '钱七', email: 'qianqi@dong.com', role: '普通用户', status: 'active', lastLogin: '2023-11-20 14:10' },
]
</script>

<template>
  <div class="list-container">
    <!-- Header -->
    <div class="list-header card-base">
      <h2 class="list-title">用户管理</h2>
      <div class="actions">
        <div class="search-wrapper">
          <input type="text" placeholder="搜索用户..." class="search-input input-base">
          <span class="i-carbon-search search-icon"></span>
        </div>
        <button class="btn-primary small-btn">
          <span class="i-carbon-add mr-1"></span> 新增用户
        </button>
      </div>
    </div>

    <!-- Linear Table -->
    <div class="card-base p-0 overflow-hidden">
      <table class="table-base">
        <thead>
          <tr>
            <th style="width: 5rem;">ID</th>
            <th>用户名称</th>
            <th>邮箱地址</th>
            <th>角色</th>
            <th>状态</th>
            <th>最后登录</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="text-secondary">#{{ user.id }}</td>
            <td class="font-medium">{{ user.name }}</td>
            <td class="text-secondary">{{ user.email }}</td>
            <td>
              <span class="role-badge">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span v-if="user.status === 'active'" class="status-active">
                <span class="status-dot-active"></span>已启用
              </span>
              <span v-else class="status-disabled">
                <span class="status-dot-disabled"></span>已禁用
              </span>
            </td>
            <td class="text-secondary">{{ user.lastLogin }}</td>
            <td class="text-right space-x-2">
              <button class="text-link">编辑</button>
              <button class="text-link-danger">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="pagination">
        <span class="pagination-info">显示 1 到 5 条，共 52 条</span>
        <div class="pagination-pages">
          <button class="page-btn">
            <span class="i-carbon-chevron-left"></span>
          </button>
          <button class="page-btn page-active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">
            <span class="i-carbon-chevron-right"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.list-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.search-wrapper {
  position: relative;
}

.search-input {
  padding-left: 2rem;
  padding-right: 0.75rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: var(--font-size-sm);
  height: auto;
}

.search-icon {
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
}

.text-secondary {
  color: var(--color-text-secondary);
}

.font-medium {
  font-weight: var(--font-weight-medium);
}

.role-badge {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.75rem;
  border: var(--border-width) solid var(--color-border);
}

.status-active {
  display: flex;
  align-items: center;
  color: var(--color-success);
  font-size: 0.75rem;
}

.status-disabled {
  display: flex;
  align-items: center;
  color: var(--color-text-tertiary);
  font-size: 0.75rem;
}

.status-dot-active {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: var(--color-success);
  margin-right: 0.375rem;
}

.status-dot-disabled {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: var(--color-text-tertiary);
  margin-right: 0.375rem;
}

.text-link {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  background: none;
  border: none;
  cursor: pointer;
}

.text-link:hover {
  opacity: 0.8;
}

.text-link-danger {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  background: none;
  border: none;
  cursor: pointer;
}

.text-link-danger:hover {
  opacity: 0.8;
}

.pagination {
  padding: 0.75rem 1.5rem;
  border-top: var(--border-width) solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg-secondary);
}

.pagination-info {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.pagination-pages {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.page-active {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  color: white;
}

.page-active:hover {
  color: white;
}
</style>

