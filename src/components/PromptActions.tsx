"use client";

import { Bookmark, Check, Heart, Share2 } from "lucide-react";
import { useState } from "react";

export function PromptActions({ title }: { title: string }) {
  const [liked, setLiked] = useState(false);
  const [collection, setCollection] = useState("Launch inspiration");
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  async function sharePrompt() {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url: shareUrl });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  }

  return (
    <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="grid grid-cols-3 gap-2">
        <button
          className={`flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-semibold ${
            liked
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-zinc-200 text-zinc-800 hover:bg-zinc-100"
          }`}
          onClick={() => setLiked((value) => !value)}
          type="button"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          Like
        </button>
        <button
          className={`flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-semibold ${
            saved
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-zinc-200 text-zinc-800 hover:bg-zinc-100"
          }`}
          onClick={() => setSaved(true)}
          type="button"
        >
          {saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          Save
        </button>
        <button
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
          onClick={sharePrompt}
          type="button"
        >
          <Share2 className="h-4 w-4" />
          {shared ? "Copied" : "Share"}
        </button>
      </div>

      <label className="block text-sm font-medium text-zinc-800" htmlFor="collection-name">
        Collection name
      </label>
      <div className="flex gap-2">
        <input
          className="h-11 min-w-0 flex-1 rounded-full border border-zinc-200 px-4 text-sm outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
          id="collection-name"
          onChange={(event) => setCollection(event.target.value)}
          value={collection}
        />
        <button
          className="h-11 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800"
          onClick={() => setSaved(true)}
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
}
