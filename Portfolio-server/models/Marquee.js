const mongoose = require("mongoose");

const marqueeSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    style: {
      type: String,
      enum: ["outline", "solid"],
      default: "outline",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Marquee", marqueeSchema);