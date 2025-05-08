const express = require("express");
const { findPharmacies } = require("../controllers/pharmacy.controller");
const { validateRequest } = require("../middleware/validator");
const { pharmacySearchSchema } = require("../utils/validation/schemas");

const router = express.Router();

router.get("/", validateRequest(pharmacySearchSchema, "query"), findPharmacies);

module.exports = router;
