import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true }, // 1 = Admin, 2 = User,
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);