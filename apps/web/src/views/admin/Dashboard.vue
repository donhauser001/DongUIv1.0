<script setup lang="ts">
// 模拟数据
const stats = [
  { title: '总用户数', value: '12,450', trend: '+12%', type: 'primary' },
  { title: '活跃 AI 对话', value: '8,320', trend: '+5%', type: 'white' },
  { title: '知识库文档', value: '1,205', trend: '+24%', type: 'dark' },
]

const recentDocs = [
  { id: 1, title: 'Q3 季度财务报告分析.pdf', size: '2.4 MB', date: '2023-10-24', status: '处理完成' },
  { id: 2, title: '新员工入职手册 v2.docx', size: '1.1 MB', date: '2023-10-23', status: '索引中' },
  { id: 3, title: '产品技术架构图.png', size: '4.5 MB', date: '2023-10-22', status: '处理完成' },
]
</script>

<template>
  <div class="dashboard-container">
    
    <!-- 1. 统计卡片区 (三色层次) -->
    <div class="stats-grid">
      <!-- Primary Card -->
      <div class="stat-card card-primary">
        <p class="stat-title-light">总用户数</p>
        <h3 class="stat-value">{{ stats[0].value }}</h3>
        <span class="stat-trend trend-light">
          较上周 {{ stats[0].trend }}
        </span>
      </div>

      <!-- White Card -->
      <div class="stat-card card-white">
        <p class="stat-title-dark">活跃 AI 对话</p>
        <h3 class="stat-value-dark">{{ stats[1].value }}</h3>
        <span class="stat-trend trend-success">
          较上周 {{ stats[1].trend }}
        </span>
      </div>

      <!-- Dark Card (特殊强调) -->
      <div class="stat-card card-dark">
        <div class="flex justify-between items-start">
          <div>
            <p class="stat-title-light">知识库文档 (Vector Ready)</p>
            <h3 class="stat-value-highlight">{{ stats[2].value }}</h3>
          </div>
          <div class="i-carbon-document text-2xl opacity-50"></div>
        </div>
      </div>
    </div>

    <!-- 2. 重要功能区域 -->
    <div class="feature-section">
      <div class="feature-header">
        <h3 class="feature-title">
          <span class="i-carbon-ai-status text-lg mr-2"></span>
          AI 向量索引状态
        </h3>
        <button class="btn-outline btn-small">
          查看详情
        </button>
      </div>
      <div class="feature-body">
        <div>
          <p class="feature-text">系统正在后台为 <span class="font-bold">3 个新文档</span> 生成向量索引。</p>
          <div class="progress-bar">
            <div class="progress-value"></div>
          </div>
        </div>
        <button class="btn-primary">
          <span class="i-carbon-renew mr-2"></span>
          手动同步
        </button>
      </div>
    </div>

    <!-- 3. 线性表格 -->
    <div class="card-base table-card">
      <div class="table-header-row">
        <h3 class="font-bold text-gray-800">最近文档</h3>
        <button class="btn-outline btn-small">全部导出</button>
      </div>
      <table class="table-base">
        <thead>
          <tr>
            <th>文档名称</th>
            <th>大小</th>
            <th>上传日期</th>
            <th>状态</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in recentDocs" :key="doc.id">
            <td style="display: flex; align-items: center;">
              <span class="i-carbon-document text-gray-400 mr-2"></span>
              {{ doc.title }}
            </td>
            <td>{{ doc.size }}</td>
            <td>{{ doc.date }}</td>
            <td>
              <span class="status-badge"
                :class="doc.status === '处理完成' ? 'status-success' : 'status-warning'">
                {{ doc.status }}
              </span>
            </td>
            <td class="text-right">
              <button class="text-link">下载</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-card {
  padding: var(--card-padding, 1.5rem);
  border-radius: var(--card-radius, var(--radius));
  border-width: var(--border-width);
  border-style: solid;
  box-shadow: var(--card-shadow);
}

.card-primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse, white);
}

.card-white {
  background-color: var(--card-bg-color);
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.card-dark {
  background-color: var(--color-dark);
  border-color: var(--color-dark);
  color: white;
}

.stat-title-light {
  opacity: 0.8;
  font-size: var(--font-size-sm);
}

.stat-title-dark {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.stat-value {
  font-size: 1.875rem;
  font-weight: var(--font-weight-bold);
  margin-top: 0.5rem;
}

.stat-value-dark {
  font-size: 1.875rem;
  font-weight: var(--font-weight-bold);
  margin-top: 0.5rem;
  color: var(--color-text-primary);
}

.stat-value-highlight {
  font-size: 1.875rem;
  font-weight: var(--font-weight-bold);
  margin-top: 0.5rem;
  color: var(--color-info);
}

.stat-trend {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
}

.trend-light {
  background-color: color-mix(in srgb, white 20%, transparent 80%);
  color: white;
}

.trend-success {
  background-color: color-mix(in srgb, var(--color-success) 10%, transparent 90%);
  color: var(--color-success);
}

.feature-section {
  border: var(--border-width) solid var(--color-info);
  border-radius: var(--card-radius, var(--radius));
  overflow: hidden;
  opacity: 0.8;
}

.feature-header {
  background-color: var(--color-bg-tertiary);
  padding: 1rem 1.5rem;
  border-bottom: var(--border-width) solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature-title {
  color: var(--color-info);
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
}

.feature-body {
  background-color: var(--card-bg-color);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feature-text {
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.progress-bar {
  width: 16rem;
  height: 0.5rem;
  background-color: var(--color-bg-tertiary);
  border-radius: 9999px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.progress-value {
  height: 100%;
  background-color: var(--color-info);
  width: 66%;
}

.table-card {
  padding: 0;
  overflow: hidden;
}

.btn-small {
  font-size: 0.75rem;
  height: auto;
  padding: 0.25rem 0.75rem;
}

.table-header-row {
  padding: 1rem 1.5rem;
  border-bottom: var(--border-width) solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-bg-color);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
}

.status-success {
  background-color: color-mix(in srgb, var(--color-success) 10%, transparent 90%);
  color: var(--color-success);
}

.status-warning {
  background-color: color-mix(in srgb, var(--color-warning) 10%, transparent 90%);
  color: var(--color-warning);
}

.text-link {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  background: none;
  border: none;
  cursor: pointer;
}

.text-link:hover {
  text-decoration: underline;
}
</style>

