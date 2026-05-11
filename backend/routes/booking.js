const express = require("express");
const router = express.Router();
const db = require("../db");

// ---------------- RESOURCE ROUTES ----------------

// 1) Get all resources (Student/Admin)
router.get("/resources", (req, res) => {
  db.query("SELECT * FROM resources", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// 2) Add a new resource (Admin)
router.post("/resources", (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Name and type are required" });
  }

  const sql = "INSERT INTO resources (name, type) VALUES (?, ?)";
  db.query(sql, [name, type], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Resource added successfully" });
  });
});

// 3) Delete a resource (Admin)
router.delete("/resources/:id", (req, res) => {
  const sql = "DELETE FROM resources WHERE id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  });
});

// ---------------- BOOKING ROUTES ----------------

// 4) Get all bookings (Admin view, Student filters by user_id in frontend)
// IMPORTANT: includes b.user_id for student history filtering
router.get("/bookings", (req, res) => {
  const sql = `
    SELECT 
      b.id, 
      b.user_id,
      u.name as user, 
      r.name as resource, 
      b.date, 
      b.time, 
      b.status
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN resources r ON b.resource_id = r.id
    ORDER BY b.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// 5) Create a booking (Student)
router.post("/bookings", (req, res) => {
  const { user_id, resource_id, date, time } = req.body;

  if (!user_id || !resource_id || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check overlapping bookings
  const checkSql = "SELECT id FROM bookings WHERE resource_id=? AND date=? AND time=?";
  db.query(checkSql, [resource_id, date, time], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length > 0) {
      return res.status(400).json({ message: "Resource already booked at this time" });
    }

    const insertSql =
      "INSERT INTO bookings (user_id, resource_id, date, time, status) VALUES (?, ?, ?, ?, 'pending')";
    db.query(insertSql, [user_id, resource_id, date, time], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });
      res.status(201).json({ message: "Booking request submitted" });
    });
  });
});

// 6) Update booking status (Admin approve/reject)
router.put("/bookings/:id/status", (req, res) => {
  const { status } = req.body; // approved / rejected / pending

  if (!status || !["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = "UPDATE bookings SET status=? WHERE id=?";
  db.query(sql, [status, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking status updated" });
  });
});

module.exports = router;
