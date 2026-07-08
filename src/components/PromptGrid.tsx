import { FREE_PROMPT_LIMIT, prompts } from "@/lib/prompts";
import { LoginWall } from "./LoginWall";
import { PromptCard } from "./PromptCard";

export function PromptGrid() {
  const freePrompts = prompts.slice(0, FREE_PROMPT_LIMIT);
  const lockedPrompts = prompts.slice(FREE_PROMPT_LIMIT);

  return (
    <section aria-label="Prompt feed" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950">Fresh prompt drops</h2>
          <p className="text-sm text-zinc-600">
            Visitors can preview {FREE_PROMPT_LIMIT} prompts before the sign-in wall.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto text-sm font-medium">
          {["All", "Product", "Fashion", "SaaS", "Interior", "Video"].map((filter) => (
            <button
              className="rounded-full border border-zinc-200 px-4 py-2 text-zinc-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {freePrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      <LoginWall lockedCount={lockedPrompts.length} />

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {lockedPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} locked />
        ))}
      </div>
    </section>
  );
}
