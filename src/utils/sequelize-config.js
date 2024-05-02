import { Sequelize } from "sequelize";
import dbPath from "./path";

const sequelize = new Sequelize("InvoicePayment", "root", "Merhaba123.", {
  host: "localhost",
  // dialect: 'mysql',
  dialect: "sqlite",
  storage: dbPath,
  dialectOptions: { decimalNumbers: true },
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed");
  }
};

export default sequelize;
export { connectDatabase };
