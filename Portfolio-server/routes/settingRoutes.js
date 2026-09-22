const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/settingController");

router.get("/:key", ctrl.getByKey);
router.post("/:key/upload", protect, upload.single("file"), ctrl.upload);
router.delete("/:key", protect, ctrl.remove);

module.exports = router;