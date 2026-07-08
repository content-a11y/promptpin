import { Heart, Lock, Play, Bookmark } from "lucide-react";
import Link from "next/link";
import type { PromptAsset } from "@/lib/prompts";

type PromptCardProps = {
  prompt: PromptAsset;
  locked?: boolean;
};

export function PromptCard({ prompt, locked = false }: PromptCardProps) {
  return (
    <article className="mb-5 break-inside-avoid overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={locked ? "/login" : `/prompts/${prompt.slug}`} className="group block">
        <div className="relative overflow-hidden bg-zinc-100">
          <img
            src={prompt.imageUrl}
            alt={prompt.title}
            className={`w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
              locked ? "blur-sm grayscale" : ""
            }`}
            style={{ height: prompt.height }}
          />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
              {prompt.category}
            </span>
            {prompt.mediaType === "video" ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950/85 text-white">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
            ) : null}
          </div>
          {locked ? (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/30">
              <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950">
                <Lock className="h-4 w-4" />
                Sign in to unlock
              </span>
            </div>
          ) : null}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <Link
            href={locked ? "/login" : `/prompts/${prompt.slug}`}
            className="font-semibold tracking-tight text-zinc-950 hover:text-red-700"
          >
            {prompt.title}
          </Link>
          <p className="mt-1 text-sm leading-6 text-zinc-600">{prompt.description}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
              {prompt.creator.avatar}
            </span>
            <span>{prompt.creator.handle}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {prompt.likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              {prompt.saves.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
