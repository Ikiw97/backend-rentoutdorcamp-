import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { getRevenueStats, getPopularProducts, getDamageReports, getStockStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/revenue", protect, adminOnly, getRevenueStats);
router.get("/top-products", protect, adminOnly, getPopularProducts);
router.get("/damage", protect, adminOnly, getDamageReports);
router.get("/stock", protect, adminOnly, getStockStats);

export default router;
