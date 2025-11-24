<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <div class="home-container">
    
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">有什么可以帮你的？</h1>
      <p class="hero-subtitle">基于企业私有知识库的 AI 智能问答助手</p>
    </div>

    <!-- Search Box (核心组件) -->
    <div class="search-container">
      <div class="search-icon-wrapper">
        <span class="i-carbon-search search-icon"></span>
      </div>
      <input 
        v-model="searchQuery"
        type="text" 
        class="search-input"
        placeholder="试着问：如何申请年假？或者 Q3 季度的营收情况..."
      />
      <div class="search-actions">
        <button class="mic-btn">
          <span class="i-carbon-microphone text-lg"></span>
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <button class="btn-outline action-btn">
        <span class="i-carbon-document mr-2"></span>
        查文档
      </button>
      <button class="btn-outline action-btn">
        <span class="i-carbon-code mr-2"></span>
        写代码
      </button>
      <button class="btn-outline action-btn">
        <span class="i-carbon-chart-line mr-2"></span>
        分析数据
      </button>
    </div>

    <!-- Simulated Results (占位) -->
    <div v-if="searchQuery" class="results-container">
      <div class="result-wrapper">
        <div class="ai-avatar">
          <span class="i-carbon-bot"></span>
        </div>
        <div class="card-base result-card">
          <p class="result-text">
            正在为您检索关于 <span class="highlight">"{{ searchQuery }}"</span> 的信息...
            <br><br>
            (这里接入后端 API 后，将显示基于 pgvector 检索到的知识库答案。)
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.home-container {
  max-width: 56rem;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.hero-subtitle {
  color: var(--color-text-secondary);
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  height: 3.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: var(--color-bg-primary);
  border: var(--input-border-width) solid var(--input-border-color);
  border-radius: var(--input-radius);
  box-shadow: var(--card-shadow);
  font-size: var(--font-size-lg);
  color: var(--input-text-color);
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--input-focus-border-color);
  box-shadow: 0 0 0 1px var(--input-focus-ring-color);
}

.search-icon-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.search-icon {
  font-size: 1.25rem;
  color: var(--color-text-tertiary);
  transition: color 0.2s;
}

.search-container:focus-within .search-icon {
  color: var(--color-primary);
}

.search-actions {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 0.75rem;
  display: flex;
  align-items: center;
}

.mic-btn {
  padding: 0.5rem;
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.mic-btn:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-secondary);
}

.quick-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-btn {
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.action-btn:hover {
  color: var(--color-primary);
}

.results-container {
  margin-top: 3rem;
  animation: fadeIn 0.5s ease-out;
}

.result-wrapper {
  display: flex;
  gap: 1rem;
}

.ai-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: 0.875rem;
}

.result-card {
  flex: 1;
  background-color: var(--color-bg-secondary);
}

.result-text {
  color: var(--color-text-primary);
  line-height: 1.6;
}

.highlight {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

