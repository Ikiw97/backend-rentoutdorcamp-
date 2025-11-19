import express from "express";
import auth from "./auth.js";
import products from "./products.js";
import bookings from "./bookings.js";
import payments from "./payments.js";
import users from "./users.js";
import stats from "./stats.js";
import settings from "./settings.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/products", products);
router.use("/bookings", bookings);
router.use("/payments", payments);
router.use("/users", users);
router.use("/stats", stats);
router.use("/settings", settings);

export default router;

