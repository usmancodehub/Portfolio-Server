const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    /* ---------- ABOUT section (new design) ---------- */
    aboutLabel: { type: String, default: "ABOUT ME" },
    headline: {
      type: String,
      default:
        "I'm a Senior Full Stack Engineer building enterprise SaaS, ERP, CRM and AI-powered solutions that solve real business problems.",
    },
    bio: {
      type: String,
      default:
        "I specialize in designing and developing scalable enterprise applications, SaaS platforms, ERP systems, CRM solutions, and automation workflows. Over the last 3+ years, I've delivered production-ready software for international clients using modern cloud technologies. My focus is on clean architecture, performance, maintainability, and building software that solves real business problems.",
    },
    clientNote: {
      type: String,
      default: "Worked with international clients including Great West Radon (Canada)",
    },
    portrait: { type: String, default: "" },

    /* Stats */
    stat1Value: { type: String, default: "3+" },
    stat1Label: { type: String, default: "YEARS EXPERIENCE" },
    stat2Value: { type: String, default: "70+" },
    stat2Label: { type: String, default: "ENTERPRISE MODULES BUILT" },

    /* ---------- CONTACT section ---------- */
    contactTitle: { type: String, default: "Let's Work Together" },
    contactDescription: {
      type: String,
      default:
        "I'm open to internships, collaborations, and exciting development opportunities. Feel free to contact me.",
    },
    email: { type: String, default: "" },
    contactLocation: { type: String, default: "" },
    availability: { type: String, default: "" },

    /* ---------- Legacy info-card fields (kept for compatibility) ---------- */
    education: { type: String, default: "" },
    location: { type: String, default: "" },
    focus: { type: String, default: "" },
    experience: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);