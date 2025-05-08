const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const app = express();
const Medicine = require("../../../src/models/Medicine");
const Review = require("../../../src/models/Review");
const Moderator = require("../../../src/models/Moderator");
const aiService = require("../../../src/services/aiService");
const { verifyToken } = require("../../../src/middleware/auth");

// Mocks
jest.mock("../../../src/middleware/auth", () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.user = { uid: "test-user-id", email: "test@example.com" };
    next();
  }),
}));

jest.mock("../../../src/services/aiService");
jest.mock("../../../src/services/uploadService", () => ({
  uploadImage: jest
    .fn()
    .mockResolvedValue("https://test-bucket.s3.amazonaws.com/test-image.jpg"),
}));

// Setup app
const medicineRoutes = require("../../../src/routes/medicine.route");
app.use(express.json());
app.use("/api/medicine", medicineRoutes);

// Setup MongoDB Memory Server
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Medicine.deleteMany({});
  await Review.deleteMany({});
  await Moderator.deleteMany({});

  // Mock AI service
  aiService.analyzeImage.mockResolvedValue({
    inconsistencies: false,
    confidence: 0.9,
    details: {
      packagingAnalysis: { fontConsistency: true },
      batchNumberAnalysis: { validFormat: true },
    },
  });
});

describe("Medicine API Routes", () => {
  describe("POST /api/medicine/validate", () => {
    it("should validate a medicine and return a verdict", async () => {
      const response = await request(app)
        .post("/api/medicine/validate")
        .set("Authorization", "Bearer fake-token")
        .field("name", "Test Medicine")
        .field("manufacturer", "Test Manufacturer")
        .field("batchNumber", "BATCH123")
        .attach("image", Buffer.from("test image"), "medicine.jpg");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("verdict");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("medicine");
    });

    it("should return 400 for missing required fields", async () => {
      const response = await request(app)
        .post("/api/medicine/validate")
        .set("Authorization", "Bearer fake-token")
        .attach("image", Buffer.from("test image"), "medicine.jpg");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /api/medicine/:id", () => {
    it("should retrieve a medicine by ID", async () => {
      // Create a test medicine
      const medicine = new Medicine({
        name: "Test Medicine",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
        imageUrl: "https://test-bucket.s3.amazonaws.com/test-image.jpg",
        status: "verified",
        aiVerdict: "green",
        createdBy: "test-user-id",
      });
      await medicine.save();

      const response = await request(app)
        .get(`/api/medicine/${medicine._id}`)
        .set("Authorization", "Bearer fake-token");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Test Medicine");
      expect(response.body).toHaveProperty("manufacturer", "Test Manufacturer");
    });

    it("should return 404 for non-existent medicine", async () => {
      const response = await request(app)
        .get("/api/medicine/60f5e4f55b57e71234567890")
        .set("Authorization", "Bearer fake-token");

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/medicine/:id/feedback", () => {
    it("should add feedback to a medicine", async () => {
      // Create a test medicine
      const medicine = new Medicine({
        name: "Test Medicine",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
        imageUrl: "https://test-bucket.s3.amazonaws.com/test-image.jpg",
        status: "verified",
        aiVerdict: "green",
        createdBy: "test-user-id",
      });
      await medicine.save();

      const response = await request(app)
        .post(`/api/medicine/${medicine._id}/feedback`)
        .set("Authorization", "Bearer fake-token")
        .send({
          rating: 5,
          comment: "Great medicine!",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("rating", 5);
      expect(response.body).toHaveProperty("comment", "Great medicine!");
      expect(response.body).toHaveProperty("userId", "test-user-id");
    });
  });

  describe("GET /api/medicine/:id/feedback", () => {
    it("should get feedback for a medicine", async () => {
      // Create a test medicine
      const medicine = new Medicine({
        name: "Test Medicine",
        manufacturer: "Test Manufacturer",
        batchNumber: "BATCH123",
        imageUrl: "https://test-bucket.s3.amazonaws.com/test-image.jpg",
        status: "verified",
        aiVerdict: "green",
        createdBy: "test-user-id",
      });
      await medicine.save();

      // Add some reviews
      await Review.create([
        {
          medicineId: medicine._id,
          userId: "user1",
          rating: 5,
          comment: "Great medicine!",
        },
        {
          medicineId: medicine._id,
          userId: "user2",
          rating: 4,
          comment: "Works well",
        },
      ]);

      const response = await request(app)
        .get(`/api/medicine/${medicine._id}/feedback`)
        .set("Authorization", "Bearer fake-token");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty("rating");
      expect(response.body[0]).toHaveProperty("comment");
    });
  });

  describe("GET /api/medicine/pharmacies", () => {
    it("should return nearby trusted pharmacies", async () => {
      const response = await request(app)
        .get("/api/medicine/pharmacies")
        .query({ lat: 40.7128, lng: -74.006 })
        .set("Authorization", "Bearer fake-token");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
