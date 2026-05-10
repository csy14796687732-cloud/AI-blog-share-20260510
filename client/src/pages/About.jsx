import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Sparkles, MapPin, Briefcase, Target } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import GlassCard from '../components/common/GlassCard.jsx';
import { siteAPI } from '../utils/api.js';

export default function About() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    siteAPI.get().then(res => setConfig(res.data.config)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="section-title text-center">关于我</h1>
          <p className="section-subtitle text-center mt-2">一个AI时代的超级个体实践者</p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MapPin, label: '位置', value: '中国 · 远程' },
            { icon: Briefcase, label: '角色', value: 'AI创业者 / 独立开发者' },
            { icon: Target, label: '目标', value: '打造10个AI产品' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass p-5 rounded-2xl text-center"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent-400" />
              </div>
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className="text-white font-medium text-sm">{item.value}</div>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="!p-8 mb-8" hover={false}>
            <div className="markdown-content">
              {config?.aboutContent ? (
                <ReactMarkdown>{config.aboutContent}</ReactMarkdown>
              ) : (
                <>
                  <h1>关于我</h1>
                  <p>我是一名AI创业者和超级个体实践者。</p>
                  <h2>我的故事</h2>
                  <p>在AI时代，我选择了一条与众不同的路——一个人，一台电脑，用AI工具打造属于自己的产品。我相信，未来属于那些能够驾驭AI的超级个体。</p>
                  <h2>我的理念</h2>
                  <p>一个人 + AI &gt; 一群人。在这个时代，每个人都可以成为一支队伍。</p>
                  <h2>联系我</h2>
                  <ul>
                    <li>GitHub: github.com/superindividual</li>
                    <li>Twitter: @superindividual</li>
                    <li>Email: hello@superindividual.com</li>
                  </ul>
                </>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="!p-8 text-center" hover={false}>
            <h2 className="text-xl font-bold text-white mb-4">连接我</h2>
            <p className="text-gray-400 text-sm mb-6">
              欢迎通过以下平台与我交流，一起探索超级个体之路
            </p>
            <div className="flex justify-center gap-4">
              {[
                { icon: Github, label: 'GitHub', color: 'hover:text-white' },
                { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
                { icon: Mail, label: 'Email', color: 'hover:text-green-400' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`glass w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 text-gray-400 ${social.color} transition-all`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-[10px]">{social.label}</span>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
