# 阿里云ECS部署指南

## 项目概述
这是一个基于React + Vite构建的个人介绍网站，需要部署到阿里云ECS服务器上。

## 部署步骤

### 1. 准备工作
- ✅ 项目已构建完成，生成了 `dist` 目录
- 📁 构建产物位置：`f:/Project/self_introduce/dist/`
- 📦 包含文件：
  - `index.html` (入口文件)
  - `assets/index-bf14a6cf.css` (样式文件)
  - `assets/index-e3d34d05.js` (JavaScript文件)

### 2. 阿里云ECS服务器配置

#### 2.1 连接到ECS服务器
```bash
ssh root@your-server-ip
# 或使用密钥文件
ssh -i your-key.pem root@your-server-ip
```

#### 2.2 安装必要软件
```bash
# 更新系统
yum update -y

# 安装Nginx
yum install -y nginx

# 启动并设置开机自启
systemctl start nginx
systemctl enable nginx

# 安装Node.js (可选，用于后续维护)
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs
```

### 3. 上传项目文件

#### 方法1：使用SCP命令
```bash
# 在本地执行，上传整个dist目录
scp -r f:/Project/self_introduce/dist/* root@your-server-ip:/var/www/html/
```

#### 方法2：使用FTP工具
- 使用FileZilla、WinSCP等工具
- 将 `dist` 目录下的所有文件上传到 `/var/www/html/`

#### 方法3：使用Git (推荐)
```bash
# 在服务器上执行
cd /var/www/html/
git clone your-repository-url .
npm install
npm run build
cp -r dist/* ./
```

### 4. 配置Nginx

#### 4.1 创建网站配置文件
```bash
# 创建配置文件
vim /etc/nginx/conf.d/self-introduce.conf
```

#### 4.2 配置内容
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或IP
    root /var/www/html;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 处理单页应用路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

#### 4.3 测试并重启Nginx
```bash
# 测试配置
nginx -t

# 重启Nginx
systemctl restart nginx
```

### 5. 配置防火墙和安全组

#### 5.1 开放端口
```bash
# 开放80端口
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --reload
```

#### 5.2 阿里云安全组设置
- 登录阿里云控制台
- 进入ECS实例管理
- 配置安全组规则，开放80端口（HTTP）和443端口（HTTPS）

### 6. 域名配置（可选）

#### 6.1 域名解析
- 在域名服务商处添加A记录
- 将域名指向ECS服务器IP地址

#### 6.2 SSL证书配置（推荐）
```bash
# 安装certbot
yum install -y certbot python3-certbot-nginx

# 申请SSL证书
certbot --nginx -d your-domain.com

# 设置自动续期
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
```

### 7. 验证部署

#### 7.1 检查服务状态
```bash
# 检查Nginx状态
systemctl status nginx

# 检查端口监听
netstat -tlnp | grep :80
```

#### 7.2 访问测试
- 浏览器访问：`http://your-server-ip` 或 `http://your-domain.com`
- 检查移动端适配效果
- 测试导航功能

### 8. 维护和更新

#### 8.1 更新网站内容
```bash
# 备份当前版本
cp -r /var/www/html /var/www/html.backup.$(date +%Y%m%d)

# 上传新版本文件
# 重启Nginx（如有配置更改）
systemctl restart nginx
```

#### 8.2 监控和日志
```bash
# 查看Nginx访问日志
tail -f /var/log/nginx/access.log

# 查看Nginx错误日志
tail -f /var/log/nginx/error.log
```

## 注意事项

1. **备份重要数据**：部署前请备份重要配置文件
2. **安全设置**：定期更新系统和软件包
3. **性能优化**：根据访问量调整Nginx配置
4. **监控告警**：设置服务器监控和告警机制

## 常见问题

### Q: 网站无法访问
A: 检查防火墙设置、安全组配置、Nginx状态

### Q: 静态资源加载失败
A: 检查文件路径、Nginx配置、文件权限

### Q: 移动端显示异常
A: 确认响应式CSS文件正确加载

## 联系支持
如遇到部署问题，请检查：
1. 服务器日志文件
2. 网络连接状态
3. 配置文件语法