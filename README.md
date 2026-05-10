# 超级个体日志 - Super Individual Blog

> 一个人 + AI > 一群人

一个面向 **超级个体 AI 创业者** 的个人博客网站，采用毛玻璃（Glassmorphism）设计语言，前后端分离架构。

## 🏆 竞品调研摘要

在项目开发前，我们对市面上主流的个人AI博客和超级个体平台进行了深度调研：

| 类型 | 代表 | 核心功能借鉴 |
|------|------|-------------|
| **个人AI研究博客** | Lilian Weng (Lil'Log)、Andrej Karpathy、Sebastian Ruder | 内容深度、长篇技术文章、干净的阅读体验 |
| **超级个体平台** | IndieDeck、Makers Page、FoundersWall | 项目展示、MRR显示、Build Log时间线 |
| **独立开发者博客** | 歸藏、哥飞、花叔 | 一人公司理念、AI创业方法、SEO优化 |
| **技术博客平台** | Hashnode、Dev.to | Markdown写作、分类标签、评论系统**

### 核心差异化功能

根据竞品分析，我们聚焦以下超级个体专属功能：

- ✅ **AI项目展示** - 带MRR收入显示的创业项目卡片
- ✅ **Build Log** - 创业历程时间线
- ✅ **文章 + 项目管理** - 统一的发布平台
- ✅ **毛玻璃设计** - 现代化视觉语言
- ✅ **Newsletter订阅** - 构建私域流量

## 🚀 技术栈

### 前端 (React)
- **框架**: React 18 + React Router 6
- **构建**: Vite 5
- **样式**: Tailwind CSS 3 (毛玻璃设计系统)
- **动画**: Framer Motion
- **HTTP**: Axios
- **内容**: React Markdown

### 后端 (Node.js)
- **框架**: Express.js
- **数据库**: SQLite (Sequelize ORM)
- **认证**: JWT
- **文件上传**: Multer
- **密码加密**: bcryptjs

## 📂 项目结构

```
super-individual-blog/
├── server/                    # 后端服务
│   ├── src/
│   │   ├── index.js          # 入口文件
│   │   ├── seed.js           # 种子数据
│   │   ├── config/
│   │   │   ├── db.js         # 数据库配置
│   │   │   └── index.js      # 环境配置
│   │   ├── models/           # 数据模型
│   │   │   ├── User.js       # 用户
│   │   │   ├── Post.js       # 文章
│   │   │   ├── Project.js    # 项目
│   │   │   ├── Comment.js    # 评论
│   │   │   ├── Subscriber.js # 订阅者
│   │   │   ├── SiteConfig.js # 站点配置
│   │   │   └── index.js      # 模型关联
│   │   ├── routes/           # API路由
│   │   │   ├── auth.js       # 认证
│   │   │   ├── posts.js      # 文章
│   │   │   ├── projects.js   # 项目
│   │   │   ├── comments.js   # 评论
│   │   │   ├── subscribers.js# 订阅
│   │   │   ├── upload.js     # 上传
│   │   │   └── site.js       # 站点配置
│   │   └── middleware/        # 中间件
│   │       ├── auth.js       # JWT认证
│   │       └── upload.js     # 文件上传
│   ├── uploads/               # 上传文件
│   └── .env                  # 环境变量
│
├── client/                    # 前端应用
│   ├── src/
│   │   ├── main.jsx          # 入口
│   │   ├── App.jsx           # 路由配置
│   │   ├── index.css         # 全局样式 + 毛玻璃系统
│   │   ├── utils/
│   │   │   └── api.js        # API客户端
│   │   ├── components/
│   │   │   ├── layout/       # 布局组件
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── common/       # 通用组件
│   │   │       ├── GlassCard.jsx
│   │   │       ├── Loading.jsx
│   │   │       └── AdminLayout.jsx
│   │   └── pages/
│   │       ├── Home.jsx      # 首页
│   │       ├── Blog.jsx      # 文章列表
│   │       ├── BlogPost.jsx  # 文章详情
│   │       ├── Projects.jsx  # 项目展示
│   │       ├── ProjectDetail.jsx
│   │       ├── About.jsx     # 关于
│   │       ├── Login.jsx     # 登录
│   │       └── admin/        # 后台管理
│   │           ├── Dashboard.jsx
│   │           ├── Posts.jsx
│   │           ├── PostEdit.jsx
│   │           ├── Projects.jsx
│   │           ├── ProjectEdit.jsx
│   │           ├── Comments.jsx
│   │           └── Settings.jsx
│   ├── index.html
│   └── vite.config.js
│
├── package.json               # 根项目配置
└── README.md                  # 本文件
```

## ✨ 功能清单

### 前台功能 (Public)

| 功能 | 说明 |
|------|------|
| 🏠 **首页** | Hero区 + 最新文章 + 精选项目 + Newsletter订阅 |
| 📝 **文章列表** | 分类筛选、搜索、分页、标签系统 |
| 📄 **文章详情** | Markdown渲染、阅读时间、前后文章导航、评论 |
| 🚀 **项目展示** | 筛选、MRR显示、技术栈标签、GitHub链接 |
| 👤 **关于页面** | 个人简介、社交链接、理念展示 |
| 📬 **Newsletter** | 邮箱订阅/退订 |
| 🌐 **SEO优化** | 语义HTML、meta标签 |

### 后台管理 (Admin)

| 功能 | 说明 |
|------|------|
| 📊 **仪表盘** | 数据统计（文章/项目/评论/订阅者） |
| ✍️ **文章管理** | 创建/编辑/删除/发布/草稿 |
| 🗂️ **项目管理** | 创建/编辑/删除，支持MRR和状态管理 |
| 💬 **评论管理** | 审核/通过/拒绝/删除 |
| ⚙️ **站点设置** | 站点名称、描述、SEO、关于内容 |

## 🎨 毛玻璃设计系统

项目采用现代化的 **Glassmorphism** 设计语言：

```css
/* 设计核心 tokens */
--glass-bg: rgba(255, 255, 255, 0.08);        /* 半透明背景 */
--glass-border: rgba(255, 255, 255, 0.15);    /* 柔和边框 */
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); /* 浮动阴影 */
--glass-blur: 20px;                             /* 背景模糊 */
```

### 设计特点
- **动态背景** - 渐变色动画背景，营造深度感
- **毛玻璃卡片** - `backdrop-filter: blur(20px)` 实现半透明效果
- **发光边框** - 悬浮时边框高亮渐变
- **微交互动画** - Framer Motion驱动的平滑过渡
- **自适应布局** - 完全响应式，支持移动端

## 🛠️ 快速开始

### 前置要求
- Node.js >= 18
- npm >= 9

### 1. 安装依赖

```bash
# 安装所有依赖（根目录 + server + client）
cd super-individual-blog
npm install
npm run install:all
```

### 2. 初始化数据

```bash
# 创建数据库并填充示例数据
cd server
npm run seed
```

### 3. 启动开发服务器

```bash
# 同时启动前后端
cd super-individual-blog
npm run dev

# 或分别启动
npm run dev:server   # 后端 http://localhost:5000
npm run dev:client   # 前端 http://localhost:3000
```

### 4. 访问

- **前台**: http://localhost:3000
- **后台**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

### 默认管理员账号

- 邮箱: `admin@superindividual.com`
- 密码: `admin123456`

## 📡 API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/login` | 登录 | - |
| POST | `/api/auth/register` | 注册 | - |
| GET | `/api/auth/me` | 当前用户 | ✓ |
| GET | `/api/posts` | 文章列表 | - |
| GET | `/api/posts/slug/:slug` | 文章详情 | - |
| POST | `/api/posts` | 创建文章 | ✓ |
| PUT | `/api/posts/:id` | 更新文章 | ✓ |
| DELETE | `/api/posts/:id` | 删除文章 | ✓ |
| GET | `/api/projects` | 项目列表 | - |
| GET | `/api/projects/slug/:slug` | 项目详情 | - |
| POST | `/api/projects` | 创建项目 | ✓ |
| PUT | `/api/projects/:id` | 更新项目 | ✓ |
| DELETE | `/api/projects/:id` | 删除项目 | ✓ |
| GET/POST | `/api/comments` | 评论操作 | - |
| POST | `/api/subscribers` | 订阅 | - |
| GET | `/api/site` | 站点配置 | - |

## 🚢 部署

### 生产构建

```bash
cd client
npm run build
# 构建产物在 client/dist/
```

将 `client/dist/` 部署到 Vercel/Netlify，`server/` 部署到 Railway/Zeabur。

## 🤝 贡献

欢迎提交 Issue 和 PR！一起打造最好的超级个体博客平台。

## 📄 许可证

MIT
