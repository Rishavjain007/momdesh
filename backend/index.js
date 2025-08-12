import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import familiesRoutes from "./routes/familiesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*", // Customize CORS origin if needed
}));
app.use(express.json());

// MongoDB Connection
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error("Initial connection error:", err));

// Routes
app.use("/api/families", familiesRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("Server and MongoDB connection closed");
      process.exit(0);
    });
  });
});