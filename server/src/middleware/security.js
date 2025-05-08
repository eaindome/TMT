// filepath: /home/ekow/Desktop/TMT/server/src/middleware/security.js
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Rate limiting configurations
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: "Too many requests, please try again after 15 minutes" },
});

// More restrictive rate limiting for specific sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts, please try again after an hour" },
});

// Apply GDPR cookie consent middleware
const gdprMiddleware = (req, res, next) => {
  // Set secure and compliant cookies
  res.cookie = (name, value, options = {}) => {
    const defaultOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };
    return res.cookie(name, value, { ...defaultOptions, ...options });
  };

  next();
};

// Data anonymization utility for logs and error reports
const anonymizeData = (data) => {
  // Clone the data to avoid modifying the original
  const sanitized = { ...data };

  // Fields to anonymize (PII)
  const sensitiveFields = [
    "email",
    "phoneNumber",
    "address",
    "name",
    "firstName",
    "lastName",
  ];

  // Replace sensitive data with anonymized versions
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      if (field === "email") {
        const parts = sanitized[field].split("@");
        if (parts.length === 2) {
          sanitized[field] = `${parts[0].substring(0, 2)}***@${parts[1]}`;
        }
      } else {
        sanitized[field] = sanitized[field].substring(0, 2) + "***";
      }
    }
  }

  return sanitized;
};

module.exports = {
  apiLimiter,
  authLimiter,
  helmet,
  gdprMiddleware,
  anonymizeData,
};
