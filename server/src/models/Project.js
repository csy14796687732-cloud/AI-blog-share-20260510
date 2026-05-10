import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Project = sequelize.define('Project', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT('long'),
    defaultValue: '',
  },
  coverImage: {
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  techStack: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  url: {
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  githubUrl: {
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  status: {
    type: DataTypes.ENUM('active', 'archived', 'planned'),
    defaultValue: 'active',
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  mrr: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  indexes: [
    { fields: ['slug'], unique: true },
    { fields: ['featured'] },
    { fields: ['status'] },
  ],
});

export default Project;
