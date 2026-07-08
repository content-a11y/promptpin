"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { DEMO_AUTH_EVENT, DEMO_AUTH_KEY } from "@/lib/demoAccounts";
import { FREE_PROMPT_LIMIT, prompts } from "@/lib/prompts";
import { LoginWall } from "./LoginWall";
import { PromptCard } from "./PromptCard";

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
  const [loadedBatches, setLoadedBatches] = useState(2);
  const freePrompts = prompts.slice(0, FREE_PROMPT_LIMIT);
  const lockedPrompts = prompts.slice(FREE_PROMPT_LIMIT);
  const endlessPrompts = useMemo(
    () => Array.from({ length: loadedBatches }, () => prompts).flat(),
    [loadedBatches],
  );
  const visiblePrompts = isMember ? endlessPrompts : freePrompts;

  useEffect(() => {
    if (!isMember) {
      return;
    }

    function loadMoreNearBottom() {
      const remaining =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

      if (remaining < 900) {
        setLoadedBatches((count) => Math.min(count + 1, 40));
      }
    }

    window.addEventListener("scroll", loadMoreNearBottom, { passive: true });

    return () => window.removeEventListener("scroll", loadMoreNearBottom);
  }, [isMember]);

  function signOutDemo() {
    window.localStorage.removeItem(DEMO_AUTH_KEY);
    window.dispatchEvent(new Event(DEMO_AUTH_EVENT));
  }

  return (
    <section aria-label="Prompt feed" className="mx-auto max-w-[1800px] px-3 pb-16 sm:px-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
            Prompt board
          </h1>
          <p className="text-sm text-zinc-600">
            {isMember
              ? "All prompts are unlocked. Scroll forever, like, pin, and share."
              : `Preview ${FREE_PROMPT_LIMIT} free prompts. Login unlocks the rest.`}
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

      <div className="columns-1 gap-3 sm:columns-2 md:columns-3 xl:columns-5 2xl:columns-6">
        {visiblePrompts.map((prompt, index) => (
          <PromptCard canInteract={isMember} key={`${prompt.id}-${index}`} prompt={prompt} />
        ))}
      </div>

      {isMember ? (
        <div className="py-8 text-center text-sm font-medium text-zinc-500">
          Keep scrolling for more prompts
        </div>
      ) : null}

      {!isMember ? (
        <div className="relative mt-3 min-h-[560px] overflow-hidden rounded-t-[28px]">
          <div className="columns-1 gap-3 opacity-60 blur-[1.5px] sm:columns-2 md:columns-3 xl:columns-5 2xl:columns-6">
            {lockedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} previewOnly />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center bg-white/92 px-4 pt-20 backdrop-blur-md">
            <LoginWall lockedCount={lockedPrompts.length} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
