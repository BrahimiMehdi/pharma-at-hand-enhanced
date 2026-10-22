"use client";

import { cn } from "@/lib/utils";
import { isInvalidMark } from "@/lib/moyenne";

type Props = {
  id: string;
  label: string;
  hint?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onEnter: (input: HTMLInputElement) => void;
};

export default function MarkInput({ id, label, hint, value, disabled, onChange, onEnter }: Props) {
  const invalid = isInvalidMark(value);
  const inputId = `mark-${id}`;
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground md:sr-only">
        {label}
        {hint && <span className="font-normal opacity-80"> · {hint}</span>}
      </label>
      <input
        id={inputId}
        data-mark
        type="text"
        inputMode="decimal"
        autoComplete="off"
        enterKeyHint="next"
        maxLength={5}
        placeholder="–"
        value={value}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${inputId}-error` : undefined}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ""))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter(e.currentTarget);
          }
        }}
        className={cn(
          "h-11 w-full rounded-lg border border-input bg-background px-1 text-center text-base font-semibold tabular-nums transition-colors md:w-14",
          value !== "" && !invalid && "border-primary/30 bg-primary/[0.04]",
          "placeholder:text-muted-foreground/50 hover:border-muted-foreground/40",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
          invalid && "border-destructive bg-destructive/5 dark:border-red-500 dark:bg-red-500/10 focus-visible:border-destructive focus-visible:ring-destructive/25"
        )}
      />
      {invalid && (
        <span id={`${inputId}-error`} className="sr-only">
          Note invalide : saisissez une valeur entre 0 et 20.
        </span>
      )}
    </div>
  );
}
