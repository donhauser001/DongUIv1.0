#!/bin/bash

# 自动进入脚本所在的目录
cd "$(dirname "$0")"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔄 正在执行暴力重启...${NC}"

# 1. 停止当前可能运行的 Node 进程 (防止端口占用)
echo -e "${YELLOW}🛑 清理旧进程...${NC}"
# 注意：这里只杀包含 'dong-fullstack' 或者相关端口的进程，避免误杀，
# 但为了安全起见，我们主要依赖 pnpm dev 的退出，这里仅做提示或轻度清理
# 如果需要杀端口，可以使用 lsof -ti:51730 | xargs kill -9

# 2. 重启 Docker 容器
echo -e "${YELLOW}🐳 重启数据库容器...${NC}"
docker-compose restart

# 3. 等待数据库准备好
echo -e "${YELLOW}⏳ 等待数据库就绪 (3s)...${NC}"
sleep 3

# 4. 重新生成 Prisma Client (修复可能得类型不同步)
echo -e "${YELLOW}🛠  重新生成数据库客户端...${NC}"
cd apps/server
npx prisma generate
cd ../..

echo -e "${GREEN}✅ 重启完成！正在重新启动服务...${NC}"

# 5. 调用启动脚本
./start.sh

