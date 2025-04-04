const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: String,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model("Room", RoomSchema);
