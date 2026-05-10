import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '../../components/common/AdminLayout.jsx';
import { LoadingSpinner } from '../../components/common/Loading.jsx';
import { postsAPI } from '../../utils/api.js';

export default function AdminPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await postsAPI.getAll({ limit: 100 });
      setPosts(res.data.posts);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这篇文章吗？')) return;
    try {
      await postsAPI.delete(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <AdminLayout title="文章管理">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400 text-sm">共 {posts.length} 篇文章</p>
        <Link to="/admin/posts/new" className="glass-btn-primary glass-btn text-sm !py-2 !px-4">
          <Plus className="w-4 h-4" /> 写新文章
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner text="加载文章列表..." />
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="glass rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                  {post.status === 'draft' && (
                    <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">草稿</span>
                  )}
                  {post.featured && (
                    <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">精选</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{post.category}</span>
                  <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN')}</span>
                  <span>{post.viewCount || 0} 次浏览</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/admin/posts/${post.id}`)}
                  className="glass w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="glass w-9 h-9 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">还没有文章</p>
              <Link to="/admin/posts/new" className="glass-btn-primary glass-btn text-sm">
                <Plus className="w-4 h-4" /> 写第一篇文章
              </Link>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
