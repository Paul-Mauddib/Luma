import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, type Locale } from "@/lib/i18n";
import { Waitlist } from "@/components/Waitlist";

export default function Landing({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = dictionaries[locale];

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="wrap flex flex-col items-center py-20 text-center sm:py-24">
          <p className="chip gap-1.5 bg-terra-soft text-terra-dark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
            {d.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {d.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-mute">{d.hero.sub}</p>
          <div className="mt-9 flex flex-col items-center">
            <Link href={`/${locale}/triage`} className="btn-primary !px-8 !py-3.5">
              {d.hero.ctaPrimary}
            </Link>
            <p className="mt-3 text-xs text-ink-faint">{d.hero.ctaFine}</p>
          </div>

          <div className="mt-14 w-full max-w-xl rounded-2xl border border-ink/10 bg-white p-6 text-left">
            <p className="text-xs text-ink-faint">{d.hero.journey.label}</p>
            <div className="mt-3 flex items-end gap-1.5">
              <div className="flex-1">
                <div className="h-1.5 rounded-l-full bg-terra" />
                <p className="mt-2 text-[11px] font-semibold text-terra-dark">{d.hero.journey.stages[0]}</p>
              </div>
              <div className="flex-[1.2]">
                <div className="h-1.5 bg-terra-mid" />
                <p className="mt-2 text-[11px] text-ink-mute">{d.hero.journey.stages[1]}</p>
              </div>
              <div className="flex-1">
                <div className="h-1.5 rounded-r-full bg-terra-faint" />
                <p className="mt-2 text-[11px] text-ink-mute">{d.hero.journey.stages[2]}</p>
              </div>
            </div>
            <p className="mt-4 border-t border-ink/10 pt-3 text-xs text-ink-soft">
              {d.hero.journey.speedBefore}{" "}
              <span className="text-ink-faint line-through">{d.hero.journey.speedOld}</span>
              {" → "}
              <span className="font-semibold text-sea">{d.hero.journey.speedNew}</span>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 bg-white py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{d.how.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {d.how.steps.map((s) => (
              <div key={s.title} className="rounded-2xl border border-ink/10 bg-sand p-6">
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section id="pathways" className="scroll-mt-20 py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{d.pathways.title}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">{d.pathways.sub}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.pathways.items.map((p) => (
              <div key={p.name} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6">
                <span className="chip self-start bg-sea-soft text-sea">{p.tag}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 bg-white py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{d.pricing.title}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">{d.pricing.sub}</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {d.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-7 ${
                  tier.highlight
                    ? "border-terra bg-terra-soft/40 shadow-lg shadow-terra/10"
                    : "border-ink/10 bg-sand"
                }`}
              >
                <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                <p className="mt-1 text-sm text-ink-mute">{tier.desc}</p>
                <p className="mt-4 font-display text-4xl font-bold">{tier.price}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-ink-soft">
                      <span className="mt-0.5 text-sea">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" className={`mt-7 ${tier.highlight ? "btn-primary" : "btn-secondary"}`}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-terra/25 bg-terra-soft/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-terra-dark">
              {d.pricing.included.title}
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {d.pricing.included.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink-soft">
                  <span className="mt-0.5 text-terra">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs text-ink-mute">{d.pricing.note}</p>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="scroll-mt-20 bg-night py-24 text-white">
        <div className="wrap">
          <p className="chip bg-terra text-white">{d.privacy.kicker}</p>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
            {d.privacy.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{d.privacy.sub}</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {d.privacy.points.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-night-line bg-night-card p-7">
                <p className="font-display text-sm font-semibold text-terra-mid">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-20">
        <div className="wrap max-w-3xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{d.faq.title}</h2>
          <div className="mt-8 space-y-4">
            {d.faq.items.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-ink/10 bg-white p-6">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-terra transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-20 bg-white py-20">
        <div className="wrap max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{d.waitlist.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{d.waitlist.sub}</p>
          <Waitlist d={d.waitlist} />
        </div>
      </section>
    </>
  );
}
