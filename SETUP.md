# 🚀 DongUI 快速设置指南

## 📋 前置要求

- Node.js >= 18.x
- pnpm >= 8.x
- Docker 和 Docker Compose

## ⚡ 快速开始（5 分钟）

### 1️⃣ 安装依赖

```bash
pnpm install
```

### 2️⃣ 启动数据库

```bash
docker-compose up -d
```

等待几秒钟，确保 PostgreSQL 完全启动。

### 3️⃣ 初始化数据库

```bash
cd apps/server

# 生成 Prisma Client
pnpm prisma:generate

# 运行数据库迁移（需要手动在终端中运行）
pnpm prisma migrate dev --name init

# 创建种子数据
pnpm prisma:seed
```

### 4️⃣ 启动服务

```bash
# 返回项目根目录
cd ../..

# 启动前端和后端
pnpm -r run dev
```

### 5️⃣ 访问应用

- 🌐 **前台门户**: http://localhost:5173
- 🔧 **后台管理**: http://localhost:5173/admin
- 🔌 **后端 API**: http://localhost:50000
- 📊 **Prisma Studio**: http://localhost:5555 (运行 `pnpm prisma studio`)

## 🔑 测试账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 超级管理员 | admin@dong.com | password123 |
| 管理员 | manager@dong.com | password123 |
| 教师 | teacher1@dong.com | password123 |
| 学生 | student1@dong.com | password123 |

> 💡 所有测试账号密码统一为：`password123`

## 📂 项目结构

```
DongUIv1.0/
├── apps/
│   ├── web/          # 前端应用 (Vue 3 + TypeScript)
│   └── server/       # 后端应用 (NestJS + Prisma)
├── docker-compose.yml
└── package.json
```

## 🛠️ 常用命令

### 开发

```bash
# 启动所有服务
pnpm -r run dev

# 只启动前端
cd apps/web && pnpm dev

# 只启动后端
cd apps/server && pnpm dev
```

### 数据库

```bash
cd apps/server

# 查看数据库（可视化工具）
pnpm prisma studio

# 重置数据库（删除所有数据）
pnpm prisma migrate reset

# 重新创建种子数据
pnpm prisma:seed
```

### 构建

```bash
# 构建所有项目
pnpm -r run build

# 只构建前端
cd apps/web && pnpm build

# 只构建后端
cd apps/server && pnpm build
```

## 🎨 功能模块

### ✅ 已完成

- [x] 主题系统（组件画廊）
  - 皮肤配色
  - 外观设置
  - 字体排版
  - 品牌信息
  - 布局结构
  - 侧边导航
  - 顶部导航
  - 基础控件
  
- [x] 用户管理系统
  - 用户列表
  - 用户详情
  - 用户创建/编辑/删除
  - 角色管理
  - 状态控制

- [x] 富文本编辑器
  - 文本格式化
  - 图片上传
  - 颜色选择
  - 代码块

- [x] 开发文档中心
  - Markdown 渲染
  - 目录导航
  - 实时预览

### 🚧 待开发

- [ ] 用户认证（登录/注册）
- [ ] 权限控制（RBAC）
- [ ] 角色管理页面
- [ ] 权限管理页面
- [ ] 文件上传服务
- [ ] 日志系统

## 🐛 常见问题

### Q: 数据库连接失败？

**A**: 确保 Docker 容器正在运行：

```bash
docker ps
```

如果没有看到 `dong-postgres`，运行：

```bash
docker-compose up -d
```

### Q: 迁移失败？

**A**: 删除迁移文件夹并重新运行：

```bash
cd apps/server
rm -rf prisma/migrations
pnpm prisma migrate dev --name init
```

### Q: 端口被占用？

**A**: 修改端口配置：

- 前端：`apps/web/vite.config.ts` 中的 `server.port`
- 后端：`apps/server/.env` 中的 `PORT`
- 数据库：`docker-compose.yml` 中的端口映射

### Q: 前端无法连接后端？

**A**: 检查 Vite 代理配置：

```typescript
// apps/web/vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:50000',
      changeOrigin: true,
    },
  },
}
```

## 📚 文档

- [项目文档](./apps/web/src/docs/README.md)
- [后端文档](./apps/server/README.md)
- [用户管理系统](./apps/web/src/docs/02_组件使用/05_用户管理系统.md)

## 🤝 贡献

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

---

**需要帮助？** 查看 [常见问题文档](./apps/web/src/docs/03_常见问题/FAQ.md)

**最后更新**: 2024-11-24

