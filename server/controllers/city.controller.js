import Authority from '../models/authority.model.js';

// Get all unique cities from authorities
export const getCitiesFromAuthorities = async (req, res) => {
  try {
    console.log("this are cities to fetched ");
    const cities = await Authority.distinct('city');
    console.log("this are cities fetched ",cities);
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch cities',
      error: error.message 
    });
  }
};