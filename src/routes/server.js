import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import bookingRoutes from "./routes/bookings.js";
import paymentRoutes from "./routes/payments.js";
import statsRoutes from "./routes/stats.js";
import settingsRoutes from "./routes/settings.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.send("OutdoorCamp API running...");
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
