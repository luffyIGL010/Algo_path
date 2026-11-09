"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitSolution } from "@/app/problems/[slug]/actions";
import {
  submissionLanguages,
  type SubmissionActionState,
  type SubmissionLanguage,
  type SubmissionSummary,
} from "@/lib/submissions";

const starterCode: Record<SubmissionLanguage, string> = {
  python: "# Write your solution here\n\ndef solution():\n    pass\n",
  javascript: "// Write your solution here\n\nfunction solution() {\n  // Add your logic\n}\n",
  java: "// Write your solution here\n\nclass Solution {\n    public void solve() {\n        // Add your logic\n    }\n}\n",
  cpp: "// Write your solution here\n\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Add your logic\n    return 0;\n}\n",
};

const initialState: SubmissionActionState = {};

function submissionStatus(submission: SubmissionSummary) {
  if (submission.verdict) {
    return submission.verdict.replaceAll("_", " ");
  }
  return submission.status.replaceAll("_", " ");
}

export function CodeWorkspace({
  slug,
  authenticated,
  submissions,
}: {
  slug: string;
  authenticated: boolean;
  submissions: SubmissionSummary[];
}) {
  const [language, setLanguage] = useState<SubmissionLanguage>("python");
  const [drafts, setDrafts] = useState<Record<SubmissionLanguage, string>>(starterCode);
  const [state, formAction, pending] = useActionState(submitSolution, initialState);

  return (
    <section className="workspace-editor-card" aria-labelledby="editor-title">
      <div className="workspace-card-heading">
        <span className="workspace-step">02</span>
        <h2 id="editor-title">Your solution</h2>
      </div>
      <form className="workspace-form" action={formAction}>
        <input type="hidden" name="slug" value={slug} />
        <div className="editor-toolbar">
          <label htmlFor="solution-language">Language</label>
          <select
            id="solution-language"
            name="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as SubmissionLanguage)}
          >
            {submissionLanguages.map((item) => (
              <option value={item.value} key={item.value}>{item.label}</option>
            ))}
          </select>
          <span className="editor-save-hint">Draft stays in this tab</span>
        </div>
        <label className="visually-hidden" htmlFor="solution-code">Solution code</label>
        <textarea
          id="solution-code"
          className="code-editor"
          name="code"
          value={drafts[language]}
          onChange={(event) => setDrafts((current) => ({ ...current, [language]: event.target.value }))}
          maxLength={50_000}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-describedby="execution-note"
          required
        />
        <div className="editor-footer">
          <span>{drafts[language].length.toLocaleString()} / 50,000 characters</span>
          <button className="button button-primary editor-submit" type="submit" disabled={!authenticated || pending}>
            {pending ? "Queueing…" : "Queue submission"}
            {!pending && <span aria-hidden="true">→</span>}
          </button>
        </div>
        <p id="execution-note" className="workspace-execution-note">
          Submitting stores your code and language. It does not execute or evaluate your code.
        </p>
        {!authenticated && (
          <p className="workspace-auth-note">
            <Link href="/login">Sign in</Link> to queue a submission.
          </p>
        )}
        {state.error && <p className="workspace-message workspace-error" role="alert">{state.error}</p>}
        {state.submission && (
          <p className="workspace-message workspace-success" role="status">
            Submission {state.submission.id.slice(0, 8)} is queued. It has not been run or scored.
          </p>
        )}
      </form>

      <div className="workspace-history">
        <div className="workspace-history-heading">
          <h3>Recent submissions</h3>
          <span>{submissions.length}</span>
        </div>
        {!authenticated ? (
          <p className="workspace-history-empty">Sign in to view your private submission history.</p>
        ) : submissions.length === 0 ? (
          <p className="workspace-history-empty">Your submissions for this problem will appear here.</p>
        ) : (
          <ul className="submission-list">
            {submissions.map((submission) => (
              <li key={submission.id}>
                <span className="submission-language">
                  {submissionLanguages.find((item) => item.value === submission.language)?.label ?? "Unknown"}
                </span>
                <span className={`submission-status submission-${submission.status}`}>{submissionStatus(submission)}</span>
                <time dateTime={submission.created_at}>{new Date(submission.created_at).toLocaleString()}</time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
