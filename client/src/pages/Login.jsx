import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, LogIn, Mail, Lock } from 'lucide-react';
import { authAPI } from '../utils/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authAPI.login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">管理后台</h1>
          <p className="text-gray-400 text-sm mt-1">登录以管理你的内容</p>
        </div>

        <div className="glass p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Mail className="w-4 h-4 inline mr-1" /> 邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@superindividual.com"
                className="glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Lock className="w-4 h-4 inline mr-1" /> 密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入密码"
                className="glass-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glass-btn glass-btn-primary w-full justify-center"
            >
              {loading ? (
                '登录中...'
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> 登录
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-center text-xs text-gray-500">
              演示账号: admin@superindividual.com / admin123456
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
