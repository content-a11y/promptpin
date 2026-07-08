"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyPromptButton({ promptText }: { promptText: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      className="inline-flex h-10 items-center gap-2 rounded-full bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
      onClick={copyPrompt}
      type="button"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy prompt"}
    </button>
  );
}
