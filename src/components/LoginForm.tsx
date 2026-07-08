"use client";

import { Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient, isSupabaseConfigured } from "@/lib/supabaseClient";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (!isSupabaseConfigured) {
        setStatus("Add Supabase env vars to enable magic-link auth.");
        return;
      }

      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        setStatus(error.message);
        return;
      }

      setStatus("Check your inbox for the magic sign-in link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-zinc-800" htmlFor="email">
        Email address
      </label>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          className="h-12 w-full rounded-full border border-zinc-200 pl-11 pr-4 outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>
      <button
        className="h-12 w-full rounded-full bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
        disabled={loading}
        type="submit"
      >
        {loading ? "Sending link..." : "Send magic link"}
      </button>
      {status ? <p className="text-sm leading-6 text-zinc-700">{status}</p> : null}
    </form>
  );
}
