import sequelize from "@/utils/sequelize-config";
import { DataTypes } from "sequelize";

const Invoice = sequelize.define(
  "Invoice",
  {
    invoice_id: {
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
    bill_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Invoice.belongsTo(User, { foreignKey: "user_id" });

export default Invoice;
