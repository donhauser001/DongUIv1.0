# 角色管理系统 - 数据库迁移指南

## 概述

本次更新将用户角色从硬编码的枚举值改为独立的 Role 表，支持动态角色管理。

## 数据库变更

### 1. 新增 Role 表

```prisma
model Role {
  id          String   @id @default(uuid())
  name        String   // 角色名称
  key         String   @unique // 角色标识
  description String?  // 角色描述
  isSystem    Boolean  @default(false) // 系统角色标记
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  users       User[]   // 关联用户
}
```

### 2. 修改 User 表

- 移除 `role` 字段（原 enum 类型）
- 新增 `roleId` 字段（String 类型，外键关联 Role.id）
- 新增 `role` 关系字段

## 迁移步骤

### 步骤 1: 生成迁移文件

```bash
cd apps/server
npx prisma migrate dev --name add_role_table
```

### 步骤 2: 创建种子角色数据

运行种子脚本创建系统默认角色：

```bash
npx tsx prisma/seed-roles.ts
```

这将创建以下系统角色：

| 角色名称 | 角色标识 | 描述 | 系统角色 |
|---------|---------|------|---------|
| 超级管理员 | SUPER_ADMIN | 拥有系统所有权限 | ✅ |
| 管理员 | ADMIN | 管理系统配置、用户管理 | ✅ |
| 教师 | TEACHER | 管理课程、查看学生信息 | ✅ |
| 学生 | STUDENT | 查看课程、提交作业 | ✅ |

### 步骤 3: 迁移现有用户数据

如果数据库中已有用户数据，需要手动将用户的旧 `role` 枚举值映射到新的 `roleId`：

```sql
-- 1. 获取角色 ID
SELECT id, key FROM "Role";

-- 2. 更新用户的 roleId（示例）
UPDATE "User" 
SET "roleId" = (SELECT id FROM "Role" WHERE key = 'STUDENT')
WHERE role = 'STUDENT';

-- 对其他角色重复此操作
UPDATE "User" 
SET "roleId" = (SELECT id FROM "Role" WHERE key = 'TEACHER')
WHERE role = 'TEACHER';

UPDATE "User" 
SET "roleId" = (SELECT id FROM "Role" WHERE key = 'ADMIN')
WHERE role = 'ADMIN';

UPDATE "User" 
SET "roleId" = (SELECT id FROM "Role" WHERE key = 'SUPER_ADMIN')
WHERE role = 'SUPER_ADMIN';
```

### 步骤 4: 验证迁移

```bash
# 查看所有角色
npx prisma studio

# 或使用 SQL
SELECT * FROM "Role";

# 检查用户角色关联
SELECT u.name, u.email, r.name as role_name, r.key as role_key
FROM "User" u
JOIN "Role" r ON u."roleId" = r.id;
```

## 功能特性

### 前端功能

1. **角色列表页面** (`/admin/user/roles`)
   - 显示所有角色
   - 显示每个角色的用户数量
   - 系统角色标记

2. **新增角色**
   - 填写角色名称、标识、描述
   - 自动验证标识唯一性

3. **编辑角色**
   - 系统角色可编辑名称和描述
   - 系统角色的标识不可修改
   - 自定义角色可完全编辑

4. **删除角色**
   - 系统角色不可删除
   - 有用户关联的角色不可删除
   - 删除前需确认

### 后端 API

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/roles` | 获取所有角色 |
| GET | `/api/roles/:id` | 获取单个角色 |
| POST | `/api/roles` | 创建角色 |
| PUT | `/api/roles/:id` | 更新角色 |
| DELETE | `/api/roles/:id` | 删除角色 |

## 注意事项

1. **系统角色保护**
   - 系统角色（`isSystem: true`）不可删除
   - 系统角色的 `key` 不可修改
   - 但可以修改系统角色的名称和描述

2. **用户关联检查**
   - 删除角色前会检查是否有用户关联
   - 如有用户，必须先重新分配用户角色

3. **角色标识规范**
   - 建议使用大写字母和下划线
   - 例如：`OPERATION_MANAGER`, `CONTENT_EDITOR`
   - 标识必须唯一

## 回滚方案

如需回滚到旧的枚举角色系统：

```bash
# 1. 回滚迁移
npx prisma migrate resolve --rolled-back <migration_name>

# 2. 恢复旧的 schema.prisma
git checkout HEAD~1 -- prisma/schema.prisma

# 3. 重新生成 Prisma Client
npx prisma generate
```

## 相关文件

- **数据库 Schema**: `apps/server/prisma/schema.prisma`
- **种子脚本**: `apps/server/prisma/seed-roles.ts`
- **后端模块**: `apps/server/src/role/`
- **前端 API**: `apps/web/src/api/role.ts`
- **前端页面**: `apps/web/src/views/admin/user/RoleList.vue`

## 问题排查

### 问题 1: 迁移失败

```bash
# 重置数据库（警告：会删除所有数据）
npx prisma migrate reset

# 重新运行迁移
npx prisma migrate dev
```

### 问题 2: 用户无法登录

检查所有用户是否都有有效的 `roleId`：

```sql
SELECT * FROM "User" WHERE "roleId" IS NULL;
```

### 问题 3: 角色 API 404

确保 `RoleModule` 已在 `app.module.ts` 中注册：

```typescript
imports: [ConfigModule, UserModule, RoleModule],
```

## 后续计划

- [ ] 权限管理系统（RBAC）
- [ ] 角色权限配置界面
- [ ] 用户批量角色分配
- [ ] 角色使用统计和分析

