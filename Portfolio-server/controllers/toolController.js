const Tool = require("../models/Tool");

exports.getAll = async (req, res, next) => {
  try {
    res.json(await Tool.find().sort({ order: 1, createdAt: 1 }));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Tool.create(req.body));
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};