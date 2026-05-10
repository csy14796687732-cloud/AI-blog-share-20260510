import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || '上传失败' });
    }
    if (!req.file) {
      return res.status(400).json({ message: '请选择文件' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  });
});

export default router;
