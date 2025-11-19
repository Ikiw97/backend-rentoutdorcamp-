import User from "../models/User.js";
import fs from "fs";
import path from "path";

/**
 * getUsers (admin)
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * verifyKTP (admin)
 * - menerima file field "ktp"
 * - simpan path ke user.identityPhoto, set isVerified = true
 */
export const verifyKTP = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    if (!req.file) return res.status(400).json({ message: "File KTP tidak ditemukan" });

    user.identityPhoto = `/uploads/${req.file.filename}`;
    user.isVerified = true;
    await user.save();

    res.json({ message: "User terverifikasi", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * banUser / unbanUser (admin)
 */
export const setBan = async (req, res) => {
  try {
    const id = req.params.id;
    const { ban = true } = req.body;
    const user = await User.findByIdAndUpdate(id, { isBanned: !!ban }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json({ message: `User ${ban ? "dibanned" : "unbanned"}`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * getUser (admin or self)
 */
export const getUser = async (req, res) => {
  try {
    const id = req.params.id || req.user.id;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
