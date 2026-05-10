import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SiteConfig = sequelize.define('SiteConfig', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: 1,
  },
  siteName: {
    type: DataTypes.STRING(100),
    defaultValue: '超级个体博客',
  },
  siteDescription: {
    type: DataTypes.TEXT,
    defaultValue: '分享AI创业历程与超级个体成长之路',
  },
  logo: {
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  favicon: {
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  seoKeywords: {
    type: DataTypes.STRING(500),
    defaultValue: 'AI,超级个体,创业,独立开发者,博客',
  },
  socialLinks: {
    type: DataTypes.JSON,
    defaultValue: {
      github: '',
      twitter: '',
      wechat: '',
      zhihu: '',
      xiaohongshu: '',
    },
  },
  aboutContent: {
    type: DataTypes.TEXT('long'),
    defaultValue: '',
  },
  footerText: {
    type: DataTypes.STRING(500),
    defaultValue: '© 2026 超级个体博客. All rights reserved.',
  },
});

export default SiteConfig;
