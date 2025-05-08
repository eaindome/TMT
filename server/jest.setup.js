// Mock environment variables
process.env.JWT_SECRET = "test-secret";
process.env.MONGODB_URI = "mongodb://localhost:27017/tmt-test";
process.env.NODE_ENV = "test";
process.env.AWS_REGION = "us-east-1";
process.env.AWS_ACCESS_KEY_ID = "test-key-id";
process.env.AWS_SECRET_ACCESS_KEY = "test-access-key";
process.env.S3_BUCKET = "test-bucket";

// Mock external services
jest.mock("../src/config/firebase", () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.user = { uid: "test-user-id", email: "test@example.com" };
    next();
  }),
}));

jest.mock("../src/config/aws", () => ({
  upload: jest.fn().mockReturnValue({
    promise: jest
      .fn()
      .mockResolvedValue({ Location: "https://example.com/test-image.jpg" }),
  }),
}));

jest.mock("../src/services/aiService", () => ({
  analyzeImage: jest.fn().mockResolvedValue({
    inconsistencies: false,
    confidence: 0.8,
    details: {
      packagingAnalysis: {
        fontConsistency: true,
        colorPatterns: true,
        hologramValidity: true,
        logoAccuracy: true,
      },
      batchNumberAnalysis: {
        validFormat: true,
        knownPattern: true,
        suspiciousFlags: false,
      },
    },
  }),
}));
