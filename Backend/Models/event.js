import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  totalSeats: Number,
  seatsFilled: { type: Number, default: 0 },
  reservationDates: [String],
});

export const Event = mongoose.model("Event", eventSchema);
