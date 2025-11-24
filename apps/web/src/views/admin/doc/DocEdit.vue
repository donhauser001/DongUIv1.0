<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isNew = route.params.id === 'new'

const form = ref({
  title: isNew ? '' : 'Q3 季度财务报告分析.pdf',
  category: isNew ? 'default' : 'finance',
  desc: isNew ? '' : '这是 2023 年第三季度的详细财务分析报告。',
  tags: isNew ? '' : '财务, 季度报告',
})

const save = () => {
  // 模拟保存
  alert('保存成功！')
  router.back()
}
</script>

<template>
  <div class="doc-edit-container">
    <div class="edit-header">
      <h2 class="page-title">{{ isNew ? '上传新文档' : '编辑文档属性' }}</h2>
      <p class="page-desc">请完善文档的元数据以便 AI 更好地建立索引。</p>
    </div>

    <div class="edit-content card-base">
      
      <!-- Title -->
      <div class="form-group">
        <label class="form-label">文档标题</label>
        <input v-model="form.title" type="text" class="input-base" placeholder="请输入清晰的标题">
      </div>

      <!-- Category -->
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">所属分类</label>
          <select v-model="form.category" class="input-base">
            <option value="default">默认分类</option>
            <option value="finance">财务</option>
            <option value="hr">人事</option>
            <option value="tech">研发</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">标签 (逗号分隔)</label>
          <input v-model="form.tags" type="text" class="input-base" placeholder="例如: 2023, 报告">
        </div>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label class="form-label">文档摘要/描述</label>
        <textarea v-model="form.desc" rows="4" class="input-base" placeholder="简要描述文档内容..."></textarea>
        <p class="form-hint">如果不填写，AI 将尝试自动生成。</p>
      </div>

      <!-- File Upload (Only for New) -->
      <div v-if="isNew" class="upload-area">
        <span class="i-carbon-cloud-upload upload-icon"></span>
        <span class="upload-text">点击或拖拽文件到此处上传</span>
        <span class="upload-hint">支持 PDF, Word, TXT, Markdown</span>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button class="btn-outline action-btn" @click="router.back()">取消</button>
        <button class="btn-primary action-btn" @click="save">保存更改</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.doc-edit-container {
  max-width: 48rem;
  margin: 0 auto;
}

.edit-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-top: 0.25rem;
}

.edit-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.form-hint {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  text-align: right;
  margin-top: 0.25rem;
}

.upload-area {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  border-color: var(--color-primary);
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
}

.upload-icon {
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
}

.upload-text {
  font-size: var(--font-size-sm);
}

.upload-hint {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-top: 0.25rem;
}

.form-actions {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.action-btn {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>

