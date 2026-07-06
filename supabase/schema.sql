-- Luma dossier schema — PART 1 of 2.
-- Run this in the Supabase SQL editor. It only touches the public schema,
-- which the editor is allowed to modify.
-- PART 2 (storage bucket + policies) is done in the dashboard UI —
-- see supabase/storage-setup.md. The SQL editor cannot create policies
-- on storage.objects ("must be owner of table objects").

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  pathway text not null,
  checklist_version text not null default '2026-07',
  target_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  requirement_id text not null,
  storage_path text,
  status text not null default 'missing'
    check (status in ('missing', 'uploaded', 'in_review', 'needs_fix', 'accepted')),
  note text,
  uploaded_at timestamptz,
  unique (case_id, requirement_id)
);

alter table public.cases enable row level security;
alter table public.documents enable row level security;

create policy "own cases" on public.cases
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own documents" on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
