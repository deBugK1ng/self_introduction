#!/bin/bash

# 阿里云ECS自动化部署脚本
# 使用方法: ./deploy.sh [server-ip] [domain-name]

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
SERVER_IP=${1:-"your-server-ip"}
DOMAIN_NAME=${2:-"your-domain.com"}
PROJECT_NAME="self-introduce"
WEB_ROOT="/var/www/html"
NGINX_CONF="/etc/nginx/conf.d/${PROJECT_NAME}.conf"

echo -e "${GREEN}开始部署 ${PROJECT_NAME} 到阿里云ECS...${NC}"

# 检查本地构建文件
if [ ! -d "dist" ]; then
    echo -e "${RED}错误: 未找到 dist 目录，请先运行 npm run build${NC}"
    exit 1
fi

echo -e "${YELLOW}1. 检查服务器连接...${NC}"
if ! ssh -o ConnectTimeout=10 root@${SERVER_IP} "echo '连接成功'"; then
    echo -e "${RED}错误: 无法连接到服务器 ${SERVER_IP}${NC}"
    exit 1
fi

echo -e "${YELLOW}2. 安装必要软件...${NC}"
ssh root@${SERVER_IP} << 'EOF'
# 更新系统
yum update -y

# 安装Nginx
if ! command -v nginx &> /dev/null; then
    yum install -y nginx
    systemctl enable nginx
fi

# 安装Node.js (可选)
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    yum install -y nodejs
fi

# 创建网站目录
mkdir -p /var/www/html
chown -R nginx:nginx /var/www/html
EOF

echo -e "${YELLOW}3. 上传项目文件...${NC}"
# 备份现有文件
ssh root@${SERVER_IP} "[ -d ${WEB_ROOT} ] && cp -r ${WEB_ROOT} ${WEB_ROOT}.backup.$(date +%Y%m%d_%H%M%S) || true"

# 上传新文件
scp -r dist/* root@${SERVER_IP}:${WEB_ROOT}/
scp nginx.conf root@${SERVER_IP}:${NGINX_CONF}

echo -e "${YELLOW}4. 配置Nginx...${NC}"
ssh root@${SERVER_IP} << EOF
# 替换配置文件中的占位符
sed -i 's/your-domain.com/${DOMAIN_NAME}/g' ${NGINX_CONF}

# 测试Nginx配置
nginx -t

# 重启Nginx
systemctl restart nginx
systemctl status nginx
EOF

echo -e "${YELLOW}5. 配置防火墙...${NC}"
ssh root@${SERVER_IP} << 'EOF'
# 开放HTTP和HTTPS端口
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --reload

# 检查端口状态
netstat -tlnp | grep :80
EOF

echo -e "${YELLOW}6. 设置文件权限...${NC}"
ssh root@${SERVER_IP} << EOF
# 设置正确的文件权限
chown -R nginx:nginx ${WEB_ROOT}
find ${WEB_ROOT} -type f -exec chmod 644 {} \;
find ${WEB_ROOT} -type d -exec chmod 755 {} \;
EOF

echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}访问地址: http://${SERVER_IP}${NC}"
if [ "${DOMAIN_NAME}" != "your-domain.com" ]; then
    echo -e "${GREEN}域名访问: http://${DOMAIN_NAME}${NC}"
fi

echo -e "${YELLOW}后续步骤:${NC}"
echo -e "1. 配置域名解析（如果使用域名）"
echo -e "2. 申请SSL证书: certbot --nginx -d ${DOMAIN_NAME}"
echo -e "3. 设置监控和备份"

echo -e "${YELLOW}验证部署:${NC}"
echo -e "curl -I http://${SERVER_IP}"

# 简单的健康检查
echo -e "${YELLOW}7. 健康检查...${NC}"
sleep 5
if curl -f -s http://${SERVER_IP} > /dev/null; then
    echo -e "${GREEN}✓ 网站访问正常${NC}"
else
    echo -e "${RED}✗ 网站访问异常，请检查配置${NC}"
fi