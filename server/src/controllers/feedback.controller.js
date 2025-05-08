const Scan = require("../models/Scan");
const { computeVerdict } = require("../utils/verdict");

const submitFeedback = async (req, res) => {
  const { scanId, rating } = req.body;
  if (!scanId || !["up", "down"].includes(rating))
    return res.status(400).json({ error: "Invalid feedback" });

  try {
    const scan = await Scan.findById(scanId).populate("crowdReviews");
    if (!scan) return res.status(404).json({ error: "Scan not found" });

    // Mock feedback as a review for simplicity
    const feedbackReview = {
      userId: req.user?.uid || "anonymous",
      batchNumber: scan.batchNumber,
      rating,
      createdAt: new Date(),
    };

    scan.crowdReviews.push(feedbackReview);
    scan.finalVerdict = computeVerdict(
      scan.aiResult,
      scan.crowdReviews,
      scan.moderatorVerdict
    );
    await scan.save();

    res.json({ message: "Feedback submitted" });
  } catch (error) {
    res.status(500).json({ error: "Feedback submission failed" });
  }
};

module.exports = { submitFeedback };
