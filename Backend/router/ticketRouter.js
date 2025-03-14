import express from "express";
import Ticket from "../Models/ticket.js";
import mongoose from "mongoose";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Fetch available rooms for an event on a specific date
router.get("/available-rooms", async (req, res) => {
    try {
        const { event, date } = req.query;
        const totalRooms = 10; // ✅ Total available rooms

        if (!event || !date) {
            return res.status(400).json({ message: "Event and date are required." });
        }

        // ✅ Convert date to ISO format for MongoDB query
        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0); // Normalize to start of day (UTC)

        console.log(`Checking available rooms for event: ${event} on date: ${formattedDate}`);

        // ✅ Find tickets that match the event and date
        const bookedTickets = await Ticket.find({
            event: event,
            reservationDate: {
                $gte: formattedDate,
                $lt: new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000), // Same day range
            },
        });

        console.log("Booked Tickets Found:", bookedTickets.length);

        // ✅ If no tickets exist, return 10 available rooms
        if (!bookedTickets.length) {
            return res.json({ availableRooms: totalRooms });
        }

        // ✅ Calculate occupied rooms (150 people per room)
        let bookedSeats = bookedTickets.reduce((sum, ticket) => sum + ticket.numTickets, 0);
        let occupiedRooms = Math.ceil(bookedSeats / 150);
        let remainingRooms = totalRooms - occupiedRooms;

        console.log(`Total seats booked: ${bookedSeats}, Occupied Rooms: ${occupiedRooms}, Remaining Rooms: ${remainingRooms}`);

        res.json({ availableRooms: remainingRooms > 0 ? remainingRooms : 0 });
    } catch (error) {
        console.error("Error fetching available rooms:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ Book a Ticket (Ensures all fields are validated)
router.post("/book", async (req, res) => {
    try {
        const { name, email, event, reservationDate, numTickets, age, gender } = req.body;

        // ✅ Debugging log to check what the frontend is sending
        console.log("Received Booking Data:", req.body);

        // ✅ Ensure required fields are present
        if (!name || !email || !event || !reservationDate || !numTickets || !age || !gender) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // ✅ Create a new ticket entry
        const newTicket = new Ticket({
            name,
            email,
            event,
            reservationDate,
            numTickets,
            age,
            gender,
        });

        // ✅ Save the ticket to the database
        await newTicket.save();

        res.json({ success: true, message: "Ticket booked successfully!", ticket: newTicket });

    } catch (error) {
        console.error("Error booking ticket:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.toString() });
    }
});


// ✅ Fetch available seats for an event on a specific date
router.get("/available-seats", async (req, res) => {
    try {
        const { event, date } = req.query;
        const totalSeats = 150; // ✅ Total available seats for the event

        if (!event || !date) {
            return res.status(400).json({ message: "Event and date are required." });
        }

        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0); // Normalize the date for accurate comparison

        // ✅ Find all tickets booked for this event and date
        const bookedTickets = await Ticket.find({
            event: event,
            reservationDate: formattedDate.toISOString().split("T")[0],
        });

        // ✅ Calculate total booked seats
        let bookedSeats = bookedTickets.reduce((sum, ticket) => sum + ticket.numTickets, 0);
        let availableSeats = totalSeats - bookedSeats;

        console.log(`Event: ${event}, Date: ${date}, Booked Seats: ${bookedSeats}, Remaining Seats: ${availableSeats}`); // Debugging log

        res.json({ availableSeats: availableSeats > 0 ? availableSeats : 0 });
    } catch (error) {
        console.error("Error fetching available seats:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ Get user’s past bookings
router.get("/my-bookings", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Ticket.find({ user: userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get bookings for a specific event
router.get("/event-tickets", authMiddleware, async (req, res) => {
    try {
        const { event } = req.query;
        const userId = req.user._id;

        const tickets = await Ticket.find({ user: userId, event });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
