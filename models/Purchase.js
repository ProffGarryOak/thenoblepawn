import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stripePaymentId: String,
  payoutStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema); 