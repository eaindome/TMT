/**
 * Computes the final verdict for a medicine scan based on AI analysis,
 * crowd reviews, and moderator input
 *
 * @param {Object} aiResult - Result from AI analysis with confidence score
 * @param {Array} crowdReviews - Array of user reviews
 * @param {String} moderatorVerdict - Verdict from moderator (safe, fake, pending)
 * @returns {String} - Final verdict (green, yellow, red)
 */
const computeVerdict = (aiResult, crowdReviews, moderatorVerdict) => {
  const aiScore = aiResult.confidence;
  const crowdScore =
    crowdReviews.length > 0
      ? crowdReviews.filter((r) => r.rating === "up").length /
        crowdReviews.length
      : 0.5;
  const moderatorWeight =
    moderatorVerdict === "safe" ? 1 : moderatorVerdict === "fake" ? 0 : 0.5;

  const finalScore = 0.4 * aiScore + 0.3 * crowdScore + 0.3 * moderatorWeight;
  if (finalScore >= 0.7) return "green";
  if (finalScore <= 0.3) return "red";
  return "yellow";
};

module.exports = { computeVerdict };
