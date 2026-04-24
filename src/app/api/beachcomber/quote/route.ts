import { NextRequest, NextResponse } from "next/server";
import { getQuote } from "@/lib/beachcomber";
import type { QuoteRequest } from "@/types/beachcomber";

export async function POST(req: NextRequest) {
  try {
    const body: QuoteRequest = await req.json();
    const data = await getQuote(body);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
