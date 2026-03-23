import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true } // 1 = Admin, 2 = User
}, { timestamps: true });

export default mongoose.model('User', userSchema);