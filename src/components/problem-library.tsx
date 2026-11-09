"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { problems, problemTypeLabels, type Difficulty, type Problem, type ProblemType } from "@/lib/problems";
import { ThemeToggle } from "@/components/theme-toggle";

type TypeFilter = "all" | ProblemType;
type DifficultyFilter = "All levels" | Difficulty;

const typeFilters: TypeFilter[] = ["all", "dsa", "sql", "system_design"];
const difficultyFilters: DifficultyFilter[] = ["All levels", "Easy", "Medium", "Hard"];

function LogoMark() {
  return (
    <Link className="brand" href="/" aria-label="AlgoPath home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28"><path d="M14 3.5 24.5 22H3.5L14 3.5Z" /><path d="M14 11v5m0 3.5v.1" /></svg>
      </span>
      <span>algo<span className="brand-accent">path</span></span>
    </Link>
  );
}

function TypeIcon({ type }: { type: ProblemType }) {
  if (type === "sql") {
    return <span className="type-icon sql-icon" aria-hidden="true">DB</span>;
  }
  if (type === "system_design") {
    return <span className="type-icon design-icon" aria-hidden="true">↗</span>;
  }
  return <span className="type-icon dsa-icon" aria-hidden="true">⌘</span>;
}

function ProblemPreview({ problem, onClose }: { problem: Problem; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="preview-modal" role="dialog" aria-modal="true" aria-labelledby="preview-title">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close preview">×</button>
        <div className="eyebrow">Problem preview</div>
        <h2 id="preview-title">{problem.title}</h2>
        <div className="preview-meta">
          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
          <span className="type-label">{problemTypeLabels[problem.type]}</span>
          <span className="preview-rate">{problem.acceptance === "Rubric" ? "Rubric-scored" : `${problem.acceptance} accepted`}</span>
        </div>
        <p className="preview-copy">
          {problem.type === "dsa"
            ? `Practice ${problem.title.toLowerCase()} with clear examples, progressive hints, and a focused workspace. Your hidden test cases stay private until you submit.`
            : problem.type === "sql"
              ? `Write a query for ${problem.title.toLowerCase()} against a realistic dataset. Sample tables and expected output are available in the SQL workspace.`
              : `Design a robust ${problem.title.toLowerCase().replace("design a ", "")}. Organize your requirements, API, data model, architecture, scaling plan, and trade-offs.`}
        </p>
        <div className="preview-companies">
          <span className="preview-label">Asked at</span>
          <div className="company-pills">{problem.companies.map((company) => <span className="company-pill" key={company}>{company}</span>)}</div>
        </div>
        <div className="preview-footer">
          {problem.type === "dsa" ? (
            <>
              <span className="coming-soon"><span />DSA workspace is ready</span>
              <Link className="button button-primary" href={`/problems/${problem.slug}`}>Start solving <span>→</span></Link>
            </>
          ) : (
            <>
              <span className="coming-soon"><span />Workspace unlocks in a later phase</span>
              <button className="button button-primary" type="button" onClick={onClose}>Got it</button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export function ProblemLibrary() {
  const [activeType, setActiveType] = useState<TypeFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All levels");
  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return problems.filter((problem) => {
      const matchesType = activeType === "all" || problem.type === activeType;
      const matchesDifficulty = difficulty === "All levels" || problem.difficulty === difficulty;
      const matchesSearch = !query || problem.title.toLowerCase().includes(query) ||
        problem.companies.some((company) => company.toLowerCase().includes(query));
      return matchesType && matchesDifficulty && matchesSearch;
    });
  }, [activeType, difficulty, search]);

  const counts = useMemo(() => ({
    all: problems.length,
    dsa: problems.filter((problem) => problem.type === "dsa").length,
    sql: problems.filter((problem) => problem.type === "sql").length,
    system_design: problems.filter((problem) => problem.type === "system_design").length,
  }), []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <LogoMark />
          <nav className="main-nav" aria-label="Main navigation">
            <Link className="nav-link nav-link-active" href="/">Problems</Link>
            <Link className="nav-link" href="/login">My progress</Link>
          </nav>
          <div className="topbar-actions">
            <div className="streak-pill" title="Your daily streak">
              <span className="streak-flame" aria-hidden="true">✦</span>
              <span className="streak-number">0</span>
              <span className="streak-caption">day streak</span>
            </div>
            <ThemeToggle />
            <Link className="avatar-link" href="/login" aria-label="Sign in">
              <span className="avatar">A</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="page-content">
        <section className="welcome-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />YOUR NEXT INTERVIEW STARTS HERE</div>
            <h1>Build your edge,<br className="mobile-break" /> one problem at a time.</h1>
            <p className="welcome-copy">A little practice today goes a long way tomorrow.</p>
          </div>
          <div className="progress-card">
            <div className="progress-icon" aria-hidden="true">
              <svg viewBox="0 0 44 44"><path d="M8 33V20m9 13V12m9 21V17m9 16V7" /><path d="m7 15 10-6 9 4 11-8" /></svg>
            </div>
            <div><strong>Your progress</strong><span>Sign in to track your journey</span></div>
            <Link href="/login" aria-label="Sign in to track progress">↗</Link>
          </div>
        </section>

        <section className="library-section" aria-label="Problem library">
          <div className="library-heading">
            <div>
              <h2>Problem library</h2>
              <p>{problems.length} hand-picked questions to help you get interview-ready.</p>
            </div>
            <div className="library-count"><span className="count-dot" />{filteredProblems.length} <span>questions</span></div>
          </div>

          <div className="library-controls">
            <div className="tabs" role="tablist" aria-label="Filter by question type">
              {typeFilters.map((type) => (
                <button
                  className={`tab ${activeType === type ? "tab-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeType === type}
                  key={type}
                  onClick={() => setActiveType(type)}
                >
                  {problemTypeLabels[type]}<span className="tab-count">{counts[type]}</span>
                </button>
              ))}
            </div>
            <label className="search-box">
              <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.2 13.2 4 4" /></svg>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title or company" aria-label="Search title or company" />
              <kbd>/</kbd>
            </label>
          </div>

          <div className="filter-row">
            <span className="filter-label">DIFFICULTY</span>
            <div className="difficulty-filters" aria-label="Filter by difficulty">
              {difficultyFilters.map((item) => (
                <button
                  className={`filter-chip ${difficulty === item ? "filter-chip-active" : ""} ${item !== "All levels" ? `filter-${item.toLowerCase()}` : ""}`}
                  type="button"
                  aria-pressed={difficulty === item}
                  key={item}
                  onClick={() => setDifficulty(item)}
                >
                  {item !== "All levels" && <span className="difficulty-dot" />}
                  {item}
                </button>
              ))}
            </div>
            {(search || difficulty !== "All levels" || activeType !== "all") && (
              <button className="clear-filters" type="button" onClick={() => {
                setSearch("");
                setDifficulty("All levels");
                setActiveType("all");
              }}>Clear filters <span>×</span></button>
            )}
          </div>

          <div className="problem-table">
            <div className="table-header">
              <span className="table-problem-heading">PROBLEM</span>
              <span>COMPANIES</span>
              <span>TYPE</span>
              <span>DIFFICULTY</span>
              <span className="rate-heading">ACCEPTANCE</span>
              <span aria-hidden="true" />
            </div>
            {filteredProblems.length > 0 ? filteredProblems.map((problem, index) => (
              <button className="problem-row" type="button" onClick={() => setSelectedProblem(problem)} key={problem.slug}>
                <span className="problem-name-cell">
                  <span className={`problem-index ${index < 3 ? "problem-index-highlight" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="unsolved-mark" aria-label="Not solved"><span /></span>
                  <span className="problem-name">{problem.title}</span>
                </span>
                <span className="company-pills table-companies">
                  {problem.companies.slice(0, 3).map((company, companyIndex) => (
                    <span className={`company-pill company-${companyIndex + 1}`} key={company}>{company}</span>
                  ))}
                </span>
                <span className="problem-type"><TypeIcon type={problem.type} /><span>{problemTypeLabels[problem.type]}</span></span>
                <span><span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span></span>
                <span className="acceptance">{problem.acceptance}</span>
                <span className="row-arrow" aria-hidden="true">↗</span>
              </button>
            )) : (
              <div className="empty-state">
                <span className="empty-icon">⌕</span>
                <strong>No problems found</strong>
                <span>Try a different title, company, or difficulty.</span>
                <button className="button button-secondary" type="button" onClick={() => {
                  setSearch("");
                  setDifficulty("All levels");
                  setActiveType("all");
                }}>Reset filters</button>
              </div>
            )}
          </div>
          <div className="library-footnote">
            <span className="footnote-mark">↗</span>
            <span>Fresh questions, thoughtful hints, and progress that feels like yours.</span>
            <span className="footnote-right">MADE FOR THE LONG GAME</span>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <LogoMark />
        <span>Make progress, one problem at a time.</span>
        <Link href="/login">Sign in to save your progress <span>→</span></Link>
      </footer>
      {selectedProblem && <ProblemPreview problem={selectedProblem} onClose={() => setSelectedProblem(null)} />}
    </main>
  );
}
