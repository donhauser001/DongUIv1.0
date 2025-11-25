#!/bin/bash

# 自动进入脚本所在的目录
cd "$(dirname "$0")"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${YELLOW}🔄 正在执行暴力重启...${NC}"

# 1. 停止当前可能运行的 Node 进程 (防止端口占用)
echo -e "${YELLOW}🛑 清理旧进程和端口...${NC}"

# 清理前端端口 51730
if lsof -ti:51730 > /dev/null 2>&1; then
    echo -e "${BLUE}  ⚡ 清理前端端口 51730...${NC}"
    lsof -ti:51730 | xargs kill -9 2>/dev/null || true
    echo -e "${GREEN}  ✓ 前端端口已清理${NC}"
else
    echo -e "${GREEN}  ✓ 前端端口 51730 空闲${NC}"
fi

# 清理后端端口 50000
if lsof -ti:50000 > /dev/null 2>&1; then
    echo -e "${BLUE}  ⚡ 清理后端端口 50000...${NC}"
    lsof -ti:50000 | xargs kill -9 2>/dev/null || true
    echo -e "${GREEN}  ✓ 后端端口已清理${NC}"
else
    echo -e "${GREEN}  ✓ 后端端口 50000 空闲${NC}"
fi

# 2. 重启 Docker 容器
echo -e "${YELLOW}🐳 重启数据库容器...${NC}"
docker-compose restart

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker 容器重启失败，请检查 Docker 是否正在运行${NC}"
    exit 1
fi

# 3. 等待数据库准备好
echo -e "${YELLOW}⏳ 等待数据库就绪 (5s)...${NC}"
sleep 5

# 4. 重新生成 Prisma Client (修复可能的类型不同步)
echo -e "${YELLOW}🛠  重新生成数据库客户端...${NC}"
cd apps/server
npx prisma generate

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Prisma Client 生成失败${NC}"
    cd ../..
    exit 1
fi

cd ../..

echo -e "${GREEN}✅ 重启完成！正在重新启动服务...${NC}"
echo ""

# 5. 调用启动脚本
./start.sh

