const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  scans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scan' }],
  badges: [{ type: String }], // e.g., 'Trusted Reviewer'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);