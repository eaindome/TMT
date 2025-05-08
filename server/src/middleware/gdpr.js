const gdprMiddleware = (req, res, next) => {
  // Add privacy policy headers
  res.setHeader("Privacy-Policy", "https://tmt.example.com/privacy");

  // Add consent check for data collection
  const hasConsent =
    req.headers["user-consent"] === "true" ||
    req.cookies["data_consent"] === "true";

  if (!hasConsent && req.method !== "GET") {
    // For data modifying operations, require consent
    return res.status(403).json({
      error: "Consent required",
      message: "Please accept our privacy policy before submitting data",
      consentUrl: "https://tmt.example.com/consent",
    });
  }

  // Set secure and compliant cookies
  const originalCookie = res.cookie;
  res.cookie = (name, value, options = {}) => {
    const defaultOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };
    return originalCookie.call(res, name, value, {
      ...defaultOptions,
      ...options,
    });
  };

  next();
};

// Helper for anonymizing sensitive data
const anonymizeData = (data) => {
  if (!data) return data;

  const result = { ...data };

  // Fields to anonymize
  const sensitiveFields = ["email", "name", "phone", "address"];

  sensitiveFields.forEach((field) => {
    if (result[field]) {
      if (field === "email" && typeof result[field] === "string") {
        const parts = result[field].split("@");
        if (parts.length === 2) {
          result[field] = `${parts[0].substring(0, 2)}***@${parts[1]}`;
        }
      } else if (typeof result[field] === "string") {
        result[field] = `${result[field].substring(0, 2)}***`;
      }
    }
  });

  return result;
};

module.exports = {
  gdprMiddleware,
  anonymizeData,
};
