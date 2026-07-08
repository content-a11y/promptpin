import { AppHeader } from "@/components/AppHeader";
import { LoginForm } from "@/components/LoginForm";
import { FREE_PROMPT_LIMIT } from "@/lib/prompts";
import { LockKeyhole, UsersRound } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <section className="self-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Continue browsing
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Sign in after the {FREE_PROMPT_LIMIT}-prompt free preview.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
            Members can see every prompt, save named collections, like posts, and share prompt boards
            with friends.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <LockKeyhole className="h-5 w-5 text-red-600" />
              <h2 className="mt-3 font-semibold text-zinc-950">Visitor wall</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                The feed previews ten free prompts, then routes visitors here.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <UsersRound className="h-5 w-5 text-red-600" />
              <h2 className="mt-3 font-semibold text-zinc-950">Internal posting</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Prompt posting is an internal tool, separate from normal viewer accounts.
              </p>
            </div>
          </div>
        </section>

        <aside className="self-center rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950">Login or create account</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Magic link auth is wired for Supabase once env vars are added.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
          <p className="mt-5 text-sm leading-6 text-zinc-500">
            The internal super admin manages users, prompts, uploads, and row-level security in{" "}
            <Link className="font-semibold text-red-700 hover:text-red-800" href="/admin">
              Supabase
            </Link>
            .
          </p>
        </aside>
      </main>
    </>
  );
}
