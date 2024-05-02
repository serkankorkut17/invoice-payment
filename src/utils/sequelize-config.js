import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('InvoicePayment', 'root', 'Merhaba123', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection failed');
  }
}

export default sequelize;
export { connectDatabase };
