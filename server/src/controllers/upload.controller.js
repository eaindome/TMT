const Scan = require("../models/Scan");
const s3 = require("../config/aws");
const { analyzeImage } = require("../services/aiService");
const { computeVerdict } = require("../utils/verdict");

const uploadPhoto = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `photos/${Date.now()}-${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const { Location } = await s3.upload(params).promise();
    const batchNumber = req.body.batchNumber || "BATCH123"; // Mocked for prototype
    const aiResult = await analyzeImage(Location); // Placeholder AI call

    const scan = new Scan({
      userId: req.user?.uid,
      photoUrl: Location,
      batchNumber,
      aiResult,
      finalVerdict: computeVerdict(aiResult, [], "pending"),
    });

    await scan.save();
    res.json({
      scanId: scan._id,
      verdict: scan.finalVerdict,
      photoUrl: Location,
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = { uploadPhoto };
