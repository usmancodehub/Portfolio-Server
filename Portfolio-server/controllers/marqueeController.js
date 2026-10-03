const Marquee = require("../models/Marquee");

/* ---------------------------------------------------------------------------
   GET /api/marquee  — public + admin
--------------------------------------------------------------------------- */
exports.getAll = async (req, res, next) => {
  try {
    const items = await Marquee.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   POST /api/marquee  — admin only
--------------------------------------------------------------------------- */
exports.create = async (req, res, next) => {
  try {
    const { text, style, order } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    const item = await Marquee.create({
      text: text.trim(),
      style: style || "outline",
      order: order || 0,
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   PUT /api/marquee/:id  — admin only
--------------------------------------------------------------------------- */
exports.update = async (req, res, next) => {
  try {
    const item = await Marquee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   DELETE /api/marquee/:id  — admin only
--------------------------------------------------------------------------- */
exports.remove = async (req, res, next) => {
  try {
    const item = await Marquee.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   POST /api/marquee/seed  — admin only (creates initial items if empty)
--------------------------------------------------------------------------- */
exports.seed = async (req, res, next) => {
  try {
    const count = await Marquee.countDocuments();
    if (count > 0) {
      return res.json({ message: "Already has items", created: 0 });
    }

    const defaults = [
      { text: "Developing ERP & CRM Platforms", style: "outline", order: 1 },
      { text: "Creating AI-Powered Solutions", style: "solid", order: 2 },
      { text: "Building Scalable Web Applications", style: "outline", order: 3 },
      { text: "Crafting Modern User Experiences", style: "solid", order: 4 },
    ];

    const created = await Marquee.insertMany(defaults);
    res.json({ message: "Seeded", created: created.length });
  } catch (err) {
    next(err);
  }
};