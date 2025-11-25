<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRoles, createRole, updateRole, deleteRole, type Role, type CreateRoleDto, type UpdateRoleDto } from '@/api/role'
import Modal from '@/components/Modal.vue'

const roles = ref<Role[]>([])
const loading = ref(false)

// 模态窗状态
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingRole = ref<Role | null>(null)

// 表单数据
const createForm = ref<CreateRoleDto>({
  name: '',
  key: '',
  description: '',
})

const editForm = ref<UpdateRoleDto>({
  name: '',
  key: '',
  description: '',
})

// 加载角色列表
const loadRoles = async () => {
  loading.value = true
  try {
    roles.value = await getRoles()
  } catch (error: any) {
    console.error('Failed to load roles:', error)
    alert('加载角色列表失败')
  } finally {
    loading.value = false
  }
}

// 打开新增模态窗
const openCreateModal = () => {
  createForm.value = {
    name: '',
    key: '',
    description: '',
  }
  showCreateModal.value = true
}

// 创建角色
const handleCreate = async () => {
  // 验证
  if (!createForm.value.name || !createForm.value.key) {
    alert('请填写角色名称和标识')
    return
  }

  try {
    await createRole(createForm.value)
    alert('角色创建成功')
    showCreateModal.value = false
    await loadRoles()
  } catch (error: any) {
    console.error('Failed to create role:', error)
    alert(error.message || '创建角色失败')
  }
}

// 打开编辑模态窗
const openEditModal = (role: Role) => {
  editingRole.value = role
  editForm.value = {
    name: role.name,
    key: role.key,
    description: role.description,
  }
  showEditModal.value = true
}

// 更新角色
const handleUpdate = async () => {
  if (!editingRole.value) return

  // 验证
  if (!editForm.value.name || !editForm.value.key) {
    alert('请填写角色名称和标识')
    return
  }

  try {
    await updateRole(editingRole.value.id, editForm.value)
    alert('角色更新成功')
    showEditModal.value = false
    await loadRoles()
  } catch (error: any) {
    console.error('Failed to update role:', error)
    alert(error.message || '更新角色失败')
  }
}

// 删除角色
const handleDelete = async (role: Role) => {
  if (role.isSystem) {
    alert('系统角色不可删除')
    return
  }

  if (role.userCount > 0) {
    alert(`该角色下有 ${role.userCount} 个用户，请先重新分配用户角色`)
    return
  }

  if (!confirm(`确定要删除角色"${role.name}"吗？`)) {
    return
  }

  try {
    await deleteRole(role.id)
    alert('角色删除成功')
    await loadRoles()
  } catch (error: any) {
    console.error('Failed to delete role:', error)
    alert(error.message || '删除角色失败')
  }
}

onMounted(() => {
  loadRoles()
})
</script>

