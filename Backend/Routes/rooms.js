const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE room availability
router.put("/update/:roomId", async (req, res) => {
  try {
    const { isAvailable } = req.body;
    await Room.findByIdAndUpdate(req.params.roomId, { isAvailable });
    res.json({ message: "Room status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
