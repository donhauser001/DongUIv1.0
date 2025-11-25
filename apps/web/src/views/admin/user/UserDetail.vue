<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserById, updateUser, ROLE_NAMES, type User, type UpdateUserDto } from '@/api/user'

const router = useRouter()
const route = useRoute()

const user = ref<User | null>(null)
const loading = ref(false)
const editing = ref(false)
const saving = ref(false)

// Tab 状态
const activeTab = ref<'info' | 'password' | 'avatar'>('info')

// 编辑表单数据
const form = ref<UpdateUserDto>({
  name: '',
  email: '',
  phone: '',
  role: 'STUDENT',
  status: true,
  gender: undefined,
  birthday: '',
  address: '',
  bio: '',
})

// 修改密码表单
const passwordForm = ref({
  newPassword: '',
  confirmPassword: '',
})

// 头像上传
const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string>('')
const uploadingAvatar = ref(false)

// 密码强度
const passwordStrength = computed(() => {
  const password = passwordForm.value.newPassword
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

// 密码匹配检查
const passwordsMatch = computed(() => {
  if (!passwordForm.value.confirmPassword) return true
  return passwordForm.value.newPassword === passwordForm.value.confirmPassword
})

// 加载用户详情
const loadUser = async () => {
  const userId = route.params.id as string
  if (!userId) {
    router.push('/admin/user/list')
    return
  }

  loading.value = true
  try {
    user.value = await getUserById(userId)
    // 初始化表单
    form.value = {
      name: user.value.name,
      email: user.value.email,
      phone: user.value.phone || '',
      role: user.value.role,
      status: user.value.status,
      gender: user.value.gender,
      birthday: user.value.birthday ? user.value.birthday.split('T')[0] : '',
      address: user.value.address || '',
      bio: user.value.bio || '',
    }
    // 初始化头像预览
    if (user.value.avatar) {
      avatarPreview.value = user.value.avatar
    }
  } catch (error) {
    console.error('Failed to load user:', error)
    alert('加载用户信息失败')
    router.push('/admin/user/list')
  } finally {
    loading.value = false
  }
}

// 切换编辑模式
const toggleEdit = () => {
  if (editing.value) {
    // 取消编辑，恢复原始数据
    if (user.value) {
      form.value = {
        name: user.value.name,
        email: user.value.email,
        phone: user.value.phone || '',
        role: user.value.role,
        status: user.value.status,
        gender: user.value.gender,
        birthday: user.value.birthday ? user.value.birthday.split('T')[0] : '',
        address: user.value.address || '',
        bio: user.value.bio || '',
      }
    }
  }
  editing.value = !editing.value
}

// 保存基本信息
const handleSave = async () => {
  if (!user.value) return

  saving.value = true
  try {
    const updated = await updateUser(user.value.id, form.value)
    user.value = updated
    editing.value = false
    alert('保存成功')
  } catch (error) {
    console.error('Failed to update user:', error)
    alert('保存失败')
  } finally {
    saving.value = false
  }
}

// 修改密码
const handleChangePassword = async () => {
  if (!user.value) return
  
  // 验证
  if (!passwordForm.value.newPassword) {
    alert('请输入新密码')
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    alert('密码长度至少为 6 位')
    return
  }
  
  if (!passwordsMatch.value) {
    alert('两次输入的密码不一致')
    return
  }
  
  saving.value = true
  try {
    await updateUser(user.value.id, { password: passwordForm.value.newPassword })
    alert('密码修改成功')
    // 清空表单
    passwordForm.value = {
      newPassword: '',
      confirmPassword: '',
    }
  } catch (error) {
    console.error('Failed to change password:', error)
    alert('密码修改失败')
  } finally {
    saving.value = false
  }
}

// 处理头像文件选择
const handleAvatarSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  
  // 验证文件大小（最大 2MB）
  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过 2MB')
    return
  }
  
  avatarFile.value = file
  
  // 生成预览
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// 上传头像
const handleUploadAvatar = async () => {
  if (!user.value || !avatarPreview.value) return
  
  uploadingAvatar.value = true
  try {
    // 使用 Base64 字符串作为头像
    await updateUser(user.value.id, { avatar: avatarPreview.value })
    user.value.avatar = avatarPreview.value
    alert('头像上传成功')
    avatarFile.value = null
  } catch (error) {
    console.error('Failed to upload avatar:', error)
    alert('头像上传失败')
  } finally {
    uploadingAvatar.value = false
  }
}

// 删除头像
const handleRemoveAvatar = async () => {
  if (!user.value) return
  
  if (!confirm('确定要删除头像吗？')) return
  
  uploadingAvatar.value = true
  try {
    await updateUser(user.value.id, { avatar: null })
    user.value.avatar = null
    avatarPreview.value = ''
    avatarFile.value = null
    alert('头像已删除')
  } catch (error) {
    console.error('Failed to remove avatar:', error)
    alert('删除头像失败')
  } finally {
    uploadingAvatar.value = false
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN')
}

// 获取头像显示
const getAvatarDisplay = computed(() => {
  if (!user.value) return 'U'
  if (avatarPreview.value) return avatarPreview.value
  if (user.value.avatar) return user.value.avatar
  return user.value.name[0]?.toUpperCase() || 'U'
})

// 是否为超级管理员
const isSuperAdmin = computed(() => user.value?.role === 'SUPER_ADMIN')

// 页面加载时获取数据
onMounted(() => {
  loadUser()
})
</script>

<template>
  <div class="user-detail-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <p>加载中...</p>
    </div>

    <!-- 用户详情 -->
    <div v-else-if="user" class="user-detail-content">
      <!-- 顶部操作栏 -->
      <div class="detail-header">
        <div>
          <h2 class="detail-title">用户详情</h2>
          <p class="detail-subtitle">查看和编辑用户信息</p>
        </div>
        <button @click="router.push('/admin/user/list')" class="btn-outline">
          <span class="i-carbon-arrow-left"></span>
          返回列表
        </button>
      </div>

      <!-- Tab 导航 -->
      <div class="tab-group" style="margin-bottom: 2rem;">
        <button
          @click="activeTab = 'info'"
          class="tab-btn"
          :class="{ active: activeTab === 'info' }"
        >
          <span class="i-carbon-user"></span>
          基本信息
        </button>
        <button
          @click="activeTab = 'password'"
          class="tab-btn"
          :class="{ active: activeTab === 'password' }"
        >
          <span class="i-carbon-password"></span>
          修改密码
        </button>
        <button
          @click="activeTab = 'avatar'"
          class="tab-btn"
          :class="{ active: activeTab === 'avatar' }"
        >
          <span class="i-carbon-user-avatar"></span>
          头像设置
        </button>
      </div>

      <!-- 基本信息 Tab -->
      <div v-if="activeTab === 'info'" class="info-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">基本信息</h3>
            <p class="card-desc">用户的基础资料</p>
          </div>
          <button v-if="!editing" @click="toggleEdit" class="btn-primary">
            <span class="i-carbon-edit"></span>
            编辑
          </button>
          <div v-else style="display: flex; gap: 0.5rem;">
            <button @click="handleSave" :disabled="saving" class="btn-primary">
              <span class="i-carbon-checkmark"></span>
              {{ saving ? '保存中...' : '保存' }}
            </button>
            <button @click="toggleEdit" :disabled="saving" class="btn-outline">
              <span class="i-carbon-close"></span>
              取消
            </button>
          </div>
        </div>

        <div class="card-content">
          <!-- 头像预览 -->
          <div class="user-avatar-section">
            <div class="user-avatar-large">
              <img v-if="getAvatarDisplay.startsWith('data:') || getAvatarDisplay.startsWith('http')" 
                   :src="getAvatarDisplay" 
                   alt="Avatar" />
              <span v-else class="avatar-placeholder">{{ getAvatarDisplay }}</span>
            </div>
            <div>
              <p class="user-name">{{ user.name }}</p>
              <p class="user-role">{{ ROLE_NAMES[user.role] }}</p>
            </div>
          </div>

          <!-- 表单 -->
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">姓名</label>
              <input 
                v-model="form.name" 
                type="text" 
                class="input-base" 
                :disabled="!editing"
                placeholder="请输入姓名"
              />
            </div>

            <div class="form-field">
              <label class="form-label">性别</label>
              <select 
                v-model="form.gender" 
                class="input-base" 
                :disabled="!editing"
              >
                <option :value="undefined">未设置</option>
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">手机号</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                class="input-base" 
                :disabled="!editing"
                placeholder="请输入手机号"
                maxlength="11"
              />
            </div>

            <div class="form-field">
              <label class="form-label">生日</label>
              <input 
                v-model="form.birthday" 
                type="date" 
                class="input-base" 
                :disabled="!editing"
              />
            </div>

            <div class="form-field">
              <label class="form-label">邮箱</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="input-base" 
                :disabled="!editing"
                placeholder="请输入邮箱"
              />
            </div>

            <div class="form-field">
              <label class="form-label">角色</label>
              <select 
                v-model="form.role" 
                class="input-base" 
                :disabled="!editing || isSuperAdmin"
              >
                <option value="STUDENT">学生</option>
                <option value="TEACHER">教师</option>
                <option value="ADMIN">管理员</option>
                <option value="SUPER_ADMIN">超级管理员</option>
              </select>
              <p v-if="isSuperAdmin" class="form-hint">超级管理员角色不可修改</p>
            </div>

            <div class="form-field" style="grid-column: 1 / -1;">
              <label class="form-label">地址</label>
              <input 
                v-model="form.address" 
                type="text" 
                class="input-base" 
                :disabled="!editing"
                placeholder="请输入地址"
              />
            </div>

            <div class="form-field" style="grid-column: 1 / -1;">
              <label class="form-label">个人简介</label>
              <textarea 
                v-model="form.bio" 
                class="textarea-base" 
                :disabled="!editing"
                placeholder="请输入个人简介"
                rows="3"
              ></textarea>
            </div>

            <div class="form-field">
              <label class="form-label">状态</label>
              <select 
                v-model="form.status" 
                class="input-base" 
                :disabled="!editing"
              >
                <option :value="true">启用</option>
                <option :value="false">禁用</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">创建时间</label>
              <input 
                :value="formatDate(user.createdAt)" 
                type="text" 
                class="input-base" 
                disabled
              />
            </div>

            <div class="form-field">
              <label class="form-label">更新时间</label>
              <input 
                :value="formatDate(user.updatedAt)" 
                type="text" 
                class="input-base" 
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 修改密码 Tab -->
      <div v-if="activeTab === 'password'" class="info-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">修改密码</h3>
            <p class="card-desc">为用户设置新密码</p>
          </div>
        </div>

        <div class="card-content">
          <div class="form-grid" style="max-width: 600px;">
            <div class="form-field">
              <label class="form-label">新密码</label>
              <input 
                v-model="passwordForm.newPassword" 
                type="password" 
                class="input-base"
                placeholder="请输入新密码（至少 6 位）"
              />
              <!-- 密码强度指示器 -->
              <div v-if="passwordForm.newPassword" class="password-strength">
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
              <label class="form-label">确认密码</label>
              <input 
                v-model="passwordForm.confirmPassword" 
                type="password" 
                class="input-base"
                placeholder="请再次输入新密码"
              />
              <p v-if="passwordForm.confirmPassword && !passwordsMatch" class="form-error">
                两次输入的密码不一致
              </p>
            </div>

            <div class="form-field">
              <button 
                @click="handleChangePassword" 
                :disabled="saving || !passwordForm.newPassword || !passwordsMatch"
                class="btn-primary"
              >
                <span class="i-carbon-checkmark"></span>
                {{ saving ? '修改中...' : '确认修改' }}
              </button>
            </div>
          </div>

          <!-- 密码要求提示 -->
          <div class="password-tips">
            <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">密码要求：</h4>
            <ul style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.8;">
              <li>至少 6 个字符</li>
              <li>建议包含大小写字母、数字和特殊字符</li>
              <li>避免使用常见密码或个人信息</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 头像设置 Tab -->
      <div v-if="activeTab === 'avatar'" class="info-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">头像设置</h3>
            <p class="card-desc">上传或删除用户头像</p>
          </div>
        </div>

        <div class="card-content">
          <div class="avatar-upload-section">
            <!-- 当前头像 -->
            <div class="avatar-preview-large">
              <img v-if="getAvatarDisplay.startsWith('data:') || getAvatarDisplay.startsWith('http')" 
                   :src="getAvatarDisplay" 
                   alt="Avatar" />
              <span v-else class="avatar-placeholder-large">{{ getAvatarDisplay }}</span>
            </div>

            <!-- 上传控制 -->
            <div class="avatar-controls">
              <input 
                type="file" 
                ref="avatarInput"
                accept="image/*"
                @change="handleAvatarSelect"
                style="display: none;"
              />
              
              <button 
                @click="($refs.avatarInput as HTMLInputElement).click()"
                class="btn-outline"
                :disabled="uploadingAvatar"
              >
                <span class="i-carbon-upload"></span>
                选择图片
              </button>

              <button 
                v-if="avatarFile || avatarPreview"
                @click="handleUploadAvatar"
                class="btn-primary"
                :disabled="uploadingAvatar"
              >
                <span class="i-carbon-checkmark"></span>
                {{ uploadingAvatar ? '上传中...' : '确认上传' }}
              </button>

              <button 
                v-if="user.avatar"
                @click="handleRemoveAvatar"
                class="btn-outline"
                :disabled="uploadingAvatar"
                style="color: var(--color-error); border-color: var(--color-error);"
              >
                <span class="i-carbon-trash-can"></span>
                删除头像
              </button>
            </div>

            <!-- 上传提示 -->
            <div class="avatar-tips">
              <p style="font-size: 0.875rem; color: var(--color-text-secondary);">
                • 支持 JPG、PNG、GIF 格式<br>
                • 图片大小不超过 2MB<br>
                • 建议使用正方形图片，尺寸 200x200 以上
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else class="error-state">
      <p>用户不存在</p>
    </div>
  </div>
</template>

<style scoped>
.user-detail-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-secondary);
}

.user-detail-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.detail-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.info-card {
  background: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: var(--border-width) solid var(--color-border);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.card-content {
  padding: 1.5rem;
}

.user-avatar-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: var(--border-width) solid var(--color-border);
}

.user-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.user-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.user-role {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.form-hint {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.form-error {
  font-size: 0.75rem;
  color: var(--color-error);
  margin: 0;
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

.password-tips {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: var(--radius);
}

.avatar-upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.avatar-preview-large {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--color-border);
}

.avatar-preview-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder-large {
  font-size: 4rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.avatar-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.avatar-tips {
  text-align: center;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: var(--border-width) solid;
}

.btn-primary {
  background: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
}

.btn-primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--color-primary), black 10%);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-bg-secondary);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab-group {
  display: flex;
  gap: 0.5rem;
  background: var(--color-bg-secondary);
  padding: 0.25rem;
  border-radius: var(--radius);
  width: fit-content;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: calc(var(--radius) - 0.125rem);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
}

.tab-btn.active {
  background: var(--color-bg-primary);
  color: var(--color-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
