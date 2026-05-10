import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search, ArrowRight } from 'lucide-react';
import GlassCard from '../components/common/GlassCard.jsx';
import { LoadingSpinner } from '../components/common/Loading.jsx';
import { postsAPI } from '../utils/api.js';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');

  const currentCategory = searchParams.get('category') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [currentCategory, currentPage]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: 10, status: 'published' };
      if (currentCategory) params.category = currentCategory;
      const res = await postsAPI.getAll(params);
      setPosts(res.data.posts);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await postsAPI.getCategories();
      setCategories(res.data.categories);
    } catch (_) {}
  }

  const handleCategoryClick = (cat) => {
    if (currentCategory === cat) {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSearchParams({ search: search.trim() });
    }
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="section-title">博客文章</h1>
          <p className="section-subtitle">AI创业、独立开发与技术思考</p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索文章..."
                className="glass-input pl-11"
              />
            </div>
          </form>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <button
            onClick={() => setSearchParams({})}
            className={`glass-tag ${!currentCategory ? 'border-accent-500/50 text-accent-300' : ''}`}
          >
            全部
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`glass-tag ${currentCategory === cat ? 'border-accent-500/50 text-accent-300' : ''}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <LoadingSpinner size="lg" text="加载文章列表..." />
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">暂无文章，敬请期待</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <GlassCard key={post.id} delay={i * 0.05}>
                <Link to={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="glass-tag">{post.category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-accent-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {post.tags?.length || 0}
                    </span>
                  </div>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="glass-tag text-[10px]">{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                  page === currentPage
                    ? 'glass-btn-primary glass-btn !p-0'
                    : 'glass hover:bg-white/10 !p-0'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
