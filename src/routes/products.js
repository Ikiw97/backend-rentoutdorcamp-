import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

// Upload image → stored in /uploads
const upload = multer({ dest: "uploads/" });

router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", protect, adminOnly, upload.array("photos"), createProduct);
router.put("/:id", protect, adminOnly, upload.array("photos"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
