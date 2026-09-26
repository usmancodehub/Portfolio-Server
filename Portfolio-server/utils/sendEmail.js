const nodemailer = require("nodemailer");

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,                 // TLS via STARTTLS on port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a single email
 * @param {object} opts
 * @param {string} opts.to        - recipient email
 * @param {string} opts.subject   - email subject
 * @param {string} opts.html      - HTML body
 * @param {string} [opts.replyTo] - optional reply-to address
 */
async function sendEmail({ to, subject, html, replyTo }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
    replyTo,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId, "→", to);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { sendEmail };