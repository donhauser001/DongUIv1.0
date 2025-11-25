# 数据库迁移指南

## 用户表字段更新

本次更新为用户表添加了以下新字段：

- `phone` (String?) - 手机号
- `gender` (String?) - 性别（male/female/other）
- `birthday` (DateTime?) - 生日
- `address` (String?) - 地址
- `bio` (String?) - 个人简介

## 迁移步骤

### 1. 开发环境迁移

```bash
cd apps/server

# 方式一：使用 Prisma Migrate（推荐）
pnpm prisma migrate dev --name add_user_profile_fields

# 方式二：直接推送到数据库（开发环境快速同步）
pnpm prisma db push
```

### 2. 生产环境迁移

```bash
cd apps/server

# 生成迁移文件
pnpm prisma migrate deploy
```

### 3. 验证迁移

```bash
# 查看数据库状态
pnpm prisma migrate status

# 打开 Prisma Studio 查看数据
pnpm prisma studio
```

## 迁移后的数据结构

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  phone     String?  // 新增
  password  String
  avatar    String?
  gender    String?  // 新增
  birthday  DateTime? // 新增
  address   String?  // 新增
  bio       String?  // 新增
  role      Role     @default(STUDENT)
  status    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 注意事项

1. **备份数据**：在生产环境迁移前，请务必备份数据库
2. **可选字段**：所有新增字段都是可选的（nullable），不会影响现有数据
3. **向后兼容**：API 接口保持向后兼容，旧的请求仍然可以正常工作
4. **手机号验证**：前端会验证手机号格式（11位数字，1开头）

## 回滚方案

如果需要回滚迁移：

```bash
# 查看迁移历史
pnpm prisma migrate status

# 回滚到指定迁移
pnpm prisma migrate resolve --rolled-back <migration-name>
```

## 常见问题

### Q: 迁移失败怎么办？

A: 检查以下几点：
1. 数据库连接是否正常
2. 是否有足够的权限
3. 查看错误日志
4. 尝试使用 `pnpm prisma db push` 强制同步

### Q: 现有用户数据会丢失吗？

A: 不会。所有新增字段都是可选的，现有数据不受影响。

### Q: 如何填充现有用户的新字段？

A: 可以通过以下方式：
1. 用户自己在个人资料页面更新
2. 管理员在用户详情页面编辑
3. 编写数据迁移脚本批量更新

## 相关文件

- `apps/server/prisma/schema.prisma` - 数据库模型定义
- `apps/server/src/user/user.service.ts` - 用户服务（后端）
- `apps/web/src/api/user.ts` - 用户 API 接口（前端）
- `apps/web/src/views/admin/user/UserList.vue` - 用户列表页面
- `apps/web/src/views/admin/user/UserDetail.vue` - 用户详情页面

