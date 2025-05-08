const medicineController = require("../../../src/controllers/medicine.controller");
const Medicine = require("../../../src/models/Medicine");
const Review = require("../../../src/models/Review");
const aiService = require("../../../src/services/aiService");
const { publishToQueue } = require("../../../src/services/queueService");
const redisClient = require("../../../src/config/redis");

// Mock dependencies
jest.mock("../../../src/models/Medicine");
jest.mock("../../../src/models/Review");
jest.mock("../../../src/services/aiService");
jest.mock("../../../src/services/queueService");
jest.mock("../../../src/config/redis");

describe("Medicine Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      file: {
        buffer: Buffer.from("test"),
        mimetype: "image/jpeg",
      },
      body: {
        name: "Test Medicine",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
      },
      user: {
        uid: "test-user-id",
        email: "test@example.com",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("validateMedicine", () => {
    it("should validate a medicine and return a green verdict for safe medicines", async () => {
      // Mock AI Service
      aiService.analyzeImage.mockResolvedValue({
        inconsistencies: false,
        confidence: 0.9,
        details: {
          packagingAnalysis: { fontConsistency: true },
          batchNumberAnalysis: { validFormat: true },
        },
      });

      // Mock previous reviews
      Review.find.mockResolvedValue([
        { rating: 5, comment: "Good medicine" },
        { rating: 4, comment: "Works well" },
      ]);

      // Mock Medicine.findOneAndUpdate
      const mockMedicine = {
        _id: "medicine-id",
        name: "Test Medicine",
        imageUrl: "https://test-bucket.s3.amazonaws.com/test-image.jpg",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
        aiVerdict: "green",
        status: "verified",
        save: jest.fn().mockResolvedValue(true),
      };
      Medicine.findOne.mockResolvedValue(null);
      Medicine.prototype.save = jest.fn().mockResolvedValue(mockMedicine);

      // Execute the controller
      await medicineController.validateMedicine(req, res);

      // Assertions
      expect(aiService.analyzeImage).toHaveBeenCalled();
      expect(redisClient.set).toHaveBeenCalled();
      expect(publishToQueue).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          verdict: "green",
          message: expect.any(String),
          medicine: expect.objectContaining({
            name: "Test Medicine",
          }),
        })
      );
    });

    it("should return a yellow verdict for medicines with minor inconsistencies", async () => {
      // Mock AI Service with minor inconsistencies
      aiService.analyzeImage.mockResolvedValue({
        inconsistencies: true,
        confidence: 0.6,
        details: {
          packagingAnalysis: { fontConsistency: false },
          batchNumberAnalysis: { validFormat: true },
        },
      });

      // Mock mixed reviews
      Review.find.mockResolvedValue([
        { rating: 5, comment: "Good medicine" },
        { rating: 2, comment: "Suspicious packaging" },
      ]);

      // Mock Medicine.findOneAndUpdate
      const mockMedicine = {
        _id: "medicine-id",
        name: "Test Medicine",
        imageUrl: "https://test-bucket.s3.amazonaws.com/test-image.jpg",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
        aiVerdict: "yellow",
        status: "pending_review",
        save: jest.fn().mockResolvedValue(true),
      };
      Medicine.findOne.mockResolvedValue(null);
      Medicine.prototype.save = jest.fn().mockResolvedValue(mockMedicine);

      // Execute the controller
      await medicineController.validateMedicine(req, res);

      // Assertions
      expect(aiService.analyzeImage).toHaveBeenCalled();
      expect(publishToQueue).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          verdict: "yellow",
          message: expect.stringContaining("caution"),
          medicine: expect.objectContaining({
            status: "pending_review",
          }),
        })
      );
    });

    it("should return a red verdict for medicines with serious inconsistencies", async () => {
      // Mock AI Service with serious inconsistencies
      aiService.analyzeImage.mockResolvedValue({
        inconsistencies: true,
        confidence: 0.2,
        details: {
          packagingAnalysis: { fontConsistency: false, colorPatterns: false },
          batchNumberAnalysis: { validFormat: false, suspiciousFlags: true },
        },
      });

      // Mock negative reviews
      Review.find.mockResolvedValue([
        { rating: 1, comment: "Fake medicine" },
        { rating: 2, comment: "Did not work" },
      ]);

      // Mock Medicine.findOneAndUpdate
      const mockMedicine = {
        _id: "medicine-id",
        name: "Test Medicine",
        imageUrl: "https://test-bucket.s3.amazonaws.com/test-image.jpg",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
        aiVerdict: "red",
        status: "flagged",
        save: jest.fn().mockResolvedValue(true),
      };
      Medicine.findOne.mockResolvedValue(null);
      Medicine.prototype.save = jest.fn().mockResolvedValue(mockMedicine);

      // Execute the controller
      await medicineController.validateMedicine(req, res);

      // Assertions
      expect(aiService.analyzeImage).toHaveBeenCalled();
      expect(publishToQueue).toHaveBeenCalledWith(
        "moderator_queue",
        expect.objectContaining({ priority: "high" }),
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          verdict: "red",
          message: expect.stringContaining("potentially fake"),
          medicine: expect.objectContaining({
            status: "flagged",
          }),
        })
      );
    });

    it("should handle errors during validation", async () => {
      // Mock an error in AI Service
      aiService.analyzeImage.mockRejectedValue(new Error("AI analysis failed"));

      // Execute the controller
      await medicineController.validateMedicine(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("Failed to validate medicine"),
        })
      );
    });
  });

  // Additional tests for other medicine controller methods
  // (getFeedback, addFeedback, getPharmacies, etc.)
});
