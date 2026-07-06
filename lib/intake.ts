import type { Answers } from "./triage";

export interface Intake {
  pathway: string;
  answers: Answers;
  ts: number;
}

const KEY = "luma.intake";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

export function saveIntake(pathway: string, answers: Answers) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ pathway, answers, ts: Date.now() }));
  } catch {
    /* private browsing / storage full — silently degrade to manual pick */
  }
}

export function loadIntake(): Intake | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Intake;
    if (!parsed?.pathway || !parsed?.answers || Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearIntake() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
