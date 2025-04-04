const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,
  room: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
