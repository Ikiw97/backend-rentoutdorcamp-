import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import { uploadPaymentProof, verifyPayment, getPayments } from "../controllers/paymentController.js";

const router = express.Router();

// multer storage (local)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});
const upload = multer({ storage });

// user upload bukti: POST /api/payments/upload/:bookingId
router.post("/upload/:bookingId", protect, upload.single("file"), uploadPaymentProof);

// admin verify: PUT /api/payments/verify/:id
router.put("/verify/:id", protect, adminOnly, verifyPayment);

// admin list payments: GET /api/payments
router.get("/", protect, adminOnly, getPayments);

export default router;
