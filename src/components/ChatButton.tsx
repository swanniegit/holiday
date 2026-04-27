"use client";

import { useState } from "react";
import ChatModal from "@/components/ChatModal";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gold text-white px-5 py-3 rounded-full shadow-lg hover:bg-gold-dark transition-colors text-sm font-medium"
        aria-label="Let's Chat"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Let&apos;s Chat
      </button>
      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  );
}
