// controllers/auth.controller.js
import User from "../models/user.model.js"; // Correct import
import Authority from "../models/authority.model.js"; // Correct import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {cloudinary,uploadToCloudinary} from "../utils/cloudinary.js";
import fs from "fs";

// =======================
// User / Authority Register
// =======================
export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role, city, district, state } = req.body;

    if (role === "authority") {
      // Check if authority already exists
      const authorityExist = await Authority.findOne({ email });
      if (authorityExist) return res.status(400).json({ msg: "Authority already exists" });

      // Handle profile picture upload
      let profilePictureUrl = "";
      if (req.file) {
        const buffer = fs.readFileSync(req.file.path);
        const result = await uploadToCloudinary(buffer);
        profilePictureUrl = result.secure_url;
        fs.unlinkSync(req.file.path); // Clean up temp file
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const authority = new Authority({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        city,
        district,
        state,
        profilePicture: profilePictureUrl,
      });
      await authority.save();
      return res.status(201).json({ msg: "Authority Registered Successfully" });

    } else {
      // User or Admin registration
      const userExist = await User.findOne({ email });
      if (userExist) return res.status(400).json({ msg: "User already exists" });

      let profilePictureUrl = "";
      if (req.file) {
        const buffer = fs.readFileSync(req.file.path);
        const result = await uploadToCloudinary(buffer);
        profilePictureUrl = result.secure_url;
        fs.unlinkSync(req.file.path); // Clean up temp file
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profilePicture: profilePictureUrl,
      });
      await user.save();
      return res.status(201).json({ msg: "User Registered Successfully" });
    }

  } catch (error) {
    console.error(error);
    // Clean up temp file if error occurs
    if (req.file?.path) {
      fs.unlinkSync(req.file.path).catch(err => 
        console.error("Error deleting temp file:", err)
      );
    }
    res.status(500).json({ 
      msg: "Registration Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// =======================
// User / Authority Login
// =======================
export const login = async (req, res) => {
  try {
    const { emailOrPhone, password, role } = req.body; // FRONTEND will send email/phone + password + role

    let user;

    if (role === "authority") {
      // If authority login, find by email OR phone number
      user = await Authority.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }]
      });
    } else {
      // If user/admin login, find by email only
      user = await User.findOne({ email: emailOrPhone });
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Match Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { userId: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send token in cookies
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      })
      .status(200)
      .json({
        msg: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: role,
          profilePicture: user.profilePicture || null,
        },
        token,
      });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Login Error", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId, role } = req.user; // { userId, role } from token

    let userProfile;

    if (role === "authority") {
      // Fetch from Authority model
      userProfile = await Authority.findById(userId).select("-password");
    } else {
      // Fetch from User model (for user/admin)
      userProfile = await User.findById(userId).select("-password");
    }

    if (!userProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json({ user: userProfile });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching profile", error });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", { path: "/", httpOnly: true, sameSite: "lax", secure: false });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};