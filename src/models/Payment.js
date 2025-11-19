import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },

    proof: { type: String, required: true }, // filename

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    amount: { type: Number },

    penalty: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
