/**
 * Professional admin notification — clean, scannable layout
 */

function adminNotifyTemplate({ name, email, subject, message, date }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New contact message</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);overflow:hidden;">

          <!-- ──────────────── HEADER ──────────────── -->
          <tr>
            <td style="padding:28px 40px 20px;border-bottom:1px solid #ebebed;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#888888;letter-spacing:1.5px;text-transform:uppercase;">
                New Contact Message
              </p>
              <p style="margin:0;font-size:13px;color:#888888;">
                ${date}
              </p>
            </td>
          </tr>

          <!-- ──────────────── SENDER INFO ──────────────── -->
          <tr>
            <td style="padding:28px 40px 8px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#333333;">
                Someone reached out through your portfolio contact form.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:10px 0;font-size:13px;color:#888888;width:90px;vertical-align:top;">
                    From
                  </td>
                  <td style="padding:10px 0;font-size:15px;color:#111111;font-weight:600;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:13px;color:#888888;vertical-align:top;border-top:1px solid #f0f0f2;">
                    Email
                  </td>
                  <td style="padding:10px 0;font-size:15px;border-top:1px solid #f0f0f2;">
                    <a href="mailto:${email}" style="color:#0066cc;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:13px;color:#888888;vertical-align:top;border-top:1px solid #f0f0f2;">
                    Subject
                  </td>
                  <td style="padding:10px 0;font-size:15px;color:#111111;border-top:1px solid #f0f0f2;">
                    ${subject}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ──────────────── MESSAGE ──────────────── -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafafb;border:1px solid #ebebed;border-radius:8px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#888888;letter-spacing:1.5px;text-transform:uppercase;">
                      Message
                    </p>
                    <p style="margin:0;font-size:15px;line-height:1.75;color:#333333;white-space:pre-line;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ──────────────── REPLY CTA ──────────────── -->
          <tr>
            <td style="padding:0 40px 32px;" align="left">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:#111111;border-radius:6px;">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                       style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.3px;">
                      Reply to ${name.split(" ")[0]} →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-size:13px;color:#888888;line-height:1.6;">
                Or simply reply to this email — it goes directly to ${name.split(" ")[0]}.
              </p>
            </td>
          </tr>

          <!-- ──────────────── FOOTER ──────────────── -->
          <tr>
            <td style="padding:20px 40px;background:#fafafb;border-top:1px solid #ebebed;">
              <p style="margin:0;font-size:12px;color:#999999;text-align:center;">
                Sent automatically from your portfolio contact form
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

function adminNotifyText({ name, email, subject, message, date }) {
  return `New contact message from your portfolio.

From:     ${name}
Email:    ${email}
Subject:  ${subject}
Date:     ${date}

Message:
${message}

--
Reply directly to this email to reach ${name}.
`;
}

module.exports = { adminNotifyTemplate, adminNotifyText };