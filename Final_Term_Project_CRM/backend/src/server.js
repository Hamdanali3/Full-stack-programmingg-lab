require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB, isDBConnected } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Final Term CRM API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is reachable",
    database: isDBConnected() ? "connected" : "disconnected"
  });
});

app.use("/api/auth", (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: "Database is not connected. Check MongoDB Atlas Network Access, credentials, and backend/.env MONGO_URI."
    });
  }

  next();
});

app.use("/api/customers", (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: "Database is not connected. Check MongoDB Atlas Network Access, credentials, and backend/.env MONGO_URI."
    });
  }

  next();
});

app.use("/api/invoices", (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: "Database is not connected. Check MongoDB Atlas Network Access, credentials, and backend/.env MONGO_URI."
    });
  }

  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const startDatabaseConnection = () => {
  connectDB().catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    console.error("Fix: allow your IP in MongoDB Atlas Network Access, verify credentials, or use local MongoDB.");
  });
};

startDatabaseConnection();

setInterval(() => {
  if (!isDBConnected()) {
    console.log("Retrying MongoDB connection...");
    startDatabaseConnection();
  }
}, 30000);
