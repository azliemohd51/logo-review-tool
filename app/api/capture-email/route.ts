import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, brandName, industry } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    // Add contact to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId,
      });
    }

    // Notify QIS Studio of new lead
    await resend.emails.send({
      from: "Logo Review <noreply@mail.qisstudio.com>",
      to: "azlie.mohd51@gmail.com",
      subject: `New Logo Review Lead — ${brandName}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0d0006;color:#fff;border-radius:12px;">
          <h2 style="color:#A3005C;margin:0 0 16px;">New Logo Review Lead</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#fff6;font-size:13px;">Email</td><td style="padding:8px 0;font-size:13px;font-weight:600;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#fff6;font-size:13px;">Brand</td><td style="padding:8px 0;font-size:13px;font-weight:600;">${brandName}</td></tr>
            <tr><td style="padding:8px 0;color:#fff6;font-size:13px;">Industry</td><td style="padding:8px 0;font-size:13px;font-weight:600;">${industry}</td></tr>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#ffffff40;">Sent from QIS Studio Logo Review Tool</p>
        </div>
      `,
    });

    // Send confirmation to the user
    await resend.emails.send({
      from: "QIS Studio <noreply@mail.qisstudio.com>",
      to: email,
      subject: `Your logo report for ${brandName} is ready — QIS Studio`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:48px 24px;">
    <tr>
      <td align="left" style="max-width:520px;margin:0 auto;display:block;">
        <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

          <tr>
            <td style="padding-bottom:32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111111;line-height:1.3;">
                Your logo report for ${brandName} is ready
              </h1>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#555555;">
                We've scored your logo across 6 design dimensions — simplicity, colour, typography, scalability, versatility, and industry fit. Head back to the tab to see your full results.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:36px;">
              <a href="https://logo-review-tool.vercel.app" style="display:inline-block;padding:13px 24px;background:#A3005C;border-radius:8px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                View My Report →
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:32px;border-top:1px solid #eeeeee;padding-top:28px;">
              <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#111111;">Need a logo redesign?</p>
              <p style="margin:0 0 12px;font-size:14px;line-height:1.65;color:#555555;">
                If your score isn't where you want it, we can help. QIS Studio designs brand identities built to scale.
              </p>
              <a href="https://qisstudio.com" style="font-size:14px;color:#A3005C;text-decoration:none;font-weight:500;">qisstudio.com</a>
            </td>
          </tr>

          <tr>
            <td>
              <p style="margin:0;font-size:12px;color:#aaaaaa;">
                QIS Studio · You're receiving this because you submitted your logo at logo-review-tool.vercel.app
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    // Don't block the user if email fails — just log it
    return NextResponse.json({ success: true });
  }
}
