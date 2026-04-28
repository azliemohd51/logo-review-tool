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
<body style="margin:0;padding:0;background:#0a0004;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0004;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <img src="https://logo-review-tool.vercel.app/qis-logo.png" alt="QIS Studio" height="24" style="display:block;" />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#140008;border:1px solid rgba(163,0,92,0.25);border-radius:16px;padding:40px 36px;">

              <!-- Badge -->
              <div style="display:inline-block;background:rgba(163,0,92,0.15);border:1px solid rgba(163,0,92,0.35);border-radius:100px;padding:5px 14px;margin-bottom:24px;">
                <span style="font-size:11px;font-weight:600;color:#ff1f7e;letter-spacing:0.05em;">AI LOGO REPORT</span>
              </div>

              <!-- Headline -->
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.25;">
                Your report for <span style="color:#c4006f;">${brandName}</span> is in.
              </h1>

              <!-- Body -->
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.6);">
                We've run your logo through our AI design critic and scored it across 6 key dimensions — simplicity, colour, typography, scalability, versatility, and industry fit.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:rgba(163,0,92,0.2);margin-bottom:28px;"></div>

              <!-- What's inside -->
              <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.4);letter-spacing:0.08em;text-transform:uppercase;">What's in your report</p>

              <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:32px;">
                <tr>
                  <td style="padding:7px 0;font-size:14px;color:rgba(255,255,255,0.7);">
                    <span style="color:#A3005C;margin-right:10px;">✦</span> Overall logo score out of 10
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:14px;color:rgba(255,255,255,0.7);">
                    <span style="color:#A3005C;margin-right:10px;">✦</span> Logo type classification &amp; reasoning
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:14px;color:rgba(255,255,255,0.7);">
                    <span style="color:#A3005C;margin-right:10px;">✦</span> Colour psychology breakdown
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:14px;color:rgba(255,255,255,0.7);">
                    <span style="color:#A3005C;margin-right:10px;">✦</span> 6 scored design dimensions
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:14px;color:rgba(255,255,255,0.7);">
                    <span style="color:#A3005C;margin-right:10px;">✦</span> Downloadable PDF report
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#7a0044,#A3005C,#c4006f);border-radius:10px;">
                    <a href="https://logo-review-tool.vercel.app" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.02em;">
                      View Your Full Report →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:rgba(163,0,92,0.2);margin-bottom:28px;"></div>

              <!-- Upsell -->
              <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.85);">Need a logo redesign?</p>
              <p style="margin:0 0 20px;font-size:14px;line-height:1.65;color:rgba(255,255,255,0.5);">
                If your score isn't where you want it, our team at QIS Studio can help. We design brand identities that are built to scale — from logo systems to full visual identity.
              </p>
              <a href="https://qisstudio.com" style="font-size:13px;font-weight:600;color:#A3005C;text-decoration:none;">
                Explore QIS Studio →
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 4px 0;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.2);">
                QIS Studio · AI Logo Review
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">
                You're receiving this because you submitted your logo at <a href="https://logo-review-tool.vercel.app" style="color:rgba(163,0,92,0.6);text-decoration:none;">logo-review-tool.vercel.app</a>
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
