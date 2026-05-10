import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye } from 'lucide-react';
import AdminLayout from '../../components/common/AdminLayout.jsx';
import { postsAPI } from '../../utils/api.js';

export default function AdminPostEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'general',
    tags: '',
    status: 'draft',
    featured: false,
    coverImage: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    try {
      const res = await postsAPI.getById(id);
      const post = res.data.post;
      setForm({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category || 'general',
        tags: (post.tags || []).join(', '),
        status: post.status || 'draft',
        featured: post.featured || false,
        coverImage: post.coverImage || '',
      });
    } catch (err) {
      console.error('Failed to fetch post:', err);
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (title) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 200);
  };

  const handleTitleChange = (title) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (isEditing) {
        await postsAPI.update(id, data);
      } else {
        await postsAPI.create(data);
      }
      navigate('/admin/posts');
    } catch (err) {
      console.error('Failed to save post:', err);
      alert('保存失败: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={isEditing ? '编辑文章' : '写新文章'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">标题 *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="文章标题"
            className="glass-input text-lg font-bold"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Slug (URL标识)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            placeholder="article-slug"
            className="glass-input font-mono text-sm"
          />
        </div>

        {/* Category & Status */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">分类</label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="glass-input"
            >
              {['general', 'AI创业', '技术栈', '产品开发', '独立开发', '思考感悟'].map(cat => (
                <option key={cat} value={cat} className="bg-deep-blue">{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">状态</label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="glass-input"
            >
              <option value="draft" className="bg-deep-blue">草稿</option>
              <option value="published" className="bg-deep-blue">发布</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">精选</label>
            <label className="flex items-center gap-2 glass-input cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="accent-indigo-500"
              />
              <span className="text-white text-sm">{form.featured ? '是' : '否'}</span>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">标签 (用逗号分隔)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="AI, 创业, 独立开发"
            className="glass-input"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">摘要</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="文章摘要..."
            rows={2}
            className="glass-input resize-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">内容 (Markdown格式)</label>
          <textarea
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="在此编写文章内容..."
            rows={16}
            className="glass-input resize-none font-mono text-sm leading-relaxed"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <button type="submit" disabled={saving} className="glass-btn glass-btn-primary">
            <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/posts')}
            className="glass-btn"
          >
            取消
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
