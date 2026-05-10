import { Router } from 'express';
import { Op } from 'sequelize';
import { Project, User } from '../models/index.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Public: Get all projects
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, tag, status: filterStatus, featured } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (tag) where.tags = { [Op.contains]: [tag] };
    if (filterStatus) where.status = filterStatus;
    if (featured === 'true') where.featured = true;

    const { count, rows } = await Project.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      projects: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: '获取项目列表失败' });
  }
});

// Public: Get single project
router.get('/slug/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { slug: req.params.slug },
    });

    if (!project) {
      return res.status(404).json({ message: '项目不存在' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: '获取项目失败' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: '项目不存在' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: '获取项目失败' });
  }
});

// Admin: Create project
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, slug, description, content, coverImage, images, tags, techStack, url, githubUrl, status, featured, mrr, startDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: '标题和描述为必填' });
    }

    const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '');

    const project = await Project.create({
      title,
      slug: projectSlug,
      description,
      content: content || '',
      coverImage: coverImage || '',
      images: images || [],
      tags: tags || [],
      techStack: techStack || [],
      url: url || '',
      githubUrl: githubUrl || '',
      status: status || 'active',
      featured: featured || false,
      mrr: mrr || 0,
      startDate: startDate || null,
      authorId: req.user.id,
    });

    res.status(201).json({ project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: '创建项目失败' });
  }
});

// Admin: Update project
router.put('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: '项目不存在' });

    const fields = ['title', 'slug', 'description', 'content', 'coverImage', 'images', 'tags', 'techStack', 'url', 'githubUrl', 'status', 'featured', 'mrr', 'startDate'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) project[field] = req.body[field];
    });

    await project.save();
    res.json({ project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: '更新项目失败' });
  }
});

// Admin: Delete project
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: '项目不存在' });
    await project.destroy();
    res.json({ message: '项目已删除' });
  } catch (error) {
    res.status(500).json({ message: '删除项目失败' });
  }
});

export default router;
