import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Untuk __dirname pada ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder uploads diakses publik
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes backend
app.use("/api", routes);

// Error handler
app.use(notFound);
app.use(errorHandler);

// Railway port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
