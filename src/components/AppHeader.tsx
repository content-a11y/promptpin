"use client";

import { DEMO_AUTH_EVENT, DEMO_USER_KEY, type DemoAccount } from "@/lib/demoAccounts";
import { Search, UserRound } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

function getUserSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(DEMO_USER_KEY);
}

function getServerSnapshot() {
  return null;
}

function subscribeToDemoAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DEMO_AUTH_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DEMO_AUTH_EVENT, callback);
  };
}

export function AppHeader() {
  const userJson = useSyncExternalStore(subscribeToDemoAuth, getUserSnapshot, getServerSnapshot);
  const user = userJson ? (JSON.parse(userJson) as DemoAccount) : null;
  const isSuperAdmin = user?.role === "super_admin";
  const isLoggedIn = Boolean(user);

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

        <nav className="hidden items-center gap-1 text-sm font-semibold text-zinc-700 md:flex">
          {isLoggedIn ? (
            <>
              <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/collections">
                Collections
              </Link>
              <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/saved">
                Saved
              </Link>
            </>
          ) : null}
          {isSuperAdmin ? (
            <>
              <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/create">
                Post
              </Link>
              <Link className="rounded-full px-3 py-2 hover:bg-zinc-100" href="/admin">
                Admin
              </Link>
            </>
          ) : null}
        </nav>

        <Link
          href={isLoggedIn ? "/profile" : "/login"}
          className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-3 text-sm font-semibold hover:bg-zinc-100 sm:px-4"
        >
          <UserRound className="h-4 w-4" />
          <span className="hidden sm:inline">{isLoggedIn ? "Profile" : "Sign in"}</span>
        </Link>
      </div>
    </header>
  );
}
