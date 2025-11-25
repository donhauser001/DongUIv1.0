<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers, createUser, deleteUser, toggleUserStatus, type User, type CreateUserDto } from '@/api/user'
import { getRoles, type Role } from '@/api/role'
import ActionMenu, { type ActionMenuItem } from '@/components/ActionMenu.vue'
import Modal from '@/components/Modal.vue'

const router = useRouter()

// 数据状态
const users = ref<User[]>([])
const roles = ref<Role[]>([])
const loading = ref(false)
const showCreateModal = ref(false)
const creating = ref(false)

// 筛选条件
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref<boolean | undefined>(undefined)

// 创建用户表单
const createForm = ref<CreateUserDto>({
  name: '',
  email: '',
  phone: '',
  password: '',
  roleId: '',
  gender: undefined,
  birthday: '',
  address: '',
  bio: '',
})

// 密码强度
const passwordStrength = computed(() => {
  const password = createForm.value.password
  if (!password) return { level: 0, text: '', color: '' }
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  if (strength <= 2) return { level: strength, text: '弱', color: '#ef4444' }
  if (strength <= 3) return { level: strength, text: '中', color: '#f59e0b' }
  return { level: strength, text: '强', color: '#10b981' }
})

// 加载角色列表
const loadRoles = async () => {
  try {
    roles.value = await getRoles()
    // 设置默认角色为 STUDENT
    if (roles.value.length > 0) {
      const studentRole = roles.value.find(r => r.key === 'STUDENT')
      if (studentRole) {
        createForm.value.roleId = studentRole.id
      }
    }
  } catch (error: any) {
    console.error('Failed to load roles:', error)
  }
}

// 加载用户列表
const loadUsers = async () => {
  loading.value = true
  try {
    users.value = await getUsers({
      search: searchQuery.value || undefined,
      role: roleFilter.value || undefined,
      status: statusFilter.value,
    })
  } catch (error) {
    console.error('Failed to load users:', error)
    alert('加载用户列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  loadUsers()
}

// 打开创建模态窗
const openCreateModal = () => {
  // 找到 STUDENT 角色的 ID
  const studentRole = roles.value.find(r => r.key === 'STUDENT')
  
  createForm.value = {
    name: '',
    email: '',
    phone: '',
    password: '',
    roleId: studentRole?.id || '',
    gender: undefined,
    birthday: '',
    address: '',
    bio: '',
  }
  showCreateModal.value = true
}

// 关闭创建模态窗
const closeCreateModal = () => {
  showCreateModal.value = false
}

// 取消创建
const handleCancelCreate = () => {
  closeCreateModal()
}

// 创建用户
const handleCreate = async () => {
  // 验证
  if (!createForm.value.name) {
    alert('请输入姓名')
    return
  }
  if (!createForm.value.phone) {
    alert('请输入手机号')
    return
  }
  // 验证手机号格式（中国大陆手机号）
  if (!/^1[3-9]\d{9}$/.test(createForm.value.phone)) {
    alert('请输入有效的手机号（11位数字）')
    return
  }
  if (!createForm.value.email) {
    alert('请输入邮箱')
    return
  }
  if (!createForm.value.email.includes('@')) {
    alert('请输入有效的邮箱地址')
    return
  }
  if (!createForm.value.password) {
    alert('请输入密码')
    return
  }
  if (createForm.value.password.length < 6) {
    alert('密码长度至少为 6 位')
    return
  }

  creating.value = true
  try {
    await createUser(createForm.value)
    alert('用户创建成功')
    closeCreateModal()
    await loadUsers()
  } catch (error: any) {
    console.error('Failed to create user:', error)
    alert(error.message || '创建用户失败')
  } finally {
    creating.value = false
  }
}

// 切换用户状态
const handleToggleStatus = async (user: User) => {
  try {
    const updated = await toggleUserStatus(user.id)
    // 更新本地数据
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index] = updated
    }
  } catch (error) {
    console.error('Failed to toggle user status:', error)
    alert('切换用户状态失败')
  }
}

