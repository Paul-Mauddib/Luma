import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales, type Locale } from "@/lib/i18n";
import { LangSwitch } from "@/components/LangSwitch";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = dictionaries[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-sand/90 backdrop-blur">
        <div className="wrap flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="font-display text-2xl font-bold tracking-tight">
            Luma<span className="text-terra">.</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
            <Link href={`/${locale}#how`} className="hover:text-ink">{d.nav.how}</Link>
            <Link href={`/${locale}#pathways`} className="hover:text-ink">{d.nav.pathways}</Link>
            <Link href={`/${locale}#pricing`} className="hover:text-ink">{d.nav.pricing}</Link>
            <Link href={`/${locale}#privacy`} className="hover:text-ink">{d.nav.privacy}</Link>
            <Link href={`/${locale}#faq`} className="hover:text-ink">{d.nav.faq}</Link>
          </nav>
          <div className="flex items-center gap-3">
            <LangSwitch locale={locale} />
            <Link href={`/${locale}/triage`} className="btn-primary hidden !px-4 !py-2 sm:inline-flex">
              {d.nav.cta}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-ink/10 bg-ink text-white/70">
        <div className="wrap py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">
                Luma<span className="text-terra">.</span>
              </p>
              <p className="mt-1 text-sm">hola@luma.legal</p>
            </div>
            <p className="max-w-2xl text-xs leading-relaxed">{d.footer.disclaimer}</p>
          </div>
          <p className="mt-8 text-xs">© {new Date().getFullYear()} Luma. {d.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
