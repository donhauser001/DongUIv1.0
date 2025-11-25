# 🚀 DongUI v1.0 优化版快速启动指南

本指南帮助你快速启动优化后的DongUI系统。

---

## 📋 前置要求

- Node.js >= 18.0.0
- PostgreSQL >= 14
- pnpm >= 8.0.0

---

## 🔧 快速启动（3步）

### 步骤 1: 启动数据库

```bash
# 使用Docker Compose启动PostgreSQL和Redis
docker-compose up -d

# 验证数据库是否启动成功
docker ps
```

### 步骤 2: 初始化后端

```bash
cd apps/server

# 安装依赖（如果尚未安装）
pnpm install

# 生成Prisma客户端
npx prisma generate

# 运行数据库迁移（如果需要）
# 注意：迁移需要交互，可以先跳过

# 初始化角色数据
npx ts-node prisma/seed-roles.ts

# 初始化权限数据
npx ts-node prisma/seed-permissions.ts

# 启动后端服务
pnpm run start:dev
```

后端将在 `http://localhost:50000` 启动

### 步骤 3: 启动前端

```bash
cd apps/web

# 安装依赖（如果尚未安装）
pnpm install

# 启动前端开发服务器
pnpm run dev
```

前端将在 `http://localhost:51730` 启动

---

## 🎉 首次使用

### 1. 创建超级管理员账户

访问 `http://localhost:51730/login`，点击"立即注册"

- **邮箱**: admin@example.com
- **姓名**: Super Admin
- **密码**: Admin123456

> **注意**: 注册的第一个用户默认为学生角色，需要手动在数据库中提升为超级管理员。

或者使用seed脚本创建：

```bash
cd apps/server
npx ts-node prisma/seed-users.ts
```

### 2. 登录系统

使用创建的账户登录：
- 访问: `http://localhost:51730/login`
- 输入邮箱和密码
- 登录成功后自动跳转到管理后台

### 3. 测试功能

登录后，你可以访问：
- **仪表板**: `/admin`
- **用户管理**: `/admin/user/list`
- **角色管理**: `/admin/user/roles`
- **权限管理**: `/admin/user/permissions`
- **组件画廊**: `/admin/dev/gallery`
- **开发指南**: `/admin/dev/guide`

---

## 🔐 认证说明

### API认证

所有需要认证的API请求都需要在Header中包含JWT Token：

```bash
Authorization: Bearer <your-jwt-token>
```

### Token获取

```bash
# 登录获取token
curl -X POST http://localhost:50000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123456"
  }'

# 响应
{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 使用Token

```bash
# 获取用户列表（需要管理员权限）
curl -X GET http://localhost:50000/api/users \
  -H "Authorization: Bearer <token>"
```

---

## 🔑 默认角色和权限

### 角色列表

| 角色 | Key | 描述 |
|------|-----|------|
| 超级管理员 | SUPER_ADMIN | 拥有所有权限 |
| 管理员 | ADMIN | 拥有大部分管理权限 |
| 学生 | STUDENT | 基础查看权限 |

### 权限分配

**SUPER_ADMIN (超级管理员)**:
- 所有权限 ✅

**ADMIN (管理员)**:
- user:read, user:create, user:update ✅
- role:read ✅
- config:read, config:update ✅
- document:read, document:create, document:update ✅

**STUDENT (学生)**:
- document:read ✅
- config:read ✅

---

## 📝 API端点快速参考

### 认证相关
```
POST   /api/auth/register      # 注册
POST   /api/auth/login         # 登录
GET    /api/auth/profile       # 获取用户信息
GET    /api/auth/me            # 获取当前用户
```

### 用户管理（需认证）
```
GET    /api/users              # 用户列表（支持分页）
POST   /api/users              # 创建用户
GET    /api/users/:id          # 用户详情
PUT    /api/users/:id          # 更新用户
DELETE /api/users/:id          # 删除用户
PATCH  /api/users/:id/toggle-status  # 切换状态
```

### 角色管理（需认证）
```
GET    /api/roles              # 角色列表
POST   /api/roles              # 创建角色（超管）
GET    /api/roles/:id          # 角色详情
PUT    /api/roles/:id          # 更新角色（超管）
DELETE /api/roles/:id          # 删除角色（超管）
```

### 权限管理（需认证）
```
GET    /api/permissions                    # 权限列表（管理员）
GET    /api/permissions/role/:roleId       # 角色权限
GET    /api/permissions/my                 # 我的权限
POST   /api/permissions/assign             # 分配权限（超管）
POST   /api/permissions/check              # 检查权限
```

### 配置管理
```
GET    /api/config/:key        # 获取配置（公开）
POST   /api/config             # 更新配置（管理员）
```

---

## 📊 数据库管理

### Prisma Studio（可视化管理）

```bash
cd apps/server
npx prisma studio
```

访问 `http://localhost:5555` 管理数据库

