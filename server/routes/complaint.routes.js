import express from 'express';
import multer from 'multer';
import path from 'path'; // <-- Don't forget to import path
import { createComplaint, getNearbyComplaints } from '../controllers/complaint.controller.js';
const router = express.Router();

// multer config same as used in controller
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only images with these extensions
  const allowedTypes = /jpeg|jpg|png|gif|webp/; // Add more image types if needed
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    return cb(new Error('The given image is not a supported format.'), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Add the file filter here
});

// POST complaint
router.post('/create-complaint', upload.single('image'), createComplaint);

// GET nearby
router.get('/complaints/nearby', getNearbyComplaints);


export default router;

