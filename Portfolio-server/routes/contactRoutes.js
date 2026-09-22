const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/contactController");

router.post("/", ctrl.createContact);
router.get("/", protect, ctrl.getAll);
router.put("/:id/read", protect, ctrl.markRead);
router.delete("/:id", protect, ctrl.remove);

module.exports = router;