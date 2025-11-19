import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import fs from "fs";
import path from "path";

/**
 * uploadPaymentProof
 * - menerima multipart (multer) file di field "file"
 * - menyimpan record Payment dan attach proofUrl di Booking (proofUrl = /uploads/filename)
 */
export const uploadPaymentProof = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking tidak ditemukan" });

    if (!req.file) return res.status(400).json({ message: "File tidak ditemukan" });

    // simpan record payment
    const proofUrl = `/uploads/${req.file.filename}`;
    const payment = await Payment.create({
      userId: req.user.id,
      bookingId,
      proof: proofUrl,
      status: "pending",
      amount: booking.total || booking.price || 0,
    });

    // attach bukti ke booking juga (optional)
    booking.proofUrl = proofUrl;
    await booking.save();

    res.json({ message: "Bukti pembayaran berhasil diupload", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * verifyPayment (admin)
 * - set payment.status = 'verified' or 'rejected'
 * - jika verified -> set booking.paymentConfirmed = true
 */
export const verifyPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const { status = "verified" } = req.body;
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment tidak ditemukan" });

    payment.status = status;
    await payment.save();

    if (status === "verified") {
      const booking = await Booking.findById(payment.bookingId);
      if (booking) {
        booking.paymentConfirmed = true;
        await booking.save();
      }
    }

    res.json({ message: "Status pembayaran diperbarui", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * getPayments (admin)
 * - list semua payments (populate)
 */
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("bookingId", "productId total status");
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
