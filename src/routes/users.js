import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import { getUsers, verifyKTP, setBan, getUser } from "../controllers/userController.js";

const router = express.Router();

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

// Admin list users
router.get("/", protect, adminOnly, getUsers);

// Admin verify KTP (file field = "ktp")
router.post("/:id/verify", protect, adminOnly, upload.single("ktp"), verifyKTP);

// Ban/unban
router.put("/:id/ban", protect, adminOnly, setBan);

// Get user detail (admin or self)
router.get("/:id", protect, getUser);

export default router;
