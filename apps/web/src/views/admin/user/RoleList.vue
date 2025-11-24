<script setup lang="ts">
const roles = [
  { id: 1, name: '超级管理员', key: 'admin', users: 3, desc: '拥有系统所有权限' },
  { id: 2, name: '运营经理', key: 'operation', users: 12, desc: '管理订单、查看数据报表' },
  { id: 3, name: '开发人员', key: 'developer', users: 5, desc: '系统维护、日志查看' },
  { id: 4, name: '访客', key: 'guest', users: 156, desc: '仅查看公开信息' },
]
</script>

<template>
  <div class="role-list-container">
    <div class="list-header card-base">
        <h2 class="list-title">角色管理</h2>
        <button class="btn-primary small-btn">
            <span class="i-carbon-add mr-1"></span> 新增角色
        </button>
    </div>

    <div class="role-grid">
        <div v-for="role in roles" :key="role.id" class="role-card card-base">
            <div class="card-top">
                <div class="role-icon-wrapper">
                    <span class="i-carbon-user-role role-icon"></span>
                </div>
                <button class="edit-btn"><span class="i-carbon-edit"></span></button>
            </div>
            <h3 class="role-name">{{ role.name }}</h3>
            <p class="role-key">{{ role.key }}</p>
            <p class="role-desc">{{ role.desc }}</p>
            
            <div class="card-footer">
                <span class="user-count"><strong class="count-num">{{ role.users }}</strong> 个用户</span>
                <button class="perm-btn">权限配置</button>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.role-list-container {
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
  margin: 0;
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.role-card {
  padding: 1.5rem;
  position: relative;
  transition: box-shadow 0.2s;
}

.role-card:hover {
  box-shadow: var(--card-shadow);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.role-icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius);
  background-color: var(--color-bg-secondary); /* Fallback */
  /* Simulate primary tint */
  background-color: color-mix(in srgb, var(--color-primary), white 90%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.role-icon {
  font-size: 1.25rem;
}

.edit-btn {
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;
}

.role-card:hover .edit-btn {
  opacity: 1;
}

.edit-btn:hover {
  color: var(--color-primary);
}

.role-name {
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.role-key {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  font-family: monospace;
  margin-top: 0.25rem;
}

.role-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: 1rem;
  height: 2.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.count-num {
  color: var(--color-text-primary);
}

.perm-btn {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.perm-btn:hover {
  text-decoration: underline;
}
</style>

