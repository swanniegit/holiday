import type { QuoteRequest, SendQuoteRequest } from "@/types/beachcomber";

const BASE_URL = "https://api.beachcomberonline.co.za";

function apiHeaders() {
  return {
    BeachcomberKey: process.env.BEACHCOMBER_API_KEY ?? "",
    "Content-Type": "application/json",
  };
}

export async function getRates() {
  const res = await fetch(`${BASE_URL}/getrates`, {
    headers: apiHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Beachcomber getrates failed: ${res.status}`);
  return res.json();
}

export async function getQuote(body: QuoteRequest) {
  const res = await fetch(`${BASE_URL}/getquote`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Beachcomber getquote failed: ${res.status}`);
  return res.json();
}

export async function sendQuote(body: SendQuoteRequest) {
  const res = await fetch(`${BASE_URL}/sendQuote`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Beachcomber sendQuote failed: ${res.status}`);
  return res.json();
}
