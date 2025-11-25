<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'

// 1. 定义文档结构类型
interface DocFile {
  name: string
  path: string
  content: string
}

interface DocCategory {
  name: string
  files: DocFile[]
}

interface TocItem {
  id: string
  text: string
  level: number
}

// 2. 自动扫描所有 .md 文件
const modules = import.meta.glob('/src/docs/**/*.md', { as: 'raw', eager: true }) as Record<string, string>

// 3. 处理数据结构
const categories = ref<DocCategory[]>([])
const currentDoc = ref<DocFile | null>(null)
const toc = ref<TocItem[]>([])

const initDocs = () => {
  const cats: Record<string, DocFile[]> = {}

  for (const path in modules) {
    const content = modules[path]
    const parts = path.split('/')
    const fileName = parts[parts.length - 1].replace('.md', '')
    const catName = parts[parts.length - 2]

    if (!cats[catName]) {
      cats[catName] = []
    }
    cats[catName].push({
      name: fileName,
      path,
      content
    })
  }

  categories.value = Object.keys(cats).sort().map(name => ({
    name,
    files: cats[name].sort((a, b) => a.name.localeCompare(b.name))
  }))

  if (categories.value.length > 0 && categories.value[0].files.length > 0) {
    selectDoc(categories.value[0].files[0])
  }
}

// 4. 渲染 Markdown 并提取 TOC
// 使用 Token 解析方式，不依赖 renderer
const renderer = new marked.Renderer()

renderer.heading = (tokens: any) => {
  const text = tokens.text || ''
  const level = tokens.depth || 1
  const rawText = typeof text === 'object' && text !== null && 'text' in text
    ? (text as any).text
    : String(text)
  const escapedText = rawText.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
  return `<h${level} id="${escapedText}">${rawText}</h${level}>`
}

const renderedContent = computed(() => {
  if (!currentDoc.value) {
    toc.value = []
    return ''
  }
  
  // 1. 先解析成 Token 树
  const tokens = marked.lexer(currentDoc.value.content)
  
  // 2. 从 Token 树中提取所有 heading (level > 1)
  const tocItems: TocItem[] = []
  tokens.forEach((token: any) => {
    if (token.type === 'heading' && token.depth > 1) {
      // token.text 是纯文本，不包含 Markdown 语法
      const rawText = token.text || ''
      const escapedText = rawText.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      tocItems.push({
        id: escapedText,
        text: rawText,
        level: token.depth
      })
    }
  })
  
  // 3. 更新 TOC
  toc.value = tocItems
  
  // 4. 渲染 HTML
  return marked.parser(tokens, { renderer })
})

const selectDoc = (doc: DocFile) => {
  currentDoc.value = doc
}

const scrollToHeader = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  initDocs()
})
</script>

