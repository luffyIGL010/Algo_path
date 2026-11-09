drop policy if exists "Users can queue their own submissions" on public.submissions;

create policy "Users can queue their own submissions" on public.submissions
  for insert to authenticated with check (
    (select auth.uid()) = user_id
    and status = 'queued'
    and verdict is null
    and runtime_ms is null
    and memory_kb is null
    and score is null
    and length(code_or_answer) between 1 and 50000
    and language in ('python', 'javascript', 'java', 'cpp')
    and exists (
      select 1
      from public.problems
      where problems.id = submissions.problem_id
        and problems.type = 'dsa'
    )
  );
