import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  name: String,
  email: String,
  image: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema); 