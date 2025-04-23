import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,
  room: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
