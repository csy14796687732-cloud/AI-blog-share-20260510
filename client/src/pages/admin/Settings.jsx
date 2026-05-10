import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import AdminLayout from '../../components/common/AdminLayout.jsx';
import { siteAPI } from '../../utils/api.js';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    siteName: '',
    siteDescription: '',
    seoKeywords: '',
    aboutContent: '',
    footerText: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/login'); return; }
    fetchConfig();
  }, []);

  async function fetchConfig() {
    try {
      const res = await siteAPI.get();
      const c = res.data.config;
      if (c) {
        setForm({
          siteName: c.siteName || '',
          siteDescription: c.siteDescription || '',
          seoKeywords: c.seoKeywords || '',
          aboutContent: c.aboutContent || '',
          footerText: c.footerText || '',
        });
      }
    } catch (err) {
      console.error('Failed to fetch config:', err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await siteAPI.update(form);
      alert('设置已保存');
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout title="网站设置">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <label className="block text-sm text-gray-400 mb-2">站点名称</label>
          <input type="text" value={form.siteName} onChange={(e) => handleChange('siteName', e.target.value)} className="glass-input" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">站点描述</label>
          <textarea value={form.siteDescription} onChange={(e) => handleChange('siteDescription', e.target.value)} rows={2} className="glass-input resize-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">SEO 关键词 (逗号分隔)</label>
          <input type="text" value={form.seoKeywords} onChange={(e) => handleChange('seoKeywords', e.target.value)} className="glass-input" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">关于页面内容 (Markdown)</label>
          <textarea value={form.aboutContent} onChange={(e) => handleChange('aboutContent', e.target.value)} rows={12} className="glass-input resize-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">页脚文字</label>
          <input type="text" value={form.footerText} onChange={(e) => handleChange('footerText', e.target.value)} className="glass-input" />
        </div>
        <div className="pt-4 border-t border-white/5">
          <button type="submit" disabled={saving} className="glass-btn glass-btn-primary">
            <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
