<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600">404</h1>
      <h2 class="text-3xl font-semibold text-gray-900 mt-4 mb-2">页面未找到</h2>
      <p class="text-gray-600 mb-8">抱歉，您访问的页面不存在或已被删除。</p>
      <button
        @click="goHome"
        class="btn-primary"
      >
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