### 常用Prisma命令

```bash
# 生成客户端
npx prisma generate

# 查看数据库状态
npx prisma db pull

# 格式化schema
npx prisma format

# 重置数据库（危险！）
npx prisma migrate reset
```

---

## 🐛 常见问题

### 1. 端口被占用

**问题**: `Error: listen EADDRINUSE: address already in use`

**解决**:
```bash
# 查找占用端口的进程
lsof -i :50000  # 后端
lsof -i :51730  # 前端

# 杀掉进程
kill -9 <PID>
```

### 2. 数据库连接失败

**问题**: `Error: Can't reach database server`

**解决**:
```bash
# 检查Docker容器是否运行
docker ps

# 查看容器日志
docker logs dong-db

# 重启容器
docker-compose restart
```

### 3. Prisma客户端未生成

**问题**: `@prisma/client did not initialize yet`

**解决**:
```bash
cd apps/server
npx prisma generate
pnpm install
```

### 4. Token过期

**问题**: `401 Unauthorized`

**解决**: 
- 重新登录获取新token
- Token默认7天过期

### 5. 权限不足

**问题**: `403 Forbidden`

**解决**:
- 检查当前用户角色
- 确认角色是否有相应权限
- 使用超级管理员账户

---

## 🔄 开发工作流

### 1. 添加新功能模块

```bash
# 1. 后端：创建新模块
cd apps/server/src
nest g module feature
nest g service feature
nest g controller feature

# 2. 定义DTO和验证
# 3. 添加权限检查
# 4. 更新Prisma schema（如需要）

# 5. 前端：创建页面和API
cd apps/web/src
# 创建 views/feature/FeatureList.vue
# 创建 api/feature.ts
# 更新 router/index.ts
```

### 2. 修改数据库Schema

```bash
cd apps/server

# 1. 编辑 prisma/schema.prisma
# 2. 生成迁移（暂时跳过，直接生成客户端）
npx prisma generate

# 3. 更新seed脚本（如需要）
# 4. 重启后端服务
```

### 3. 添加新权限

```bash
# 编辑 prisma/seed-permissions.ts
# 添加新权限定义
# 重新运行seed
npx ts-node prisma/seed-permissions.ts
```

---

## 📦 生产环境部署

### 1. 环境变量配置

复制并编辑 `.env` 文件：

```bash
cd apps/server
cp .env.example .env
```

**必须修改的配置**:
```bash
# ⚠️ 生产环境必须修改
JWT_SECRET="your-super-secret-key-min-32-characters"
DATABASE_URL="postgresql://user:password@host:port/database"
FRONTEND_URL="https://your-domain.com"
NODE_ENV=production
```

### 2. 构建项目

```bash
# 后端
cd apps/server
pnpm run build

# 前端
cd apps/web
pnpm run build
```

### 3. 启动生产服务

```bash
# 后端
cd apps/server
pnpm run start:prod

# 前端（使用nginx或其他静态服务器）
# dist目录包含构建产物
```

---

## 📚 相关文档

- [审计报告](./AUDIT_REPORT.md) - 系统安全审计
- [优化总结](./OPTIMIZATION_SUMMARY.md) - 本次优化详情
- [项目结构](./apps/web/src/docs/01_规范指南/01_项目结构.md) - 项目架构说明
- [开发指南](./apps/web/src/docs/00_快速开始/02_后端开发指南.md) - 后端开发规范

---

## 🆘 获取帮助

如遇到问题：

1. 查看控制台错误信息
2. 检查网络请求（F12开发者工具）
3. 查看后端日志
4. 参考相关文档
5. 提交Issue

---

**祝你使用愉快！** 🎉

如有问题，请查看 [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) 获取更多详细信息。

