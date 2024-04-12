import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: SchemaType.types.ObjectId,
    ref: 'User',
    required: true,
  },
  bill_type: {
    type: String,
    required: true,
  },
  payment_amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
});
