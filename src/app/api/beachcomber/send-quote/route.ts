import { NextRequest, NextResponse } from "next/server";
import { sendQuote } from "@/lib/beachcomber";
import type { SendQuoteRequest } from "@/types/beachcomber";

export async function POST(req: NextRequest) {
  try {
    const body: SendQuoteRequest = await req.json();
    const data = await sendQuote(body);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
