"use client";

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

export function PromptActions({ title }: { title: string }) {
  const [liked, setLiked] = useState(false);
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
      <div className="grid grid-cols-2 gap-2">
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
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
          onClick={sharePrompt}
          type="button"
        >
          <Share2 className="h-4 w-4" />
          {shared ? "Copied" : "Share"}
        </button>
      </div>
    </div>
  );
}
