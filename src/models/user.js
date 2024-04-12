import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
