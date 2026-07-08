import { AppHeader } from "@/components/AppHeader";
import { PromptGrid } from "@/components/PromptGrid";
import { FREE_PROMPT_LIMIT, prompts } from "@/lib/prompts";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main>
        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Prompt discovery board
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                  Browse visual prompts like a pinboard, then open the full recipe.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                  Internal team members post image and video prompts. Viewers can inspect the
                  structured prompt, save it into named collections, like it, and share it with
                  friends.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-zinc-950">{prompts.length}</p>
                    <p className="text-xs text-zinc-500">Prompts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-zinc-950">{FREE_PROMPT_LIMIT}</p>
                    <p className="text-xs text-zinc-500">Free views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-zinc-950">2</p>
                    <p className="text-xs text-zinc-500">User roles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="pt-8">
          <PromptGrid />
        </div>
      </main>
    </>
  );
}
