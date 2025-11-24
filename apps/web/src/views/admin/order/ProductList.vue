<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const products = [
    { id: 101, name: 'DongUI 企业版', price: '1299.00', stock: 999, sales: 450, status: true, image: 'bg-blue-100' },
    { id: 102, name: 'DongUI 个人版', price: '399.00', stock: 50, sales: 1200, status: true, image: 'bg-green-100' },
    { id: 103, name: '定制开发服务', price: '9999.00', stock: 5, sales: 12, status: false, image: 'bg-purple-100' },
]
</script>

<template>
  <div class="product-list-container">
    <div class="list-header card-base">
        <h2 class="list-title">商品管理</h2>
        <button class="btn-primary small-btn" @click="router.push('/admin/order-example/product/edit/new')">
            <span class="i-carbon-add mr-1"></span> 发布商品
        </button>
    </div>

    <div class="card-base table-container">
      <table class="table-base">
        <thead>
          <tr>
            <th class="w-16">图</th>
            <th>商品名称</th>
            <th>价格</th>
            <th>库存</th>
            <th>销量</th>
            <th>状态</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="p in products" :key="p.id" class="table-row">
                <td class="image-cell">
                    <div class="product-thumb" :class="p.image"></div>
                </td>
                <td class="font-medium">{{ p.name }}</td>
                <td class="price-text">¥ {{ p.price }}</td>
                <td class="text-secondary">{{ p.stock }}</td>
                <td class="text-secondary">{{ p.sales }}</td>
                <td>
                    <div class="toggle-wrapper">
                        <input type="checkbox" :checked="p.status" class="toggle-input"/>
                        <label class="toggle-track"></label>
                    </div>
                </td>
                <td class="text-right action-cell">
                    <button class="text-link" @click="router.push(`/admin/order-example/product/edit/${p.id}`)">编辑</button>
                    <button class="text-link-danger">下架</button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.product-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.table-container {
  padding: 0;
  overflow: hidden;
}

.table-row:hover {
  background-color: var(--color-bg-secondary);
}

.w-16 {
  width: 4rem;
}

.image-cell {
  padding: 1rem 1.5rem;
}

.product-thumb {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}

.bg-blue-100 { background-color: #dbeafe; }
.bg-green-100 { background-color: #dcfce7; }
.bg-purple-100 { background-color: #f3e8ff; }

.font-medium {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.price-text {
  color: var(--color-error);
  font-weight: var(--font-weight-bold);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.toggle-wrapper {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
  vertical-align: middle;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 9999px;
}

.toggle-track:before {
  position: absolute;
  content: "";
  height: 1.125rem;
  width: 1.125rem;
  left: 0.1875rem;
  bottom: 0.1875rem;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-track {
  background-color: var(--color-primary);
}

.toggle-input:checked + .toggle-track:before {
  transform: translateX(1rem);
}

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

.text-link-danger {
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.text-link-danger:hover {
  color: var(--color-error);
}
</style>

