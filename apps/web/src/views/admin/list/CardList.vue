<script setup lang="ts">
const projects = [
  { 
    id: 1, 
    name: 'Dong Admin Pro', 
    desc: '基于 Vue3 + NestJS 的全栈中后台解决方案，内置 AI 向量数据库支持。',
    logo: 'i-carbon-application-web',
    status: '开发中',
    progress: 75,
    members: 4,
    updated: '2小时前' 
  },
  { 
    id: 2, 
    name: 'AI 知识库引擎', 
    desc: '企业级 RAG 检索增强生成系统，支持私有部署。',
    logo: 'i-carbon-machine-learning-model',
    status: '已上线',
    progress: 100,
    members: 8,
    updated: '1天前' 
  },
  { 
    id: 3, 
    name: '移动端组件库', 
    desc: '适配多端的轻量级 UI 组件库，遵循孟加拉绿设计规范。',
    logo: 'i-carbon-mobile',
    status: '规划中',
    progress: 15,
    members: 2,
    updated: '3天前' 
  },
  { 
    id: 4, 
    name: '数据可视化大屏', 
    desc: '基于 ECharts 封装的开箱即用图表库。',
    logo: 'i-carbon-chart-dashboard',
    status: '开发中',
    progress: 45,
    members: 5,
    updated: '1周前' 
  },
  { 
    id: 5, 
    name: '自动化部署脚本', 
    desc: 'CI/CD 流水线配置模板，支持 Docker 容器化部署。',
    logo: 'i-carbon-script',
    status: '维护中',
    progress: 90,
    members: 1,
    updated: '2周前' 
  },
]
</script>

<template>
  <div class="card-list-container">
    <!-- Header -->
    <div class="list-header">
      <h2 class="list-title">项目列表</h2>
      <div class="actions">
        <button class="btn-outline small-btn">
          <span class="i-carbon-filter mr-1"></span> 筛选
        </button>
        <button class="btn-primary small-btn">
          <span class="i-carbon-add mr-1"></span> 新建项目
        </button>
      </div>
    </div>

    <!-- Card Grid -->
    <div class="card-grid">
      <div v-for="item in projects" :key="item.id" class="project-card card-base">
        
        <!-- Header -->
        <div class="card-header">
          <div class="project-info">
            <div class="project-logo">
              <span :class="item.logo" class="logo-icon"></span>
            </div>
            <div>
              <h3 class="project-name">{{ item.name }}</h3>
              <p class="project-updated">{{ item.updated }}</p>
            </div>
          </div>
          <span class="status-badge"
            :class="{
              'status-dev': item.status === '开发中',
              'status-online': item.status === '已上线',
              'status-plan': item.status === '规划中',
              'status-maintenance': item.status === '维护中'
            }"
          >{{ item.status }}</span>
        </div>

        <!-- Desc -->
        <p class="project-desc">{{ item.desc }}</p>

        <!-- Footer Info -->
        <div class="card-footer">
          <div class="progress-wrapper">
            <span>进度: {{ item.progress }}%</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: item.progress + '%' }"></div>
            </div>
          </div>
          <div class="members-list">
            <div v-for="i in item.members" :key="i" class="member-avatar">
              {{ String.fromCharCode(64 + i) }}
            </div>
          </div>
        </div>

        <!-- Actions (Hover Show) -->
        <div class="card-actions">
           <button class="action-btn"><span class="i-carbon-overflow-menu-horizontal"></span></button>
        </div>
      </div>

      <!-- Add New Card (Placeholder) -->
      <button class="add-card">
        <span class="i-carbon-add add-icon"></span>
        <span class="add-text">创建新项目</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  border-left: 4px solid var(--color-primary);
  padding-left: 0.75rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
  background-color: var(--color-bg-primary);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--card-shadow);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.project-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.project-logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius);
  background-color: var(--color-bg-secondary); /* Need opacity support or mix-blend-mode for tint */
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
}

/* Simulate primary tint background */
.project-logo {
  background-color: color-mix(in srgb, var(--color-primary), white 90%); 
  border-color: color-mix(in srgb, var(--color-primary), white 80%);
}

.logo-icon {
  font-size: 1.25rem;
}

.project-name {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  transition: color 0.2s;
  margin: 0;
}

.project-card:hover .project-name {
  color: var(--color-primary);
}

.project-updated {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin: 0;
}

.status-badge {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  border-radius: var(--radius);
  border: 1px solid transparent;
}

.status-dev { background-color: color-mix(in srgb, var(--color-info), white 90%); color: var(--color-info); border-color: color-mix(in srgb, var(--color-info), white 80%); }
.status-online { background-color: color-mix(in srgb, var(--color-success), white 90%); color: var(--color-success); border-color: color-mix(in srgb, var(--color-success), white 80%); }
.status-plan { background-color: var(--color-bg-tertiary); color: var(--color-text-secondary); border-color: var(--color-border); }
.status-maintenance { background-color: color-mix(in srgb, var(--color-warning), white 90%); color: var(--color-warning); border-color: color-mix(in srgb, var(--color-warning), white 80%); }

.project-desc {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: 1.5rem;
  height: 2.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-top: auto;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  width: 4rem;
  height: 0.375rem;
  background-color: var(--color-bg-tertiary);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.5s ease;
}

.members-list {
  display: flex;
  margin-left: 0.5rem;
}

.member-avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--color-bg-secondary);
  border: 2px solid var(--color-bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  margin-left: -0.5rem;
}

.member-avatar:first-child {
  margin-left: 0;
}

.card-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.project-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
}

.action-btn:hover {
  color: var(--color-primary);
}

.add-card {
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  min-height: 180px;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
}

.add-card:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary), white 95%);
}

.add-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.add-text {
  font-size: var(--font-size-sm);
}
</style>

