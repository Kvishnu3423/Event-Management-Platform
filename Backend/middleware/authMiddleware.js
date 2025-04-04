// middleware/auth.js
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "OKCU");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
