const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/aboutController");

router.get("/", ctrl.get);
router.put("/", protect, upload.single("portrait"), ctrl.update);
router.delete("/portrait", protect, ctrl.removePortrait);

module.exports = router;