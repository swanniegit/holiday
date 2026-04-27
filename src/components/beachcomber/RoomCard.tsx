"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import type { RoomOption } from "@/types/beachcomber";
import { formatZAR } from "@/lib/format";
import { getCheapestPackage } from "@/lib/beachcomber-utils";

interface RoomCardProps {
  room: RoomOption;
  quoteRef: string;
  transferRef: string;
  gdsRef: string;
  onQuoteSent: () => void;
}

export default function RoomCard({ room, quoteRef, transferRef, gdsRef, onQuoteSent }: RoomCardProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState({ firstname: "", surname: "", emailAddress: "", mobilePhone: "" });
  const [sendStatus, setSendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const lowestPkg = getCheapestPackage(room.packages);

  async function handleSendQuote(e: FormEvent) {
    e.preventDefault();
    setSendStatus("loading");
    try {
      const res = await fetch("/api/beachcomber/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteRequestObjRef: quoteRef,
          quoteRefList: room.sendQuoteReferences,
          gdsRequestReference: gdsRef,
          transferProductRef: transferRef,
          ...emailData,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSendStatus("success");
      onQuoteSent();
    } catch {
      setSendStatus("error");
    }
  }

  return (
    <div className="border border-cream-dark p-5 rounded-sm">
      <div className="flex items-start gap-4">
        {room.productImages?.[0] && (
          <div className="relative w-24 h-20 shrink-0">
            <Image
              src={room.productImages[0].imageURL}
              alt={room.accomProductName}
              fill
              className="object-cover rounded-sm"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-charcoal">{room.accomProductName}</h4>
          <p className="text-xs text-charcoal/50 mt-0.5">{room.roomAllocation} · {room.numberOfNights} nights</p>
          {room.accSpecial1 && (
            <span className="inline-block mt-1 text-xs bg-gold/10 text-gold px-2 py-0.5">{room.accSpecial1}</span>
          )}
          {lowestPkg && (
            <p className="mt-2 font-semibold text-charcoal">
              {formatZAR(lowestPkg.pricePerPersonZARFrom)}{" "}
              <span className="text-xs font-normal text-charcoal/50">pp · {lowestPkg.packageDesc}</span>
            </p>
          )}
        </div>
      </div>

      {!showEmailForm ? (
        <button
          onClick={() => setShowEmailForm(true)}
          className="mt-4 w-full py-2 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
        >
          Email This Quote
        </button>
      ) : sendStatus === "success" ? (
        <p className="mt-4 text-green-600 text-sm font-medium text-center">Quote sent successfully!</p>
      ) : (
        <form onSubmit={handleSendQuote} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input required type="text" placeholder="First name" value={emailData.firstname}
              onChange={(e) => setEmailData((d) => ({ ...d, firstname: e.target.value }))}
              className="border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
            <input required type="text" placeholder="Surname" value={emailData.surname}
              onChange={(e) => setEmailData((d) => ({ ...d, surname: e.target.value }))}
              className="border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
          </div>
          <input required type="email" placeholder="Email address" value={emailData.emailAddress}
            onChange={(e) => setEmailData((d) => ({ ...d, emailAddress: e.target.value }))}
            className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
          <input required type="tel" placeholder="Mobile number" value={emailData.mobilePhone}
            onChange={(e) => setEmailData((d) => ({ ...d, mobilePhone: e.target.value }))}
            className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
          {sendStatus === "error" && <p className="text-red-500 text-xs">Failed to send. Please try again.</p>}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setShowEmailForm(false)}
              className="py-2 border border-cream-dark text-charcoal text-sm hover:border-charcoal transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={sendStatus === "loading"}
              className="py-2 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-60">
              {sendStatus === "loading" ? "Sending…" : "Send Quote"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
