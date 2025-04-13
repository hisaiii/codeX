// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);  // Register route
router.post("/login", login);        // Login route

export default router;
