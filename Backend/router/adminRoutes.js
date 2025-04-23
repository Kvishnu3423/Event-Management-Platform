import express from "express";
import { adminSignup, adminLogin } from "../controller/adminController.js";


const router = express.Router();

router.post("/signup", adminSignup); // ✅ Add this
router.post("/login", adminLogin);

export default router;
