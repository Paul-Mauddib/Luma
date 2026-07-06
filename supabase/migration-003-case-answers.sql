-- Migration 003 — run in the Supabase SQL editor.
-- Stores the triage answers on the case so the checklist can be personalised.

alter table public.cases add column if not exists answers jsonb;
