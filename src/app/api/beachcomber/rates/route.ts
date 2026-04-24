import { NextResponse } from "next/server";
import { getRates } from "@/lib/beachcomber";

export async function GET() {
  try {
    const data = await getRates();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
