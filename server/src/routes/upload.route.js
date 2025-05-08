const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../config/firebase");
const { uploadPhoto } = require("../controllers/upload.controller");
const { validateRequest } = require("../middleware/validator");
const { uploadSchema } = require("../utils/validation/schemas");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

router.post(
  "/",
  verifyToken,
  upload.single("photo"),
  validateRequest(uploadSchema),
  uploadPhoto
);

module.exports = router;
