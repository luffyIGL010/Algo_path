"use server";

import { createClient } from "@/lib/supabase/server";
import { submissionLanguages, type SubmissionActionState } from "@/lib/submissions";

const maxCodeLength = 50_000;

export async function submitSolution(
  _previousState: SubmissionActionState,
  formData: FormData,
): Promise<SubmissionActionState> {
  const slug = formData.get("slug");
  const code = formData.get("code");
  const language = formData.get("language");

  if (typeof slug !== "string" || slug.length > 100) {
    return { error: "This problem could not be identified. Reload the page and try again." };
  }
  if (typeof code !== "string" || code.trim().length === 0) {
    return { error: "Write a solution before submitting." };
  }
  if (code.length > maxCodeLength) {
    return { error: "Your solution must be 50,000 characters or fewer." };
  }
  if (
    typeof language !== "string" ||
    !submissionLanguages.some((supportedLanguage) => supportedLanguage.value === language)
  ) {
    return { error: "Choose a supported programming language." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase is not configured. Add its URL and anon key to .env.local." };
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) {
    return { error: `Could not verify your session: ${authError.message}` };
  }
  if (!user) {
    return { error: "Sign in before submitting a solution." };
  }

  const { data: problem, error: problemError } = await supabase
    .from("problems")
    .select("id")
    .eq("slug", slug)
    .eq("type", "dsa")
    .maybeSingle();
  if (problemError) {
    return { error: `Could not load this problem: ${problemError.message}` };
  }
  if (!problem) {
    return { error: "This DSA problem is no longer available." };
  }

  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .insert({
      user_id: user.id,
      problem_id: problem.id,
      language,
      code_or_answer: code,
    })
    .select("id, status, verdict, language, created_at")
    .single();

  if (submissionError) {
    return { error: `Could not queue your solution: ${submissionError.message}` };
  }

  return { submission };
}
