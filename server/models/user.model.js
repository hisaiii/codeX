// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // Hashed password
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "authority", "admin"], 
    default: "user",
  },
}, { timestamps: true });

<<<<<<< HEAD
export default mongoose.model("User", userSchema);
=======

export default mongoose.model('User', userSchema);

>>>>>>> 65cdc8e62709a558c38fe074794ea12dedac624a
