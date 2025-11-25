#!/bin/bash

# 自动进入脚本所在的目录
cd "$(dirname "$0")"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 启动开发服务器（智能顺序启动）...${NC}"
echo ""

# 1. 先启动后端
echo -e "${BLUE}📡 启动后端服务...${NC}"
cd apps/server
pnpm run dev &
BACKEND_PID=$!
cd ../..

# 2. 等待后端就绪
echo -e "${YELLOW}⏳ 等待后端就绪...${NC}"
MAX_WAIT=30
WAITED=0

while [ $WAITED -lt $MAX_WAIT ]; do
    if curl -s http://127.0.0.1:50000/api/status > /dev/null 2>&1; then
        echo -e "${GREEN}✓ 后端已就绪 (${WAITED}s)${NC}"
        break
    fi
    sleep 1
    WAITED=$((WAITED + 1))
    echo -ne "\r${YELLOW}⏳ 等待后端就绪... ${WAITED}s${NC}"
done

echo ""

if [ $WAITED -eq $MAX_WAIT ]; then
    echo -e "${RED}❌ 后端启动超时${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""

# 3. 启动前端
echo -e "${BLUE}🌐 启动前端服务...${NC}"
cd apps/web
pnpm run dev &
FRONTEND_PID=$!
cd ../..

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 开发服务器已启动！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}  🌐 前端地址: ${BLUE}http://localhost:51730${NC}"
echo -e "${GREEN}  🔌 后端地址: ${BLUE}http://localhost:50000${NC}"
echo ""
echo -e "${YELLOW}💡 按 Ctrl+C 停止所有服务${NC}"
echo ""

# 4. 等待用户中断
trap "echo ''; echo -e '${YELLOW}🛑 正在停止服务...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM

# 保持脚本运行
wait

