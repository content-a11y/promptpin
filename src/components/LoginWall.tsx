import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

export function LoginWall({ lockedCount }: { lockedCount: number }) {
  return (
    <div className="my-8 rounded-lg border border-red-200 bg-red-50 p-5 sm:flex sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
          <LockKeyhole className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-zinc-950">You reached the 10-prompt visitor preview.</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-700">
            Sign in to unlock the next {lockedCount} prompts, save collections, like posts, and share
            prompt boards with friends.
          </p>
        </div>
      </div>
      <Link
        href="/login"
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 sm:mt-0"
      >
        Login to continue
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
