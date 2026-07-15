-- iFood Logistics: storage inquiry table
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference_number text unique not null,
  status text not null default 'new'
    check (status in ('new','contacted','qualified','proposal_sent','won','lost','spam')),
  full_name text not null,
  company_name text not null,
  email text not null,
  mobile_number text not null,
  product_type text not null,
  required_temperature text,
  estimated_pallets integer,
  expected_arrival_date date,
  storage_duration text,
  dispatch_frequency text,
  handling_requirements text,
  preferred_contact_method text,
  best_time_to_call text,
  source text,
  consent_privacy boolean not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  created_at timestamptz not null default now(),
  contacted_at timestamptz,
  internal_notes text
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- Row Level Security: only the service-role key (used exclusively by the
-- server-side API route) may read or write. No anon/public access.
alter table public.inquiries enable row level security;

drop policy if exists "Service role full access" on public.inquiries;
create policy "Service role full access"
  on public.inquiries
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
