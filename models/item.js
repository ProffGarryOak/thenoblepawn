import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [100, 'Item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be at least 0']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Jewelry',
        'Watches',
        'Collectibles',
        'Art',
        'Antiques',
        'Electronics',
        'Memorabilia',
        'Coins',
        'Other'
      ],
      message: 'Please select a valid category'
    }
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: {
      values: ['Mint', 'Excellent', 'Good', 'Fair', 'Poor'],
      message: 'Please select a valid condition'
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDetails: {
    verifiedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date,
    appraisalNotes: String,
    authenticityScore: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  seller: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'verified', 'listed', 'sold', 'rejected'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  soldAt: Date,
  views: {
    type: Number,
    default: 0
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
itemSchema.index({ name: 'text', description: 'text' });
itemSchema.index({ category: 1 });
itemSchema.index({ price: 1 });
itemSchema.index({ isVerified: 1 });
itemSchema.index({ status: 1 });

// Virtual for primary image
itemSchema.virtual('imageUrl').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : this.images[0]?.url || '/placeholder-item.jpg';
});

// Update timestamp on save
itemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Cascade delete reviews when item is deleted
itemSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ item: this._id });
  next();
});

export default mongoose.models.Item || mongoose.model('Item', itemSchema);