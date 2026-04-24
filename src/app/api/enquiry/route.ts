import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
