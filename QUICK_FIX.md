# 快速修复指南

## 当前问题

数据库结构已更新（从枚举角色改为 Role 表），但需要重新生成 Prisma Client 并创建种子数据。

## 解决步骤

### 方法 1: 使用一键脚本（推荐）

```bash
# 1. 停止当前运行的服务（Ctrl+C）

# 2. 进入后端目录
cd apps/server

# 3. 给脚本添加执行权限
chmod +x setup-roles.sh

# 4. 运行设置脚本
./setup-roles.sh

# 5. 返回项目根目录并重启服务
cd ../..
pnpm -r run dev
```

### 方法 2: 手动执行

```bash
# 1. 停止当前运行的服务（Ctrl+C）

# 2. 进入后端目录
cd apps/server

# 3. 生成 Prisma Client
npx prisma generate

# 4. 应用数据库迁移
npx prisma migrate deploy

# 5. 创建角色种子数据
npx tsx prisma/seed-roles.ts

# 6. 创建用户种子数据
npx tsx prisma/seed-users.ts

# 7. 返回项目根目录并重启服务
cd ../..
pnpm -r run dev
```

## 测试账号

设置完成后，可以使用以下测试账号登录：

- **超级管理员**: `admin@example.com` / `admin123`
- **教师**: `teacher@example.com` / `teacher123`
- **学生**: `student@example.com` / `student123`

## 验证

1. 访问 http://localhost:5173/admin/user/list - 应该能看到 3 个测试用户
2. 访问 http://localhost:5173/admin/user/roles - 应该能看到 4 个系统角色
3. 后端 API 应该正常响应，没有 500 错误

## 常见问题

### Q: 执行 `npx prisma migrate deploy` 时报错

A: 如果是全新数据库，使用 `npx prisma migrate dev` 代替。

### Q: 种子脚本报错 "角色不存在"

A: 确保先运行 `seed-roles.ts`，再运行 `seed-users.ts`。

### Q: 后端仍然有 TypeScript 错误

A: 确保已运行 `npx prisma generate` 重新生成 Prisma Client。

## 下一步

完成设置后，你可以：

1. 在角色管理页面创建新角色
2. 在用户管理页面创建新用户
3. 编辑现有角色和用户
4. 测试角色权限系统

