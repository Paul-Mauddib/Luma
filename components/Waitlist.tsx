"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

export function Waitlist({ d }: { d: Dict["waitlist"] }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: wire to your email provider (Resend, Loops, Mailerlite…) or a
    // Vercel serverless function. Deliberately no third-party script here.
    setDone(true);
  }

  if (done) {
    return (
      <p className="mt-8 rounded-2xl bg-sea-soft px-6 py-5 font-semibold text-sea">{d.success}</p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={d.placeholder}
          className="w-full flex-1 rounded-full border border-ink/20 bg-sand px-5 py-3 text-sm outline-none transition focus:border-terra"
        />
        <button type="submit" className="btn-primary">
          {d.button}
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-mute">{d.privacyNote}</p>
    </form>
  );
}
