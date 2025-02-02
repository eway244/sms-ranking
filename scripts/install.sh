#!/bin/bash

# 安装前端依赖
echo "正在安装前端依赖..."
cd frontend
npm install

# 安装后端依赖
echo "正在安装后端依赖..."
cd ../backend
npm install

# 数据库迁移
echo "正在执行数据库迁移..."
mysql -u root -p < ../database/migrations/create_tables.sql

# 数据库填充
echo "正在填充数据库..."
mysql -u root -p < ../database/seeders/seed_data.sql

echo "安装完成！"