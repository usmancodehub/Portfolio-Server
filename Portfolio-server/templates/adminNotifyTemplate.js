/**
 * Admin notification email — anti-spam optimized
 */
function adminNotifyTemplate({ name, email, subject, message, date }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>New contact message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">

          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#333333;">
                You have a new message from your portfolio contact form.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 32px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#777777;width:80px;">From</td>
                  <td style="padding:6px 0;font-size:14px;color:#333333;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#777777;">Email</td>
                  <td style="padding:6px 0;font-size:14px;color:#333333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#777777;">Subject</td>
                  <td style="padding:6px 0;font-size:14px;color:#333333;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#777777;">Date</td>
                  <td style="padding:6px 0;font-size:14px;color:#333333;">${date}</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9f9fb;border-left:3px solid #d1d1d6;border-radius:4px;">
                <tr>
                  <td style="padding:16px 20px;font-size:14px;line-height:1.7;color:#555555;white-space:pre-line;">${message}</td>
                </tr>
              </table>

              <p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:#333333;">
                Reply directly to this email to respond to ${name}.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #ebebed;">
              <p style="margin:0;font-size:12px;color:#999999;">
                Sent from your portfolio contact form
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
  return `New message from your portfolio contact form.

From: ${name}
Email: ${email}
Subject: ${subject}
Date: ${date}

Message:
${message}

Reply directly to this email to respond to ${name}.
`;
}

module.exports = { adminNotifyTemplate, adminNotifyText };