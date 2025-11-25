<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <!-- Logo和标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">DongUI</h1>
        <p class="text-gray-600">欢迎回来，请登录您的账户</p>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- 邮箱输入 -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            邮箱地址
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="input-base w-full"
            placeholder="your@email.com"
          />
        </div>

        <!-- 密码输入 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            密码
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="input-base w-full"
            placeholder="••••••••"
          />
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="error-alert">
          {{ error }}
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          :disabled="loading"
          class="btn-primary w-full"
        >
          <span v-if="!loading">登录</span>
          <span v-else>登录中...</span>
        </button>
      </form>

      <!-- 注册链接 -->
      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm">
          还没有账户？
          <a href="#" @click.prevent="showRegister" class="text-primary-600 hover:text-primary-700 font-medium">
            立即注册
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  try {
    loading.value = true
    error.value = ''

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '登录失败')
    }

    // 保存token和用户信息
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // 跳转到管理后台
    router.push('/admin')
  } catch (err: any) {
    error.value = err.message || '登录失败，请重试'
  } finally {
    loading.value = false
  }
}

function showRegister() {
  alert('注册功能开发中...')
}
</script>

<style scoped>
.error-alert {
  padding: 0.75rem;
  background-color: color-mix(in srgb, var(--color-error) 10%, white 90%);
  border: var(--border-width) solid color-mix(in srgb, var(--color-error) 30%, white 70%);
  border-radius: var(--radius);
  color: var(--color-error);
  font-size: 0.875rem;
}

.input-base:focus {
  outline: none;
  ring: 2px;
  ring-color: var(--color-primary);
}
</style>

