import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import { verifyAdmin } from "../middleware/auth.js"; // ✅ Import middleware

const router = express.Router();

// Admin Login Route
router.post("/signup", async (req, res) => {alert("Hello World")});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // 🔐 Check for user and admin role
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "OKCU", // use env variable
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Admin login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Protected Dashboard Route
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: `Welcome, admin! Your ID: ${req.user.id}` });
});

export default router;
