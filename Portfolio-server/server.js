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




app.get("/api/test-email", async (req, res) => {
  try {
    const { sendEmail } = require("./utils/sendEmail");
    const result = await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Test from production",
      html: "<p>If you see this, SMTP works!</p>",
      text: "If you see this, SMTP works!",
    });
    res.json({
      env: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER ? "set" : "MISSING",
        pass: process.env.EMAIL_PASS ? "set" : "MISSING",
      },
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});



// --- CORS CONFIGURATION ---
const normalizeOrigin = (value) => {
  try {
    return new URL(value.trim()).origin;
  } catch {
    return "";
  }
};

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  process.env.CORS_ORIGINS,
  "http://localhost:3001",
  "http://localhost:3000",
  "http://192.168.181.1:3001",
  "https://portfolio-ten-sage-xzaeaoufzn.vercel.app",
  "https://portfolio-admin-ruby-sigma.vercel.app",
  "https://portfolio-ohlz7987q-usmans-projects-6f920032.vercel.app",
]
  .flatMap((value) => (value || "").split(","))
  .map(normalizeOrigin)
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
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

// --- DATABASE CONNECTION & SERVER START ---
// These checks are now INSIDE the connection logic, so the server doesn't crash before starting.
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Please add it to Render's Environment Variables.");
  process.exit(1);
}

if (/<[^>]+>/.test(process.env.MONGO_URI)) {
  console.error("❌ MONGO_URI still contains a placeholder. Replace it with your real connection string.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    // The server ONLY starts listening AFTER a successful DB connection
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
    process.exit(1);
  });