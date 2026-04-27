import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/config/site";

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function validateEnquiry(body: Record<string, unknown>) {
  const name = typeof body.name === "string" && body.name.trim();
  const surname = typeof body.surname === "string" && body.surname.trim();
  if (!name || !surname) return { error: "Name and surname are required" };
  if (name.length > 100 || surname.length > 100) return { error: "Name too long" };
  const email = typeof body.email === "string" ? body.email : undefined;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Invalid email" };
  const additionalInfo = typeof body.additionalInfo === "string" ? body.additionalInfo : undefined;
  if (additionalInfo && additionalInfo.length > 2000) return { error: "Notes too long" };
  const adults = Number(body.adults);
  if (!Number.isInteger(adults) || adults < 1 || adults > 20) return { error: "Invalid adults count" };
  const children = Number(body.children);
  if (!Number.isInteger(children) || children < 0 || children > 10) return { error: "Invalid children count" };
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;

    const validationError = validateEnquiry(body);
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    if (supabase) {
      const { error } = await supabase.from("enquiries").insert({
        package_name: body.packageName ?? null,
        name: body.name,
        surname: body.surname,
        travel_dates: body.travelDates,
        adults: body.adults,
        children: body.children,
        departure_city: body.departureCity,
        budget: body.budget ?? null,
        star_grading: body.starGrading ?? null,
        special_occasion: body.specialOccasion ?? null,
        additional_info: body.additionalInfo ?? null,
      });

      if (error) throw new Error(error.message);
    }

    const name = esc(body.name as string);
    const surname = esc(body.surname as string);
    const email = esc(body.email as string);
    const phone = esc(body.phone as string);
    const packageName = esc(body.packageName as string);
    const travelDates = esc(body.travelDates as string);
    const departureCity = esc(body.departureCity as string);
    const budget = esc(body.budget as string);
    const starGrading = esc(body.starGrading as string);
    const specialOccasion = esc(body.specialOccasion as string);
    const additionalInfo = esc(body.additionalInfo as string);

    await sendMail({
      to: SITE.email,
      replyTo: email || undefined,
      subject: `New Enquiry — ${packageName || "General"} | ${name} ${surname}`,
      html: `
        <h2 style="color:#b8923a;font-family:Georgia,serif">New Travel Enquiry</h2>
        <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${name} ${surname}</td></tr>
          ${email ? `<tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>` : ""}
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ""}
          <tr><td><strong>Package</strong></td><td>${packageName || "—"}</td></tr>
          <tr><td><strong>Travel Dates</strong></td><td>${travelDates || "—"}</td></tr>
          <tr><td><strong>Adults</strong></td><td>${esc(String(body.adults)) || "—"}</td></tr>
          <tr><td><strong>Children</strong></td><td>${esc(String(body.children ?? 0))}</td></tr>
          <tr><td><strong>Departure City</strong></td><td>${departureCity || "—"}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${budget || "—"}</td></tr>
          <tr><td><strong>Star Grading</strong></td><td>${starGrading || "—"}</td></tr>
          <tr><td><strong>Special Occasion</strong></td><td>${specialOccasion || "—"}</td></tr>
          ${additionalInfo ? `<tr><td><strong>Notes</strong></td><td>${additionalInfo}</td></tr>` : ""}
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
