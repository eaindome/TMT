const Review = require("../models/Review");
const Scan = require("../models/Scan");
const { computeVerdict } = require("../utils/verdict");

const submitReview = async (req, res) => {
  const { batchNumber, rating, comment } = req.body;
  if (!batchNumber || !rating)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const review = new Review({
      userId: req.user.uid,
      batchNumber,
      rating,
      comment,
    });

    await review.save();

    // Update related scans
    const scans = await Scan.find({ batchNumber });
    for (const scan of scans) {
      scan.crowdReviews.push(review._id);
      scan.finalVerdict = computeVerdict(
        scan.aiResult,
        [review],
        scan.moderatorVerdict
      );
      await scan.save();
    }

    res.json({ message: "Review submitted", reviewId: review._id });
  } catch (error) {
    res.status(500).json({ error: "Review submission failed" });
  }
};

const getReviews = async (req, res) => {
  const { batchNumber } = req.params;
  try {
    const reviews = await Review.find({ batchNumber });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = { submitReview, getReviews };
