import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
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
  role: {
    type: String,
    default: "authority",
  },
  complaints: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint'
  }],
  jurisdiction: {
    type: {
      type: String,
      enum: ['city', 'district', 'state'],
      default: 'district'
    }
  }
}, { 
  timestamps: true 
});

// Index for efficient authority lookup by location
authoritySchema.index({ city: 1, district: 1, state: 1 });

export default mongoose.model("Authority", authoritySchema);