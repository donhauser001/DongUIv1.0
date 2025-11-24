# Dong-FullStack Template (AI-Ready Edition)

这是一个为你量身定制的**全栈开发脚手架**。核心目标是：**配置驱动 UI，架构支持 AI**。

## 🌟 核心特性

- **UI 风格**: 预设 "Bangladesh Green" 主题体系，全局 1px 边框风格，原子化 CSS (UnoCSS)。
- **AI 能力**: 数据库层集成 `pgvector`，原生支持向量搜索（Vector Search），为 RAG 应用做好准备。
- **技术栈**: Vue 3 + NestJS + PostgreSQL + Prisma + Docker。

## 🚀 快速开始

### 1. 启动基础设施 (DB + Redis)
不需要本地安装数据库，直接使用 Docker 启动：
```bash
npm run start:db
# 或者
docker-compose up -d
```

### 2. 安装依赖
项目使用 pnpm workspaces 管理：
```bash
pnpm install
```

### 3. 启动开发环境
同时启动前端和后端：
```bash
pnpm run dev
```

---

## 📂 目录结构指南

### 前端 (apps/web)
- **配置 UI 变量**: 修改 `src/config/theme.ts`，全站颜色/圆角瞬间切换。
- **使用组件**: 
  - `<button class="btn-primary">提交</button>` (自动应用主题色)
  - `<div class="card-base">内容</div>` (自动应用 1px 边框和白底)

### 后端 (apps/server)
- **定义数据表**: 修改 `prisma/schema.prisma`。
- **AI 向量表**: 已预置 `Document` 模型，包含 `vector` 字段，可直接存 Embedding。
- **API 开发**: 在 `src` 下创建新的 Module。

## ⚠️ 首次运行注意
后端启动前，需要同步数据库结构：
```bash
cd apps/server
cp .env.example .env # 复制环境变量
npx prisma db push   # 将 schema 推送到 PostgreSQL
```

