<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id
</script>

<template>
  <div class="order-detail-container">
    <!-- Header Actions -->
    <div class="page-header">
      <div class="breadcrumb">
        <span class="breadcrumb-link" @click="router.back()">订单列表</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">订单详情</span>
        </div>
      <div class="header-actions">
        <button class="btn-outline small-btn">打印订单</button>
        <button class="btn-primary small-btn">确认发货</button>
        </div>
    </div>

    <!-- Status Step -->
    <div class="card-base step-card">
      <div class="steps-container">
        <!-- Step 1 -->
        <div class="step-item active">
          <div class="step-icon-wrapper">
            <span class="i-carbon-shopping-cart step-icon"></span>
          </div>
          <span class="step-title">买家下单</span>
          <span class="step-date">2023-11-24 10:23</span>
        </div>
        
        <div class="step-line active"></div>

        <!-- Step 2 -->
        <div class="step-item active">
          <div class="step-icon-wrapper">
            <span class="i-carbon-currency step-icon"></span>
          </div>
          <span class="step-title">买家付款</span>
          <span class="step-date">2023-11-24 10:25</span>
            </div>

        <div class="step-line"></div>

        <!-- Step 3 -->
        <div class="step-item">
          <div class="step-icon-wrapper inactive">
            <span class="i-carbon-delivery step-icon"></span>
            </div>
          <span class="step-title">商家发货</span>
          <span class="step-date">等待中</span>
            </div>

        <div class="step-line"></div>

        <!-- Step 4 -->
        <div class="step-item">
          <div class="step-icon-wrapper inactive">
            <span class="i-carbon-checkmark step-icon"></span>
          </div>
          <span class="step-title">交易完成</span>
            </div>
        </div>
    </div>

    <div class="detail-layout">
        <!-- Left: Info -->
      <div class="layout-left">
            <!-- Goods -->
        <div class="card-base table-card">
          <div class="card-header">商品清单</div>
          <table class="table-base">
            <thead>
                        <tr>
                <th class="font-normal">商品名称</th>
                <th class="font-normal">单价</th>
                <th class="font-normal">数量</th>
                <th class="font-normal text-right">小计</th>
                        </tr>
                    </thead>
            <tbody>
                        <tr>
                <td class="product-cell">
                  <div class="product-thumb"></div>
                                <div>
                    <p class="product-name">DongUI 高级版授权许可</p>
                    <p class="product-spec">规格: 企业版 (10人)</p>
                                </div>
                            </td>
                <td class="text-secondary">¥ 1,299.00</td>
                <td class="text-secondary">x 1</td>
                <td class="text-right font-medium">¥ 1,299.00</td>
                        </tr>
                    </tbody>
                </table>
          <div class="order-summary">
            <div class="summary-row">
              <span class="summary-label">商品总价</span>
              <span class="summary-value">¥ 1,299.00</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">运费</span>
              <span class="summary-value">¥ 0.00</span>
                    </div>
            <div class="summary-row total-row">
              <span class="summary-label">实付金额</span>
              <span class="summary-total">¥ 1,299.00</span>
                    </div>
                </div>
            </div>

            <!-- Logs -->
        <div class="card-base log-card">
          <h3 class="section-title">订单记录</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot active"></div>
              <p class="timeline-content">买家已付款，等待商家发货</p>
              <p class="timeline-date">2023-11-24 10:25:00</p>
                    </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <p class="timeline-content-secondary">买家提交订单</p>
              <p class="timeline-date">2023-11-24 10:23:00</p>
                    </div>
                 </div>
             </div>
        </div>

        <!-- Right: User Info -->
      <div class="layout-right">
        <div class="card-base info-card">
          <h4 class="info-title">顾客信息</h4>
          <div class="user-summary">
            <div class="user-avatar">A</div>
                    <div>
              <p class="user-name">Alice</p>
              <p class="user-level">注册会员 (LV.2)</p>
                    </div>
                </div>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">联系电话</span>
              <span class="info-value">138****8888</span>
                     </div>
            <div class="info-row">
              <span class="info-label">电子邮箱</span>
              <span class="info-value">alice@gmail.com</span>
                     </div>
                </div>
            </div>

        <div class="card-base info-card">
          <h4 class="info-title">收货信息</h4>
          <div class="address-info">
            <p class="user-name">张三 (收)</p>
                    <p>138****8888</p>
            <div class="address-detail">
              <p>浙江省 杭州市 余杭区 五常街道</p>
                    <p>未来科技城 海创园 18幢 201室</p>
            </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.breadcrumb-link {
  cursor: pointer;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.breadcrumb-separator {
  margin: 0 0.5rem;
}

.breadcrumb-current {
  color: var(--color-text-primary);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.small-btn {
  font-size: var(--font-size-sm);
  height: auto;
  padding: 0.375rem 0.75rem;
}

.step-card {
  padding: 2rem;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 3rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-icon-wrapper {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.step-icon-wrapper.inactive {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-tertiary);
}

.step-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.step-item:not(.active) .step-title {
  color: var(--color-text-tertiary);
}

.step-date {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-top: 0.25rem;
}

.step-line {
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.step-line.active {
  background-color: var(--color-primary);
}

.detail-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.layout-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.table-card {
  padding: 0;
  overflow: hidden;
}

.card-header {
  padding: 0.75rem 1.5rem;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
}

.font-normal {
  font-weight: normal;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
}

.product-thumb {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}

.product-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.product-spec {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin: 0;
}

.text-secondary {
  color: var(--color-text-secondary);
}

.font-medium {
  font-weight: var(--font-weight-medium);
}

.order-summary {
  padding: 1rem 1.5rem;
  background-color: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  font-size: var(--font-size-sm);
}

.summary-row {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
}

.summary-label {
  color: var(--color-text-secondary);
}

.summary-value {
  color: var(--color-text-primary);
  width: 6rem;
  text-align: right;
}

.total-row {
  margin-top: 0.5rem;
}

.summary-total {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  width: 6rem;
  text-align: right;
}

.log-card {
  padding: 1.5rem;
}

.section-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
  font-size: var(--font-size-sm);
}

.timeline {
  border-left: 1px solid var(--color-border);
  margin-left: 0.25rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -1.35rem;
  top: 0.375rem;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: var(--color-bg-tertiary);
  border: 2px solid white;
  box-shadow: 0 0 0 1px var(--color-bg-tertiary);
}

.timeline-dot.active {
  background-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.timeline-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin: 0;
}

.timeline-content-secondary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.timeline-date {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-top: 0.125rem;
}

.layout-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  padding: 1.25rem;
}

.info-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
  border-left: 4px solid var(--color-primary);
  padding-left: 0.5rem;
  font-size: var(--font-size-sm);
}

.user-summary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.user-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.user-level {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin: 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: var(--font-size-sm);
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.info-label {
  color: var(--color-text-secondary);
}

.info-value {
  color: var(--color-text-primary);
}

.address-info {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.address-detail {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border);
}
</style>

