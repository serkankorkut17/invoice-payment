import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    // invoice_id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    user_id: {
      type: String,
      required: true,
    },
    bill_type: {
      type: String,
      required: true,
    },
    bill_amount: {
      type: Number,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
