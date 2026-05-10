import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Tag, ExternalLink, TrendingUp, Zap, Users, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard.jsx';
import { LoadingSpinner } from '../components/common/Loading.jsx';
import { postsAPI, projectsAPI } from '../utils/api.js';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, projectsRes] = await Promise.all([
          postsAPI.getAll({ limit: 4, status: 'published' }),
          projectsAPI.getAll({ limit: 4, featured: 'true' }),
        ]);
        setPosts(postsRes.data.posts);
        setProjects(projectsRes.data.projects);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="正在加载..." />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-accent-300 mb-6">
                <Sparkles className="w-4 h-4" />
                AI 超级个体时代已来
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                一个人 + AI
                <br />
                <span className="gradient-text">&gt; 一群人</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                记录AI创业历程，分享独立开发经验，探索超级个体的无限可能。
                在这里，每个人都可以成为一支队伍。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/blog" className="glass-btn glass-btn-primary">
                  浏览文章 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/projects" className="glass-btn">
                  查看项目
                </Link>
              </div>
            </motion.div>

            {/* Right: Stats / Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="grid grid-cols-2 gap-4 relative">
                  {[
                    { icon: Zap, value: '10x', label: '效率提升', color: 'from-yellow-400 to-orange-400' },
                    { icon: TrendingUp, value: '95%', label: '成本降低', color: 'from-green-400 to-emerald-400' },
                    { icon: Users, value: '1人', label: '= 一支队伍', color: 'from-indigo-400 to-purple-400' },
                    { icon: Sparkles, value: 'AI', label: '驱动未来', color: 'from-cyan-400 to-blue-400' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="glass p-6 rounded-2xl text-center"
                    >
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="section-title">最新文章</h2>
              <p className="section-subtitle">分享AI创业路上的思考与实践</p>
            </div>
            <Link to="/blog" className="glass-btn text-sm !py-2 !px-4 hidden sm:flex">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <GlassCard key={post.id} delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="block p-6">
                  {/* Category Tag */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="glass-tag">{post.category}</span>
                    {post.featured && (
                      <span className="text-xs text-yellow-400">★ 精选</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-accent-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.ceil((post.content?.length || 0) / 500)} 分钟阅读
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {post.tags?.length || 0} 标签
                    </span>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="glass-tag text-[10px]">{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="glass-btn">
              查看全部文章 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="section-title">精选项目</h2>
              <p className="section-subtitle">用AI打造的产品与实践</p>
            </div>
            <Link to="/projects" className="glass-btn text-sm !py-2 !px-4 hidden sm:flex">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, i) => (
              <GlassCard key={project.id} delay={i * 0.1}>
                <Link to={`/projects/${project.slug}`} className="block p-5">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack?.slice(0, 3).map(tech => (
                      <span key={tech} className="glass-tag text-[10px]">{tech}</span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between">
                    {project.mrr > 0 && (
                      <span className="text-xs text-green-400 font-medium">
                        MRR ${project.mrr}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                      <ExternalLink className="w-3 h-3" /> 详情
                    </span>
                  </div>
                </Link>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/projects" className="glass-btn">
              查看全部项目 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent-400" />
            <h2 className="text-3xl font-bold text-white mb-4">
              准备好成为超级个体了吗？
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              订阅我的 Newsletter，每周获取最新的 AI 创业洞察和技术干货。
            </p>
            <SubscribeForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const { subscribersAPI } = await import('../utils/api.js');
      await subscribersAPI.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-green-400 text-sm">
        感谢订阅！我已收到你的邮箱。
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="输入你的邮箱..."
        className="glass-input flex-1"
        required
      />
      <button type="submit" disabled={status === 'loading'} className="glass-btn glass-btn-primary whitespace-nowrap">
        {status === 'loading' ? '提交中...' : '立即订阅'}
      </button>
    </form>
  );
}
