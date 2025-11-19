import Booking from "../models/Booking.js";
import Product from "../models/Product.js";

// USER CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { productId, date, duration, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const booking = await Booking.create({
      userId: req.user.id,
      productId,
      date,
      duration,
      qty,
      price: product.price * qty * duration,
      status: "pending",
    });

    res.json({ message: "Booking dibuat", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER — MY BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate("productId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN — GET ALL BOOKINGS
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId productId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN — UPDATE STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ message: "Status diperbarui", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
