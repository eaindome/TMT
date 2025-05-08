const express = require("express");
const { verifyToken } = require("../config/firebase");
const { reviewScan } = require("../controllers/moderator.controller");
const { validateRequest } = require("../middleware/validator");
const { moderatorReviewSchema } = require("../utils/validation/schemas");

const router = express.Router();

router.post(
  "/review",
  verifyToken,
  validateRequest(moderatorReviewSchema),
  reviewScan
);

module.exports = router;
