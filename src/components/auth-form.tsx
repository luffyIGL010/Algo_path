"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isPhone = /^\+?[\d\s()-]+$/.test(identifier.trim()) && /\d{7,}/.test(identifier.replace(/\D/g, ""));
  const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!supabaseConfigured) {
      setError("Supabase is not configured yet. Add your project URL and anon key to .env.local.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Unable to initialize authentication. Check your Supabase environment variables.");
      return;
    }

    setBusy(true);
    try {
      if (isPhone && otpSent) {
        const { error: authError } = await supabase.auth.verifyOtp({
          phone: identifier.trim(),
          token: otp.trim(),
          type: "sms",
        });
        if (authError) throw authError;
        window.location.assign("/");
        return;
      }

      if (isPhone) {
        const { error: authError } = await supabase.auth.signInWithOtp({
          phone: identifier.trim(),
          options: { shouldCreateUser: mode === "signup" },
        });
        if (authError) throw authError;
        setOtpSent(true);
        setMessage(`We sent a verification code to ${identifier.trim()}.`);
        return;
      }

      if (mode === "signup") {
        const { error: authError } = await supabase.auth.signUp({
          email: identifier.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (authError) throw authError;
        setMessage("Check your inbox for a confirmation link to finish creating your account.");
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: identifier.trim(),
          password,
        });
        if (authError) throw authError;
        window.location.assign("/");
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signInWith(provider: "google" | "github") {
    setError("");
    if (!supabaseConfigured) {
      setError("Supabase is not configured yet. Add your project URL and anon key to .env.local.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("Unable to initialize authentication. Check your Supabase environment variables.");
      return;
    }
    setBusy(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (authError) throw authError;
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Unable to start social sign-in.");
      setBusy(false);
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setOtpSent(false);
    setOtp("");
    setError("");
    setMessage("");
  }

  return (
    <div className="auth-page">
      <aside className="auth-showcase">
        <Link className="auth-brand" href="/">
          <span className="auth-brand-mark"><svg viewBox="0 0 28 28"><path d="M14 3.5 24.5 22H3.5L14 3.5Z" /><path d="M14 11v5m0 3.5v.1" /></svg></span>
          <span>algo<span>path</span></span>
        </Link>
        <div className="showcase-content">
          <span className="showcase-kicker"><span />PREPARE WITH PURPOSE</span>
          <h1>Small steps.<br /><span>Big interviews.</span></h1>
          <p>Practice the questions that matter, learn how to think through them, and make every session count.</p>
          <div className="showcase-preview">
            <div className="preview-topline">
              <span className="preview-label">YOUR WEEK, AT A GLANCE</span>
              <span className="preview-week">THIS WEEK <span>⌄</span></span>
            </div>
            <div className="preview-chart">
              {[24, 39, 31, 57, 43, 74, 56].map((height, index) => (
                <div className="chart-day" key={index}>
                  <div className="chart-track"><span style={{ height: `${height}%` }} /></div>
                  <span>{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
                </div>
              ))}
            </div>
            <div className="preview-chart-footer"><span><i />Your progress, at your pace</span><strong>+4 <small>problems</small></strong></div>
          </div>
        </div>
        <div className="showcase-footer"><span>Thoughtful practice for the next big thing.</span><span>© ALGOPATH 2026</span></div>
      </aside>
      <main className="auth-main">
        <div className="auth-toplinks"><span>Already have a plan?</span><Link href="/">Explore problems <span>↗</span></Link></div>
        <section className="auth-card">
          <div className="auth-heading">
            <div className="auth-icon"><svg viewBox="0 0 24 24"><path d="M12 3 21 8v8l-9 5-9-5V8l9-5Z" /><path d="m3.5 8.2 8.5 5 8.5-5M12 13v8" /></svg></div>
            <span className="auth-overline">{mode === "signin" ? "WELCOME BACK" : "YOUR NEXT CHAPTER"}</span>
            <h2>{mode === "signin" ? "Pick up where you left off." : "Make room for what’s next."}</h2>
            <p>{mode === "signin" ? "Sign in to keep your momentum going." : "Create an account and start building your edge."}</p>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-button" onClick={() => signInWith("google")} disabled={busy}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path fill="#4285F4" d="M19.6 10.2c0-.7-.1-1.3-.2-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 3-4.3 3-7.3Z" /><path fill="#34A853" d="M10 20c2.7 0 5-.9 6.7-2.5l-3.2-2.5c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.3H1v2.6A10 10 0 0 0 10 20Z" /><path fill="#FBBC05" d="M4.2 11.7A6 6 0 0 1 4 10c0-.6.1-1.2.2-1.7V5.7H1A10 10 0 0 0 0 10c0 1.6.4 3 1 4.3l3.2-2.6Z" /><path fill="#EA4335" d="M10 4c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.6 9.6 0 0 0 10 0a10 10 0 0 0-9 5.7l3.2 2.6C5 5.8 7.3 4 10 4Z" /></svg>
              Continue with Google
            </button>
            <button type="button" className="social-button" onClick={() => signInWith("github")} disabled={busy}>
              <svg className="github-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.5 3.3 4.8 2.3.1-.7.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3.1 1.1a10.7 10.7 0 0 1 5.7 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.2-2.7 5.2-5.2 5.5.4.4.8 1 .8 2v3c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>
              Continue with GitHub
            </button>
          </div>

          <div className="auth-divider"><span />OR CONTINUE WITH EMAIL OR PHONE<span /></div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="identifier">{isPhone ? "Mobile number" : "Email address"}</label>
            <input
              id="identifier"
              type="text"
              autoComplete="username"
              inputMode={isPhone ? "tel" : "email"}
              placeholder="you@example.com or +1 555 000 0000"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                setOtpSent(false);
                setOtp("");
              }}
              required
            />
            {isPhone ? (
              otpSent && <>
                <label htmlFor="otp">Verification code</label>
                <input id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" placeholder="Enter your 6-digit code" value={otp} onChange={(event) => setOtp(event.target.value)} required />
                <span className="field-note">We’ll text you a one-time verification code.</span>
              </>
            ) : (
              <>
                <div className="password-label"><label htmlFor="password">Password</label>{mode === "signin" && <span>At least 8 characters</span>}</div>
                <input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required />
              </>
            )}
            {error && <p className="form-message form-error" role="alert">{error}</p>}
            {message && <p className="form-message form-success" role="status">{message}</p>}
            <button className="button button-primary auth-submit" type="submit" disabled={busy}>
              {busy ? "One moment…" : isPhone && otpSent ? "Verify and continue" : isPhone ? "Send verification code" : mode === "signin" ? "Sign in" : "Create account"}
              {!busy && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "signin" ? "New to AlgoPath?" : "Already have an account?"}
            <button type="button" onClick={() => changeMode(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
          <p className="auth-terms">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </section>
        <div className="auth-bottom"><span>SECURE SIGN-IN</span><span className="secure-dot" />Protected by Supabase Auth</div>
      </main>
    </div>
  );
}
