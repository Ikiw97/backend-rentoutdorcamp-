import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const email = "admin@outdoorcamp.id";
const exists = await User.findOne({ email });

if (exists) {
  console.log("Admin sudah ada");
  process.exit(0);
}

const hash = await bcrypt.hash("password123", 10);
const user = await User.create({
  name: "Admin",
  email,
  password: hash,
  role: "admin",
  isVerified: true,
});

console.log("Admin dibuat:", user.email);
process.exit(0);
