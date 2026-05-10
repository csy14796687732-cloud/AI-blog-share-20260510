import sequelize from './config/db.js';
import { User, Post, Project, Comment, Subscriber, SiteConfig } from './models/index.js';

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database reset complete');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@superindividual.com',
      password: 'admin123456',
      displayName: '超级个体',
      bio: '一位热爱AI技术的超级个体创业者，专注于AI产品开发和独立创业。分享我的创业历程、技术思考与产品实践。',
      role: 'admin',
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://superindividual.com',
      },
    });

    // Create site config
    await SiteConfig.create({
      id: 1,
      siteName: '超级个体日志',
      siteDescription: '分享AI创业历程、技术思考与产品实践，见证超级个体的崛起',
      seoKeywords: 'AI,超级个体,创业,独立开发者,博客,一人公司',
      aboutContent: `# 关于我

我是一名**AI创业者**和**超级个体**实践者。

## 我的故事

2024年，我辞去了大厂的工作，开始了我的独立创业之旅。从一个人、一台电脑开始，利用AI工具的力量，打造属于自己的产品。

## 我的理念

在这个AI时代，一个人可以完成过去需要整个团队才能做的工作。我坚信**超级个体**是未来的趋势——每个人都可以成为一支队伍。

## 我做什么

- 🚀 开发AI驱动的产品
- ✍️ 分享创业心得和技术思考
- 🎯 探索一人公司商业模式
- 🤝 连接志同道合的超级个体`,
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        wechat: 'superindividual',
        zhihu: 'https://zhihu.com',
        xiaohongshu: 'https://xiaohongshu.com',
      },
      footerText: '© 2026 超级个体日志. Built with ❤️ by a super individual.',
    });

    // Create sample posts
    const postsData = [
      {
        title: '一人公司时代：AI如何让超级个体崛起',
        slug: 'ai-super-individual-era',
        excerpt: '在AI的赋能下，一个人可以完成过去需要整个团队才能完成的工作。探讨超级个体时代的机遇与挑战。',
        content: `# 一人公司时代：AI如何让超级个体崛起

## 引言

2024年被誉为"AI应用元年"，2025年则是"超级个体元年"。在这个技术变革的关键时刻，我们每个人都在见证一个新时代的诞生——**一人公司时代**。

## 什么是超级个体？

超级个体（Super Individual）是指那些能够在AI的帮助下，独立完成过去需要整个团队才能完成的复杂任务的创业者。他们往往：

- **一人多能**：一个人同时担任CEO、产品经理、设计师、工程师、运营等角色
- **AI驱动**：善用各类AI工具提升10倍以上的工作效率
- **轻资产运营**：以极低的成本快速验证和迭代产品
- **全球化视野**：从第一天就面向全球市场

## AI赋能的核心领域

### 1. 代码开发
借助 Cursor、Claude 等AI编程工具，一个人可以完成从前需要前端+后端+DevOps团队才能完成的工作。

### 2. 产品设计
从UI设计到用户体验，AI设计工具让一个人也能做出专业级的产品设计。

### 3. 内容创作
AI辅助的写作、视频制作、营销文案，让内容创作效率提升了10倍以上。

### 4. 运营推广
AI驱动的SEO优化、社交媒体运营、用户分析，一个人也能玩转增长黑客。

## 真实案例

在过去一年中，我们看到越来越多成功的超级个体案例：

- **小猫补光灯**：一个人开发的AI应用，月收入超过5万美元
- **归藏的AI工具箱**：一人运营9个平台，7.8万公众号粉丝

## 挑战与思考

当然，超级个体之路并非一帆风顺：

1. **精力管理**：一个人要面对所有问题，burnout风险高
2. **决策质量**：缺乏团队讨论，需要更强的决策能力
3. **技能广度**：需要不断学习新技能

## 结语

AI正在重塑创业的底层逻辑。在这个新时代，一个人 + AI > 一群人。超级个体不是神话，而是每个有勇气拥抱变化的人都可以走的路。

---

*你准备好成为超级个体了吗？欢迎在评论区分享你的想法。*`,
        coverImage: '/api/placeholder/1200/600',
        category: '创业思考',
        tags: ['超级个体', 'AI创业', '一人公司', '未来趋势'],
        status: 'published',
        featured: true,
        publishedAt: new Date('2026-04-15'),
        authorId: admin.id,
        viewCount: 1256,
      },
      {
        title: '2026年独立开发者技术栈完全指南',
        slug: 'indie-dev-tech-stack-2026',
        excerpt: '从AI编程工具到云服务部署，整理2026年最值得独立开发者关注的技术栈选择。',
        content: `# 2026年独立开发者技术栈完全指南

## 概述

作为超级个体创业者，选择正确的技术栈至关重要。本文将分享2026年最值得关注的技术栈选择。

## AI编程工具

### Cursor (推荐)
- 当前最流行的AI-first IDE
- 支持Claude、GPT-4等多模型

### Windsurf
- 优秀的AI编程体验
- 专注代码理解

## 前端框架

- **React + Next.js**：生态最丰富
- **Tailwind CSS**：快速构建UI
- **Framer Motion**：动画效果

## 后端技术

- **Node.js + Express**：快速开发API
- **Supabase**：全栈后端服务
- **SQLite**：轻量级数据库

## 部署运维

- **Vercel**：前端部署首选
- **Zeabur**：全栈部署

选择技术栈的核心原则：**用你最熟悉的工具，快速出产品验证市场。**`,
        coverImage: '/api/placeholder/1200/600',
        category: '技术栈',
        tags: ['技术栈', '独立开发', '工具推荐', '2026'],
        status: 'published',
        featured: true,
        publishedAt: new Date('2026-05-01'),
        authorId: admin.id,
        viewCount: 892,
      },
      {
        title: '从0到1：我的AI产品开发全记录',
        slug: 'from-zero-to-one-ai-product',
        excerpt: '分享我从想法到产品上线全过程的经验总结，包括市场调研、技术选型、产品迭代等关键环节。',
        content: `# 从0到1：我的AI产品开发全记录

## 第一阶段：想法验证

在开始编码之前，先验证你的想法是否值得做。

### 验证方法
1. 用户访谈：和潜在用户聊30分钟
2. Landing Page测试：用简单的落地页收集邮箱
3. 竞品分析：了解市场格局

## 第二阶段：MVP开发

用最快的速度做出最小可行产品。

### 技术选型
- 前端：React + Tailwind CSS
- 后端：Node.js
- 数据库：SQLite

## 第三阶段：上线与迭代

快速上线，快速迭代。

### 上线检查清单
- [ ] SEO基础优化
- [ ] 数据埋点
- [ ] 错误监控
- [ ] 用户反馈渠道

## 经验总结

1. 不要追求完美，快速交付才是王道
2. 用户反馈是最好的产品经理
3. 专注核心功能，删除一切不必要的内容`,
        coverImage: '/api/placeholder/1200/600',
        category: '产品开发',
        tags: ['产品开发', 'MVP', '创业', 'AI产品'],
        status: 'published',
        featured: false,
        publishedAt: new Date('2026-05-08'),
        authorId: admin.id,
        viewCount: 456,
      },
    ];

    for (const postData of postsData) {
      await Post.create(postData);
    }

    // Create sample projects
    const projectsData = [
      {
        title: 'AI Chat Assistant',
        slug: 'ai-chat-assistant',
        description: '基于大语言模型的智能聊天助手，支持多轮对话、文档分析和知识库问答。',
        content: '一个基于最新大语言模型技术的智能聊天助手应用。支持多轮对话、文档分析、知识库问答等功能。采用RAG技术实现准确的问答能力。',
        coverImage: '/api/placeholder/800/400',
        tags: ['AI', 'ChatGPT', 'NLP', 'RAG'],
        techStack: ['React', 'Node.js', 'OpenAI', 'Pinecone', 'Tailwind CSS'],
        url: 'https://example.com/chat',
        githubUrl: 'https://github.com/example/chat',
        status: 'active',
        featured: true,
        mrr: 1200,
        startDate: '2025-09-01',
        authorId: admin.id,
      },
      {
        title: '独立开发者导航站',
        slug: 'indie-dev-navi',
        description: '专为独立开发者打造的AI工具导航站，收录300+精选工具和资源。',
        content: '一个为独立开发者和超级个体打造的AI工具导航平台。收录了300+精选AI工具和资源，涵盖编程、设计、营销、运营等多个领域。',
        coverImage: '/api/placeholder/800/400',
        tags: ['导航站', '工具', '独立开发', '资源'],
        techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Algolia'],
        url: 'https://example.com/navi',
        githubUrl: 'https://github.com/example/navi',
        status: 'active',
        featured: true,
        mrr: 800,
        startDate: '2025-11-15',
        authorId: admin.id,
      },
      {
        title: 'AI写作助手 Pro',
        slug: 'ai-writing-pro',
        description: '专为内容创作者打造的AI写作增强工具，支持长文写作、智能改写和SEO优化。',
        content: '专为内容创作者打造的AI写作增强工具。支持长文写作、智能改写、SEO优化、多语言翻译等功能。帮助创作者提升10倍写作效率。',
        coverImage: '/api/placeholder/800/400',
        tags: ['AI写作', '内容创作', 'SEO', '效率工具'],
        techStack: ['Vue 3', 'Python', 'FastAPI', 'Redis', 'PostgreSQL'],
        url: 'https://example.com/writing',
        status: 'active',
        featured: false,
        mrr: 500,
        startDate: '2026-01-20',
        authorId: admin.id,
      },
      {
        title: 'SaaS Metrics Dashboard',
        slug: 'saas-metrics-dashboard',
        description: '一键连接多个数据源，实时监控SaaS业务核心指标的可视化仪表盘。',
        content: '为SaaS创业者打造的一站式数据监控仪表盘。一键连接Stripe、Google Analytics、GitHub等数据源，实时监控MRR、用户增长、流失率等核心指标。',
        coverImage: '/api/placeholder/800/400',
        tags: ['SaaS', '数据分析', '仪表盘', '监控'],
        techStack: ['React', 'D3.js', 'Node.js', 'GraphQL', 'MongoDB'],
        githubUrl: 'https://github.com/example/metrics',
        status: 'active',
        featured: true,
        mrr: 0,
        startDate: '2026-03-01',
        authorId: admin.id,
      },
    ];

    for (const projectData of projectsData) {
      await Project.create(projectData);
    }

    // Create sample comments
    const commentsData = [
      { author: '小明', email: 'xiaoming@test.com', content: '写得非常好！特别是关于AI工具的选择，很有启发。', entityType: 'post', entityId: 1, status: 'approved' },
      { author: '创业小白', email: 'newbie@test.com', content: '感谢分享，让我对超级个体有了更清晰的认识。', entityType: 'post', entityId: 1, status: 'approved' },
      { author: '技术达人', email: 'tech@test.com', content: '技术栈部分很实用，不过我觉得可以加上一些云服务的对比。', entityType: 'post', entityId: 2, status: 'approved' },
      { author: 'Alice', email: 'alice@test.com', content: '非常棒的AI产品！期待更多功能更新。', entityType: 'project', entityId: 1, status: 'approved' },
    ];

    for (const commentData of commentsData) {
      await Comment.create(commentData);
    }

    // Create subscribers
    await Subscriber.bulkCreate([
      { email: 'user1@test.com', subscribed: true },
      { email: 'user2@test.com', subscribed: true },
      { email: 'user3@test.com', subscribed: false },
    ]);

    console.log('Seed data created successfully!');
    console.log('Admin credentials:');
    console.log('  Email: admin@superindividual.com');
    console.log('  Password: admin123456');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
