import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

const router = express.Router();

// Signup Route (FIXED)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hash Password
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin Signup
router.post("/admin/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let admin = await User.findOne({ email });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new User({ name, email, password: hashedPassword, isAdmin: true });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin Login
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin || !admin.isAdmin) {
      return res.status(401).json({ message: "Admin not found or unauthorized" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, isAdmin: true }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
