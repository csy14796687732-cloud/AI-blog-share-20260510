import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">超级个体日志</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              分享AI创业历程与技术思考，记录超级个体的成长之路。
              在这里，一个人就是一支队伍。
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="glass w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="glass w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="glass w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              {[
                { to: '/blog', label: '博客文章' },
                { to: '/projects', label: '项目展示' },
                { to: '/about', label: '关于我' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">热门分类</h3>
            <ul className="space-y-2">
              {['AI创业', '技术栈', '产品开发', '独立开发', '思考感悟'].map((cat) => (
                <li key={cat}>
                  <Link to={`/blog?category=${cat}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 超级个体日志. Built with <Heart className="w-3 h-3 inline text-red-400" /> by a super individual.
          </p>
          <p className="text-gray-600 text-xs">
            一个人 + AI &gt; 一群人
          </p>
        </div>
      </div>
    </footer>
  );
}
