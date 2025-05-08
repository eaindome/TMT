const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // Optional for unauthenticated users
  photoUrl: { type: String, required: true },
  batchNumber: { type: String, required: true },
  aiResult: {
    inconsistencies: { type: Boolean, default: false },
    confidence: { type: Number, default: 0 },
  },
  crowdReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  moderatorVerdict: { type: String, enum: ['pending', 'safe', 'fake'], default: 'pending' },
  finalVerdict: { type: String, enum: ['green', 'yellow', 'red'], default: 'yellow' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scan', scanSchema);