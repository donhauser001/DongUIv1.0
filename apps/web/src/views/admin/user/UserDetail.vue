<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="user-detail-container">
    <div class="breadcrumb">
      <span class="breadcrumb-link" @click="router.push('/admin/user/list')">用户管理</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">用户详情</span>
    </div>

    <div class="detail-layout">
      <!-- Profile Card -->
      <div class="layout-sidebar">
        <div class="card-base profile-card">
          <div class="profile-avatar">
            S
          </div>
          <h2 class="profile-name">Sarah</h2>
          <p class="profile-email">sarah@dong.com</p>
          
          <div class="profile-badges">
            <span class="badge badge-role">运营经理</span>
            <span class="badge badge-status">状态正常</span>
          </div>

          <div class="profile-info">
            <div class="info-row">
              <span class="info-label">用户 ID</span>
              <span class="info-value">1002</span>
            </div>
            <div class="info-row">
              <span class="info-label">注册时间</span>
              <span class="info-value">2023-03-15</span>
            </div>
            <div class="info-row">
              <span class="info-label">最后登录</span>
              <span class="info-value">2小时前</span>
            </div>
          </div>

          <button class="btn-outline full-width mt-6">重置密码</button>
        </div>
      </div>

      <!-- Activity & Logs -->
      <div class="layout-main">
        <div class="card-base log-card">
          <h3 class="section-title">最近登录日志</h3>
          <table class="table-base">
            <thead>
              <tr>
                <th>时间</th>
                <th>IP 地址</th>
                <th>地点</th>
                <th>设备</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row">
                <td class="text-primary">2023-11-24 10:00:23</td>
                <td class="text-secondary">192.168.1.101</td>
                <td class="text-secondary">中国 杭州</td>
                <td class="text-secondary">Chrome / macOS</td>
              </tr>
              <tr class="table-row">
                <td class="text-primary">2023-11-23 09:15:10</td>
                <td class="text-secondary">192.168.1.101</td>
                <td class="text-secondary">中国 杭州</td>
                <td class="text-secondary">Chrome / macOS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-base permission-card">
          <h3 class="section-title">操作权限概览</h3>
          <div class="perm-tags">
            <span class="perm-tag">order:list</span>
            <span class="perm-tag">order:detail</span>
            <span class="perm-tag">user:list</span>
            <button class="add-perm-btn">+ 分配更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-detail-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.breadcrumb-link {
  cursor: pointer;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.breadcrumb-separator {
  margin: 0 0.5rem;
}

.breadcrumb-current {
  color: var(--color-text-primary);
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
}

.layout-sidebar {
  display: flex;
  flex-direction: column;
}

.profile-card {
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #eff6ff;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.875rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.profile-email {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-top: 0.25rem;
}

.profile-badges {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}

.badge-role {
  background-color: color-mix(in srgb, var(--color-warning), white 85%);
  color: var(--color-warning);
}

.badge-status {
  background-color: color-mix(in srgb, var(--color-success), white 85%);
  color: var(--color-success);
}

.profile-info {
  width: 100%;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.info-label {
  color: var(--color-text-secondary);
}

.info-value {
  color: var(--color-text-primary);
}

.full-width {
  width: 100%;
}

.mt-6 {
  margin-top: 1.5rem;
}

.layout-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.log-card {
  padding: 0;
  overflow: hidden;
}

.section-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 1.5rem 1.5rem 1rem 1.5rem;
  border-left: 4px solid var(--color-primary);
  padding-left: 0.5rem;
  font-size: var(--font-size-base);
}

.table-base {
  width: 100%;
}

.table-row {
  font-size: var(--font-size-sm);
}

.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.permission-card {
  padding: 1.5rem;
}

.perm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.perm-tag {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.add-perm-btn {
  padding: 0.25rem 0.5rem;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  background: none;
  cursor: pointer;
  transition: all 0.2s;
}

.add-perm-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>

