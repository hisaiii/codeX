import mongoose from 'mongoose';

const complaintLogSchema = new mongoose.Schema({
  complaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true
  },
  actionBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionType: {
    type: String,
    enum: ['comment', 'status_change', 'upvote', 'other'],
    required: true
  },
  message: String,
  previousStatus: String,
  newStatus: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ComplaintLog', complaintLogSchema);
