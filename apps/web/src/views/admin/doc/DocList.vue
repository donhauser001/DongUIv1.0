<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const docs = [
  { id: 1, title: 'Q3 季度财务报告分析.pdf', category: '财务', author: 'Admin', updated: '2023-11-20', status: '已索引' },
  { id: 2, title: '新员工入职手册 v2.docx', category: '人事', author: 'HR', updated: '2023-11-19', status: '处理中' },
  { id: 3, title: 'DongUI 设计规范.pdf', category: '设计', author: 'Aiden', updated: '2023-11-18', status: '已索引' },
  { id: 4, title: '后端接口文档 v1.0.md', category: '研发', author: 'Dev', updated: '2023-11-21', status: '失败' },
]

const goDetail = (id: number) => {
  router.push(`/admin/doc-example/detail/${id}`)
}

const goEdit = (id: number) => {
  router.push(`/admin/doc-example/edit/${id}`)
}
</script>

<template>
  <div class="doc-list-container">
    <!-- Header -->
    <div class="doc-header card-base">
      <div class="header-left">
        <h2 class="doc-title">文档中心</h2>
        <div class="doc-stats">
            <span class="stat-badge badge-blue">AI 索引开启</span>
            <span class="stat-badge badge-gray">共 1,205 篇</span>
        </div>
      </div>
      <div class="header-right">
        <input type="text" placeholder="搜索文档内容..." class="search-input input-base">
        <button class="btn-primary small-btn" @click="router.push('/admin/doc-example/edit/new')">
          <span class="i-carbon-upload mr-1"></span> 上传文档
        </button>
      </div>
    </div>

    <!-- List -->
    <div class="card-base table-container">
      <table class="table-base">
        <thead>
          <tr>
            <th>文档标题</th>
            <th>分类</th>
            <th>上传者</th>
            <th>更新时间</th>
            <th>索引状态</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in docs" :key="doc.id" class="table-row group">
            <td class="title-cell" @click="goDetail(doc.id)">
              <span class="i-carbon-document-pdf icon-pdf" v-if="doc.title.endsWith('pdf')"></span>
              <span class="i-carbon-document-word icon-word" v-else-if="doc.title.endsWith('docx')"></span>
              <span class="i-carbon-document icon-default" v-else></span>
              <span class="doc-name">{{ doc.title }}</span>
            </td>
            <td><span class="category-badge">{{ doc.category }}</span></td>
            <td class="text-secondary">{{ doc.author }}</td>
            <td class="text-secondary">{{ doc.updated }}</td>
            <td>
              <span v-if="doc.status === '已索引'" class="status-success"><span class="i-carbon-checkmark-filled status-icon"></span>已索引</span>
              <span v-else-if="doc.status === '处理中'" class="status-process"><span class="i-carbon-circle-dash animate-spin status-icon"></span>处理中</span>
              <span v-else class="status-error"><span class="i-carbon-warning-filled status-icon"></span>失败</span>
            </td>
            <td class="text-right action-cell">
              <button class="icon-btn" @click="goDetail(doc.id)" title="查看详情"><span class="i-carbon-view"></span></button>
              <button class="icon-btn" @click="goEdit(doc.id)" title="编辑"><span class="i-carbon-edit"></span></button>
              <button class="icon-btn btn-danger" title="删除"><span class="i-carbon-trash-can"></span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.doc-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.doc-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.doc-stats {
  display: flex;
  gap: 0.5rem;
}

.stat-badge {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  border-radius: var(--radius);
  border: 1px solid transparent;
}

.badge-blue { background-color: color-mix(in srgb, var(--color-info), white 90%); color: var(--color-info); border-color: color-mix(in srgb, var(--color-info), white 80%); }
.badge-gray { background-color: var(--color-bg-tertiary); color: var(--color-text-secondary); border-color: var(--color-border); }

.header-right {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  width: 16rem;
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-sm);
  height: auto;
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

.title-cell {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon-pdf { color: var(--color-error); margin-right: 0.5rem; font-size: 1.125rem; }
.icon-word { color: var(--color-info); margin-right: 0.5rem; font-size: 1.125rem; }
.icon-default { color: var(--color-text-tertiary); margin-right: 0.5rem; font-size: 1.125rem; }

.doc-name {
  transition: color 0.2s;
}

.table-row:hover .doc-name {
  color: var(--color-primary);
}

.category-badge {
  background-color: var(--color-bg-tertiary);
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.status-success { color: var(--color-success); font-size: 0.75rem; display: flex; align-items: center; }
.status-process { color: var(--color-info); font-size: 0.75rem; display: flex; align-items: center; }
.status-error { color: var(--color-error); font-size: 0.75rem; display: flex; align-items: center; }

.status-icon { margin-right: 0.25rem; }

.action-cell {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.icon-btn {
  color: var(--color-text-tertiary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
}

.icon-btn:hover {
  color: var(--color-primary);
}

.icon-btn.btn-danger:hover {
  color: var(--color-error);
}
</style>

