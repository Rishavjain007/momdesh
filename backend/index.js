require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(express.json());

// Debug: check if .env value is being read
console.log("Mongo URI from .env:", process.env.URI_MONGOOSE);

// Connect to MongoDB
mongoose.connect(process.env.URI_MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Basic route
app.get("/", (req, res) => {
    res.send("Server is running and connected to MongoDB!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
