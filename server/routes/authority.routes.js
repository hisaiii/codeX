import express from "express";
import { authenticateJWT, isAuthority } from "../middlewares/auth.js"; // Verify JWT and authority role
import { getAuthorityProfile, getAuthorityComplaints, updateComplaintStatus } from "../controllers/authority.controller.js";

const router = express.Router();

// Get Authority Profile
router.get("/dashboard", authenticateJWT, isAuthority, getAuthorityProfile);

// Get Complaints related to Authority Region (city/district/state)
router.get("/complaints", authenticateJWT, isAuthority, getAuthorityComplaints);

// Update Complaint Status
router.put("/complaint/:id/update", authenticateJWT, isAuthority, updateComplaintStatus);

export default router;
