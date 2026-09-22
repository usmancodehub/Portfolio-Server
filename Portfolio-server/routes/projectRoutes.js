const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/projectController");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", protect, upload.uploadMultiple, ctrl.create);
router.put("/:id", protect, upload.uploadMultiple, ctrl.update);
router.delete("/:id", protect, ctrl.remove);

module.exports = router;