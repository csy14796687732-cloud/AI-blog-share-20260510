import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';
import config from './config/index.js';
import './models/index.js';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import projectRoutes from './routes/projects.js';
import commentRoutes from './routes/comments.js';
import subscriberRoutes from './routes/subscribers.js';
import uploadRoutes from './routes/upload.js';
import siteRoutes from './routes/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static frontend in production
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/site', siteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: '服务器内部错误' });
});

// Start server
async function start() {
  try {
    await sequelize.sync();
    console.log('Database synced');

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
