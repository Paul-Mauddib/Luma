"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import {
  evaluate,
  pick,
  RULES_VERSION,
  type Answers,
  type FamilyAnswer,
  type Fit,
  type LocationAnswer,
  type WorkAnswer,
} from "@/lib/triage";

type Step = 0 | 1 | 2 | 3 | 4; // 4 = results

const initial: Answers = {
  location: "abroad",
  yearsInSpain: null,
  priorPermit: false,
  family: "none",
  work: "none",
  monthlyIncome: 0,
  dependents: 0,
  ibero: false,
};

function OptionCard({
  selected,
  label,
  hint,
  onClick,
}: {
  selected: boolean;
  label: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-terra bg-terra-soft/50 ring-1 ring-terra"
          : "border-ink/15 bg-white hover:border-ink/35"
      }`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-ink-mute">{hint}</span> : null}
    </button>
  );
}

const fitStyles: Record<Fit, string> = {
  strong: "bg-sea-soft text-sea",
  possible: "bg-amber-100 text-amber-800",
  not_yet: "bg-ink/5 text-ink-mute",
};

export function TriageWizard({
  locale,
  d,
  waitlist,
}: {
  locale: Locale;
  d: Dict["triage"];
  waitlist: Dict["waitlist"];
}) {
  const [step, setStep] = useState<Step>(0);
  const [a, setA] = useState<Answers>(initial);

  const results = useMemo(() => (step === 4 ? evaluate(a) : []), [step, a]);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((p) => ({ ...p, [k]: v }));

  const fitLabel: Record<Fit, string> = {
    strong: d.strong,
    possible: d.possible,
    not_yet: d.not_yet,
  };

  const canNext =
    step === 0
      ? a.location !== "spain_irregular" || a.yearsInSpain !== null
      : true;

  // Progress bar -------------------------------------------------------------
  const progress = step === 4 ? 100 : (step / 4) * 100;

  if (step === 4) {
    return (
      <div>
        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-terra transition-all" style={{ width: "100%" }} />
        </div>
        <h2 className="font-display text-2xl font-bold">{d.results_title}</h2>
        <p className="mt-2 text-sm text-ink-soft">{d.results_sub}</p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-terra-soft px-3.5 py-1.5 text-xs font-medium text-terra-dark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
          {d.supervisedNote}
        </p>

        {a.ibero && results.length > 0 && (
          <p className="mt-6 rounded-2xl bg-sea-soft p-5 text-sm font-medium leading-relaxed text-sea">
            {d.citizenship_note}
          </p>
        )}

        <div className="mt-6 space-y-5">
          {results.length === 0 && (
            <p className="rounded-2xl border border-ink/10 bg-white p-6 text-sm leading-relaxed text-ink-soft">
              {d.no_results}
            </p>
          )}
          {results.map((r) => (
            <div key={r.id} className="rounded-2xl border border-ink/10 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold">{pick(r.name, locale)}</h3>
                <span className={`chip ${fitStyles[r.fit]}`}>{fitLabel[r.fit]}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pick(r.summary, locale)}</p>
              <ul className="mt-4 space-y-1.5">
                {r.reasons.map((reason, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink">
                    <span className="mt-0.5 text-terra">→</span>
                    {pick(reason, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                    {d.requirements}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {r.requirements.map((req, i) => (
                      <li key={i} className="flex gap-2 text-xs leading-relaxed text-ink-soft">
                        <span className="text-sea">•</span>
                        {pick(req, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                    {d.timeline}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{pick(r.timeline, locale)}</p>
                  <p className="mt-3 text-[10px] text-ink-mute">
                    {r.cite} · rules v{RULES_VERSION}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-ink p-8 text-center text-white">
          <h3 className="font-display text-xl font-bold">{d.cta_title}</h3>
          <p className="mt-2 text-sm text-white/70">{d.cta_sub}</p>
          <Link href={`/${locale}#waitlist`} className="btn-primary mt-5">
            {waitlist.button}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            setA(initial);
            setStep(0);
          }}
          className="mt-6 text-sm font-semibold text-ink-mute underline-offset-4 hover:underline"
        >
          {d.restart}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-semibold text-ink-mute">
        <span>
          {d.stepLabels[step]} · {step + 1}/4
          {d.stepEncourage[step] ? (
            <span className="ml-2 font-normal text-sea">{d.stepEncourage[step]}</span>
          ) : null}
        </span>
        <span className="font-normal text-ink-faint">{d.timeLeft[step]}</span>
      </div>
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-terra transition-all" style={{ width: `${progress}%` }} />
      </div>

      {step === 0 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 font-semibold">{d.q_location}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(d.location_opts) as LocationAnswer[]).map((k) => (
                <OptionCard
                  key={k}
                  selected={a.location === k}
                  label={d.location_opts[k].label}
                  hint={d.location_opts[k].hint}
                  onClick={() => {
                    set("location", k);
                    if (k !== "spain_irregular") set("yearsInSpain", null);
                  }}
                />
              ))}
            </div>
          </div>
          {a.location === "spain_irregular" && (
            <>
              <div>
                <p className="mb-3 font-semibold">{d.q_years}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["lt2", "gte2"] as const).map((k) => (
                    <OptionCard
                      key={k}
                      selected={a.yearsInSpain === k}
                      label={d.years_opts[k].label}
                      hint={d.years_opts[k].hint}
                      onClick={() => set("yearsInSpain", k)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-semibold">{d.q_prior}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <OptionCard
                    selected={a.priorPermit}
                    label={d.prior_opts.yes}
                    onClick={() => set("priorPermit", true)}
                  />
                  <OptionCard
                    selected={!a.priorPermit}
                    label={d.prior_opts.no}
                    onClick={() => set("priorPermit", false)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="mb-3 font-semibold">{d.q_family}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(d.family_opts) as FamilyAnswer[]).map((k) => (
              <OptionCard
                key={k}
                selected={a.family === k}
                label={d.family_opts[k].label}
                hint={d.family_opts[k].hint}
                onClick={() => set("family", k)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 font-semibold">{d.q_work}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(d.work_opts) as WorkAnswer[]).map((k) => (
                <OptionCard
                  key={k}
                  selected={a.work === k}
                  label={d.work_opts[k].label}
                  hint={d.work_opts[k].hint}
                  onClick={() => set("work", k)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block font-semibold" htmlFor="income">
              {d.q_income}
            </label>
            <input
              id="income"
              type="number"
              min={0}
              step={100}
              value={a.monthlyIncome || ""}
              onChange={(e) => set("monthlyIncome", Number(e.target.value) || 0)}
              className="w-full max-w-xs rounded-full border border-ink/20 bg-white px-5 py-3 text-sm outline-none transition focus:border-terra"
              placeholder="3000"
            />
            <p className="mt-2 text-xs text-ink-mute">{d.income_hint}</p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold" htmlFor="deps">
              {d.q_dependents}
            </label>
            <input
              id="deps"
              type="number"
              min={0}
              max={8}
              value={a.dependents}
              onChange={(e) => set("dependents", Math.max(0, Number(e.target.value) || 0))}
              className="w-full max-w-[8rem] rounded-full border border-ink/20 bg-white px-5 py-3 text-sm outline-none transition focus:border-terra"
            />
            <p className="mt-2 text-xs text-ink-mute">{d.dependents_hint}</p>
          </div>
          <div>
            <p className="mb-1 font-semibold">{d.q_ibero}</p>
            <p className="mb-3 text-xs text-ink-mute">{d.ibero_hint}</p>
            <div className="grid max-w-md gap-3 sm:grid-cols-2">
              <OptionCard selected={a.ibero} label={d.ibero_opts.yes} onClick={() => set("ibero", true)} />
              <OptionCard selected={!a.ibero} label={d.ibero_opts.no} onClick={() => set("ibero", false)} />
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
          disabled={step === 0}
          className="text-sm font-semibold text-ink-mute underline-offset-4 hover:underline disabled:invisible"
        >
          ← {d.back}
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === 3 ? d.seeResults : d.next}
        </button>
      </div>

      <p className="mt-8 flex items-center gap-2 text-xs text-ink-faint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        {d.privacyLine}
      </p>
    </div>
  );
}
