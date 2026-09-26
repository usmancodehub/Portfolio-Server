const Setting = require("../models/Setting");
const { uploadToR2, deleteFromR2 } = require("../utils/r2Client");

/* ---------------------------------------------------------------------------
   GET /api/settings/:key
--------------------------------------------------------------------------- */
exports.getByKey = async (req, res, next) => {
  try {
    const s = await Setting.findOne({ key: req.params.key });
    res.json(s || { key: req.params.key, value: "" });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   POST /api/settings/:key/upload
   Uploads file to R2, stores the returned public URL in the Setting document
--------------------------------------------------------------------------- */
exports.upload = async (req, res, next) => {
  try {
    const { key } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file" });
    }

    // ---------- Delete old file from R2 (if exists) ----------
    const old = await Setting.findOne({ key });
    if (old && old.value) {
      await deleteFromR2(old.value);
    }

    // ---------- Upload new file to R2 ----------
    // Use different folder names based on setting key for organization
    const folder = key === "cv" ? "cv" : key === "hero" ? "hero" : "settings";

    const value = await uploadToR2(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder
    );

    // ---------- Save URL to MongoDB ----------
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

/* ---------------------------------------------------------------------------
   DELETE /api/settings/:key
   Deletes the file from R2 and removes the Setting document
--------------------------------------------------------------------------- */
exports.remove = async (req, res, next) => {
  try {
    const { key } = req.params;

    const s = await Setting.findOne({ key });

    // ---------- Delete file from R2 ----------
    if (s && s.value) {
      await deleteFromR2(s.value);
    }

    // ---------- Remove Setting document ----------
    await Setting.deleteOne({ key });

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};