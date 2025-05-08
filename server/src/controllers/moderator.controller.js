const Scan = require("../models/Scan");
const { computeVerdict } = require("../utils/verdict");
const rabbitmq = require("../config/rabbitmq");
const cacheService = require("../services/cache.service");

const reviewScan = async (req, res) => {
  const { scanId, verdict } = req.body;
  if (!["safe", "fake"].includes(verdict))
    return res.status(400).json({ error: "Invalid verdict" });

  try {
    // Check if user is moderator (mocked role check)
    if (!req.user.email.includes("moderator@")) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // In production, queue the moderation request instead of processing immediately
    // This improves scalability by decoupling the request from the processing
    if (
      process.env.NODE_ENV === "production" ||
      process.env.USE_RABBITMQ === "true"
    ) {
      await rabbitmq.publish(rabbitmq.config.exchanges.moderator, "request", {
        scanId,
        verdict,
        moderatorId: req.user.uid,
        timestamp: new Date().toISOString(),
      });

      // Acknowledge receipt without waiting for processing
      return res.json({ message: "Scan review queued for processing" });
    }

    // Development mode - process immediately
    const scan = await Scan.findById(scanId).populate("crowdReviews");
    if (!scan) return res.status(404).json({ error: "Scan not found" });

    scan.moderatorVerdict = verdict;
    scan.finalVerdict = computeVerdict(
      scan.aiResult,
      scan.crowdReviews,
      verdict
    );
    await scan.save();

    // Clear cache entries related to this scan
    await cacheService.del(`scan_id:${scanId}`);

    res.json({ message: "Scan reviewed", verdict: scan.finalVerdict });
  } catch (error) {
    console.error("Moderator review error:", error);
    res.status(500).json({ error: "Review failed" });
  }
};

/**
 * Worker function to process moderation queue messages
 * This would run in a separate worker process in production
 */
const processModerationQueue = async () => {
  try {
    await rabbitmq.consume(
      rabbitmq.config.queues.moderationRequests,
      async (message) => {
        try {
          const { scanId, verdict, moderatorId } = message;

          const scan = await Scan.findById(scanId).populate("crowdReviews");
          if (!scan) {
            console.error(`Moderation error: Scan ${scanId} not found`);
            return;
          }

          scan.moderatorVerdict = verdict;
          scan.finalVerdict = computeVerdict(
            scan.aiResult,
            scan.crowdReviews,
            verdict
          );
          await scan.save();

          // Clear related cache entries
          await cacheService.del(`scan_id:${scanId}`);

          console.log(
            `Processed moderation for scan ${scanId} by moderator ${moderatorId}`
          );

          // Publish result to the results queue (for notification service, etc.)
          await rabbitmq.publish(
            rabbitmq.config.exchanges.moderator,
            "result",
            {
              scanId,
              verdict: scan.finalVerdict,
              moderatorId,
              timestamp: new Date().toISOString(),
            }
          );
        } catch (error) {
          console.error("Error processing moderation message:", error);
        }
      }
    );

    console.log("Moderation queue processor started");
  } catch (error) {
    console.error("Failed to start moderation queue processor:", error);
  }
};

// Start the queue processor if enabled
if (
  process.env.NODE_ENV === "production" ||
  process.env.USE_RABBITMQ === "true"
) {
  processModerationQueue().catch(console.error);
}

module.exports = { reviewScan, processModerationQueue };
