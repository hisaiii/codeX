import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere'
    },
    address: { type: String }
  },
  damageType: {
    type: String,
    enum: ['pothole', 'crack', 'manhole', 'other'],
    default: 'other'
  },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  district: {
    type: String,
    required: true,
    index: true
  },
  state: {
    type: String,
    required: true,
    index: true
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [commentSchema],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authority'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, { 
  timestamps: true 
});

// Compound index for efficient location-based queries
complaintSchema.index({ city: 1, district: 1, state: 1 });
complaintSchema.index({ location: '2dsphere' });

complaintSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Complaint', complaintSchema);