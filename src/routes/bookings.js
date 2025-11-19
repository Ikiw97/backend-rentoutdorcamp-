import express from "express";
import {
  createBooking,
  getBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Public (user)
router.post("/", protect, createBooking);
router.get("/me", protect, getMyBookings);

// Admin
router.get("/", protect, adminOnly, getBookings);
router.put("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
