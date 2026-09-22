const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "⌁" },
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", toolSchema);