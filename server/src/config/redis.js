const redis = require("redis");

// Use environment variables or defaults
const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // If Redis is down, log but continue without failing
      console.error("Redis connection refused. Continuing without caching.");
      return false;
    }
    // Reconnect after increasing delay
    return Math.min(options.attempt * 100, 3000);
  },
};

// Create Redis client
let redisClient;

// Only connect in production or if explicitly enabled
const shouldUseRedis =
  process.env.USE_REDIS === "true" || process.env.NODE_ENV === "production";

if (shouldUseRedis) {
  redisClient = redis.createClient(redisConfig);

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });
} else {
  // Create a mock Redis client for development
  redisClient = {
    get: (key, callback) => callback(null, null),
    set: (key, value, option, callback) => {
      if (callback) callback(null, "OK");
    },
    del: (key, callback) => {
      if (callback) callback(null, 1);
    },
    flushdb: (callback) => {
      if (callback) callback(null, "OK");
    },
    on: () => {},
  };
  console.log("Using mock Redis client for development");
}

module.exports = redisClient;
