const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },        // short summary
    longDescription: { type: String, default: "" },       // full detail page text
    category: { type: String, enum: ["web", "app"], required: true },
    tags: [String],
    image: String,                                        // main image
    gallery: [String],                                    // extra screenshots
    link: String,                                         // live demo
    github: String,                                       // github repo
    features: [String],                                   // bullet list
    role: { type: String, default: "" },                  // e.g. "Full Stack Dev"
    duration: { type: String, default: "" },              // e.g. "2 months"
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);