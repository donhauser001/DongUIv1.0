<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const users = [
  { id: 1001, name: 'Admin', avatar: '', email: 'admin@dong.com', role: '超级管理员', status: true, created: '2023-01-01' },
  { id: 1002, name: 'Sarah', avatar: 'bg-pink-200', email: 'sarah@dong.com', role: '运营经理', status: true, created: '2023-03-15' },
  { id: 1003, name: 'Mike', avatar: 'bg-blue-200', email: 'mike@dong.com', role: '开发人员', status: true, created: '2023-04-20' },
  { id: 1004, name: 'Guest', avatar: 'bg-gray-200', email: 'guest@dong.com', role: '访客', status: false, created: '2023-11-10' },
]
</script>

<template>
  <div class="user-list-container">
    <div class="filter-bar card-base">
      <div class="filter-left">
        <input type="text" placeholder="搜索用户名/邮箱" class="search-input input-base">
        <select class="role-select input-base">
          <option>所有角色</option>
          <option>管理员</option>
          <option>运营</option>
        </select>
        <button class="btn-outline small-btn">查询</button>
      </div>
      <button class="btn-primary small-btn">
        <span class="i-carbon-add-alt mr-1"></span> 新增用户
      </button>
    </div>

    <div class="card-base table-container">
      <table class="table-base">
        <thead>
          <tr>
            <th>用户</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="table-row">
            <td class="user-cell">
              <div class="user-avatar" 
                   :class="user.avatar || 'avatar-default'">
                {{ user.name[0] }}
              </div>
              <div class="user-info">
                <div class="user-name" @click="router.push(`/admin/user/detail/${user.id}`)">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
            </td>
            <td>
              <span class="role-badge">
                {{ user.role }}
              </span>
            </td>
            <td>
               <div class="toggle-wrapper">
                  <input type="checkbox" :checked="user.status" class="toggle-input"/>
                  <label class="toggle-track"></label>
              </div>
            </td>
            <td class="text-secondary">{{ user.created }}</td>
            <td class="text-right action-cell">
              <button class="text-link" @click="router.push(`/admin/user/detail/${user.id}`)">详情</button>
              <button class="text-link-danger">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.user-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-bar {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.filter-left {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  width: 16rem;
}

.role-select {
  width: 8rem;
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

.table-row:hover {
  background-color: var(--color-bg-secondary);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-tertiary);
}

.avatar-default {
  background-color: color-mix(in srgb, var(--color-primary), white 90%);
  color: var(--color-primary);
}

/* Mock avatars - In real app, use img tag or dynamic style */
.bg-pink-200 { background-color: #fbcfe8; color: #be185d; }
.bg-blue-200 { background-color: #bfdbfe; color: #1d4ed8; }
.bg-gray-200 { background-color: #e5e7eb; color: #374151; }

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: color 0.2s;
}

.user-name:hover {
  color: var(--color-primary);
}

.user-email {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

.role-badge {
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.75rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.toggle-wrapper {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 1rem;
  vertical-align: middle;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 9999px;
}

.toggle-track:before {
  position: absolute;
  content: "";
  height: 0.75rem;
  width: 0.75rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-track {
  background-color: var(--color-success);
}

.toggle-input:checked + .toggle-track:before {
  transform: translateX(1rem);
}

.text-secondary {
  color: var(--color-text-secondary);
}

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
  font-size: var(--font-size-sm);
}

.text-link:hover {
  opacity: 0.8;
}

.text-link-danger {
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.text-link-danger:hover {
  color: var(--color-error);
}
</style>

