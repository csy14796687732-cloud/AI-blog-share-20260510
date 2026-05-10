import { Router } from 'express';
import { Op } from 'sequelize';
import { Post, User } from '../models/index.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Public: Get published posts
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    // If not admin, only show published posts
    if (!req.user || req.user.role !== 'admin') {
      where.status = 'published';
    } else if (req.query.status) {
      where.status = req.query.status;
    }

    if (category) where.category = category;
    if (tag) where.tags = { [Op.contains]: [tag] };
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Post.findAndCountAll({
      where,
      include: [{ model: User, attributes: ['id', 'displayName', 'avatar'] }],
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      posts: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: '获取文章列表失败' });
  }
});

// Public: Get single post by slug
router.get('/slug/:slug', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug },
      include: [{ model: User, attributes: ['id', 'displayName', 'avatar', 'bio'] }],
    });

    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    // Check access
    if (post.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ message: '文章不存在' });
    }

    // Increment view count
    if (post.status === 'published') {
      await post.increment('viewCount');
    }

    // Get previous and next posts
    const prevPost = await Post.findOne({
      where: { status: 'published', publishedAt: { [Op.lt]: post.publishedAt || post.createdAt } },
      order: [['publishedAt', 'DESC']],
      attributes: ['title', 'slug'],
    });

    const nextPost = await Post.findOne({
      where: { status: 'published', publishedAt: { [Op.gt]: post.publishedAt || post.createdAt } },
      order: [['publishedAt', 'ASC']],
      attributes: ['title', 'slug'],
    });

    res.json({ post, prevPost, nextPost });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: '获取文章失败' });
  }
});

// Public: Get post by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'displayName', 'avatar', 'bio'] }],
    });

    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    if (post.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ message: '文章不存在' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: '获取文章失败' });
  }
});

// Admin: Create post
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, slug, excerpt, content, coverImage, category, tags, status, featured } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: '标题和内容为必填' });
    }

    const postSlug = slug || title.toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '');

    const post = await Post.create({
      title,
      slug: postSlug,
      excerpt: excerpt || content.substring(0, 200),
      content,
      coverImage: coverImage || '',
      category: category || 'general',
      tags: tags || [],
      status: status || 'draft',
      featured: featured || false,
      publishedAt: status === 'published' ? new Date() : null,
      authorId: req.user.id,
    });

    res.status(201).json({ post });
  } catch (error) {
    console.error('Create post error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: '该slug已存在' });
    }
    res.status(500).json({ message: '创建文章失败' });
  }
});

// Admin: Update post
router.put('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    const { title, excerpt, content, coverImage, category, tags, status, featured, slug } = req.body;

    if (title !== undefined) post.title = title;
    if (slug !== undefined) post.slug = slug;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (category !== undefined) post.category = category;
    if (tags !== undefined) post.tags = tags;
    if (featured !== undefined) post.featured = featured;

    if (status !== undefined) {
      post.status = status;
      if (status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }

    await post.save();
    res.json({ post });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: '更新文章失败' });
  }
});

// Admin: Delete post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    await post.destroy();
    res.json({ message: '文章已删除' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: '删除文章失败' });
  }
});

// Public: Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { status: 'published' },
      attributes: ['category'],
      group: ['category'],
    });
    const categories = [...new Set(posts.map(p => p.category))];
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: '获取分类失败' });
  }
});

export default router;
