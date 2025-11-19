import mongoose from "mongoose";

const damageSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  description: String,
  cost: Number
});

export default mongoose.model("DamageReport", damageSchema);
