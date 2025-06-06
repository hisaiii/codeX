import Complaint from '../models/complaint.model.js';
import Authority from '../models/authority.model.js';
import { v4 as uuidv4 } from 'uuid';
import {uploadToCloudinary} from "../utils/cloudinary.js";
import { promisify } from 'util';
import fs from 'fs';

export const createComplaint = async (req, res) => {
  try {
    // Validate required fields
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const { damageType, description, lat, lng, address, city, district, state } = req.body;
    
    if (!damageType || !lat || !lng || !city || !district || !state) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get user ID
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 1. Read file buffer
    const buffer = fs.readFileSync(req.file.path);
    
    // 2. Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(buffer);
    
    // 3. Create new complaint
    const newComplaint = new Complaint({
      complaintId: uuidv4(),
      user: userId,
      imageUrl: cloudinaryResult.secure_url,
      localImagePath: req.file.path,
      cloudinaryPublicId: cloudinaryResult.public_id,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address
      },
      damageType,
      description,
      city,
      district,
      state,
      status: 'pending'
    });

    // 4. Save to database
    const savedComplaint = await newComplaint.save();

    // 5. Update authority's complaints
    await Authority.findOneAndUpdate(
      { city, district, state },
      { $push: { complaints: savedComplaint._id } },
      { new: true }
    );

    res.status(201).json({
      message: 'Complaint created successfully',
      data: {
        ...savedComplaint.toObject(),
        localImagePath: undefined
      }
    });

  } catch (error) {
    console.error('Error creating complaint:', error);
    
    // Cleanup on error
    if (req.file?.path) {
      await promisify(fs.unlink)(req.file.path).catch(console.error);
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getNearbyComplaints = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5000 } = req.query; // default 5km radius

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const nearbyComplaints = await Complaint.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    })
    .populate('user', 'name profilePicture')
    .sort({ createdAt: -1 });

    res.json(nearbyComplaints);
  } catch (error) {
    console.error('Error fetching nearby complaints:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get complaints for logged-in user
export const getUserComplaints = async (req, res) => {
  try {
    console.log("this is route for geting users complaint s",req.user);
    const complaints = await Complaint.find({ user: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user complaints' });
  }
};

// Get complaints for authority's jurisdiction
export const getAuthorityComplaints = async (req, res) => {
  try {
    const authority = await Authority.findById(req.user._id);
    if (!authority) {
      return res.status(404).json({ error: 'Authority not found' });
    }

    const complaints = await Complaint.find({
      _id: { $in: authority.complaints }
    }).populate('user', 'name profilePicture');

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authority complaints' });
  }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'resolved', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update complaint status' });
  }
};

// Get single complaint details
export const getComplaintDetails = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaint details' });
  }
};

export const getComplaintsByCity = async (req, res) => {
  try {
    console.log("this is sity to get complaints ,",req.params);
    const { city } = req.params;
    
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City parameter is required'
      });
    }

    const complaints = await Complaint.find({ city })
      .populate('user', 'name profilePicture')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      data: complaints
    });

  } catch (error) {
    console.error('Error fetching complaints by city:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const upvoteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { upvotes: req.user._id } },
      { new: true }
    ).populate('user', 'name profilePicture');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Upvoted successfully',
      data: complaint
    });
  } catch (error) {
    console.error('Upvote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upvote',
      error: error.message
    });
  }
};
