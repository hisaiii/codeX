import Complaint from '../models/complaint.model.js';
import exif from 'exif';
const { ExifImage } = exif;

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Adds timestamp to filename
  }
});

const upload = multer({ storage: storage });

function extractLocationFromImage(imagePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return reject(err);
      }

      new ExifImage({ image: data }, function (error, exifData) {
        if (error) {
          return reject(error);
        }

        const gpsData = exifData.gps;
        if (gpsData) {
          const lat = gpsData.GPSLatitude;
          const lng = gpsData.GPSLongitude;
          resolve({ lat, lng });
        } else {
          reject('No GPS data found in EXIF');
        }
      });
    });
  });
}

// Location-based Filtering of Complaints (within a radius)
export const getNearbyComplaints = async (req, res) => {
    const { lat, lng, radius = 10000 } = req.query; // radius in meters (default 10km)
  
    try {
      // Validate that latitude and longitude are provided
      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
      }
  
      // Perform a geospatial query to find complaints within the specified radius
      const complaints = await Complaint.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)] // Longitude, Latitude order
            },
            $maxDistance: parseInt(radius), // in meters
          }
        }
      });
  
      res.status(200).json(complaints); // Return the complaints found in the given radius
    } catch (error) {
      res.status(500).json({ error: 'Error fetching complaints based on location' });
    }
  };

  export const createComplaint = async (req, res) => {
    const { description, userId, lat, lng } = req.body;
    const image = req.file;
    console.log("this is contorller for complaint create ",description,userId);
    try {
      const complaint = new Complaint({
        user: userId,
        description,
        imageUrl: image.path,
        location: {
          coordinates: [parseFloat(lng), parseFloat(lat)],
        }
      });
  
      await complaint.save();
      res.status(201).json({ message: 'Complaint created successfully', complaint });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  

// export const createComplaint = async (req, res) => {
//   const { description, userId } = req.body;
//   const image = req.file;

//   try {
//     const { lat, lng } = await extractLocationFromImage(image.path);

//     const complaint = new Complaint({
//       user: userId,
//       description,
//       imageUrl: image.path,
//       location: {
//         coordinates: [lng, lat]
//       }
//     });

//     await complaint.save();
//     res.status(201).json({ message: 'Complaint created successfully', complaint });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
