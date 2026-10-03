const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/marqueeController");

// Public — anyone can read
router.get("/", ctrl.getAll);

// Admin only — protected routes
router.post("/", protect, ctrl.create);
router.put("/:id", protect, ctrl.update);
router.delete("/:id", protect, ctrl.remove);
router.post("/seed", protect, ctrl.seed);

module.exports = router;