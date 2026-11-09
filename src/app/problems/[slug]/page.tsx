import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { CodeWorkspace } from "@/components/code-workspace";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionSummary } from "@/lib/submissions";

type ProblemPageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProblemPage({ params }: ProblemPageProps) {
  return (
    <main className="app-shell">
      <WorkspaceHeader />
      <Suspense fallback={<WorkspaceLoading />}>
        <ProblemContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProblemContent({ params }: ProblemPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="workspace-content">
        <Link className="workspace-back" href="/">← All problems</Link>
        <section className="workspace-notice">
          <h1>Workspace unavailable</h1>
          <p>Supabase is not configured. Add its URL and anon key to .env.local, then reload.</p>
        </section>
      </div>
    );
  }

  const { data: problem, error: problemError } = await supabase
    .from("problems")
    .select("id, slug, title, difficulty, statement")
    .eq("slug", slug)
    .eq("type", "dsa")
    .maybeSingle();

  if (problemError) {
    throw new Error(`Could not load the problem workspace: ${problemError.message}`);
  }
  if (!problem) {
    notFound();
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError && !isAuthSessionMissingError(authError)) {
    throw new Error(`Could not verify the current session: ${authError.message}`);
  }

  const currentUser = authError ? null : user;
  let submissions: SubmissionSummary[] = [];
  if (currentUser) {
    const { data, error: submissionsError } = await supabase
      .from("submissions")
      .select("id, status, verdict, language, created_at")
      .eq("user_id", currentUser.id)
      .eq("problem_id", problem.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (submissionsError) {
      throw new Error(`Could not load your submissions: ${submissionsError.message}`);
    }
    submissions = data;
  }

  return (
    <div className="workspace-content">
      <Link className="workspace-back" href="/">← All problems</Link>
      <div className="workspace-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" />DSA WORKSPACE</span>
          <h1>{problem.title}</h1>
        </div>
        <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
      </div>

      <div className="workspace-grid">
        <section className="workspace-card" aria-labelledby="statement-title">
          <div className="workspace-card-heading">
            <span className="workspace-step">01</span>
            <h2 id="statement-title">Problem</h2>
          </div>
          <p className="workspace-statement">{problem.statement}</p>
          <div className="workspace-scope-note">
            <strong>Submission queue</strong>
            <span>Solutions are saved privately. Code execution and verdicts are not enabled in this phase.</span>
          </div>
        </section>

        <CodeWorkspace
          slug={problem.slug}
          authenticated={Boolean(currentUser)}
          submissions={submissions}
        />
      </div>
    </div>
  );
}

function WorkspaceLoading() {
  return (
    <div className="workspace-content" aria-busy="true">
      <p className="workspace-loading">Loading problem workspace…</p>
    </div>
  );
}

function WorkspaceHeader() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/" aria-label="AlgoPath home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 28 28"><path d="M14 3.5 24.5 22H3.5L14 3.5Z" /><path d="M14 11v5m0 3.5v.1" /></svg>
          </span>
          <span>algo<span className="brand-accent">path</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link className="nav-link nav-link-active" href="/">Problems</Link>
          <Link className="nav-link" href="/login">My progress</Link>
        </nav>
        <div className="topbar-actions">
          <ThemeToggle />
          <Link className="avatar-link" href="/login" aria-label="Sign in">
            <span className="avatar">A</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
