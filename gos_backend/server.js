require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(require("cors")());
app.use(require("helmet")());

// Connect to Database
if (process.env.MONGO_RUI) {
  connectDB();
} else {
  console.log("⚠️ Skipping MongoDB connection (MONGO_URI not set)")
}

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 The Game of Stocks Backend Running!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));