"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, DOCUMENTS_BUCKET } from "@/lib/supabaseClient";
import { appStrings, type AppStrings } from "@/lib/appStrings";
import { checklists, getChecklist, CHECKLIST_VERSION, type Requirement } from "@/lib/checklists";
import type { Locale } from "@/lib/i18n";

interface CaseRow {
  id: string;
  pathway: string;
}

interface DocRow {
  id: string;
  requirement_id: string;
  status: string;
  storage_path: string | null;
  note: string | null;
}

interface HelpRow {
  requirement_id: string;
}

const statusStyles: Record<string, string> = {
  missing: "bg-ink/5 text-ink-mute",
  uploaded: "bg-terra-soft text-terra-dark",
  in_review: "bg-terra-soft text-terra-dark",
  needs_fix: "bg-red-50 text-red-700",
  accepted: "bg-sea-soft text-sea",
};

const isLegalise = (r: Requirement) => Boolean(r.apostille || r.swornTranslation);

export default function DossierPage() {
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale === "es" ? "es" : "en") as Locale;
  const s = appStrings[locale];
  const supabase = getSupabase();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [caseRow, setCaseRow] = useState<CaseRow | null>(null);
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [helps, setHelps] = useState<HelpRow[]>([]);
  const [busyReq, setBusyReq] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
      if (!data.session) router.replace(`/${locale}/app/login`);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
      if (!sess) router.replace(`/${locale}/app/login`);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, locale, router]);

  const loadCase = useCallback(async () => {
    if (!supabase || !session) return;
    const { data: cases } = await supabase
      .from("cases")
      .select("id, pathway")
      .order("created_at", { ascending: false })
      .limit(1);
    const c = cases?.[0] ?? null;
    setCaseRow(c);
    if (c) {
      const [{ data: d }, { data: h }] = await Promise.all([
        supabase.from("documents").select("id, requirement_id, status, storage_path, note").eq("case_id", c.id),
        supabase.from("help_requests").select("requirement_id").eq("case_id", c.id),
      ]);
      setDocs(d ?? []);
      setHelps(h ?? []);
    }
  }, [supabase, session]);

  useEffect(() => {
    loadCase();
  }, [loadCase]);

  async function startCase(pathway: string) {
    if (!supabase || !session) return;
    const { data, error } = await supabase
      .from("cases")
      .insert({ user_id: session.user.id, pathway, checklist_version: CHECKLIST_VERSION })
      .select("id, pathway")
      .single();
    if (!error && data) {
      setCaseRow(data);
      setDocs([]);
      setHelps([]);
    }
  }

  async function uploadFor(req: Requirement, file: File) {
    if (!supabase || !session || !caseRow) return;
    setBusyReq(req.id);
    const path = `${session.user.id}/${caseRow.id}/${req.id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from(DOCUMENTS_BUCKET).upload(path, file);
    if (!upErr) {
      await supabase.from("documents").upsert(
        {
          case_id: caseRow.id,
          user_id: session.user.id,
          requirement_id: req.id,
          storage_path: path,
          status: "in_review",
          uploaded_at: new Date().toISOString(),
        },
        { onConflict: "case_id,requirement_id" }
      );
      await loadCase();
    }
    setBusyReq(null);
  }

  async function removeDoc(req: Requirement) {
    if (!supabase || !caseRow) return;
    const row = docs.find((d) => d.requirement_id === req.id);
    if (!row) return;
    setBusyReq(req.id);
    if (row.storage_path) await supabase.storage.from(DOCUMENTS_BUCKET).remove([row.storage_path]);
    await supabase.from("documents").update({ status: "missing", storage_path: null }).eq("id", row.id);
    await loadCase();
    setBusyReq(null);
  }

  async function requestHelp(req: Requirement) {
    if (!supabase || !session || !caseRow) return;
    const kind = req.apostille && req.swornTranslation ? "both" : req.apostille ? "apostille" : "translation";
    await supabase.from("help_requests").upsert(
      { user_id: session.user.id, case_id: caseRow.id, requirement_id: req.id, kind },
      { onConflict: "case_id,requirement_id" }
    );
    await loadCase();
  }

  const checklist = caseRow ? getChecklist(caseRow.pathway) : null;

  const statusOf = useCallback(
    (r: Requirement) => docs.find((d) => d.requirement_id === r.id)?.status ?? "missing",
    [docs]
  );

  const progress = useMemo(() => {
    if (!checklist) return { done: 0, total: 0 };
    const done = checklist.requirements.filter((r) => {
      const st = statusOf(r);
      return st !== "missing" && st !== "needs_fix";
    }).length;
    return { done, total: checklist.requirements.length };
  }, [checklist, statusOf]);

  const nextAction = useMemo(() => {
    if (!checklist) return null;
    const open = checklist.requirements.filter((r) => statusOf(r) === "missing" || statusOf(r) === "needs_fix");
    if (open.length === 0) return null;
    const slow = open.filter(isLegalise);
    const plain = open.filter((r) => !isLegalise(r) && !r.validityDays);
    const late = open.filter((r) => !isLegalise(r) && r.validityDays);
    return slow[0] ?? plain[0] ?? late[0] ?? null;
  }, [checklist, statusOf]);

  if (!supabase) {
    return (
      <section className="py-20">
        <div className="wrap max-w-xl">
          <p className="rounded-2xl bg-terra-soft p-5 text-sm text-terra-dark">{s.setupNeeded}</p>
        </div>
      </section>
    );
  }

  if (!ready || !session) return <section className="py-24" />;

  function RequirementCard({ req }: { req: Requirement }) {
    const row = docs.find((d) => d.requirement_id === req.id);
    const status = row?.status ?? "missing";
    const has = status !== "missing";
    const helpRequested = helps.some((h) => h.requirement_id === req.id);
    const legal = isLegalise(req);
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{req.name[locale]}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-mute">{req.why[locale]}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {req.apostille ? <span className="chip bg-terra-soft text-terra-dark">{s.apostille}</span> : null}
              {req.swornTranslation ? <span className="chip bg-terra-soft text-terra-dark">{s.translation}</span> : null}
              {req.validityDays ? <span className="chip bg-sea-soft text-sea">{s.validity(req.validityDays)}</span> : null}
              {req.perDependent ? <span className="chip bg-ink/5 text-ink-mute">{s.perDependent}</span> : null}
            </div>
            {row?.note ? <p className="mt-2 text-xs text-red-700">{row.note}</p> : null}
            <p className="mt-2 text-[10px] text-ink-faint">{req.cite}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className={`chip ${statusStyles[status]}`}>{s.statusLabels[status]}</span>
            <input
              ref={(el) => {
                fileInputs.current[req.id] = el;
              }}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadFor(req, f);
                e.target.value = "";
              }}
            />
            <div className="flex gap-2">
              {has ? (
                <button
                  type="button"
                  disabled={busyReq === req.id}
                  onClick={() => removeDoc(req)}
                  className="text-xs font-semibold text-ink-mute underline-offset-4 hover:underline disabled:opacity-50"
                >
                  {s.deleteDoc}
                </button>
              ) : null}
              <button
                type="button"
                disabled={busyReq === req.id}
                onClick={() => fileInputs.current[req.id]?.click()}
                className="btn-secondary !px-4 !py-1.5 text-xs disabled:opacity-50"
              >
                {busyReq === req.id ? "…" : has ? s.replace : s.upload}
              </button>
            </div>
          </div>
        </div>
        {legal ? (
          <div className="mt-4 border-t border-ink/10 pt-3">
            {helpRequested ? (
              <p className="flex items-center gap-2 text-xs font-medium text-sea">
                <span>✓</span> {s.helpRequested}
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => requestHelp(req)}
                  className="btn-primary !px-4 !py-1.5 text-xs"
                >
                  {s.arrangeHelp}
                </button>
                <span className="max-w-xs text-xs leading-relaxed text-ink-faint">{s.arrangeHelpSub}</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  const gather = checklist?.requirements.filter((r) => !isLegalise(r)) ?? [];
  const legalise = checklist?.requirements.filter(isLegalise) ?? [];
  const countReady = (list: Requirement[]) =>
    list.filter((r) => {
      const st = statusOf(r);
      return st !== "missing" && st !== "needs_fix";
    }).length;

  return (
    <section className="py-12 sm:py-16">
      <div className="wrap max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">{s.dashboardTitle}</h1>
            <p className="mt-1 text-xs text-ink-faint">{s.supervised}</p>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="text-xs font-semibold text-ink-mute underline-offset-4 hover:underline"
          >
            {s.signOut}
          </button>
        </div>

        {!caseRow ? (
          <div className="mt-10">
            <p className="font-semibold">{s.pickPathway}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.values(checklists).map((c) => (
                <button
                  key={c.pathwayId}
                  type="button"
                  onClick={() => startCase(c.pathwayId)}
                  className="rounded-2xl border border-ink/15 bg-white p-5 text-left transition hover:border-terra"
                >
                  <span className="block text-sm font-semibold">{c.name[locale]}</span>
                  <span className="mt-2 block text-xs font-semibold text-terra">{s.startDossier} →</span>
                </button>
              ))}
            </div>
          </div>
        ) : checklist ? (
          <>
            <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{checklist.name[locale]}</p>
                <p className="text-sm text-ink-mute">
                  <span className="font-display text-xl font-semibold text-ink">{progress.done}</span>
                  {" / "}
                  {progress.total} {s.progress}
                </p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-terra transition-all"
                  style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-terra-mid">{s.nextStep}</p>
              {nextAction ? (
                <>
                  <p className="mt-2 font-display text-lg font-semibold">{nextAction.name[locale]}</p>
                  <p className="mt-1 text-sm text-white/60">
                    {isLegalise(nextAction) ? s.nextStepWhySlow : nextAction.validityDays ? s.nextStepWhyLate : nextAction.why[locale]}
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputs.current[nextAction.id]?.click()}
                    className="btn-primary mt-4 !px-5 !py-2 text-xs"
                  >
                    {s.upload} →
                  </button>
                </>
              ) : (
                <p className="mt-2 text-sm text-white/80">{s.nextStepDone}</p>
              )}
            </div>

            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-lg font-semibold">1 · {s.stageGather}</h2>
                <p className="text-xs text-ink-faint">{countReady(gather)}/{gather.length}</p>
              </div>
              <div className="mt-4 space-y-4">
                {gather.map((req) => (
                  <RequirementCard key={req.id} req={req} />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-lg font-semibold">2 · {s.stageLegalise}</h2>
                <p className="text-xs text-ink-faint">{countReady(legalise)}/{legalise.length}</p>
              </div>
              <div className="mt-4 space-y-4">
                {legalise.map((req) => (
                  <RequirementCard key={req.id} req={req} />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold">3 · {s.stageForms}</h2>
              <div className="mt-4 rounded-2xl border border-dashed border-ink/20 bg-white/60 p-5 text-sm text-ink-mute">
                <p>{s.formsComing}</p>
                <p className="mt-2">
                  <span className="font-semibold text-ink">{checklist.form}</span> · {checklist.fee}
                </p>
              </div>
            </div>

            <p className="mt-10 rounded-2xl bg-terra-soft/50 p-5 text-xs leading-relaxed text-ink-soft">{s.reviewNote}</p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink-faint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              {s.vaultNote}
            </p>
          </>
        ) : null}

        <p className="mt-10 text-xs text-ink-faint">
          <Link href={`/${locale}`} className="underline underline-offset-4">
            {s.backHome}
          </Link>
        </p>
      </div>
    </section>
  );
}
