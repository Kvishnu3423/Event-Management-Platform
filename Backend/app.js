import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import userRoutes from "./router/user.js";  // Import User Routes
import adminRoutes from "./router/admin.js"; // Import Admin Routes
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ticketRouter from "./router/ticketRouter.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

const reservationRoutes = require("./routes/reservations");
app.use("/api/reservations", reservationRoutes);

const roomRoutes = require("./routes/room");
app.use("/api/rooms", roomRoutes);


app.use(cors({
    origin: "*", // ✅ Allow requests from any origin (for testing)
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow headers
    credentials: true, // ✅ Allow credentials like JWT tokens
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/message", messageRouter);

// Use the user authentication routes
app.use("/api/v1/auth", userRoutes);  // User login and signup

// Use the admin authentication routes
app.use("/api/v1/admin", adminRoutes);  // Admin login and signup

app.use("/api/v1/tickets", ticketRouter);

// Connect to MongoDB Atlas
dbConnection();

export default app;
