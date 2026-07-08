import { Search, UserRound } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1800px] items-center gap-3 px-3 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
            P
          </span>
          <span className="hidden text-base tracking-tight sm:block">PromptPin</span>
        </Link>

        <form className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            aria-label="Search prompts"
            className="h-10 w-full rounded-lg border border-transparent bg-zinc-100 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-300 focus:bg-white"
            placeholder="Search"
          />
        </form>

        <Link
          href="/login"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-3 text-sm font-semibold hover:bg-zinc-100 sm:px-4"
        >
          <UserRound className="h-4 w-4" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      </div>
    </header>
  );
}
