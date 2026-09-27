const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html, text, replyTo }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
      text,
      reply_to: replyTo ? [replyTo] : undefined,
    });

    if (error) {
      console.error("❌ Resend error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("✅ Email sent:", data.id, "→", to);
    return { success: true, messageId: data.id };
  } catch (err) {
    console.error("❌ Email exception:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { sendEmail };