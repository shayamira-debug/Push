-- Push Test V1.1 permissions patch
-- Run this once in Supabase SQL Editor

grant insert, update on table public.push_subscriptions to anon;
grant usage, select on sequence public.push_subscriptions_id_seq to anon;

-- RLS remains enabled. The existing INSERT/UPDATE policies still decide which rows are allowed.
