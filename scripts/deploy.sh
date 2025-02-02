#!/bin/bash

# 设置环境变量
export NODE_ENV=production

# 构建前端项目
echo "构建前端项目..."
cd frontend
npm install
npm run build

# 启动后端服务
echo "启动后端服务..."
cd ../backend
npm install
docker-compose up -d

# 提示用户部署完成
echo "部署完成！前端和后端服务已启动。"