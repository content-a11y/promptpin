import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

export function LoginWall({ lockedCount }: { lockedCount: number }) {
  return (
    <div className="pointer-events-auto mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-2xl shadow-zinc-950/15">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white">
        <LockKeyhole className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">
        Log in to see more prompts
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Visitors can view 10 free prompts. Create an account or log in to unlock the next{" "}
        {lockedCount}, like prompts, and share them with friends.
      </p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link
          href="/login"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Login
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/login?mode=create"
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
        >
          Create account
        </Link>
      </div>
      <p className="mt-4 text-xs text-zinc-500">Click any free image to view its prompt.</p>
    </div>
  );
}
