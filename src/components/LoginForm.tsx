"use client";

import { Eye, EyeOff, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

const DEMO_AUTH_KEY = "promptpin-demo-auth";

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.localStorage.setItem(DEMO_AUTH_KEY, "member");
    window.setTimeout(() => {
      window.location.href = "/";
    }, 250);
  }

  function continueWithGoogle() {
    window.localStorage.setItem(DEMO_AUTH_KEY, "member");
    window.location.href = "/";
  }

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            className="h-16 w-full rounded-xl border border-zinc-400 bg-white pl-11 pr-4 text-base outline-none focus:border-zinc-950"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
        </div>

        <div className="relative">
          <input
            className="h-16 w-full rounded-xl border border-zinc-400 bg-white px-4 pr-12 text-base outline-none focus:border-zinc-950"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
          />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800"
            onClick={() => setShowPassword((value) => !value)}
            type="button"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {mode === "login" ? (
          <button
            className="text-sm font-semibold text-blue-700 hover:underline"
            type="button"
          >
            Forgotten password?
          </button>
        ) : null}

        <button
          className="h-12 w-full rounded-2xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={loading}
          type="submit"
        >
          {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <div className="text-center text-xs font-medium text-zinc-950">OR</div>

      <button
        className="flex h-10 w-full items-center justify-center gap-3 rounded border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        onClick={continueWithGoogle}
        type="button"
      >
        <span className="text-lg font-bold text-blue-600">G</span>
        Continue with Google
      </button>

      <p className="pt-4 text-center text-base text-zinc-950">
        {mode === "login" ? "New to PromptPin? " : "Already have an account? "}
        <button
          className="font-medium underline"
          onClick={() => setMode((value) => (value === "login" ? "signup" : "login"))}
          type="button"
        >
          {mode === "login" ? "Join for free" : "Log in"}
        </button>
      </p>

      <p className="text-center text-xs leading-5 text-zinc-500">
        Terms of Service · Privacy Policy
      </p>
    </div>
  );
}
