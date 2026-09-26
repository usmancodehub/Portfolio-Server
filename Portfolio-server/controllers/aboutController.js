const About = require("../models/About");
const { uploadToR2, deleteFromR2 } = require("../utils/r2Client");

/* ---------------------------------------------------------------------------
   GET /api/about
--------------------------------------------------------------------------- */
exports.get = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({ bio: "Welcome to my portfolio." });
    }
    res.json(about);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   PUT /api/about
   multipart/form-data — accepts portrait image
--------------------------------------------------------------------------- */
exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // ---------- If a new portrait was uploaded, upload to R2 and delete the old one ----------
    if (req.file) {
      const old = await About.findOne();

      // Delete previous portrait from R2
      if (old && old.portrait) {
        await deleteFromR2(old.portrait);
      }

      // Upload new portrait to R2 under the "about" folder
      data.portrait = await uploadToR2(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        "about"
      );
    }

    let about = await About.findOne();
    if (!about) {
      about = await About.create(data);
    } else {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    }
    res.json(about);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   DELETE /api/about/portrait
--------------------------------------------------------------------------- */
exports.removePortrait = async (req, res, next) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "About not found" });

    // Delete portrait from R2
    if (about.portrait) {
      await deleteFromR2(about.portrait);
    }

    about.portrait = "";
    await about.save();
    res.json(about);
  } catch (err) {
    next(err);
  }
};