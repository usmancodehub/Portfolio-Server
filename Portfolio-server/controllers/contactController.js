const Contact = require("../models/Contact");
const { sendEmail } = require("../utils/sendEmail");
const { thankYouTemplate } = require("../templates/thankYouTemplate");
const { adminNotifyTemplate } = require("../templates/adminNotifyTemplate");

/* ---------------------------------------------------------------------------
   POST /api/contact
   - Saves message to DB
   - Sends thank-you email to visitor
   - Sends notification email to admin
--------------------------------------------------------------------------- */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1. Save to database
    const contact = await Contact.create({ name, email, subject, message });

    // 2. Prepare email payloads
    const dateStr = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const visitorHtml = thankYouTemplate({ name, subject, message });
    const adminHtml = adminNotifyTemplate({
      name,
      email,
      subject,
      message,
      date: dateStr,
    });

    // 3. Send both emails and report delivery status to the form.
    const [visitorEmail, adminEmail] = await Promise.all([
      // → Visitor: Thank you
      sendEmail({
        to: email,
        subject: "Thanks for reaching out! ✨",
        html: visitorHtml,
      }),

      // → You: Notification (with reply-to so you can reply to the visitor)
      sendEmail({
        to: process.env.EMAIL_USER,
        subject: `📬 New message from ${name}`,
        html: adminHtml,
        replyTo: email,
      }),
    ]);

    const emailsSent = visitorEmail.success && adminEmail.success;
    const responseMessage = emailsSent
      ? "Message received! A confirmation email has been sent."
      : !adminEmail.success
        ? "Your message was saved, but the email notification could not be sent. Please contact us directly if your request is urgent."
        : "Your message was received, but the confirmation email could not be sent.";

    // 4. The message is saved even when SMTP delivery fails.
    res.status(201).json({
      success: true,
      message: responseMessage,
      emailDelivery: {
        confirmation: visitorEmail.success,
        notification: adminEmail.success,
      },
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   GET /api/contact  (admin)
--------------------------------------------------------------------------- */
exports.getAll = async (req, res, next) => {
  try {
    res.json(await Contact.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------------------------------
   PUT /api/contact/:id/read  (admin)
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
   DELETE /api/contact/:id  (admin)
--------------------------------------------------------------------------- */
exports.remove = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};