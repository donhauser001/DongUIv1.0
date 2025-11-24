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
const modules = import.meta.glob('/src/docs/**/*.md', { as: 'raw', eager: true })

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

renderer.heading = (text, level) => {
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
  <div class="flex h-[calc(100vh-120px)] bg-white border-1 border-dong-border rounded-md overflow-hidden">
    
    <!-- Left Sidebar: File Tree -->
    <div class="w-64 bg-gray-50 border-r-1 border-dong-border flex flex-col overflow-y-auto shrink-0">
      <div class="p-4 border-b-1 border-dong-border">
        <h3 class="font-bold text-gray-800 flex items-center">
          <span class="i-carbon-notebook mr-2 text-primary"></span>
          文档中心
        </h3>
      </div>
      
      <div class="p-4 space-y-6">
        <div v-for="cat in categories" :key="cat.name">
          <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-2">{{ cat.name }}</h4>
          <div class="space-y-1">
            <button 
              v-for="doc in cat.files" 
              :key="doc.path"
              @click="selectDoc(doc)"
              class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center"
              :class="currentDoc?.path === doc.path 
                ? 'bg-white text-primary shadow-sm border-1 border-dong-border' 
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'"
            >
              <span class="i-carbon-document mr-2 opacity-50"></span>
              {{ doc.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle: Main Content -->
    <div class="flex-1 overflow-y-auto p-8 scroll-smooth">
      <div v-if="currentDoc" class="max-w-3xl mx-auto">
        <div class="mb-6 border-b-1 border-gray-100 pb-4">
          <h1 class="text-2xl font-bold text-gray-900">{{ currentDoc.name }}</h1>
          <p class="text-xs text-gray-400 mt-2 font-mono">{{ currentDoc.path }}</p>
        </div>
        
        <!-- Markdown Render Area -->
        <article class="markdown-content" v-html="renderedContent"></article>
      </div>
      
      <div v-else class="h-full flex items-center justify-center text-gray-400">
        <p>请选择左侧文档查看</p>
      </div>
    </div>

    <!-- Right Sidebar: Table of Contents -->
    <div class="w-64 border-l-1 border-dong-border bg-white p-4 shrink-0 flex flex-col">
      <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">本页目录</h4>
      
      <div v-if="toc.length === 0" class="text-xs text-gray-300 italic">
        无目录
      </div>

      <ul v-else class="space-y-1 text-sm overflow-y-auto flex-1">
        <li v-for="item in toc" :key="item.id" class="transition-colors duration-200">
          <a 
            href="#" 
            @click.prevent="scrollToHeader(item.id)"
            class="truncate block py-1"
            :class="[
              item.level === 3 
                ? 'pl-6 text-xs text-gray-500 border-l-2 border-gray-100 hover:border-primary hover:text-primary' 
                : 'mt-3 font-bold text-gray-800 hover:text-primary'
            ]"
            :title="item.text"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<style>
/* Markdown 内容样式 - 现在 Tailwind Reset 已移除，样式应该能正常工作 */
.markdown-content {
  line-height: 1.6;
  color: #4b5563;
}

/* 标题样式 - 明确的、可控的样式定义 */
.markdown-content h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111827;
  line-height: 1.2;
}

.markdown-content h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
  line-height: 1.3;
}

.markdown-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: #374151;
  line-height: 1.4;
}

.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #4b5563;
}

.markdown-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-content ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-content pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.markdown-content code {
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #03624C;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.markdown-content pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

.markdown-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  color: #6b7280;
  font-style: italic;
  margin-bottom: 1rem;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.markdown-content th {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  font-weight: 600;
  background: #f9fafb;
}

.markdown-content td {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.markdown-content a {
  color: #03624C;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #00cf3f;
}
</style>
