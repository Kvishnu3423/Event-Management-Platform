const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// POST /api/reservations
router.post("/", async (req, res) => {
  try {
    const { name, email, event, room } = req.body;
    const newReservation = new Reservation({ name, email, event, room });
    await newReservation.save();
    res.status(201).json({ message: "Reservation saved successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
