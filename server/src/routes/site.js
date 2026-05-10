import { Router } from 'express';
import { SiteConfig } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get site config
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findByPk(1);
    if (!config) {
      config = await SiteConfig.create({ id: 1 });
    }
    res.json({ config });
  } catch (error) {
    console.error('Get site config error:', error);
    res.status(500).json({ message: '获取站点配置失败' });
  }
});

// Admin: Update site config
router.put('/', authenticate, async (req, res) => {
  try {
    let config = await SiteConfig.findByPk(1);
    if (!config) {
      config = await SiteConfig.create({ id: 1 });
    }

    const fields = ['siteName', 'siteDescription', 'logo', 'favicon', 'seoKeywords', 'socialLinks', 'aboutContent', 'footerText'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) config[field] = req.body[field];
    });

    await config.save();
    res.json({ config });
  } catch (error) {
    console.error('Update site config error:', error);
    res.status(500).json({ message: '更新站点配置失败' });
  }
});

export default router;
