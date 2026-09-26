/**
 * Thank-you email sent to the visitor — anti-spam optimized
 */
function thankYouTemplate({ name, subject, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Re: your message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">
          
          <!-- Simple text header (no big gradient = less spammy) -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">
                Hi ${name},
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:12px 32px 24px;">
              <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#333333;">
                Thanks for getting in touch through my portfolio. I received your message and will reply as soon as I can — usually within a day or two.
              </p>

              <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#333333;">
                Here's a copy of what you sent me:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9f9fb;border-left:3px solid #d1d1d6;border-radius:4px;margin:16px 0;">
                <tr>
                  <td style="padding:16px 20px;font-size:14px;line-height:1.7;color:#555555;">
                    <strong style="color:#333333;">Subject:</strong> ${subject}
                    <br><br>
                    <span style="white-space:pre-line;">${message}</span>
                  </td>
                </tr>
              </table>

              <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#333333;">
                Talk soon,
              </p>
            </td>
          </tr>

          <!-- Simple footer -->
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #ebebed;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;">
                Usman Official<br>
                <span style="color:#777777;">Full Stack Developer</span>
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

/**
 * Plain-text version — crucial for spam avoidance
 * Multi-part emails (HTML + text) are far less likely to be flagged
 */
function thankYouText({ name, subject, message }) {
  return `Hi ${name},

Thanks for getting in touch through my portfolio. I received your message and will reply as soon as I can — usually within a day or two.

Here is a copy of what you sent:

Subject: ${subject}

${message}

Talk soon,
Usman Official
Full Stack Developer
`;
}

module.exports = { thankYouTemplate, thankYouText };