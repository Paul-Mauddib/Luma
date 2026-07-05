import { notFound } from "next/navigation";
import { dictionaries, isLocale, type Locale } from "@/lib/i18n";
import { TriageWizard } from "@/components/TriageWizard";

export default function TriagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = dictionaries[locale];

  return (
    <section className="py-14 sm:py-20">
      <div className="wrap max-w-3xl">
        <h1 className="font-display text-3xl font-bold sm:text-5xl">{d.triage.title}</h1>
        <p className="mt-4 text-ink-soft">{d.triage.sub}</p>
        <div className="mt-10">
          <TriageWizard locale={locale} d={d.triage} waitlist={d.waitlist} />
        </div>
        <p className="mt-10 text-xs leading-relaxed text-ink-mute">{d.triage.disclaimerShort}</p>
      </div>
    </section>
  );
}
