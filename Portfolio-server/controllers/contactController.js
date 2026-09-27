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
   - Saves message to DB
   - Sends thank-you email to visitor (HTML + plain text)
   - Sends notification email to admin (HTML + plain text)
   - Reports delivery status back to the form
--------------------------------------------------------------------------- */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // ---------- Validate ----------
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ---------- 1. Save to database ----------
    const contact = await Contact.create({ name, email, subject, message });

    // ---------- 2. Prepare date ----------
    const dateStr = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ---------- 3. Send both emails in parallel ----------
    // Each email includes both HTML and plain-text versions for deliverability
    const [visitorEmail, adminEmail] = await Promise.all([
      // → Visitor: Thank you
      sendEmail({
        to: email,
        subject: `Re: ${subject}`,
        html: thankYouTemplate({ name, subject, message }),
        text: thankYouText({ name, subject, message }),
        replyTo: process.env.EMAIL_USER,
      }),

      // → Admin: Notification
      sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: adminNotifyTemplate({
          name,
          email,
          subject,
          message,
          date: dateStr,
        }),
        text: adminNotifyText({
          name,
          email,
          subject,
          message,
          date: dateStr,
        }),
        replyTo: email,
      }),
    ]);

    // ---------- 4. Log results for debugging ----------
    console.log("📧 Visitor email →", email, "→", visitorEmail.success ? "✅ sent" : `❌ ${visitorEmail.error}`);
    console.log("📧 Admin email   →", process.env.EMAIL_USER, "→", adminEmail.success ? "✅ sent" : `❌ ${adminEmail.error}`);

    // ---------- 5. Determine response message ----------
    const emailsSent = visitorEmail.success && adminEmail.success;

    let responseMessage;
    if (emailsSent) {
      responseMessage =
        "Message received! Check your inbox for a confirmation email.";
    } else if (!adminEmail.success && visitorEmail.success) {
      responseMessage =
        "Message received! Your confirmation email was sent, but we couldn't notify our team. Please reach out again if you don't hear back.";
    } else if (!visitorEmail.success && adminEmail.success) {
      responseMessage =
        "Message received! Our team has been notified, but we couldn't send you a confirmation email. We'll still get back to you soon.";
    } else {
      responseMessage =
        "Message saved, but we couldn't send emails right now. We've noted your message — please contact us directly if it's urgent.";
    }

    // ---------- 6. Respond to the client ----------
    // The message is saved even when SMTP delivery fails.
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
    console.error("❌ Contact form error:", err);
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