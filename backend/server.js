// server.js
const express = require("express");
const cors = require("cors");

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// ------------------- DATABASE -------------------
const db = require("./db"); // make sure db.js is correct and exported

// ------------------- ROUTES -------------------
const authRoutes = require("./routes/auth");       // auth (login/register)
const bookingRoutes = require("./routes/booking"); // bookings/resources

app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes); // /api/resources, /api/bookings, POST /api/bookings

// ------------------- TEST ROUTE -------------------
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ------------------- START SERVER -------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
