import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },

    date: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },

    duration: { type: Number, required: true },

    qty: { type: Number, default: 1 },

    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "processing", "borrowed", "completed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
