import sequelize from '@/utils/sequelize-config';
import { DataTypes } from 'sequelize';

const AutomaticPayment = sequelize.define('AutomaticPayment', {
  autopay_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bill_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

AutomaticPayment.belongsTo(User, { foreignKey: 'user_id' });

export default AutomaticPayment;
