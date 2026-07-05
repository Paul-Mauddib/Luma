"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSupabase } from "@/lib/supabaseClient";
import { appStrings } from "@/lib/appStrings";
import type { Locale } from "@/lib/i18n";

export default function LoginPage() {
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale === "es" ? "es" : "en") as Locale;
  const s = appStrings[locale];
  const supabase = getSupabase();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !email.includes("@")) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/${locale}/app`,
      },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="wrap max-w-md">
        <h1 className="font-display text-3xl font-semibold tracking-tight">{s.loginTitle}</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-mute">{s.loginSub}</p>

        {!supabase ? (
          <p className="mt-8 rounded-2xl bg-terra-soft p-5 text-sm text-terra-dark">{s.setupNeeded}</p>
        ) : sent ? (
          <p className="mt-8 rounded-2xl bg-sea-soft p-5 text-sm font-medium text-sea">{s.linkSent}</p>
        ) : (
          <form onSubmit={sendLink} className="mt-8 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={s.emailPlaceholder}
              className="w-full rounded-full border border-ink/20 bg-white px-5 py-3 text-sm outline-none transition focus:border-terra"
            />
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-50">
              {s.sendLink}
            </button>
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
          </form>
        )}

        <p className="mt-10 text-xs text-ink-faint">
          <Link href={`/${locale}`} className="underline underline-offset-4">
            {s.backHome}
          </Link>
        </p>
      </div>
    </section>
  );
}