// 删除用户
const handleDelete = async (user: User) => {
  if (!confirm(`确定要删除用户 "${user.name}" 吗？`)) {
    return
  }

  try {
    await deleteUser(user.id)
    // 重新加载列表
    loadUsers()
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert('删除用户失败')
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 获取头像显示
const getAvatarDisplay = (user: User) => {
  if (user?.avatar) {
    return user.avatar
  }
  return user?.name?.[0]?.toUpperCase() || 'U'
}

// 获取用户操作菜单
const getUserActions = (user: User): ActionMenuItem[] => {
  const actions: ActionMenuItem[] = [
    {
      label: '查看详情',
      icon: 'i-carbon-view',
      onClick: () => router.push(`/admin/user/detail/${user.id}`)
    },
    {
      label: '编辑',
      icon: 'i-carbon-edit',
      onClick: () => router.push(`/admin/user/detail/${user.id}`)
    }
  ]

  // 只有非超级管理员才能删除
  if (user?.role?.key !== 'SUPER_ADMIN') {
    actions.push(
      { divider: true } as ActionMenuItem,
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

// 页面加载时获取数据
onMounted(() => {
  loadRoles()
  loadUsers()
})
</script>

<template>
  <div class="user-list-container">
    <!-- 筛选栏 -->
    <div class="filter-bar card-base">
      <div class="filter-left">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索用户名/邮箱" 
          class="search-input input-base"
          @keyup.enter="handleSearch"
        >
        <select v-model="roleFilter" class="role-select input-base" @change="handleSearch">
          <option value="">所有角色</option>
          <option value="STUDENT">学生</option>
          <option value="TEACHER">教师</option>
          <option value="ADMIN">管理员</option>
          <option value="SUPER_ADMIN">超级管理员</option>
        </select>
        <select v-model="statusFilter" class="role-select input-base" @change="handleSearch">
          <option :value="undefined">所有状态</option>
          <option :value="true">已启用</option>
          <option :value="false">已禁用</option>
        </select>
        <button class="btn-outline small-btn" @click="handleSearch">查询</button>
      </div>
      <button class="btn-primary small-btn" @click="openCreateModal">
        <span class="i-carbon-add-alt mr-1"></span> 新增用户
      </button>
    </div>

    <!-- 用户表格 -->
    <div class="card-base table-container">
      <div v-if="loading" class="loading-state">
        <span class="i-carbon-loading loading-icon"></span>
        <p>加载中...</p>
      </div>

      <div v-else-if="users.length === 0" class="empty-state">
        <span class="i-carbon-user-avatar empty-icon"></span>
        <p>暂无用户数据</p>
      </div>

      <table v-else class="table-base">
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
              <div class="user-cell-content">
                <div class="user-avatar" :class="{ 'has-image': user.avatar }">
                  <img v-if="user?.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('data:'))" :src="user.avatar" :alt="user.name || '用户'">
                  <span v-else>{{ getAvatarDisplay(user) }}</span>
                </div>
                <div class="user-info">
                  <div class="user-name" @click="router.push(`/admin/user/detail/${user.id}`)">
                    {{ user.name || '未命名用户' }}
                  </div>
                  <div class="user-email">{{ user.email || '无邮箱' }}</div>
                </div>
              </div>
            </td>
            <td>
              <span v-if="user.role" class="role-badge" :class="`role-${user.role.key?.toLowerCase() || 'unknown'}`">
                {{ user.role.name || '未知' }}
              </span>
              <span v-else class="role-badge role-unknown">未知</span>
            </td>
            <td>
              <div class="toggle-wrapper">
                <input 
                  type="checkbox" 
                  :checked="user.status" 
                  @change="handleToggleStatus(user)"
                  class="toggle-input"
                >
                <span class="toggle-label">{{ user.status ? '已启用' : '已禁用' }}</span>
              </div>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td class="text-right">
              <ActionMenu :items="getUserActions(user)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 创建用户模态窗 -->
    <Modal
      v-model="showCreateModal"
      title="新增用户"
      size="medium"
      confirm-text="确认创建"
      cancel-text="取消"
      :confirm-loading="creating"
      @confirm="handleCreate"
      @cancel="handleCancelCreate"
    >
      <div class="create-user-form">
          <!-- 基本信息 -->
          <div class="form-section">
            <h4 class="form-section-title">基本信息</h4>
            
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">姓名 <span class="required">*</span></label>
                <input 
                  v-model="createForm.name" 
                  type="text" 
                  class="input-base"
                  placeholder="请输入姓名"
                  :disabled="creating"
                />
              </div>

              <div class="form-field">
                <label class="form-label">性别</label>
                <select v-model="createForm.gender" class="input-base" :disabled="creating">
                  <option :value="undefined">请选择</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label class="form-label">手机号 <span class="required">*</span></label>
                <input 
                  v-model="createForm.phone" 
                  type="tel" 
                  class="input-base"
                  placeholder="请输入11位手机号"
                  maxlength="11"
                  :disabled="creating"
                />
              </div>

              <div class="form-field">
                <label class="form-label">生日</label>
                <input 
                  v-model="createForm.birthday" 
                  type="date" 
                  class="input-base"
                  :disabled="creating"
                />
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">邮箱 <span class="required">*</span></label>
              <input 
                v-model="createForm.email" 
                type="email" 
                class="input-base"
                placeholder="请输入邮箱地址"
                :disabled="creating"
              />
            </div>

            <div class="form-field">
              <label class="form-label">地址</label>
              <input 
                v-model="createForm.address" 
                type="text" 
                class="input-base"
                placeholder="请输入地址"
                :disabled="creating"
              />
            </div>

            <div class="form-field">
              <label class="form-label">个人简介</label>
              <textarea 
                v-model="createForm.bio" 
                class="textarea-base"
                placeholder="请输入个人简介"
                rows="3"
                :disabled="creating"
              ></textarea>
            </div>
          </div>

          <!-- 账号信息 -->
          <div class="form-section">
            <h4 class="form-section-title">账号信息</h4>

            <div class="form-field">
              <label class="form-label">密码 <span class="required">*</span></label>
              <input 
                v-model="createForm.password" 
                type="password" 
                class="input-base"
                placeholder="请输入密码（至少 6 位）"
                :disabled="creating"
              />
              <!-- 密码强度指示器 -->
              <div v-if="createForm.password" class="password-strength">
                <div class="strength-bar">
                  <div 
                    class="strength-fill" 
                    :style="{ 
                      width: `${(passwordStrength.level / 5) * 100}%`,
                      backgroundColor: passwordStrength.color 
                    }"
                  ></div>
                </div>
                <span class="strength-text" :style="{ color: passwordStrength.color }">
                  密码强度：{{ passwordStrength.text }}
                </span>
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">角色 <span class="required">*</span></label>
              <select v-model="createForm.roleId" class="input-base" :disabled="creating">
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
    </Modal>
  </div>
</template>

<style scoped>
.user-list-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-left {
  display: flex;
  gap: 0.75rem;
  flex: 1;
  flex-wrap: wrap;
}

.search-input {
  min-width: 200px;
  flex: 1;
  max-width: 300px;
}

.role-select {
  min-width: 120px;
}

.small-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.table-container {
  overflow-x: auto;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-secondary);
}

.loading-icon,
.empty-icon {
  font-size: 3rem;
  display: block;
  margin: 0 auto 1rem;
  color: var(--color-text-tertiary);
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.user-cell {
  padding: var(--table-padding-y) var(--table-padding-x) !important;
}

.user-cell-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  overflow: hidden;
}

.user-avatar.has-image {
  background: transparent;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.user-name {
  font-weight: 500;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: color 0.2s;
  font-size: var(--table-row-font-size);
}

.user-name:hover {
  color: var(--color-primary);
}

.user-email {
  font-size: calc(var(--table-row-font-size) * 0.875);
  color: var(--color-text-secondary);
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.role-badge.role-super_admin {
  background: color-mix(in srgb, var(--color-error), white 90%);
  color: var(--color-error);
  border-color: var(--color-error);
}

.role-badge.role-admin {
  background: color-mix(in srgb, var(--color-primary), white 90%);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.role-badge.role-teacher {
  background: color-mix(in srgb, var(--color-info), white 90%);
  color: var(--color-info);
  border-color: var(--color-info);
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-input {
  cursor: pointer;
}

.toggle-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.text-right {
  text-align: right;
}

/* 创建用户表单样式 */
.create-user-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: var(--border-width) solid var(--color-border);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.required {
  color: var(--color-error);
}

.password-strength {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.strength-bar {
  width: 100%;
  height: 4px;
  background: var(--color-bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 500;
}

</style>
