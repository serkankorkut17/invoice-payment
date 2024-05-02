import sequelize from '@/utils/sequelize-config';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export default User;
