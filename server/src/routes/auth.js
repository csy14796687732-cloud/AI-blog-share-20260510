import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    const user = await User.create({ username, email, password, displayName: username });
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Register error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }
    res.status(500).json({ message: '注册失败' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '请填写邮箱和密码' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '登录失败' });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { displayName, bio, avatar, socialLinks } = req.body;
    const user = req.user;

    if (displayName !== undefined) user.displayName = displayName;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    if (socialLinks !== undefined) user.socialLinks = socialLinks;

    await user.save();
    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: '更新失败' });
  }
});

export default router;
