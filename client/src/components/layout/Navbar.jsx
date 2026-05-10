import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, LogIn, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/blog', label: '文章' },
  { path: '/projects', label: '项目' },
  { path: '/about', label: '关于' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (_) {}
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[rgba(15,23,42,0.7)] backdrop-blur-xl border-b border-white/10 shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              超级个体<span className="gradient-text">日志</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <Link
                to="/admin"
                className="ml-3 glass-btn-primary glass-btn text-sm !py-2 !px-4"
              >
                <LayoutDashboard className="w-4 h-4" />
                管理
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-3 glass-btn text-sm !py-2 !px-4"
              >
                <LogIn className="w-4 h-4" />
                登录
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass p-2 rounded-xl text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Link to="/admin" className="block glass-btn-primary glass-btn text-sm !py-3 text-center">
              <LayoutDashboard className="w-4 h-4 inline" /> 管理后台
            </Link>
          ) : (
            <Link to="/login" className="block glass-btn text-sm !py-3 text-center">
              <LogIn className="w-4 h-4 inline" /> 登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
