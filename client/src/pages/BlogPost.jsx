import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import GlassCard from '../components/common/GlassCard.jsx';
import { LoadingSpinner } from '../components/common/Loading.jsx';
import { postsAPI, commentsAPI } from '../utils/api.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const res = await postsAPI.getBySlug(slug);
        setPost(res.data.post);
        setPrevPost(res.data.prevPost);
        setNextPost(res.data.nextPost);

        // Fetch comments
        const commentsRes = await commentsAPI.get({
          entityType: 'post',
          entityId: res.data.post.id,
        });
        setComments(commentsRes.data.comments);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="加载文章..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">文章不存在</p>
        <Link to="/blog" className="glass-btn">
          <ArrowLeft className="w-4 h-4" /> 返回文章列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Link to="/blog" className="glass-btn text-sm !py-2 !px-4 mb-8 inline-flex">
          <ArrowLeft className="w-4 h-4" /> 返回列表
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <GlassCard className="!p-8 mb-8" hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="glass-tag">{post.category}</span>
              {post.featured && <span className="text-yellow-400 text-sm">★ 精选</span>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {Math.ceil((post.content?.length || 0) / 500)} 分钟阅读
              </span>
              {post.viewCount > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.viewCount} 次浏览
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="glass-tag flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Content */}
          <GlassCard className="!p-8 mb-8" hover={false}>
            <div className="markdown-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </GlassCard>

          {/* Prev/Next */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {prevPost && (
              <Link to={`/blog/${prevPost.slug}`} className="glass-card flex-1 p-4 group">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <ChevronLeft className="w-4 h-4" /> 上一篇
                </div>
                <div className="text-white group-hover:text-accent-300 transition-colors">
                  {prevPost.title}
                </div>
              </Link>
            )}
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="glass-card flex-1 p-4 group text-right">
                <div className="flex items-center justify-end gap-2 text-gray-400 text-sm mb-1">
                  下一篇 <ChevronRight className="w-4 h-4" />
                </div>
                <div className="text-white group-hover:text-accent-300 transition-colors">
                  {nextPost.title}
                </div>
              </Link>
            )}
          </div>

          {/* Comments */}
          <CommentsSection
            entityType="post"
            entityId={post.id}
            comments={comments}
            onCommentAdded={(c) => setComments(prev => [c, ...prev])}
          />
        </motion.article>
      </div>
    </div>
  );
}

function CommentsSection({ entityType, entityId, comments, onCommentAdded }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await commentsAPI.create({
        author: author.trim(),
        content: content.trim(),
        entityType,
        entityId,
      });
      onCommentAdded(res.data.comment);
      setAuthor('');
      setContent('');
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <GlassCard className="!p-8" hover={false}>
      <h3 className="text-xl font-bold text-white mb-6">
        评论 ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="你的名字"
          className="glass-input max-w-xs"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的想法..."
          rows={3}
          className="glass-input resize-none"
          required
        />
        <button type="submit" disabled={submitting} className="glass-btn glass-btn-primary text-sm">
          {submitting ? '提交中...' : '发表评论'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无评论，来发表第一条评论吧</p>
        ) : (
          comments.map((comment) => (
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
          ))
        )}
      </div>
    </GlassCard>
  );
}
