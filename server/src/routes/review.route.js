const express = require('express');
const { verifyToken } = require('../config/firebase');
const { submitReview, getReviews } = require('../controllers/review.controller');
const { validateRequest } = require('../middleware/validator');
const { reviewSchema } = require('../utils/validation/schemas');

const router = express.Router();

router.post('/', verifyToken, validateRequest(reviewSchema), submitReview);
router.get('/:batchNumber', getReviews);

module.exports = router;