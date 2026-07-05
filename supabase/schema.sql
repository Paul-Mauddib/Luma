-- Luma dossier schema — run once in the Supabase SQL editor (EU project).
-- Everything is protected by row-level security: users can only ever see
-- and touch their own rows and their own storage folder.

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

-- Private storage bucket; each user may only touch their own folder.
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy "own folder read" on storage.objects
  for select using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "own folder write" on storage.objects
  for insert with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "own folder delete" on storage.objects
  for delete using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
