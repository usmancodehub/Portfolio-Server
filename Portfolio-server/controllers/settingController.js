const Setting = require("../models/Setting");
const fs = require("fs");
const path = require("path");

exports.getByKey = async (req, res, next) => {
  try {
    const s = await Setting.findOne({ key: req.params.key });
    res.json(s || { key: req.params.key, value: "" });
  } catch (err) {
    next(err);
  }
};

exports.upload = async (req, res, next) => {
  try {
    const { key } = req.params;
    if (!req.file) return res.status(400).json({ message: "No file" });

    const old = await Setting.findOne({ key });
    if (old && old.value) {
      const oldPath = path.join(
        __dirname,
        "..",
        old.value.replace(/^\/+/, "")
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const value = `/uploads/${req.file.filename}`;
    const updated = await Setting.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { key } = req.params;
    const s = await Setting.findOne({ key });
    if (s && s.value) {
      const filePath = path.join(__dirname, "..", s.value.replace(/^\/+/, ""));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Setting.deleteOne({ key });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};