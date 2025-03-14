import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true }, // ✅ User's name
    email: { type: String, required: true },
    event: { type: String, required: true },
    reservationDate: { type: String, required: true },
    numTickets: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
    // ❌ Removed `room` requirement
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
