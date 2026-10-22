"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = { text: string; label?: string; className?: string };

export default function CopyButton({ text, label = "Copy", className }: Props) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard can be blocked (insecure context, permissions); nothing useful to show.
        }
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
        copied && "border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
        className
      )}
    >
      {copied ? <Check size={14} weight="bold" aria-hidden /> : <Copy size={14} weight="duotone" aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
