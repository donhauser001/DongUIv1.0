<script setup lang="ts">
import { ref } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

const articleTitle = ref('')
const articleContent = ref('')
const editorRef = ref<InstanceType<typeof RichTextEditor> | null>(null)

// 预设内容示例
const templates = [
  {
    name: '空白文档',
    content: ''
  },
  {
    name: '文章模板',
    content: '<h2>文章标题</h2><p>在这里开始你的文章...</p><h3>第一部分</h3><p>内容...</p><h3>第二部分</h3><p>内容...</p>'
  },
  {
    name: '公告模板',
    content: '<h2>📢 重要公告</h2><p><strong>发布时间：</strong>2024年1月1日</p><p><strong>公告内容：</strong></p><p>这里是公告的详细内容...</p><p><strong>特别提醒：</strong></p><ul><li>注意事项1</li><li>注意事项2</li><li>注意事项3</li></ul>'
  },
  {
    name: '产品介绍',
    content: '<h2>🎯 产品名称</h2><p><strong>产品简介：</strong>一句话描述产品核心价值</p><h3>核心功能</h3><ul><li><strong>功能1：</strong>功能描述</li><li><strong>功能2：</strong>功能描述</li><li><strong>功能3：</strong>功能描述</li></ul><h3>产品优势</h3><ol><li>优势1</li><li>优势2</li><li>优势3</li></ol>'
  }
]

// 加载模板
const loadTemplate = (template: typeof templates[0]) => {
  articleContent.value = template.content
}

// 清空内容
const clearContent = () => {
  if (confirm('确定要清空所有内容吗？')) {
    editorRef.value?.clear()
  }
}

// 获取纯文本
const getPlainText = () => {
  const text = editorRef.value?.getTextContent()
  alert(`纯文本内容（${text?.length || 0} 字）：\n\n${text}`)
}

// 保存草稿
const saveDraft = () => {
  const draft = {
    title: articleTitle.value,
    content: articleContent.value,
    savedAt: new Date().toLocaleString()
  }
  localStorage.setItem('richtext-draft', JSON.stringify(draft))
  alert('草稿已保存到本地！')
}

// 加载草稿
const loadDraft = () => {
  const draft = localStorage.getItem('richtext-draft')
  if (draft) {
    const data = JSON.parse(draft)
    articleTitle.value = data.title
    articleContent.value = data.content
    alert(`已加载草稿（保存于 ${data.savedAt}）`)
  } else {
    alert('没有找到草稿')
  }
}

// 提交表单
const handleSubmit = () => {
  if (!articleTitle.value.trim()) {
    alert('请输入文章标题')
    return
  }
  if (!articleContent.value.trim()) {
    alert('请输入文章内容')
    return
  }
  
  console.log('提交数据：', {
    title: articleTitle.value,
    content: articleContent.value
  })
  
  alert('提交成功！（查看控制台）')
}

