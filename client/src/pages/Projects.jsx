import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, DollarSign, Calendar } from 'lucide-react';
import GlassCard from '../components/common/GlassCard.jsx';
import { LoadingSpinner } from '../components/common/Loading.jsx';
import { projectsAPI } from '../utils/api.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;
      const res = await projectsAPI.getAll(params);
      setProjects(res.data.projects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="section-title">项目展示</h1>
          <p className="section-subtitle">用AI打造的产品与实践，每个项目都是一次探索</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {['all', 'active', 'archived', 'planned'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`glass-tag ${filter === status ? 'border-accent-500/50 text-accent-300' : ''}`}
            >
              {status === 'all' ? '全部' : status === 'active' ? '进行中' : status === 'archived' ? '已归档' : '计划中'}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <LoadingSpinner size="lg" text="加载项目列表..." />
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">暂无项目</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <GlassCard key={project.id} delay={i * 0.05}>
                <Link to={`/projects/${project.slug}`} className="block">
                  {/* Cover */}
                  <div className="h-40 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center rounded-t-2xl">
                    <span className="text-gray-500">{project.title} 封面</span>
                  </div>

                  <div className="p-5">
                    {/* Status */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`glass-tag text-[10px] ${
                        project.status === 'active' ? 'text-green-400 border-green-400/30' :
                        project.status === 'archived' ? 'text-gray-400' : 'text-yellow-400'
                      }`}>
                        {project.status === 'active' ? '进行中' : project.status === 'archived' ? '已归档' : '计划中'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.techStack?.slice(0, 3).map(tech => (
                        <span key={tech} className="glass-tag text-[10px]">{tech}</span>
                      ))}
                      {(project.techStack?.length || 0) > 3 && (
                        <span className="text-[10px] text-gray-500">+{project.techStack.length - 3}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between text-xs">
                      {project.mrr > 0 && (
                        <span className="text-green-400 font-medium flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> ${project.mrr}/月
                        </span>
                      )}
                      <div className="flex gap-2 ml-auto">
                        {project.githubUrl && <Github className="w-4 h-4 text-gray-400" />}
                        {project.url && <ExternalLink className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                </Link>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
