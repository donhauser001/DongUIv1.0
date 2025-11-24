#!/bin/bash

# 自动进入脚本所在的目录，防止路径错误
cd "$(dirname "$0")"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 正在启动 Dong-FullStack 开发环境...${NC}"

# 1. 检查并启动 Docker 容器
echo -e "${BLUE}📦 检查数据库容器状态...${NC}"
if [ ! "$(docker ps -q -f name=dong_postgres)" ]; then
    if [ "$(docker ps -aq -f name=dong_postgres)" ]; then
        echo "容器已存在，正在启动..."
        docker start dong_postgres dong_redis
    else
        echo "首次启动，创建容器..."
        docker-compose up -d
    fi
else
    echo -e "${GREEN}✔ 数据库容器正在运行${NC}"
fi

# 2. 检查 .env 文件
if [ ! -f "apps/server/.env" ]; then
    echo -e "${BLUE}📝 未检测到后端配置文件，正在创建默认配置...${NC}"
    echo 'DATABASE_URL="postgresql://admin:dong_password_123@localhost:54320/dong_db?schema=public"' > apps/server/.env
fi

# 3. 安装依赖
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 正在安装项目依赖...${NC}"
    pnpm install
fi

# 4. 同步数据库结构 (Prisma)
echo -e "${BLUE}🔄 同步数据库结构...${NC}"
cd apps/server
npx prisma db push
cd ../..

# 5. 启动服务
echo -e "${GREEN}✅ 环境准备就绪！${NC}"
echo -e "${GREEN}👉 前端地址: http://localhost:51730${NC}"
echo -e "${GREEN}👉 后端地址: http://localhost:50000${NC}"
echo -e "${BLUE}正在启动开发服务器...${NC}"

pnpm run dev

