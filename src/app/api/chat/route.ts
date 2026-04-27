import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/config/site";

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;

    const name = typeof body.name === "string" && body.name.trim();
    const message = typeof body.message === "string" && body.message.trim();
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }
    if (name.length > 100) return NextResponse.json({ error: "Name too long" }, { status: 400 });
    if (message.length > 2000) return NextResponse.json({ error: "Message too long" }, { status: 400 });

    const email = typeof body.email === "string" ? body.email : undefined;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await sendMail({
      to: SITE.email,
      replyTo: email || undefined,
      subject: `Let's Chat — ${esc(name)}`,
      html: `
        <h2 style="color:#b8923a;font-family:Georgia,serif">New Chat Message</h2>
        <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
          ${email ? `<tr><td><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>` : ""}
          ${body.phone ? `<tr><td><strong>Phone</strong></td><td>${esc(body.phone as string)}</td></tr>` : ""}
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${esc(message)}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
