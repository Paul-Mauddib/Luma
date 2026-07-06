-- Migration 002 — run in the Supabase SQL editor.
-- Captures "arrange this for me" interest on legalisation/translation items.

create table if not exists public.help_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  case_id uuid not null references public.cases (id) on delete cascade,
  requirement_id text not null,
  kind text not null check (kind in ('translation', 'apostille', 'both')),
  created_at timestamptz not null default now(),
  unique (case_id, requirement_id)
);

alter table public.help_requests enable row level security;

create policy "own help requests" on public.help_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