<template>
  <div class="role-list-container">
    <div class="list-header card-base">
      <h2 class="list-title">角色管理</h2>
      <button class="btn-primary small-btn" @click="openCreateModal">
        <span class="i-carbon-add mr-1"></span> 新增角色
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <span class="i-carbon-loading loading-icon"></span>
      <p>加载中...</p>
    </div>

    <!-- 角色列表 -->
    <div v-else class="role-grid">
      <div v-for="role in roles" :key="role.id" class="role-card card-base">
        <div class="card-top">
          <div class="role-icon-wrapper">
            <span class="i-carbon-user-role role-icon"></span>
          </div>
          <div class="card-actions">
            <button class="action-btn" @click="openEditModal(role)" :title="role.isSystem ? '系统角色可编辑但不可删除' : '编辑角色'">
              <span class="i-carbon-edit"></span>
            </button>
            <button 
              v-if="!role.isSystem" 
              class="action-btn delete-btn" 
              @click="handleDelete(role)"
              :disabled="role.userCount > 0"
              :title="role.userCount > 0 ? '该角色下有用户，无法删除' : '删除角色'"
            >
              <span class="i-carbon-trash-can"></span>
            </button>
          </div>
        </div>
        <h3 class="role-name">
          {{ role.name }}
          <span v-if="role.isSystem" class="system-badge">系统</span>
        </h3>
        <p class="role-key">{{ role.key }}</p>
        <p class="role-desc">{{ role.description || '暂无描述' }}</p>
        
        <div class="card-footer">
          <span class="user-count">
            <strong class="count-num">{{ role.userCount }}</strong> 个用户
          </span>
        </div>
      </div>
    </div>

    <!-- 新增角色模态窗 -->
    <Modal
      v-model="showCreateModal"
      title="新增角色"
      size="medium"
      confirm-text="确认创建"
      cancel-text="取消"
      @confirm="handleCreate"
    >
      <div class="form-container">
        <div class="form-field">
          <label class="form-label">角色名称 <span class="required">*</span></label>
          <input 
            v-model="createForm.name" 
            type="text" 
            class="input-base"
            placeholder="例如：运营经理"
          />
        </div>

        <div class="form-field">
          <label class="form-label">角色标识 <span class="required">*</span></label>
          <input 
            v-model="createForm.key" 
            type="text" 
            class="input-base"
            placeholder="例如：OPERATION_MANAGER（大写字母和下划线）"
          />
          <p class="field-hint">角色标识用于系统内部识别，建议使用大写字母和下划线</p>
        </div>

        <div class="form-field">
          <label class="form-label">角色描述</label>
          <textarea 
            v-model="createForm.description" 
            class="textarea-base"
            placeholder="描述该角色的职责和权限"
            rows="3"
          ></textarea>
        </div>
      </div>
    </Modal>

    <!-- 编辑角色模态窗 -->
    <Modal
      v-model="showEditModal"
      title="编辑角色"
      size="medium"
      confirm-text="确认更新"
      cancel-text="取消"
      @confirm="handleUpdate"
    >
      <div class="form-container">
        <div v-if="editingRole?.isSystem" class="info-tip">
          <span class="i-carbon-information"></span>
          <p>这是系统角色，可以编辑名称和描述，但不可删除</p>
        </div>

        <div class="form-field">
          <label class="form-label">角色名称 <span class="required">*</span></label>
          <input 
            v-model="editForm.name" 
            type="text" 
            class="input-base"
            placeholder="例如：运营经理"
          />
        </div>

        <div class="form-field">
          <label class="form-label">角色标识 <span class="required">*</span></label>
          <input 
            v-model="editForm.key" 
            type="text" 
            class="input-base"
            placeholder="例如：OPERATION_MANAGER"
            :disabled="editingRole?.isSystem"
          />
          <p class="field-hint">{{ editingRole?.isSystem ? '系统角色的标识不可修改' : '角色标识用于系统内部识别' }}</p>
        </div>

        <div class="form-field">
          <label class="form-label">角色描述</label>
          <textarea 
            v-model="editForm.description" 
            class="textarea-base"
            placeholder="描述该角色的职责和权限"
            rows="3"
          ></textarea>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.role-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
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

.mr-1 {
  margin-right: 0.25rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-secondary);
}

.loading-icon {
  font-size: 3rem;
  display: block;
  margin: 0 auto 1rem;
  color: var(--color-text-tertiary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  background-color: color-mix(in srgb, var(--color-primary), white 90%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.role-icon {
  font-size: 1.25rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.role-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.2s;
  font-size: 1.125rem;
}

.action-btn:hover {
  color: var(--color-primary);
}

.action-btn.delete-btn:hover {
  color: var(--color-error);
}

.action-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.role-name {
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.system-badge {
  font-size: var(--font-size-xs, 0.625rem);
  font-weight: var(--font-weight-medium, 500);
  padding: var(--spacing-xs, 0.125rem) var(--spacing-xs, 0.375rem);
  border-radius: calc(var(--radius) * 0.5);
  background: color-mix(in srgb, var(--color-info), white 90%);
  color: var(--color-info);
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
  min-height: 2.5rem;
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

/* 表单样式 */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.field-hint {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin: 0;
}

.info-tip {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: color-mix(in srgb, var(--color-info), white 95%);
  border-left: 3px solid var(--color-info);
  border-radius: var(--radius);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.info-tip span {
  color: var(--color-info);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.info-tip p {
  margin: 0;
}
</style>
