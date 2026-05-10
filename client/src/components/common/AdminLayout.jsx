import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, MessageSquare, Settings, ArrowLeft, LogOut } from 'lucide-react';

const adminNav = [
  { path: '/admin', label: '概览', icon: LayoutDashboard, exact: true },
  { path: '/admin/posts', label: '文章管理', icon: FileText },
  { path: '/admin/projects', label: '项目管理', icon: FolderOpen },
  { path: '/admin/comments', label: '评论管理', icon: MessageSquare },
  { path: '/admin/settings', label: '网站设置', icon: Settings },
];

export default function AdminLayout({ children, title }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="glass-btn text-xs !py-1.5 !px-3">
              <ArrowLeft className="w-3 h-3" /> 返回网站
            </Link>
            <h1 className="text-xl font-bold text-white">{title || '管理'}</h1>
          </div>
          <button onClick={handleLogout} className="glass-btn text-xs !py-1.5 !px-3 !text-red-400">
            <LogOut className="w-3 h-3" /> 退出
          </button>
        </div>

        {/* Admin Nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {adminNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive(item)
                  ? 'glass-btn-primary glass-btn !py-2 !px-4'
                  : 'glass hover:bg-white/10 !py-2 !px-4'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
