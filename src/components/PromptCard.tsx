"use client";

import { Check, FolderPlus, Heart, MoreHorizontal, Pin, Play, Plus, Share2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PromptAsset } from "@/lib/prompts";
import { userCollections } from "@/lib/userContent";

type PromptCardProps = {
  prompt: PromptAsset;
  canInteract?: boolean;
  previewOnly?: boolean;
};

export function PromptCard({ prompt, canInteract = false, previewOnly = false }: PromptCardProps) {
  const [liked, setLiked] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [newCollection, setNewCollection] = useState("");
  const promptHref = previewOnly ? "/login" : `/prompts/${prompt.slug}`;

  async function sharePrompt() {
    const url = `${window.location.origin}/prompts/${prompt.slug}`;

    if (navigator.share) {
      await navigator.share({ title: prompt.title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  }

  function addToCollection(collectionName: string) {
    setSelectedCollection(collectionName);
    setCollectionOpen(false);
  }

  function createCollection() {
    const collectionName = newCollection.trim();

    if (!collectionName) {
      return;
    }

    addToCollection(collectionName);
    setNewCollection("");
  }

  return (
    <article className="group relative mb-3 break-inside-avoid overflow-visible rounded-[18px] bg-white">
      <Link href={promptHref} className="group block">
        <div className="relative h-[300px] overflow-hidden rounded-[18px] bg-zinc-100 sm:h-[340px]">
          <img
            src={prompt.imageUrl}
            alt={prompt.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
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
        </div>
      </Link>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[18px] bg-gradient-to-t from-zinc-950/80 via-zinc-950/35 to-transparent p-3 pt-16">
        <div className="flex items-end justify-between gap-2">
          <Link
            href={promptHref}
            className="pointer-events-auto line-clamp-2 text-sm font-semibold leading-5 text-white"
          >
            {prompt.title}
          </Link>
          <div className="pointer-events-auto flex shrink-0 items-center gap-1 rounded-full bg-white/95 p-1 shadow-sm backdrop-blur">
            <button
              aria-label="Add to collection"
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                canInteract ? "text-zinc-700 hover:bg-zinc-100" : "cursor-not-allowed text-zinc-300"
              } ${selectedCollection ? "text-sky-600" : ""}`}
              disabled={!canInteract}
              onClick={() => setCollectionOpen((value) => !value)}
              type="button"
            >
              {selectedCollection ? <Check className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </button>
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-700">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      {collectionOpen ? (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-950/15">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-950">Add to collection</p>
              <p className="text-xs text-zinc-500">Pick one or create new</p>
            </div>
            <button
              aria-label="Close collection picker"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100"
              onClick={() => setCollectionOpen(false)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1">
            {userCollections.map((collection) => (
              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-zinc-50"
                key={collection.slug}
                onClick={() => addToCollection(collection.name)}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <FolderPlus className="h-4 w-4 text-zinc-500" />
                  {collection.name}
                </span>
                {selectedCollection === collection.name ? <Check className="h-4 w-4" /> : null}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2 border-t border-zinc-100 pt-3">
            <input
              className="h-10 min-w-0 flex-1 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-500"
              onChange={(event) => setNewCollection(event.target.value)}
              placeholder="New collection"
              value={newCollection}
            />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white hover:bg-zinc-800"
              onClick={createCollection}
              type="button"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
