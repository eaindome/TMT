const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  trustScore: { type: Number, default: 5 },
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);