"use client";

import { Heart, MoreHorizontal, Play, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PromptAsset } from "@/lib/prompts";

type PromptCardProps = {
  prompt: PromptAsset;
  canInteract?: boolean;
  previewOnly?: boolean;
};

export function PromptCard({ prompt, canInteract = false, previewOnly = false }: PromptCardProps) {
  const [liked, setLiked] = useState(false);
  const promptHref = previewOnly ? "/login" : `/prompts/${prompt.slug}`;

  async function sharePrompt() {
    const url = `${window.location.origin}/prompts/${prompt.slug}`;

    if (navigator.share) {
      await navigator.share({ title: prompt.title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  }

  return (
    <article className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-white">
      <Link href={promptHref} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
          <img
            src={prompt.imageUrl}
            alt={prompt.title}
            className="w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            style={{ height: prompt.height }}
          />
          <div className="absolute left-2 top-2 flex items-center gap-1.5">
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-zinc-900 shadow-sm backdrop-blur">
              {prompt.category}
            </span>
            {prompt.mediaType === "video" ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950/85 text-white">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
            ) : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-zinc-950/70 via-zinc-950/15 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
            <span className="line-clamp-2 text-xs font-semibold leading-4 text-white">
              {prompt.title}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 shadow-sm">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="px-1.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={promptHref}
            className="line-clamp-1 text-sm font-semibold leading-5 text-zinc-950 hover:text-zinc-600"
          >
            {prompt.title}
          </Link>
          <div className="flex shrink-0 items-center gap-1">
            <button
              aria-label="Like prompt"
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                canInteract
                  ? "hover:bg-zinc-100"
                  : "cursor-not-allowed text-zinc-300"
              } ${liked ? "text-red-600" : "text-zinc-700"}`}
              disabled={!canInteract}
              onClick={() => setLiked((value) => !value)}
              type="button"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            </button>
            <button
              aria-label="Share prompt"
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                canInteract ? "text-zinc-700 hover:bg-zinc-100" : "cursor-not-allowed text-zinc-300"
              }`}
              disabled={!canInteract}
              onClick={sharePrompt}
              type="button"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
