#!/bin/bash

# 自动进入脚本所在的目录，防止路径错误
cd "$(dirname "$0")"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 正在启动 Dong-FullStack 开发环境...${NC}"
echo ""

# 0. 检查端口占用
echo -e "${BLUE}🔍 检查端口占用...${NC}"
PORT_CONFLICT=0

if lsof -ti:51730 > /dev/null 2>&1; then
    echo -e "${YELLOW}  ⚠️  前端端口 51730 已被占用${NC}"
    PORT_CONFLICT=1
fi

if lsof -ti:50000 > /dev/null 2>&1; then
    echo -e "${YELLOW}  ⚠️  后端端口 50000 已被占用${NC}"
    PORT_CONFLICT=1
fi

if [ $PORT_CONFLICT -eq 1 ]; then
    echo -e "${YELLOW}  💡 建议运行 ./restart.sh 进行完全重启${NC}"
    read -p "  是否继续启动？(y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ 启动已取消${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}  ✓ 端口检查通过${NC}"
fi

echo ""

# 1. 检查并启动 Docker 容器
echo -e "${BLUE}📦 检查数据库容器状态...${NC}"
if [ ! "$(docker ps -q -f name=dong_postgres)" ]; then
    if [ "$(docker ps -aq -f name=dong_postgres)" ]; then
        echo -e "${BLUE}  启动已存在的容器...${NC}"
        docker start dong_postgres dong_redis
        if [ $? -ne 0 ]; then
            echo -e "${RED}❌ 容器启动失败${NC}"
            exit 1
        fi
    else
        echo -e "${BLUE}  首次启动，创建容器...${NC}"
        docker-compose up -d
        if [ $? -ne 0 ]; then
            echo -e "${RED}❌ 容器创建失败，请检查 docker-compose.yml${NC}"
            exit 1
        fi
    fi
    echo -e "${GREEN}  ✓ 数据库容器已启动${NC}"
    echo -e "${YELLOW}  ⏳ 等待数据库初始化 (3s)...${NC}"
    sleep 3
else
    echo -e "${GREEN}  ✓ 数据库容器正在运行${NC}"
fi

echo ""

# 2. 检查 .env 文件
if [ ! -f "apps/server/.env" ]; then
    echo -e "${BLUE}📝 创建后端配置文件...${NC}"
    echo 'DATABASE_URL="postgresql://admin:dong_password_123@localhost:54320/dong_db?schema=public"' > apps/server/.env
    echo -e "${GREEN}  ✓ 配置文件已创建${NC}"
else
    echo -e "${GREEN}✓ 后端配置文件已存在${NC}"
fi

echo ""

# 3. 安装依赖
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 安装项目依赖...${NC}"
    pnpm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 依赖安装失败${NC}"
        exit 1
    fi
    echo -e "${GREEN}  ✓ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 项目依赖已安装${NC}"
fi

echo ""

# 4. 同步数据库结构 (Prisma)
echo -e "${BLUE}🔄 同步数据库结构...${NC}"
cd apps/server

# 检查是否需要生成 Prisma Client
if [ ! -d "node_modules/.prisma" ]; then
    echo -e "${BLUE}  生成 Prisma Client...${NC}"
    npx prisma generate
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Prisma Client 生成失败${NC}"
        cd ../..
        exit 1
    fi
fi

# 同步数据库结构
npx prisma db push
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 数据库同步失败${NC}"
    cd ../..
    exit 1
fi

echo -e "${GREEN}  ✓ 数据库结构已同步${NC}"
cd ../..

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 环境准备就绪！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}  🌐 前端地址: ${BLUE}http://localhost:51730${NC}"
echo -e "${GREEN}  🔌 后端地址: ${BLUE}http://localhost:50000${NC}"
echo -e "${GREEN}  📊 数据库端口: ${BLUE}54320${NC}"
echo ""
echo -e "${BLUE}正在启动开发服务器（智能顺序启动）...${NC}"
echo ""

# 5. 使用智能启动脚本（确保后端先就绪）
./dev.sh

