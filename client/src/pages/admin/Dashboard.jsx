import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, FolderOpen, MessageSquare, Users,
  TrendingUp, Eye, Edit3, LogOut, Sparkles,
  BarChart3, Activity
} from 'lucide-react';
import GlassCard from '../../components/common/GlassCard.jsx';
import { postsAPI, projectsAPI, commentsAPI, subscribersAPI } from '../../utils/api.js';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ posts: 0, projects: 0, comments: 0, subscribers: 0 });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    try {
      setUser(JSON.parse(stored));
    } catch (_) {
      navigate('/login');
    }

    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [postsRes, projectsRes, commentsRes, subscribersRes] = await Promise.all([
        postsAPI.getAll({ limit: 1 }),
        projectsAPI.getAll({ limit: 1 }),
        commentsAPI.getAll({}),
        subscribersAPI.getAll(),
      ]);
      setStats({
        posts: postsRes.data.pagination?.total || 0,
        projects: projectsRes.data.pagination?.total || 0,
        comments: commentsRes.data.comments?.length || 0,
        subscribers: subscribersRes.data.subscribers?.length || 0,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const statCards = [
    { icon: FileText, label: '文章', value: stats.posts, color: 'from-blue-500 to-indigo-500', link: '/admin/posts' },
    { icon: FolderOpen, label: '项目', value: stats.projects, color: 'from-purple-500 to-pink-500', link: '/admin/projects' },
    { icon: MessageSquare, label: '评论', value: stats.comments, color: 'from-green-500 to-emerald-500', link: '/admin/comments' },
    { icon: Users, label: '订阅者', value: stats.subscribers, color: 'from-cyan-500 to-blue-500', link: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-accent-400" />
              管理后台
            </h1>
            <p className="text-gray-400 mt-1">欢迎回来，{user.displayName || user.username}</p>
          </motion.div>

          <button onClick={handleLogout} className="glass-btn text-sm !py-2 !px-4 !text-red-400 hover:!text-red-300">
            <LogOut className="w-4 h-4" /> 退出
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <Link key={card.label} to={card.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{card.value}</div>
                <div className="text-sm text-gray-400">{card.label}</div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">快捷操作</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Edit3, label: '写文章', link: '/admin/posts/new', desc: '创建新的博客文章' },
              { icon: FolderOpen, label: '加项目', link: '/admin/projects/new', desc: '添加新项目展示' },
              { icon: MessageSquare, label: '管理评论', link: '/admin/comments', desc: '审核和管理评论' },
              { icon: Activity, label: '网站设置', link: '/admin/settings', desc: '配置站点信息' },
            ].map((action, i) => (
              <Link key={action.label} to={action.link}>
                <div className="glass-card p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                    <action.icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <h3 className="text-white font-medium">{action.label}</h3>
                  <p className="text-gray-500 text-sm mt-1">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
