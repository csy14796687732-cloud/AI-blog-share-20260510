import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, DollarSign, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import GlassCard from '../components/common/GlassCard.jsx';
import { LoadingSpinner } from '../components/common/Loading.jsx';
import { projectsAPI, commentsAPI } from '../utils/api.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const res = await projectsAPI.getBySlug(slug);
        setProject(res.data.project);

        const commentsRes = await commentsAPI.get({
          entityType: 'project',
          entityId: res.data.project.id,
        });
        setComments(commentsRes.data.comments);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="加载项目详情..." />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">项目不存在</p>
        <Link to="/projects" className="glass-btn">
          <ArrowLeft className="w-4 h-4" /> 返回项目列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/projects" className="glass-btn text-sm !py-2 !px-4 mb-8 inline-flex">
          <ArrowLeft className="w-4 h-4" /> 返回列表
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <GlassCard className="!p-8 mb-8" hover={false}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`glass-tag ${
                project.status === 'active' ? 'text-green-400 border-green-400/30' :
                project.status === 'archived' ? 'text-gray-400' : 'text-yellow-400'
              }`}>
                {project.status === 'active' ? '进行中' : project.status === 'archived' ? '已归档' : '计划中'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-gray-400 text-lg mb-6">{project.description}</p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              {project.mrr > 0 && (
                <span className="glass flex items-center gap-1 px-3 py-1.5 rounded-lg text-green-400">
                  <DollarSign className="w-4 h-4" /> MRR ${project.mrr}
                </span>
              )}
              {project.startDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  始于 {project.startDate}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="glass-btn text-sm !py-2 !px-4">
                  <ExternalLink className="w-4 h-4" /> 访问网站
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="glass-btn text-sm !py-2 !px-4">
                  <Github className="w-4 h-4" /> 源代码
                </a>
              )}
            </div>

            {/* Tech Stack */}
            {project.techStack?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="glass-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>

          {/* Content */}
          {project.content && (
            <GlassCard className="!p-8 mb-8" hover={false}>
              <div className="markdown-content">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            </GlassCard>
          )}

          {/* Comments */}
          <GlassCard className="!p-8" hover={false}>
            <h3 className="text-xl font-bold text-white mb-4">评论 ({comments.length})</h3>
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无评论</p>
            ) : (
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="glass p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium">
                        {comment.author[0]}
                      </div>
                      <div>
                        <span className="text-white text-sm font-medium">{comment.author}</span>
                        <span className="text-gray-500 text-xs ml-2">
                          {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm pl-10">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
