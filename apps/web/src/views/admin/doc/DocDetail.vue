<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

// 模拟详情数据
const doc = {
  id,
  title: 'Q3 季度财务报告分析.pdf',
  size: '2.4 MB',
  author: 'Admin',
  created: '2023-11-20 10:00:00',
  summary: '本文档详细分析了公司第三季度的财务状况，包括营收增长、成本控制以及主要业务线的利润率。重点指出了 SaaS 业务的强劲增长（同比增长 45%）。',
  chunks: [
    { id: 101, content: '...SaaS 订阅收入达到 1,200 万元，同比增长 45%，主要得益于新客户的获取...', score: 0.92 },
    { id: 102, content: '...运营成本控制在预期范围内，相比上一季度下降了 5%...', score: 0.88 },
  ]
}
</script>

<template>
  <div class="doc-detail-container">
    <!-- Back Breadcrumb -->
    <div class="breadcrumb">
      <span class="breadcrumb-link" @click="router.push('/admin/doc-example/list')">文档列表</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">文档详情</span>
    </div>

    <!-- Header Info -->
    <div class="detail-header card-base">
      <div class="header-main">
        <div class="file-icon-wrapper">
          <span class="i-carbon-document-pdf file-icon"></span>
        </div>
        <div>
          <h1 class="file-title">{{ doc.title }}</h1>
          <div class="file-meta">
            <span>ID: #{{ doc.id }}</span>
            <span>大小: {{ doc.size }}</span>
            <span>上传者: {{ doc.author }}</span>
            <span>上传时间: {{ doc.created }}</span>
          </div>
          <div class="file-tags">
            <span class="status-tag tag-success">AI 索引已完成</span>
            <span class="status-tag tag-default">公开文档</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn-outline small-btn">下载源文件</button>
        <button class="btn-primary small-btn" @click="router.push(`/admin/doc-example/edit/${id}`)">编辑属性</button>
      </div>
    </div>

    <div class="detail-content">
      <!-- Left: Preview / Summary -->
      <div class="content-left">
        <!-- AI Summary -->
        <div class="ai-summary-card">
          <h3 class="ai-title">
            <span class="i-carbon-ibm-watson-discovery ai-icon"></span>
            AI 智能摘要
          </h3>
          <p class="ai-text">
            {{ doc.summary }}
          </p>
        </div>

        <!-- Vector Chunks -->
        <div class="card-base vector-section">
          <h3 class="section-title">向量切片预览 (Top 2)</h3>
          <div class="chunk-list">
            <div v-for="chunk in doc.chunks" :key="chunk.id" class="chunk-item">
              <div class="chunk-meta">
                <span>Chunk ID: {{ chunk.id }}</span>
                <span>Vector Score: {{ chunk.score }}</span>
              </div>
              {{ chunk.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Metadata -->
      <div class="content-right">
        <div class="card-base meta-card">
          <h4 class="meta-title">相关标签</h4>
          <div class="tags-list">
            <span class="meta-tag">财务</span>
            <span class="meta-tag">Q3</span>
            <span class="meta-tag">2023</span>
            <button class="add-tag-btn">+ 添加</button>
          </div>
        </div>

        <div class="card-base meta-card">
            <h4 class="meta-title">访问权限</h4>
            <div class="perm-list">
                <label class="perm-item">
                    <input type="radio" name="perm" checked class="radio-input">
                    <span>全员可见</span>
                </label>
                <label class="perm-item">
                    <input type="radio" name="perm" class="radio-input">
                    <span>仅管理员</span>
                </label>
                <label class="perm-item">
                    <input type="radio" name="perm" class="radio-input">
                    <span>指定部门</span>
                </label>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.doc-detail-container {
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
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

.detail-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-main {
  display: flex;
  gap: 1rem;
}

.file-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background-color: color-mix(in srgb, var(--color-error), white 95%);
  border-radius: var(--radius);
  border: 1px solid color-mix(in srgb, var(--color-error), white 85%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-error);
  font-size: 1.875rem;
}

.file-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.file-tags {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
}

.status-tag {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  border-radius: var(--radius);
  border: 1px solid transparent;
}

.tag-success { background-color: color-mix(in srgb, var(--color-success), white 90%); color: var(--color-success); border-color: color-mix(in srgb, var(--color-success), white 80%); }
.tag-default { background-color: var(--color-bg-tertiary); color: var(--color-text-secondary); border-color: var(--color-border); }

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.small-btn {
  font-size: var(--font-size-sm);
  height: auto;
  padding: 0.375rem 0.75rem;
}

.detail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ai-summary-card {
  background-color: color-mix(in srgb, var(--color-primary), white 95%);
  border: 1px solid color-mix(in srgb, var(--color-primary), white 85%);
  border-radius: var(--radius);
  padding: 1.25rem;
}

.ai-title {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  margin: 0 0 0.75rem 0;
  font-size: var(--font-size-base);
}

.ai-icon {
  font-size: 1.125rem;
  margin-right: 0.5rem;
}

.ai-text {
  color: var(--color-text-primary);
  line-height: 1.625;
  font-size: var(--font-size-sm);
  margin: 0;
}

.vector-section {
  padding: 1.5rem;
}

.section-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
  border-left: 4px solid var(--color-primary);
  padding-left: 0.75rem;
  font-size: var(--font-size-base);
}

.chunk-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chunk-item {
  background-color: var(--color-bg-tertiary);
  padding: 0.75rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.chunk-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-bottom: 0.25rem;
}

.content-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.meta-card {
  padding: 1rem;
}

.meta-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 0.75rem 0;
  font-size: var(--font-size-sm);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-tag {
  padding: 0.25rem 0.5rem;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.add-tag-btn {
  padding: 0.25rem 0.5rem;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  background: none;
  cursor: pointer;
  transition: all 0.2s;
}

.add-tag-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.perm-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.perm-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.radio-input {
  accent-color: var(--color-primary);
}
</style>

