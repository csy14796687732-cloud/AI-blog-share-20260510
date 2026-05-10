import { Router } from 'express';
import { Subscriber } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public: Subscribe
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: '请填写邮箱' });
    }

    const [subscriber, created] = await Subscriber.findOrCreate({
      where: { email },
      defaults: { email, subscribed: true },
    });

    if (!created && !subscriber.subscribed) {
      subscriber.subscribed = true;
      await subscriber.save();
    }

    res.status(created ? 201 : 200).json({
      message: created ? '订阅成功' : '该邮箱已订阅',
      subscriber: created ? subscriber : undefined,
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: '订阅失败' });
  }
});

// Public: Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await Subscriber.findOne({ where: { email } });
    if (subscriber) {
      subscriber.subscribed = false;
      await subscriber.save();
    }
    res.json({ message: '已取消订阅' });
  } catch (error) {
    res.status(500).json({ message: '取消订阅失败' });
  }
});

// Admin: Get all subscribers
router.get('/', authenticate, async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ subscribers });
  } catch (error) {
    res.status(500).json({ message: '获取订阅者列表失败' });
  }
});

export default router;
