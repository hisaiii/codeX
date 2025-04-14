import express from 'express';
import { 
  createComplaint,
  getNearbyComplaints,
  getUserComplaints,
  getComplaintDetails,
  updateComplaintStatus,
  getAuthorityComplaints,
  getComplaintsByCity
} from '../controllers/complaint.controller.js';
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import upload from "../middlewares/multer.js"; // Import your multer config

const router = express.Router();

// Public routes
router.get('/complaints/nearby', getNearbyComplaints);
router.get('/complaints/city/:city', getComplaintsByCity);

router.get('/complaints/:id', getComplaintDetails);

// User-protected routes
router.post('/create-complaint',
  authenticateJWT, // Verify JWT first
  upload.single('image'), // Then handle file upload
  createComplaint
);

router.get('/users/complaints', 
  authenticateJWT, 
  getUserComplaints
);

// Authority-protected routes
router.get('/authority/complaints',
  authenticateJWT,
  authorizeRole('authority'),
  getAuthorityComplaints
);

router.patch('/complaints/:id/status',
  authenticateJWT,
  authorizeRole('authority'),
  updateComplaintStatus
);

export default router;