# DongUI 后端服务

基于 NestJS + Prisma + PostgreSQL 的后端服务。

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动数据库

```bash
# 在项目根目录
docker-compose up -d
```

### 3. 运行数据库迁移

```bash
# 生成 Prisma Client
pnpm prisma:generate

# 运行迁移（需要在交互式终端中）
pnpm prisma migrate dev --name init
```

### 4. 创建种子数据

```bash
pnpm prisma:seed
```

这将创建以下测试用户：

| 邮箱 | 密码 | 角色 | 状态 |
|------|------|------|------|
| admin@dong.com | password123 | 超级管理员 | 启用 |
| manager@dong.com | password123 | 管理员 | 启用 |
| teacher1@dong.com | password123 | 教师 | 启用 |
| teacher2@dong.com | password123 | 教师 | 启用 |
| teacher3@dong.com | password123 | 教师 | 启用 |
| student1@dong.com | password123 | 学生 | 启用 |
| student2@dong.com | password123 | 学生 | 启用 |
| student3@dong.com | password123 | 学生 | 启用 |
| student4@dong.com | password123 | 学生 | 启用 |
| student5@dong.com | password123 | 学生 | 启用 |
| disabled@dong.com | password123 | 学生 | 禁用 |

### 5. 启动开发服务器

```bash
pnpm dev
```

服务将运行在 http://localhost:50000

## 📡 API 端点

### 用户管理

- `GET /api/users` - 获取用户列表
- `GET /api/users/:id` - 获取用户详情
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `PATCH /api/users/:id/toggle-status` - 切换用户状态
- `DELETE /api/users/:id` - 删除用户
- `GET /api/users/stats` - 获取用户统计

### 配置管理

- `GET /api/config/:key` - 获取配置
- `POST /api/config` - 保存配置

## 🗄️ 数据库管理

### Prisma Studio

可视化数据库管理工具：

```bash
pnpm prisma studio
```

访问 http://localhost:5555

### 重置数据库

```bash
# 删除所有数据并重新运行迁移
pnpm prisma migrate reset

# 这将自动运行种子脚本
```

### 查看数据库

```bash
# 连接到 PostgreSQL
docker exec -it dong-postgres psql -U postgres -d dong_db

# 查看所有表
\dt

# 查看用户表
SELECT * FROM "User";

# 退出
\q
```

## 🛠️ 开发命令

```bash
# 开发模式（热重载）
pnpm dev

# 生产构建
pnpm build

# 启动生产服务
pnpm start

# 生成 Prisma Client
pnpm prisma:generate

# 推送 schema 到数据库（不创建迁移）
pnpm prisma:push

# 创建种子数据
pnpm prisma:seed
```

## 📝 环境变量

创建 `.env` 文件：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:54320/dong_db?schema=public"
PORT=50000
```

## 🔒 安全性

- 所有密码使用 bcrypt 加密（salt rounds: 10）
- 邮箱唯一性约束
- 输入验证（待完善）
- CORS 配置（待完善）

## 📚 相关文档

- [NestJS 文档](https://docs.nestjs.com/)
- [Prisma 文档](https://www.prisma.io/docs/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)

## 🐛 常见问题

### 数据库连接失败

确保 Docker 容器正在运行：

```bash
docker ps
```

如果没有运行，启动容器：

```bash
docker-compose up -d
```

### 迁移失败

删除 `prisma/migrations` 目录并重新运行：

```bash
rm -rf prisma/migrations
pnpm prisma migrate dev --name init
```

### 种子数据已存在

种子脚本使用 `upsert`，可以安全地重复运行。

---

**最后更新**: 2024-11-24

