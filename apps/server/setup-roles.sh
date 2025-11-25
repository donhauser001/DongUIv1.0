#!/bin/bash

echo "🚀 开始设置角色系统..."

# 1. 生成 Prisma Client
echo "📦 生成 Prisma Client..."
npx prisma generate

# 2. 应用数据库迁移
echo "🗄️  应用数据库迁移..."
npx prisma migrate deploy

# 3. 创建角色种子数据
echo "🌱 创建角色种子数据..."
npx tsx prisma/seed-roles.ts

# 4. 创建用户种子数据
echo "👤 创建用户种子数据..."
npx tsx prisma/seed-users.ts

echo "✅ 角色系统设置完成！"
echo ""
echo "测试账号："
echo "  超级管理员: admin@example.com / admin123"
echo "  教师: teacher@example.com / teacher123"
echo "  学生: student@example.com / student123"

