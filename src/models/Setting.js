import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    homepageBanner: {
      type: String,
      default: null,
    },

    contact: {
      whatsapp: { type: String },
      email: { type: String },
    },

    socialMedia: {
      instagram: { type: String },
      facebook: { type: String },
      youtube: { type: String },
    },

    rentalPolicy: {
      lateFeePerHour: { type: Number, default: 10000 },
      lateFeePerDay: { type: Number, default: 50000 },
    },

    operational: {
      address: { type: String },
      openHours: { type: String }, // ex: "08:00 - 21:00"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
