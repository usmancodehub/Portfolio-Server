const Contact = require("../models/Contact");
const { sendEmail } = require("../utils/sendEmail");
const {
  thankYouTemplate,
  thankYouText,
} = require("../templates/thankYouTemplate");
const {
  adminNotifyTemplate,
  adminNotifyText,
} = require("../templates/adminNotifyTemplate");

/* ---------------------------------------------------------------------------
   POST /api/contact
--------------------------------------------------------------------------- */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Save to DB
    const contact = await Contact.create({ name, email, subject, message });

    // Prepare dates
    const dateStr = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Send both emails with HTML + plain-text version
    Promise.all([
      sendEmail({
        to: email,
        subject: `Re: ${subject}`,
        html: thankYouTemplate({ name, subject, message }),
        text: thankYouText({ name, subject, message }),
      }),

      sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: adminNotifyTemplate({ name, email, subject, message, date: dateStr }),
        text: adminNotifyText({ name, email, subject, message, date: dateStr }),
        replyTo: email,
      }),
    ]).catch((err) => console.error("Email sending error:", err));

    res.status(201).json({
      success: true,
      message: "Message received! Check your email for confirmation.",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   GET /api/contact (admin)
--------------------------------------------------------------------------- */
exports.getAll = async (req, res, next) => {
  try {
    res.json(await Contact.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   PUT /api/contact/:id/read (admin)
--------------------------------------------------------------------------- */
exports.markRead = async (req, res, next) => {
  try {
    const c = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(c);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   DELETE /api/contact/:id (admin)
--------------------------------------------------------------------------- */
exports.remove = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};