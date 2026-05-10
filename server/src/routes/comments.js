import { Router } from 'express';
import { Comment } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Get comments for a post/project
router.get('/', async (req, res) => {
  try {
    const { entityType, entityId } = req.query;
    if (!entityType || !entityId) {
      return res.status(400).json({ message: '缺少entityType或entityId' });
    }

    const comments = await Comment.findAll({
      where: { entityType, entityId, status: 'approved' },
      order: [['createdAt', 'DESC']],
    });

    res.json({ comments });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: '获取评论失败' });
  }
});

// Public: Create comment
router.post('/', async (req, res) => {
  try {
    const { author, email, content, entityType, entityId } = req.body;

    if (!author || !content || !entityType || !entityId) {
      return res.status(400).json({ message: '请填写必填字段' });
    }

    const comment = await Comment.create({
      author,
      email: email || '',
      content,
      entityType,
      entityId,
      status: 'approved', // Auto-approve for now
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: '提交评论失败' });
  }
});

// Admin: Get all comments (with pending)
router.get('/admin', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    const comments = await Comment.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: '获取评论失败' });
  }
});

// Admin: Update comment status
router.put('/:id', authenticate, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: '评论不存在' });

    if (req.body.status) comment.status = req.body.status;
    await comment.save();
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ message: '更新评论失败' });
  }
});

// Admin: Delete comment
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: '评论不存在' });
    await comment.destroy();
    res.json({ message: '评论已删除' });
  } catch (error) {
    res.status(500).json({ message: '删除评论失败' });
  }
});

export default router;
