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
  },

  district: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "authority",
  },

}, { timestamps: true });

export default mongoose.model("Authority", authoritySchema);
