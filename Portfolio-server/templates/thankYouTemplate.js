/**
 * Professional thank-you email sent to the visitor
 * Designed for high deliverability + clean reading experience
 */

function thankYouTemplate({ name, subject, message }) {
  const firstName = name.split(" ")[0]; // Use first name only — more personal

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Message received</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);overflow:hidden;">

          <!-- ──────────────── HEADER ──────────────── -->
          <tr>
            <td style="padding:32px 40px 20px;border-bottom:1px solid #ebebed;">
              <p style="margin:0;font-size:15px;font-weight:600;color:#111111;letter-spacing:-0.2px;">
                Usman Official
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#888888;">
                Full Stack Developer
              </p>
            </td>
          </tr>

          <!-- ──────────────── BODY ──────────────── -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#111111;">
                Hi ${firstName},
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#333333;">
                Thank you for reaching out through my portfolio. I've received your message and I'm reviewing it now. You can expect a personal reply from me within the next 24–48 hours.
              </p>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#333333;">
                For your records, here is a copy of the message you sent:
              </p>
            </td>
          </tr>

          <!-- ──────────────── MESSAGE QUOTE ──────────────── -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafafb;border-left:3px solid #d1d1d6;border-radius:6px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:13px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">
                      Your message
                    </p>
                    <p style="margin:0 0 6px;font-size:14px;color:#333333;">
                      <strong>Subject:</strong> ${subject}
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#555555;white-space:pre-line;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ──────────────── CLOSING ──────────────── -->
          <tr>
            <td style="padding:0 40px 12px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#333333;">
                If you'd like to add anything to your message, feel free to reply directly to this email — it comes straight to my inbox.
              </p>

              <p style="margin:0;font-size:15px;line-height:1.7;color:#333333;">
                Talk soon,
              </p>
            </td>
          </tr>

          <!-- ──────────────── SIGNATURE ──────────────── -->
          <tr>
            <td style="padding:12px 40px 32px;">
              <p style="margin:0;font-size:15px;font-weight:600;color:#111111;">
                Usman
              </p>
              <p style="margin:4px 0 0;font-size:14px;color:#666666;">
                Full Stack Developer
              </p>
              <p style="margin:16px 0 0;font-size:13px;color:#888888;line-height:1.6;">
                📧 <a href="mailto:${process.env.EMAIL_USER}" style="color:#666666;text-decoration:none;">${process.env.EMAIL_USER}</a>
              </p>
            </td>
          </tr>

          <!-- ──────────────── FOOTER ──────────────── -->
          <tr>
            <td style="padding:20px 40px;background:#fafafb;border-top:1px solid #ebebed;">
              <p style="margin:0;font-size:12px;color:#999999;line-height:1.6;text-align:center;">
                This is an automated confirmation of your message.<br>
                Please don't reply unless you have something to add — a real human reads every response.
              </p>
            </td>
          </tr>

        </table>

        <!-- Out-of-band note -->
        <p style="margin:20px 0 0;font-size:11px;color:#b0b0b5;text-align:center;max-width:600px;">
          Sent to ${firstName} — if this landed in your spam folder, marking it as "not spam" helps future messages reach you.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function thankYouText({ name, subject, message }) {
  const firstName = name.split(" ")[0];

  return `Hi ${firstName},

Thank you for reaching out through my portfolio. I've received your message and I'm reviewing it now. You can expect a personal reply from me within the next 24-48 hours.

For your records, here is a copy of the message you sent:

Subject: ${subject}

${message}

If you'd like to add anything to your message, feel free to reply directly to this email — it comes straight to my inbox.

Talk soon,
Usman
Full Stack Developer
${process.env.EMAIL_USER}

--
This is an automated confirmation of your message.
Sent to ${firstName} — if this landed in your spam folder, marking it as "not spam" helps future messages reach you.
`;
}

module.exports = { thankYouTemplate, thankYouText };