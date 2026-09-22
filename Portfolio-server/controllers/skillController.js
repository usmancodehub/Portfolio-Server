const Skill = require("../models/Skill");

exports.getAll = async (req, res, next) => {
  try {
    const list = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Skill.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, {
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
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};