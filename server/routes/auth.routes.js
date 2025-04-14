import express from "express";
import upload from "../middlewares/multer.js"; // multer middleware
import { register, login,getProfile,logoutUser } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", upload.single('profilePicture'), register);
router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/profile", authenticateJWT, getProfile);


export default router;
