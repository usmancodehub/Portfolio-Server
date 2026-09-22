const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const toolRoutes = require("./routes/toolRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const settingRoutes = require("./routes/settingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/settings", settingRoutes);

app.get("/", (req, res) => res.send("MERN Portfolio API running 🚀"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing from .env");
  process.exit(1);
}

if (/<[^>]+>/.test(process.env.MONGO_URI)) {
  console.error("❌ MONGO_URI still contains a placeholder. Replace it with your MongoDB Atlas connection string.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
    process.exit(1);
  });