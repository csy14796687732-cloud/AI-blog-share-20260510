import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import AdminLayout from '../../components/common/AdminLayout.jsx';
import { projectsAPI } from '../../utils/api.js';

export default function AdminProjectEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    tags: '',
    techStack: '',
    url: '',
    githubUrl: '',
    status: 'active',
    featured: false,
    mrr: '',
    startDate: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/login'); return; }
    if (isEditing) fetchProject();
  }, [id]);

  async function fetchProject() {
    try {
      const res = await projectsAPI.getById(id);
      const p = res.data.project;
      setForm({
        title: p.title || '',
        slug: p.slug || '',
        description: p.description || '',
        content: p.content || '',
        tags: (p.tags || []).join(', '),
        techStack: (p.techStack || []).join(', '),
        url: p.url || '',
        githubUrl: p.githubUrl || '',
        status: p.status || 'active',
        featured: p.featured || false,
        mrr: p.mrr || '',
        startDate: p.startDate || '',
      });
    } catch (err) {
      console.error('Failed to fetch project:', err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
        mrr: parseFloat(form.mrr) || 0,
      };

      if (isEditing) {
        await projectsAPI.update(id, data);
      } else {
        await projectsAPI.create(data);
      }
      navigate('/admin/projects');
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('保存失败: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (title) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '');
    setForm(prev => ({ ...prev, title, slug: isEditing ? prev.slug : slug }));
  };

  return (
    <AdminLayout title={isEditing ? '编辑项目' : '添加项目'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">标题 *</label>
          <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="glass-input" required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">描述 *</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} className="glass-input resize-none" required />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">状态</label>
            <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className="glass-input">
              <option value="active" className="bg-deep-blue">进行中</option>
              <option value="archived" className="bg-deep-blue">已归档</option>
              <option value="planned" className="bg-deep-blue">计划中</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">MRR ($/月)</label>
            <input type="number" value={form.mrr} onChange={(e) => handleChange('mrr', e.target.value)} className="glass-input" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">精选</label>
            <label className="flex items-center gap-2 glass-input cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} className="accent-indigo-500" />
              <span className="text-white text-sm">{form.featured ? '是' : '否'}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">标签 (逗号分隔)</label>
          <input type="text" value={form.tags} onChange={(e) => handleChange('tags', e.target.value)} className="glass-input" placeholder="AI, SaaS, 工具" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">技术栈 (逗号分隔)</label>
          <input type="text" value={form.techStack} onChange={(e) => handleChange('techStack', e.target.value)} className="glass-input" placeholder="React, Node.js, Tailwind" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">项目URL</label>
            <input type="url" value={form.url} onChange={(e) => handleChange('url', e.target.value)} className="glass-input" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
            <input type="url" value={form.githubUrl} onChange={(e) => handleChange('githubUrl', e.target.value)} className="glass-input" placeholder="https://github.com/..." />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">详细内容 (Markdown)</label>
          <textarea value={form.content} onChange={(e) => handleChange('content', e.target.value)} rows={10} className="glass-input resize-none font-mono text-sm" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <button type="submit" disabled={saving} className="glass-btn glass-btn-primary">
            <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="glass-btn">取消</button>
        </div>
      </form>
    </AdminLayout>
  );
}
