const express = require("express");
const { verifyToken } = require("../config/firebase");
const { submitFeedback } = require("../controllers/feedback.controller");
const { validateRequest } = require("../middleware/validator");
const { feedbackSchema } = require("../utils/validation/schemas");

const router = express.Router();

router.post("/", verifyToken, validateRequest(feedbackSchema), submitFeedback);

module.exports = router;
