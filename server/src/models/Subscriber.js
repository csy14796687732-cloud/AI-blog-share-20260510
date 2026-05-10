import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Subscriber = sequelize.define('Subscriber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  indexes: [
    { fields: ['email'], unique: true },
  ],
});

export default Subscriber;
