/**
 * Beautiful thank-you email sent to the visitor
 */
function thankYouTemplate({ name, subject, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank you for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#05030a;font-family:'Helvetica Neue',Arial,sans-serif;color:#f8f5ff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#05030a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:linear-gradient(145deg,#0f0a1a,#08050e);border:1px solid rgba(211,42,255,0.25);border-radius:16px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(110deg,#ff009d,#b500ff,#ff1648);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Thank You, ${name}!
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.85);letter-spacing:1px;">
                MESSAGE RECEIVED
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#e3dbe9;">
                Hi <strong style="color:#ffffff;">${name}</strong>,
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#b4a9c5;">
                Thanks for reaching out through my portfolio! I've received your message and will get back to you as soon as possible — usually within 24-48 hours.
              </p>

              <div style="background:rgba(255,0,168,0.06);border-left:3px solid #ff00a8;border-radius:8px;padding:20px;margin:24px 0;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#ff50c5;letter-spacing:1.5px;text-transform:uppercase;">
                  Your Message
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#d4ccdf;">
                  <strong>Subject:</strong> ${subject}
                </p>
                <p style="margin:0;font-size:13px;line-height:1.7;color:#b4a9c5;white-space:pre-line;">${message}</p>
              </div>

              <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#b4a9c5;">
                In the meantime, feel free to connect with me on social media or check out my latest projects.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(211,42,255,0.15);background:rgba(20,10,30,0.4);">
              <p style="margin:0;font-size:12px;color:#b4a9c5;text-align:center;">
                Warm regards,<br>
                <strong style="color:#f8f5ff;">Usman Official</strong><br>
                <span style="color:#ff50c5;">Full Stack Developer</span>
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:rgba(180,169,197,0.5);text-align:center;">
                This is an automated confirmation. Please don't reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

module.exports = { thankYouTemplate };