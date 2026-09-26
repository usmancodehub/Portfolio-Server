const multer = require("multer");

// Use memory storage — files stay in RAM briefly, then go to R2
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|pdf|doc|docx/;
  const ok = allowed.test(file.originalname.toLowerCase());
  cb(ok ? null : new Error("File type not allowed"), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

upload.uploadMultiple = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

module.exports = upload;