import mongoose from 'mongoose';

const AppraisalSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  ai: {
    authenticityScore: Number,
    priceSuggestion: Number,
  },
  adminNotes: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  feePaid: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Appraisal || mongoose.model('Appraisal', AppraisalSchema); 