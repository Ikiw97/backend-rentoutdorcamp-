import Booking from "../models/Booking.js";
import Product from "../models/Product.js";
import DamageReport from "../models/DamageReport.js"; // optional if you keep this model

/**
 * revenue per month (YYYY-MM)
 */
export const getRevenueStats = async (req, res) => {
  try {
    const rows = await Booking.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: { $substr: ["$createdAt", 0, 7] }, total: { $sum: "$price" } } },
      { $sort: { "_id": 1 } },
    ]);
    const out = rows.map(r => ({ month: r._id, revenue: r.total }));
    res.json(out);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * top products by qty rented
 */
export const getPopularProducts = async (req, res) => {
  try {
    const rows = await Booking.aggregate([
      { $group: { _id: "$productId", rented: { $sum: "$qty" } } },
      { $sort: { rented: -1 } },
      { $limit: 10 },
    ]);
    const out = [];
    for (const r of rows) {
      const p = await Product.findById(r._id).select("name");
      out.push({ name: p ? p.name : "Unknown", rented: r.rented });
    }
    res.json(out);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * damage reports (simple)
 */
export const getDamageReports = async (req, res) => {
  try {
    const reports = await DamageReport.find().populate("bookingId productId");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * stock summary (list products with stock)
 */
export const getStockStats = async (req, res) => {
  try {
    const products = await Product.find().select("name stock");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
