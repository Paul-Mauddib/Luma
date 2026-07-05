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
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60rem 30rem at 80% -10%, #fbe9e1 0%, transparent 60%), radial-gradient(50rem 25rem at 0% 110%, #e2f2ef 0%, transparent 55%)",
          }}
        />
        <div className="wrap relative py-20 sm:py-28">
          <p className="chip bg-terra-soft text-terra-dark">{d.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {d.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{d.hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={`/${locale}/triage`} className="btn-primary">
              {d.hero.ctaPrimary}
            </Link>
            <a href="#how" className="btn-secondary">
              {d.hero.ctaSecondary}
            </a>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {d.hero.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
                <dt className="font-display text-3xl font-bold text-terra">{s.value}</dt>
                <dd className="mt-1 text-sm text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
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
          <p className="mt-6 text-xs text-ink-mute">{d.pricing.note}</p>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="scroll-mt-20 bg-ink py-20 text-white">
        <div className="wrap">
          <h2 className="max-w-3xl font-display text-3xl font-bold sm:text-4xl">{d.privacy.title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{d.privacy.sub}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {d.privacy.points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.body}</p>
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
