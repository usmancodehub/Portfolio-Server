/**
 * Notification email sent to the portfolio owner (you)
 */
function adminNotifyTemplate({ name, email, subject, message, date }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#05030a;font-family:'Helvetica Neue',Arial,sans-serif;color:#f8f5ff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#05030a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:linear-gradient(145deg,#0f0a1a,#08050e);border:1px solid rgba(211,42,255,0.25);border-radius:16px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(110deg,#00d4ff,#7b2eff,#ff00a8);padding:28px 40px;">
              <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;">
                📬 New Contact Message
              </h1>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.85);letter-spacing:1px;">
                ${date}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:8px 0;font-size:12px;font-weight:700;color:#ff50c5;letter-spacing:1.5px;text-transform:uppercase;width:100px;">
                    From
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#f8f5ff;">
                    <strong>${name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:12px;font-weight:700;color:#ff50c5;letter-spacing:1.5px;text-transform:uppercase;">
                    Email
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#f8f5ff;">
                    <a href="mailto:${email}" style="color:#00d4ff;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:12px;font-weight:700;color:#ff50c5;letter-spacing:1.5px;text-transform:uppercase;">
                    Subject
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#f8f5ff;">
                    ${subject}
                  </td>
                </tr>
              </table>

              <div style="background:rgba(20,10,30,0.6);border:1px solid rgba(211,42,255,0.2);border-radius:12px;padding:20px;margin-top:24px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#ff50c5;letter-spacing:1.5px;text-transform:uppercase;">
                  Message
                </p>
                <p style="margin:0;font-size:14px;line-height:1.75;color:#e3dbe9;white-space:pre-line;">${message}</p>
              </div>

              <div style="text-align:center;margin-top:28px;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                   style="display:inline-block;padding:14px 32px;background:linear-gradient(110deg,#00d4ff,#7b2eff,#ff00a8);color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
                  Reply to ${name} →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(211,42,255,0.15);background:rgba(20,10,30,0.4);">
              <p style="margin:0;font-size:11px;color:rgba(180,169,197,0.55);text-align:center;letter-spacing:1px;">
                Sent from your MERN Portfolio contact form
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

module.exports = { adminNotifyTemplate };