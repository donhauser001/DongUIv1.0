<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = ['全部', '待付款', '待发货', '已发货', '退款/售后']
const currentTab = '全部'

const orders = [
  { id: 'ORD-20231124-001', user: 'Alice', amount: '¥ 1,299.00', status: '待发货', date: '2023-11-24 10:23:00', items: 3 },
  { id: 'ORD-20231124-002', user: 'Bob', amount: '¥ 358.00', status: '已发货', date: '2023-11-24 09:15:00', items: 1 },
  { id: 'ORD-20231123-005', user: 'Charlie', amount: '¥ 2,499.00', status: '待付款', date: '2023-11-23 22:45:00', items: 2 },
  { id: 'ORD-20231123-003', user: 'David', amount: '¥ 99.00', status: '退款/售后', date: '2023-11-23 18:30:00', items: 1 },
]
</script>

<template>
  <div class="order-list-container">
    <!-- Filter Tabs -->
    <div class="filter-panel card-base">
      <div class="tabs-header">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          class="tab-btn"
          :class="{ 'active': tab === currentTab }"
        >
          {{ tab }}
        </button>
      </div>
      
      <!-- Search Toolbar -->
      <div class="toolbar">
        <div class="search-box">
            <span class="i-carbon-search search-icon"></span>
            <input type="text" placeholder="搜索订单号/用户名/手机号" class="search-input input-base">
        </div>
        <div class="date-filter">
            <span>下单时间:</span>
            <input type="date" class="date-input input-base">
            <span>-</span>
            <input type="date" class="date-input input-base">
        </div>
        <button class="btn-outline small-btn ml-auto">
            <span class="i-carbon-download mr-1"></span> 导出报表
        </button>
      </div>
    </div>

    <!-- Order Table -->
    <div class="card-base table-container">
      <table class="table-base">
        <thead>
          <tr>
            <th class="w-10"><input type="checkbox" class="checkbox-input"></th>
            <th>订单编号</th>
            <th>买家信息</th>
            <th>订单金额</th>
            <th>商品数量</th>
            <th>订单状态</th>
            <th>下单时间</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="table-row">
            <td><input type="checkbox" class="checkbox-input"></td>
            <td class="font-medium">
                <span class="link-text" @click="router.push(`/admin/order-example/detail/${order.id}`)">{{ order.id }}</span>
            </td>
            <td class="user-cell">
                <div class="user-avatar-small">{{ order.user[0] }}</div>
                {{ order.user }}
            </td>
            <td class="amount-text">{{ order.amount }}</td>
            <td class="text-secondary">{{ order.items }} 件</td>
            <td>
              <span class="status-badge"
                :class="{
                    'status-pending': order.status === '待付款',
                    'status-shipping': order.status === '待发货',
                    'status-shipped': order.status === '已发货',
                    'status-refund': order.status === '退款/售后',
                }"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="text-secondary">{{ order.date }}</td>
            <td class="text-right action-cell">
                <button class="text-link" @click="router.push(`/admin/order-example/detail/${order.id}`)">详情</button>
                <button v-if="order.status === '待发货'" class="text-link-action">发货</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.order-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-panel {
  padding: 1rem 1rem 0 1rem;
}

.tabs-header {
  display: flex;
  gap: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  padding-bottom: 0.75rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-bottom: 2px solid transparent;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--color-text-primary);
}

.tab-btn.active {
  border-bottom-color: var(--color-primary);
  color: var(--color-primary);
}

.toolbar {
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-box {
  position: relative;
  width: 16rem;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 0.6rem;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}

.search-input {
  width: 100%;
  padding-left: 2.25rem;
  padding-right: 0.75rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: var(--font-size-sm);
  height: auto;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.date-input {
  padding: 0.25rem 0.5rem;
  height: auto;
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
}

.ml-auto {
  margin-left: auto;
}

.table-container {
  padding: 0;
  overflow: hidden;
}

.table-row:hover {
  background-color: var(--color-bg-secondary);
}

.w-10 {
  width: 2.5rem;
}

.checkbox-input {
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  accent-color: var(--color-primary);
}

.font-medium {
  font-weight: var(--font-weight-medium);
}

.link-text {
  cursor: pointer;
  transition: color 0.2s;
}

.link-text:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.user-cell {
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
}

.user-avatar-small {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--color-bg-tertiary);
  margin-right: 0.5rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.amount-text {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.status-badge {
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
}

.status-pending { background-color: #fefce8; color: #ca8a04; }
.status-shipping { background-color: #eff6ff; color: #2563eb; }
.status-shipped { background-color: #f0fdf4; color: #16a34a; }
.status-refund { background-color: var(--color-bg-tertiary); color: var(--color-text-secondary); }

.action-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.text-link {
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.text-link:hover {
  opacity: 0.8;
}

.text-link-action {
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.text-link-action:hover {
  text-decoration: underline;
}
</style>

