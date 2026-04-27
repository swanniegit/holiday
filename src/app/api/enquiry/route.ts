import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";
import type { EnquiryPayload } from "@/types/beachcomber";

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryPayload = await req.json();

    if (!body.name || !body.surname) {
      return NextResponse.json({ error: "Name and surname are required" }, { status: 400 });
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

    await sendMail({
      to: "travel@pjfmarkgraaff.co.za",
      replyTo: body.email ?? undefined,
      subject: `New Enquiry — ${body.packageName ?? "General"} | ${body.name} ${body.surname}`,
      html: `
        <h2 style="color:#b8923a;font-family:Georgia,serif">New Travel Enquiry</h2>
        <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${body.name} ${body.surname}</td></tr>
          ${body.email ? `<tr><td><strong>Email</strong></td><td><a href="mailto:${body.email}">${body.email}</a></td></tr>` : ""}
          ${body.phone ? `<tr><td><strong>Phone</strong></td><td>${body.phone}</td></tr>` : ""}
          <tr><td><strong>Package</strong></td><td>${body.packageName ?? "—"}</td></tr>
          <tr><td><strong>Travel Dates</strong></td><td>${body.travelDates ?? "—"}</td></tr>
          <tr><td><strong>Adults</strong></td><td>${body.adults ?? "—"}</td></tr>
          <tr><td><strong>Children</strong></td><td>${body.children ?? 0}</td></tr>
          <tr><td><strong>Departure City</strong></td><td>${body.departureCity ?? "—"}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${body.budget ?? "—"}</td></tr>
          <tr><td><strong>Star Grading</strong></td><td>${body.starGrading ?? "—"}</td></tr>
          <tr><td><strong>Special Occasion</strong></td><td>${body.specialOccasion ?? "—"}</td></tr>
          ${body.additionalInfo ? `<tr><td><strong>Notes</strong></td><td>${body.additionalInfo}</td></tr>` : ""}
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
