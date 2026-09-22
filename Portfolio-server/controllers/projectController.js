const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");

const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string")
    return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
};

const deleteUploadedFile = (url) => {
  if (!url) return;
  const filePath = path.join(__dirname, "..", url.replace(/^\/+/, ""));
  if (fs.existsSync(filePath)) {
    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== "all" ? { category } : {};
    const list = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(list);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.tags = parseTags(data.tags);

    if (typeof data.features === "string") {
      data.features = data.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
    }

    if (req.files?.image?.[0]) {
      data.image = `/uploads/${req.files.image[0].filename}`;
    }
    if (req.files?.gallery?.length) {
      data.gallery = req.files.gallery.map((f) => `/uploads/${f.filename}`);
    } else {
      data.gallery = [];
    }

    const item = await Project.create(data);
    res.status(201).json(item);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.tags = parseTags(data.tags);

    if (typeof data.features === "string") {
      data.features = data.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
    }

    // ---------- Handle existing gallery ----------
    // Frontend sends a JSON string: existingGallery = '["/uploads/a.jpg","/uploads/b.jpg"]'
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

    // ---------- Delete files the user removed ----------
    // Frontend sends: removedGallery = '["/uploads/old.jpg", ...]'
    if (data.removedGallery) {
      try {
        const removed = JSON.parse(data.removedGallery);
        if (Array.isArray(removed)) {
          removed.forEach(deleteUploadedFile);
        }
      } catch (e) { /* ignore */ }
      delete data.removedGallery;
    }

    // ---------- Combine existing + new uploaded ----------
    let finalGallery = [...existingGallery];
    if (req.files?.gallery?.length) {
      const newFiles = req.files.gallery.map((f) => `/uploads/${f.filename}`);
      finalGallery = [...finalGallery, ...newFiles];
    }
    data.gallery = finalGallery;

    // ---------- Main image ----------
    if (req.files?.image?.[0]) {
      data.image = `/uploads/${req.files.image[0].filename}`;
    }

    const item = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    deleteUploadedFile(item.image);
    item.gallery?.forEach(deleteUploadedFile);

    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) { next(err); }
};