create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  timezone text not null default 'Asia/Kolkata',
  created_at timestamptz not null default now(),
  constraint profiles_timezone_not_blank check (length(trim(timezone)) > 0)
);

create table public.problems (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('dsa', 'sql', 'system_design')),
  slug text not null unique,
  title text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  statement text not null default '',
  visualizer_trace_url text,
  visualizer_trace jsonb,
  created_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table public.problem_companies (
  problem_id uuid not null references public.problems (id) on delete cascade,
  company_id uuid not null references public.companies (id) on delete cascade,
  primary key (problem_id, company_id)
);

create table public.test_cases (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references public.problems (id) on delete cascade,
  input jsonb not null,
  expected_output jsonb not null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create index test_cases_problem_visible_idx on public.test_cases (problem_id) where is_hidden = false;

create table public.sql_problems (
  problem_id uuid primary key references public.problems (id) on delete cascade,
  schema_sql text not null,
  seed_data_sql text not null,
  hidden_datasets jsonb not null default '[]'::jsonb,
  expected_result jsonb not null default '[]'::jsonb
);

create table public.design_rubrics (
  problem_id uuid primary key references public.problems (id) on delete cascade,
  items jsonb not null check (jsonb_typeof(items) = 'array'),
  pass_threshold integer not null check (pass_threshold > 0)
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  problem_id uuid not null references public.problems (id) on delete cascade,
  language text,
  code_or_answer text not null,
  status text not null default 'queued' check (status in ('queued', 'processing', 'completed', 'failed')),
  verdict text check (verdict is null or verdict in ('accepted', 'wrong_answer', 'runtime_error', 'time_limit_exceeded', 'evaluation_error')),
  runtime_ms integer check (runtime_ms is null or runtime_ms >= 0),
  memory_kb integer check (memory_kb is null or memory_kb >= 0),
  score integer check (score is null or score >= 0),
  created_at timestamptz not null default now()
);

create index submissions_user_created_idx on public.submissions (user_id, created_at desc);
create index submissions_problem_status_idx on public.submissions (problem_id, status);

create table public.user_problem_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  problem_id uuid not null references public.problems (id) on delete cascade,
  solved_at timestamptz not null default now(),
  attempts integer not null default 1 check (attempts > 0),
  primary key (user_id, problem_id)
);

create table public.streaks (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  current_streak integer not null default 0 check (current_streak >= 0),
  longest_streak integer not null default 0 check (longest_streak >= current_streak),
  last_solved_date date
);

create table public.ai_usage (
  user_id uuid not null references public.profiles (id) on delete cascade,
  date date not null,
  requests_used integer not null default 0 check (requests_used >= 0),
  primary key (user_id, date)
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.problems enable row level security;
alter table public.companies enable row level security;
alter table public.problem_companies enable row level security;
alter table public.test_cases enable row level security;
alter table public.sql_problems enable row level security;
alter table public.design_rubrics enable row level security;
alter table public.submissions enable row level security;
alter table public.user_problem_progress enable row level security;
alter table public.streaks enable row level security;
alter table public.ai_usage enable row level security;

create policy "Profiles are readable by their owner" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "Profiles are editable by their owner" on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Problems are publicly readable" on public.problems
  for select to anon, authenticated using (true);
create policy "Companies are publicly readable" on public.companies
  for select to anon, authenticated using (true);
create policy "Problem company tags are publicly readable" on public.problem_companies
  for select to anon, authenticated using (true);
create policy "Sample test cases are publicly readable" on public.test_cases
  for select to anon, authenticated using (not is_hidden);

create policy "Submissions are readable by their owner" on public.submissions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can queue their own submissions" on public.submissions
  for insert to authenticated with check (
    (select auth.uid()) = user_id
    and status = 'queued'
    and verdict is null
    and runtime_ms is null
    and memory_kb is null
  );

create policy "Progress is readable by its owner" on public.user_problem_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Streaks are readable by their owner" on public.streaks
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "AI usage is readable by its owner" on public.ai_usage
  for select to authenticated using ((select auth.uid()) = user_id);
