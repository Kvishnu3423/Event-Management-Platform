import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
});

export const Room = mongoose.model("Room", roomSchema);
