import express from "express";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const checkAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Access denied. Admins only." });
  next();
};

// Users route
router.get("/users", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Appointments route
router.get("/appointments", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "name email")
      .lean();
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
