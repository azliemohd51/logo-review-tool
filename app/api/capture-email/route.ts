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
    // Notify QIS Studio of new lead
    await resend.emails.send({
      from: "Logo Review <noreply@qisstudio.com>",
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
      from: "QIS Studio <noreply@qisstudio.com>",
      to: email,
      subject: "Your logo analysis is ready — QIS Studio",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0d0006;color:#fff;border-radius:12px;">
          <h2 style="color:#A3005C;margin:0 0 8px;">Your analysis is loading</h2>
          <p style="color:#ffffff80;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Hi there,<br/><br/>
            We're running your logo for <strong style="color:#fff;">${brandName}</strong> through our AI design critic right now. Head back to the tab — your full report will appear in seconds.
          </p>
          <p style="color:#ffffff40;font-size:12px;margin:0;">
            QIS Studio · AI Logo Review<br/>
            <a href="https://qisstudio.com" style="color:#A3005C;">qisstudio.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    // Don't block the user if email fails — just log it
    return NextResponse.json({ success: true });
  }
}
