
const express = require("express");
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3500;

// require("dotenv").config();
// const connectDB = require("./src/config/db");


// Middleware
// app.use(express.json());
// app.use(require("cors")());
// app.use(require("helmet")());

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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));