// 自定义图片上传函数（示例）
const handleImageUpload = async (file: File): Promise<string> => {
  // 这里可以实现真实的上传逻辑
  // 例如：上传到服务器或云存储
  
  console.log('上传图片:', file.name, file.size, file.type)
  
  // 模拟上传延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 示例：这里返回 Base64（实际应该返回服务器 URL）
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  
  // 实际使用时应该类似这样：
  // const formData = new FormData()
  // formData.append('image', file)
  // const response = await fetch('/api/upload/image', {
  //   method: 'POST',
  //   body: formData
  // })
  // const data = await response.json()
  // return data.url
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">富文本编辑器示例</h1>
      <p class="page-desc">展示如何在实际场景中使用富文本编辑器组件</p>
    </div>

    <div class="content-wrapper">
      <!-- 左侧：编辑区域 -->
      <div class="editor-section">
        <div class="info-card">
          <h3 class="card-title">创建文章</h3>
          
          <form @submit.prevent="handleSubmit" class="article-form">
            <!-- 文章标题 -->
            <div class="form-group">
              <label class="form-label">文章标题 *</label>
              <input 
                v-model="articleTitle"
                type="text" 
                class="input-base" 
                placeholder="请输入文章标题..."
                required
              />
            </div>

            <!-- 富文本编辑器 -->
            <div class="form-group">
              <label class="form-label">文章内容 *</label>
              <RichTextEditor
                ref="editorRef"
                v-model="articleContent"
                placeholder="开始编写你的文章内容..."
                min-height="20rem"
                max-height="50rem"
                :upload-image="handleImageUpload"
                :max-image-size="5"
              />
            </div>

            <!-- 操作按钮 -->
            <div class="form-actions">
              <button type="submit" class="btn-primary">
                <span class="i-carbon-checkmark"></span>
                发布文章
              </button>
              <button type="button" class="btn-outline" @click="saveDraft">
                <span class="i-carbon-save"></span>
                保存草稿
              </button>
              <button type="button" class="btn-outline" @click="loadDraft">
                <span class="i-carbon-document"></span>
                加载草稿
              </button>
              <button type="button" class="btn-outline" @click="getPlainText">
                <span class="i-carbon-text-align-left"></span>
                查看纯文本
              </button>
              <button type="button" class="btn-outline" @click="clearContent">
                <span class="i-carbon-trash-can"></span>
                清空内容
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 右侧：模板和预览 -->
      <div class="sidebar-section">
        <!-- 快速模板 -->
        <div class="info-card">
          <h3 class="card-title">快速模板</h3>
          <p class="card-desc">选择一个模板快速开始</p>
          
          <div class="template-list">
            <button
              v-for="template in templates"
              :key="template.name"
              class="template-item"
              @click="loadTemplate(template)"
            >
              <span class="i-carbon-document-blank"></span>
              {{ template.name }}
            </button>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="info-card">
          <h3 class="card-title">使用说明</h3>
          <div class="usage-tips">
            <div class="tip-item">
              <span class="i-carbon-text-bold tip-icon"></span>
              <div>
                <strong>文本格式</strong>
                <p>使用工具栏按钮设置粗体、斜体、下划线等</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="i-carbon-list tip-icon"></span>
              <div>
                <strong>列表</strong>
                <p>创建有序或无序列表来组织内容</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="i-carbon-link tip-icon"></span>
              <div>
                <strong>链接和图片</strong>
                <p>插入超链接和图片丰富内容</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="i-carbon-undo tip-icon"></span>
              <div>
                <strong>撤销/重做</strong>
                <p>支持撤销和重做操作</p>
              </div>
            </div>
          </div>
        </div>

        <!-- API 说明 -->
        <div class="info-card">
          <h3 class="card-title">组件 API</h3>
          <div class="api-docs">
            <h4>Props</h4>
            <ul>
              <li><code>v-model</code> - 绑定内容（HTML）</li>
              <li><code>placeholder</code> - 占位文本</li>
              <li><code>disabled</code> - 禁用状态</li>
              <li><code>min-height</code> - 最小高度</li>
              <li><code>max-height</code> - 最大高度</li>
              <li><code>show-toolbar</code> - 显示工具栏</li>
            </ul>
            
            <h4>Events</h4>
            <ul>
              <li><code>@change</code> - 内容变化</li>
              <li><code>@focus</code> - 获得焦点</li>
              <li><code>@blur</code> - 失去焦点</li>
            </ul>
            
            <h4>Methods</h4>
            <ul>
              <li><code>clear()</code> - 清空内容</li>
              <li><code>getTextContent()</code> - 获取纯文本</li>
              <li><code>setContent(html)</code> - 设置内容</li>
              <li><code>focus()</code> - 聚焦编辑器</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.page-desc {
  color: var(--color-text-secondary);
  margin: 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

@media (max-width: 1200px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

.editor-section {
  min-width: 0;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0 0 1rem 0;
}

.article-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.form-actions button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.template-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.template-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  text-align: left;
}

.template-item:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary);
}

.usage-tips {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  gap: 0.75rem;
}

.tip-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-top: 0.125rem;
}

.tip-item strong {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.tip-item p {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.api-docs {
  font-size: 0.875rem;
}

.api-docs h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 1rem 0 0.5rem 0;
}

.api-docs h4:first-child {
  margin-top: 0;
}

.api-docs ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--color-text-secondary);
}

.api-docs li {
  margin: 0.25rem 0;
  line-height: 1.6;
}

.api-docs code {
  padding: 0.125rem 0.375rem;
  background: var(--color-bg-tertiary);
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.8125rem;
  color: var(--color-primary);
}
</style>

