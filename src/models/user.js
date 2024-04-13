import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
