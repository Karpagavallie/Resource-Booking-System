
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = require("./db");

// Routes
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");

app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Resource Booking System Backend is running!");
});

// Server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
