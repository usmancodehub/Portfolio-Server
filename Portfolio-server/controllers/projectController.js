const Project = require("../models/Project");
const { uploadToR2, deleteFromR2 } = require("../utils/r2Client");

/* ---------------------------------------------------------------------------
   Helpers
--------------------------------------------------------------------------- */
const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string")
    return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
};

const parseFeatures = (features) => {
  if (Array.isArray(features)) return features;
  if (typeof features === "string") {
    return features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
  }
  return [];
};

/* ---------------------------------------------------------------------------
   GET /api/projects
--------------------------------------------------------------------------- */
exports.getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== "all" ? { category } : {};
    const list = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   GET /api/projects/:id
--------------------------------------------------------------------------- */
exports.getOne = async (req, res, next) => {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   POST /api/projects
--------------------------------------------------------------------------- */
exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.tags = parseTags(data.tags);
    data.features = parseFeatures(data.features);

    // ---------- Upload main image to R2 ----------
    if (req.files?.image?.[0]) {
      const file = req.files.image[0];
      data.image = await uploadToR2(
        file.buffer,
        file.originalname,
        file.mimetype,
        "projects"
      );
    }

    // ---------- Upload gallery images to R2 ----------
    if (req.files?.gallery?.length) {
      data.gallery = await Promise.all(
        req.files.gallery.map((f) =>
          uploadToR2(
            f.buffer,
            f.originalname,
            f.mimetype,
            "projects/gallery"
          )
        )
      );
    } else {
      data.gallery = [];
    }

    const item = await Project.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   PUT /api/projects/:id
--------------------------------------------------------------------------- */
exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.tags = parseTags(data.tags);
    data.features = parseFeatures(data.features);

    // ---------- Fetch the existing project to know old image/gallery URLs ----------
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: "Not found" });
    }

    // ---------- Handle existing gallery (kept by the admin) ----------
    let existingGallery = [];
    if (data.existingGallery) {
      try {
        existingGallery = JSON.parse(data.existingGallery);
        if (!Array.isArray(existingGallery)) existingGallery = [];
      } catch (e) {
        existingGallery = [];
      }
    }
    delete data.existingGallery;

    // ---------- Delete gallery images the user removed ----------
    if (data.removedGallery) {
      try {
        const removed = JSON.parse(data.removedGallery);
        if (Array.isArray(removed)) {
          // Delete each removed gallery image from R2
          await Promise.all(removed.map((url) => deleteFromR2(url)));
        }
      } catch (e) {
        /* ignore */
      }
      delete data.removedGallery;
    }

    // ---------- Upload new gallery images to R2 ----------
    let finalGallery = [...existingGallery];
    if (req.files?.gallery?.length) {
      const newUrls = await Promise.all(
        req.files.gallery.map((f) =>
          uploadToR2(
            f.buffer,
            f.originalname,
            f.mimetype,
            "projects/gallery"
          )
        )
      );
      finalGallery = [...finalGallery, ...newUrls];
    }
    data.gallery = finalGallery;

    // ---------- Upload new main image to R2 (and delete the old one) ----------
    if (req.files?.image?.[0]) {
      const file = req.files.image[0];

      // Delete the previous main image from R2
      if (existingProject.image) {
        await deleteFromR2(existingProject.image);
      }

      data.image = await uploadToR2(
        file.buffer,
        file.originalname,
        file.mimetype,
        "projects"
      );
    }

    const item = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   DELETE /api/projects/:id
--------------------------------------------------------------------------- */
exports.remove = async (req, res, next) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    // ---------- Delete main image from R2 ----------
    if (item.image) {
      await deleteFromR2(item.image);
    }

    // ---------- Delete all gallery images from R2 ----------
    if (item.gallery?.length) {
      await Promise.all(item.gallery.map((url) => deleteFromR2(url)));
    }

    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};