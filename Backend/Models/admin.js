// router/admin.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Admin from "../Models/admin.js";

const router = express.Router();

// Admin Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "OKCU",
      { expiresIn: "5h" }
    );

    res.json({ token, message: "Admin login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin Signup Route
router.post("/signup", async (req, res) => {
  try {
    alert("Signup")
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash Password
    user = new Admin({ name, email, password: hashedPassword, role: "admin" }); // Set the role to admin
    await user.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
