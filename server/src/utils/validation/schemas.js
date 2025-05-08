const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Upload validation
const uploadSchema = Joi.object({
  batchNumber: Joi.string().trim().min(5).max(30),
  // File validation will be handled by multer middleware
});

// Review validation
const reviewSchema = Joi.object({
  batchNumber: Joi.string().trim().required().min(5).max(30),
  rating: Joi.string().required().valid("up", "down"),
  comment: Joi.string().max(500).allow("", null),
});

// Moderator review validation
const moderatorReviewSchema = Joi.object({
  scanId: Joi.objectId().required(),
  verdict: Joi.string().required().valid("safe", "fake"),
});

// Feedback validation
const feedbackSchema = Joi.object({
  scanId: Joi.objectId().required(),
  rating: Joi.string().required().valid("up", "down"),
});

// User profile update validation
const userUpdateSchema = Joi.object({
  displayName: Joi.string().max(50),
  preferences: Joi.object(),
});

// Pharmacy location search validation
const pharmacySearchSchema = Joi.object({
  lat: Joi.number().required().min(-90).max(90),
  lng: Joi.number().required().min(-180).max(180),
  radius: Joi.number().min(100).max(50000).default(5000),
});

module.exports = {
  uploadSchema,
  reviewSchema,
  moderatorReviewSchema,
  feedbackSchema,
  userUpdateSchema,
  pharmacySearchSchema,
};
