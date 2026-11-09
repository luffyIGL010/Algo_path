export const submissionLanguages = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
] as const;

export type SubmissionLanguage = (typeof submissionLanguages)[number]["value"];

export type SubmissionSummary = {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  verdict: "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded" | "evaluation_error" | null;
  language: SubmissionLanguage | null;
  created_at: string;
};

export type SubmissionActionState = {
  error?: string;
  submission?: SubmissionSummary;
};
