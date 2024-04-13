import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // autopay_id: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  user_id: {
    type: String,
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

export default mongoose.models.AutomaticPayment || mongoose.model('AutomaticPayment', userSchema);
