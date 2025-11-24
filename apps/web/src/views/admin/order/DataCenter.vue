<script setup lang="ts">
const stats = [
  { title: '今日销售额', value: '¥ 12,450.00', trend: '+12%', up: true },
  { title: '今日订单数', value: '182', trend: '-5%', up: false },
  { title: '新增用户', value: '24', trend: '+2%', up: true },
  { title: '转化率', value: '3.2%', trend: '+0.4%', up: true },
]
</script>

<template>
  <div class="data-center-container">
    <!-- 4 Key Metrics -->
    <div class="metrics-grid">
      <div v-for="(stat, index) in stats" :key="index" class="metric-card card-base">
        <p class="metric-title">{{ stat.title }}</p>
        <h3 class="metric-value">{{ stat.value }}</h3>
        <div class="metric-trend" :class="stat.up ? 'trend-up' : 'trend-down'">
           <span :class="stat.up ? 'i-carbon-caret-up' : 'i-carbon-caret-down'" class="trend-icon"></span>
           {{ stat.trend }}
           <span class="trend-label">较昨日</span>
        </div>
      </div>
    </div>

    <!-- Charts Area -->
    <div class="charts-layout">
        <!-- Main Chart -->
        <div class="chart-card card-base">
            <div class="chart-header">
                <h3 class="card-title">近 30 天销售趋势</h3>
                <div class="chart-actions">
                    <button class="action-btn">近7天</button>
                    <button class="action-btn active">近30天</button>
                </div>
            </div>
            <!-- Placeholder for Chart -->
            <div class="chart-placeholder">
                <div class="placeholder-content">
                    <span class="i-carbon-chart-line placeholder-icon"></span>
                    <p>ECharts 图表区域 (需集成 echarts)</p>
                </div>
            </div>
        </div>

        <!-- Side List -->
        <div class="list-card card-base">
            <h3 class="card-title">热销商品 Top 5</h3>
            <div class="hot-list">
                <div v-for="i in 5" :key="i" class="hot-item">
                    <div class="rank-badge"
                        :class="i <= 3 ? 'rank-top' : 'rank-normal'"
                    >{{ i }}</div>
                    <div class="item-info">
                        <p class="item-name">DongUI 企业授权许可 (高级版)</p>
                        <div class="progress-track">
                            <div class="progress-bar" :style="{ width: `${100 - i * 15}%` }"></div>
                        </div>
                    </div>
                    <span class="item-sales">12,45{{ 6-i }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.data-center-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.metric-card {
  padding: 1.5rem;
}

.metric-title {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin-top: 0.5rem;
  color: var(--color-text-primary);
}

.metric-trend {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.trend-up {
  color: var(--color-success);
}

.trend-down {
  color: var(--color-error);
}

.trend-icon {
  margin-right: 0.25rem;
}

.trend-label {
  color: var(--color-text-tertiary);
  margin-left: 0.5rem;
}

.charts-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.chart-card {
  padding: 1.5rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.chart-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  border: none;
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  color: var(--color-primary);
}

.action-btn.active {
  background-color: var(--color-primary);
  color: white;
}

.chart-placeholder {
  width: 100%;
  height: 300px;
  background-color: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
}

.placeholder-content {
  text-align: center;
}

.placeholder-icon {
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
}

.list-card {
  padding: 1.5rem;
}

.hot-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rank-badge {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: var(--font-weight-bold);
}

.rank-top {
  background-color: var(--color-primary);
  color: white;
}

.rank-normal {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.item-info {
  flex: 1;
  min-width: 0; /* for truncate */
}

.item-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-track {
  width: 100%;
  background-color: var(--color-bg-tertiary);
  height: 0.375rem;
  border-radius: 9999px;
  margin-top: 0.25rem;
  overflow: hidden;
}

.progress-bar {
  background-color: var(--color-info);
  height: 100%;
  border-radius: 9999px;
}

.item-sales {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}
</style>

