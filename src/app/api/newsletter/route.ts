import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/config/site";

/*
  Run once in Supabase SQL editor:

  create table newsletter_subscribers (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    subscribed_at timestamptz default now()
  );
*/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ error: "Email too long" }, { status: 400 });
    }

    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
      if (error) {
        if (error.code === "23505") {
          // Already subscribed — treat as success silently
          return NextResponse.json({ success: true });
        }
        throw new Error(error.message);
      }
    }

    await sendMail({
      to: SITE.email,
      subject: `New newsletter subscriber — ${email}`,
      html: `
        <h2 style="color:#b8923a;font-family:Georgia,serif">New Newsletter Subscriber</h2>
        <p style="font-family:Arial,sans-serif;font-size:14px">
          <strong>${email}</strong> subscribed for the 7% Beachcomber discount.
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
