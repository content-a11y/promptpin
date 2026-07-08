import { Plus, Search, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
            P
          </span>
          <span className="hidden text-lg tracking-tight sm:block">PromptPin</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-zinc-700 md:flex">
          <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/">
            Explore
          </Link>
          <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/collections">
            Collections
          </Link>
          <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/admin">
            Super Admin
          </Link>
        </nav>

        <form className="relative ml-auto flex-1 md:ml-3">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            aria-label="Search prompts"
            className="h-11 w-full rounded-full border border-zinc-200 bg-zinc-100 pl-10 pr-4 text-sm outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
            placeholder="Search prompts, styles, tools"
          />
        </form>

        <Link
          href="/create"
          className="hidden h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800 sm:flex"
        >
          <Plus className="h-4 w-4" />
          Internal Tool
        </Link>
        <Link
          href="/login"
          className="flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-3 text-sm font-semibold hover:bg-zinc-100 sm:px-4"
        >
          <UserRound className="h-4 w-4" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
        <Link
          href="/login"
          className="hidden h-10 items-center gap-2 rounded-full bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 lg:flex"
        >
          <Sparkles className="h-4 w-4" />
          Join
        </Link>
      </div>
    </header>
  );
}
