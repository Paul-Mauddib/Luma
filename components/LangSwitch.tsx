"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const other: Locale = locale === "en" ? "es" : "en";
  const target = pathname.replace(`/${locale}`, `/${other}`) || `/${other}`;

  return (
    <Link
      href={target}
      className="rounded-full border border-ink/20 px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-ink/40"
      aria-label={other === "es" ? "Cambiar a español" : "Switch to English"}
    >
      {other.toUpperCase()}
    </Link>
  );
}
