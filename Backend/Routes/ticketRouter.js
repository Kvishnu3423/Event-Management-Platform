import express from "express";
import Ticket from "../Models/ticket.js";

const router = express.Router();

// Book a ticket
router.post("/book", async (req, res) => {
  try {
    const { event, name, email, age, gender, numTickets } = req.body;

    const newTicket = new Ticket({ event, name, email, age, gender, numTickets });
    await newTicket.save();

    res.status(201).json({ success: true, message: "Ticket booked successfully!", ticket: newTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Get all bookings for Admin
router.get("/all", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

export default router;
