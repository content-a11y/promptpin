"use client";

import { useSyncExternalStore } from "react";
import { FREE_PROMPT_LIMIT, prompts } from "@/lib/prompts";
import { LoginWall } from "./LoginWall";
import { PromptCard } from "./PromptCard";

const DEMO_AUTH_KEY = "promptpin-demo-auth";
const DEMO_AUTH_EVENT = "promptpin-demo-auth-change";

function getMemberSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(DEMO_AUTH_KEY) === "member";
}

function getServerSnapshot() {
  return false;
}

function subscribeToDemoAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DEMO_AUTH_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DEMO_AUTH_EVENT, callback);
  };
}

export function PromptGrid() {
  const isMember = useSyncExternalStore(
    subscribeToDemoAuth,
    getMemberSnapshot,
    getServerSnapshot,
  );
  const freePrompts = prompts.slice(0, FREE_PROMPT_LIMIT);
  const lockedPrompts = prompts.slice(FREE_PROMPT_LIMIT);
  const visiblePrompts = isMember ? prompts : freePrompts;

  function signOutDemo() {
    window.localStorage.removeItem(DEMO_AUTH_KEY);
    window.dispatchEvent(new Event(DEMO_AUTH_EVENT));
  }

  return (
    <section aria-label="Prompt feed" className="mx-auto max-w-[1700px] px-3 pb-16 sm:px-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-950">
            Visual prompt library
          </h1>
          <p className="text-sm text-zinc-600">
            {isMember
              ? "You are logged in. You can see, like, and share every prompt."
              : `Visitors can see ${FREE_PROMPT_LIMIT} free prompts before login.`}
          </p>
        </div>
        {isMember ? (
          <button
            className="h-10 rounded-full border border-zinc-200 px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
            onClick={signOutDemo}
            type="button"
          >
            Demo sign out
          </button>
        ) : null}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-4 2xl:columns-5">
        {visiblePrompts.map((prompt) => (
          <PromptCard canInteract={isMember} key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {!isMember ? (
        <div className="relative mt-4 min-h-[520px] overflow-hidden">
          <div className="columns-1 gap-4 opacity-45 blur-[2px] sm:columns-2 lg:columns-4 2xl:columns-5">
            {lockedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} previewOnly />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center bg-white/90 px-4 pt-16 backdrop-blur-sm">
            <LoginWall lockedCount={lockedPrompts.length} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
