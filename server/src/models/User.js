import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: { len: [2, 50] },
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  avatar: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor'),
    defaultValue: 'admin',
  },
  socialLinks: {
    type: DataTypes.JSON,
    defaultValue: {
      github: '',
      twitter: '',
      linkedin: '',
      website: '',
    },
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
});

User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
