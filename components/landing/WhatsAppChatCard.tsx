"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "./content";

/** WhatsApp Web–style preview card (inspired by 21st chat-template / WhatsApp theme). */
export function WhatsAppChatCard() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-1 block overflow-hidden rounded-xl border border-white/10 bg-[#0b141a] text-left no-underline shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]"
    >
      <div className="flex items-center gap-2.5 bg-[#1f2c34] px-3 py-2.5">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-white"
          aria-hidden
        >
          <WhatsappLogo size={20} weight="fill" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-[#e9edef]">
            Easync Books
          </span>
          <span className="block text-[11px] text-[#8696a0]">
            {WHATSAPP_DISPLAY} · online
          </span>
        </span>
      </div>

      <div
        className="relative px-3 pb-3 pt-3"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(37,211,102,0.06) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(15,118,110,0.08) 0%, transparent 40%)",
        }}
      >
        <p
          className="relative m-0 max-w-[95%] rounded-lg rounded-tl-sm bg-[#202c33] px-2.5 py-2 text-xs leading-snug text-[#e9edef] shadow-sm"
        >
          Hi! Questions on GST, pricing, or Tally migration? Message us — we
          usually reply within a few hours.
        </p>
      </div>

      <div
        className="flex items-center justify-center gap-2 border-t border-white/5 bg-[#128C7E] px-3 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-[#075E54]"
      >
        <WhatsappLogo size={18} weight="fill" aria-hidden />
        Chat now
      </div>
    </a>
  );
}
