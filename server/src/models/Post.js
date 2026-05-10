import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  excerpt: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'general',
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  indexes: [
    { fields: ['slug'], unique: true },
    { fields: ['status', 'publishedAt'] },
    { fields: ['category'] },
    { fields: ['featured'] },
  ],
});

export default Post;