<template>
  <div class="doc-guide-container">
    
    <!-- Left Sidebar: File Tree -->
    <div class="doc-sidebar">
      <div class="doc-sidebar-header">
        <h3 class="doc-sidebar-title">
          <span class="i-carbon-notebook doc-icon"></span>
          文档中心
        </h3>
      </div>
      
      <div class="doc-sidebar-content">
        <div v-for="cat in categories" :key="cat.name" class="doc-category">
          <h4 class="doc-category-title">{{ cat.name }}</h4>
          <div class="doc-file-list">
            <button 
              v-for="doc in cat.files" 
              :key="doc.path"
              @click="selectDoc(doc)"
              class="doc-file-item"
              :class="{ 'active': currentDoc?.path === doc.path }"
            >
              <span class="i-carbon-document doc-file-icon"></span>
              {{ doc.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle: Main Content -->
    <div class="doc-main-content">
      <div v-if="currentDoc" class="doc-content-wrapper">
        <div class="doc-content-header">
          <h1 class="doc-content-title">{{ currentDoc.name }}</h1>
          <p class="doc-content-path">{{ currentDoc.path }}</p>
        </div>
        
        <!-- Markdown Render Area -->
        <article class="markdown-content" v-html="renderedContent"></article>
      </div>
      
      <div v-else class="doc-empty-state">
        <span class="i-carbon-document-blank doc-empty-icon"></span>
        <p class="doc-empty-text">请选择左侧文档查看</p>
      </div>
    </div>

    <!-- Right Sidebar: Table of Contents -->
    <div class="doc-toc">
      <h4 class="doc-toc-title">本页目录</h4>
      
      <div v-if="toc.length === 0" class="doc-toc-empty">
        无目录
      </div>

      <ul v-else class="doc-toc-list">
        <li v-for="item in toc" :key="item.id" class="doc-toc-item">
          <a 
            href="#" 
            @click.prevent="scrollToHeader(item.id)"
            class="doc-toc-link"
            :class="{ 'level-3': item.level === 3 }"
            :title="item.text"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
/* 文档指南容器 */
.doc-guide-container {
  display: flex;
  height: calc(100vh - 120px);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  overflow: hidden;
}

/* 左侧边栏 - 文件树 */
.doc-sidebar {
  width: 20rem;
  background-color: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.doc-sidebar-header {
  padding: 1.5rem 1.25rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.doc-sidebar-title {
  font-weight: 600;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  margin: 0;
  letter-spacing: -0.01em;
}

.doc-icon {
  margin-right: 0.625rem;
  color: var(--color-primary);
  font-size: 1.125rem;
}

.doc-sidebar-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.doc-category {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.doc-category-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 0.5rem 0;
  padding-left: 0.75rem;
}

.doc-file-list {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.doc-file-item {
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 450;
  letter-spacing: -0.01em;
}

.doc-file-item:hover {
  background-color: color-mix(in srgb, var(--color-primary), transparent 95%);
  color: var(--color-text-primary);
  transform: translateX(2px);
}

.doc-file-item.active {
  background-color: transparent;
  color: var(--color-primary);
  font-weight: 600;
  position: relative;
}

.doc-file-item.active::after {
  content: '';
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.375rem;
  height: 1px;
  background-color: var(--color-primary);
}

.doc-file-icon {
  margin-right: 0.625rem;
  opacity: 0.5;
  font-size: 0.9375rem;
  flex-shrink: 0;
  transition: opacity 0.15s ease;
}

.doc-file-item:hover .doc-file-icon {
  opacity: 0.7;
}

.doc-file-item.active .doc-file-icon {
  opacity: 1;
  color: var(--color-primary);
}

/* 主内容区 */
.doc-main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  scroll-behavior: smooth;
}

.doc-content-wrapper {
  max-width: 48rem;
  margin: 0 auto;
}

.doc-content-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.doc-content-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.doc-content-path {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
  margin: 0;
  opacity: 0.7;
}

.doc-empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  gap: 1rem;
}

.doc-empty-icon {
  font-size: 3rem;
  opacity: 0.3;
}

.doc-empty-text {
  font-size: 0.875rem;
  margin: 0;
}

/* 右侧边栏 - 目录 */
.doc-toc {
  width: 20rem;
  border-left: 1px solid var(--color-border);
  background-color: var(--color-bg-primary);
  padding: 1.5rem 1.25rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.doc-toc-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 1.25rem 0;
}

.doc-toc-empty {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  font-style: italic;
}

.doc-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  overflow-y: auto;
  flex: 1;
}

.doc-toc-item {
  margin: 0;
}

.doc-toc-link {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 0.5rem;
  letter-spacing: -0.01em;
  position: relative;
}

.doc-toc-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 0;
  background-color: var(--color-primary);
  transition: height 0.15s ease;
  border-radius: 2px;
}

.doc-toc-link:hover {
  color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary), transparent 95%);
  padding-left: 0.875rem;
}

.doc-toc-link:hover::before {
  height: 60%;
}

.doc-toc-link.level-3 {
  padding-left: 2rem;
  font-size: 0.75rem;
  font-weight: 450;
  color: var(--color-text-tertiary);
  border-left: none;
  margin-top: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.doc-toc-link.level-3::before {
  display: none;
}

.doc-toc-link.level-3:hover {
  color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary), transparent 95%);
  padding-left: 2.125rem;
}
</style>

<style>
/* Markdown 内容样式 - 全局样式，不使用 scoped */
.markdown-content {
  line-height: var(--font-body-height, 1.6);
  color: var(--color-text-secondary);
  font-size: var(--font-body-size, 1rem);
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
}

