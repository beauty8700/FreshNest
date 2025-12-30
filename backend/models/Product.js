import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: {
      type: String,
      enum: ['vegetable', 'fruit', 'grain', 'other'],
      required: true,
    },
    stock: { type: Number, default: 0 },
    unit: { type: String, default: 'kg' },
    rating: { type: Number, default: 4 },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
