import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: [
        "tenda",
        "carrier",
        "sleeping-gear",
        "cooking",
        "hiking",
        "lighting",
        "paket-camping",
      ],
    },

    brand: { type: String },

    price: { type: Number, required: true },

    capacity: { type: Number, default: 0 }, // untuk tenda: 2,4,6 orang

    stock: { type: Number, default: 1 },

    description: { type: String },

    photos: [{ type: String }], // multiple upload

    condition: {
      type: String,
      enum: ["good", "maintenance", "damage"],
      default: "good",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
