const Pharmacy = require('../models/Pharmacy');
const axios = require('axios');

const findPharmacies = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Location required' });

  try {
    // Fetch verified pharmacies from MongoDB
    const localPharmacies = await Pharmacy.find({
      coordinates: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 10000, // 10km
        },
      },
    }).limit(5);

    // Fetch additional pharmacies from Google Maps
    const googleResponse = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        type: 'pharmacy',
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const googlePharmacies = googleResponse.data.results.map(p => ({
      name: p.name,
      address: p.vicinity,
      coordinates: { lat: p.geometry.location.lat, lng: p.geometry.location.lng },
      trustScore: 5, // Placeholder
    }));

    res.json([...localPharmacies, ...googlePharmacies]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pharmacies' });
  }
};

module.exports = { findPharmacies };