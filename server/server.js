const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const {
  apiLimiter,
  authLimiter,
  helmet,
  gdprMiddleware,
} = require("./src/middleware/security");
const uploadRoutes = require("./src/routes/upload.route");
const reviewRoutes = require("./src/routes/review.route");
const moderatorRoutes = require("./src/routes/moderator.route");
const pharmacyRoutes = require("./src/routes/pharmacy.route");
const feedbackRoutes = require("./src/routes/feedback.route");
const userRoutes = require("./src/routes/user.route");
const { errorHandler } = require("./src/middleware/errorHandler");

dotenv.config();
const app = express();

// Initialize Firebase Admin
const firebaseConfig = {
  credential: require("./src/config/firebase-admin.json"),
};
initializeApp(firebaseConfig);

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(gdprMiddleware);
app.use(apiLimiter); // Apply rate limiting to all routes by default

// Standard Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes with specific security configurations
app.use("/api/upload", uploadRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/user", userRoutes);

// Error Handling
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
