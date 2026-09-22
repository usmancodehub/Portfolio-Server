const About = require("../models/About");
const fs = require("fs");
const path = require("path");

const deleteFile = (url) => {
  if (!url) return;
  const filePath = path.join(__dirname, "..", url.replace(/^\/+/, ""));
  if (fs.existsSync(filePath)) {
    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
  }
};

// GET /api/about
exports.get = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({ bio: "Welcome to my portfolio." });
    res.json(about);
  } catch (err) { next(err); }
};

// PUT /api/about  (multipart/form-data — accepts portrait image)
exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // If a new portrait was uploaded, replace the old one
    if (req.file) {
      const old = await About.findOne();
      if (old && old.portrait) deleteFile(old.portrait);
      data.portrait = `/uploads/${req.file.filename}`;
    }

    let about = await About.findOne();
    if (!about) {
      about = await About.create(data);
    } else {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    }
    res.json(about);
  } catch (err) { next(err); }
};

// DELETE /api/about/portrait
exports.removePortrait = async (req, res, next) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "About not found" });
    if (about.portrait) deleteFile(about.portrait);
    about.portrait = "";
    await about.save();
    res.json(about);
  } catch (err) { next(err); }
};