/* 标题样式 */
.markdown-content h1 {
  font-size: var(--font-h1-size, 2rem);
  font-weight: var(--font-h1-weight, 700);
  line-height: var(--font-h1-height, 1.2);
  margin-top: var(--font-h1-margin-top, 0);
  margin-bottom: var(--font-h1-margin-bottom, 1.5rem);
  color: var(--color-text-primary);
}

.markdown-content h2 {
  font-size: var(--font-h2-size, 1.5rem);
  font-weight: var(--font-h2-weight, 700);
  line-height: var(--font-h2-height, 1.3);
  margin-top: var(--font-h2-margin-top, 2.5rem);
  margin-bottom: var(--font-h2-margin-bottom, 1rem);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.markdown-content h3 {
  font-size: var(--font-h3-size, 1.25rem);
  font-weight: var(--font-h3-weight, 600);
  line-height: var(--font-h3-height, 1.4);
  margin-top: var(--font-h3-margin-top, 2rem);
  margin-bottom: var(--font-h3-margin-bottom, 0.75rem);
  color: var(--color-text-primary);
}

.markdown-content h4 {
  font-size: var(--font-h4-size, 1.125rem);
  font-weight: var(--font-h4-weight, 600);
  line-height: var(--font-h4-height, 1.4);
  margin-top: var(--font-h4-margin-top, 1.5rem);
  margin-bottom: var(--font-h4-margin-bottom, 0.5rem);
  color: var(--color-text-primary);
}

/* 段落和列表 */
.markdown-content p {
  margin-top: var(--font-body-margin-top, 0);
  margin-bottom: var(--font-body-margin-bottom, 1.25rem);
  line-height: var(--font-body-height, 1.6);
  color: var(--color-text-secondary);
  font-size: var(--font-body-size, 1rem);
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--color-text-secondary);
  font-size: var(--font-body-size, 1rem);
  line-height: var(--font-body-height, 1.6);
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content li {
  margin-bottom: 0.5rem;
  line-height: var(--font-body-height, 1.6);
}

/* 代码块 */
.markdown-content pre {
  background-color: var(--color-bg-secondary);
  padding: 1.25rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono, 'Monaco', 'Menlo', monospace);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.markdown-content code {
  background-color: var(--color-bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-primary);
  font-family: var(--font-mono, 'Monaco', 'Menlo', monospace);
}

.markdown-content pre code {
  background: transparent;
  color: var(--color-text-primary);
  padding: 0;
  font-size: 0.875rem;
}

/* 引用 */
.markdown-content blockquote {
  border-left: 3px solid var(--color-primary);
  padding-left: 1.25rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin: var(--font-quote-margin-top, 1.5rem) 0 var(--font-quote-margin-bottom, 1.5rem);
  background-color: color-mix(in srgb, var(--color-primary), transparent 96%);
  border-radius: 0.375rem;
  font-size: var(--font-quote-size, var(--font-body-size, 1rem));
  line-height: var(--font-quote-height, var(--font-body-height, 1.6));
}

/* 表格 */
.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: var(--font-body-size, 1rem);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.markdown-content th {
  text-align: left;
  padding: 0.875rem 1rem;
  border-bottom: 2px solid var(--color-border);
  font-weight: 600;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-size: var(--font-body-size, 1rem);
}

.markdown-content td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-body-size, 1rem);
  line-height: var(--font-body-height, 1.6);
}

.markdown-content tr:last-child td {
  border-bottom: none;
}

.markdown-content tr:hover {
  background-color: color-mix(in srgb, var(--color-bg-secondary), transparent 50%);
}

/* 链接 */
.markdown-content a {
  color: var(--color-primary);
  text-decoration: underline;
  transition: color 0.2s ease;
}

.markdown-content a:hover {
  color: var(--color-secondary);
}

/* 分隔线 */
.markdown-content hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2rem 0;
}

/* 图片 */
.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
  border: 1px solid var(--color-border);
}

/* 强调 */
.markdown-content strong {
  font-weight: 600;
  color: var(--color-text-primary);
}

.markdown-content em {
  font-style: italic;
  color: var(--color-text-secondary);
}

/* 删除线 */
.markdown-content del {
  text-decoration: line-through;
  color: var(--color-text-tertiary);
  opacity: 0.7;
}
</style>
