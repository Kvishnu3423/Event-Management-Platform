import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import authRouter from "./router/authRouter.js"; //  Import Auth Routes
import cors from "cors";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: "*", //  Allow requests from any origin (for testing)
    methods: ["GET", "POST", "PUT", "DELETE"], //  Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], //  Allow headers
    credentials: true, // Allow credentials like JWT tokens
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/auth", authRouter);  // Now authRouter is defined!

// Connect to MongoDB Atlas
dbConnection();

export default app;