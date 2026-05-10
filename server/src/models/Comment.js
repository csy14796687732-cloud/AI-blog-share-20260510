import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(200),
    defaultValue: '',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  entityType: {
    type: DataTypes.ENUM('post', 'project'),
    allowNull: false,
  },
  entityId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  indexes: [
    { fields: ['entityType', 'entityId'] },
    { fields: ['status'] },
  ],
});

export default Comment;
