import { forwardRef } from "react";
import { CheckCircle, GraduationCap, Target } from "@/components/icons";
import { cn } from "@/lib/utils";
import { MAX_MARK, PASS_MARK, Summary, formatMark, neededForTarget } from "@/lib/moyenne";

type Props = {
  summary: Summary;
  loaded: boolean;
};

type PanelProps = Props & {
  target: number;
  onTargetChange: (target: number) => void;
};

export const TARGETS = [10, 12, 14, 16];

type Tone = "neutral" | "pass" | "below";

function getTone(summary: Summary): Tone {
  if (summary.average === null) return "neutral";
  return summary.average >= PASS_MARK ? "pass" : "below";
}

const statusLabel = (summary: Summary) => {
  if (summary.average === null) return "En attente de notes";
  const side = summary.average >= PASS_MARK ? "≥ 10" : "< 10";
  return summary.isComplete ? `Moyenne ${side}` : `Provisoire · ${side}`;
};

const dotClass: Record<Tone, string> = {
  neutral: "bg-white/60",
  pass: "bg-emerald-300",
  below: "bg-amber-300",
};

function StatusChip({ summary, loaded, className }: Props & { className?: string }) {
  const done = loaded && summary.isComplete && getTone(summary) === "pass";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/25",
        done && "bg-emerald-400/25 ring-emerald-200/40",
        className
      )}
    >
      {done ? (
        <CheckCircle size={14} weight="fill" aria-hidden className="text-emerald-200" />
      ) : (
        <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dotClass[getTone(summary)])} />
      )}
      {loaded ? statusLabel(summary) : "…"}
    </span>
  );
}

function Guidance({ summary, target }: { summary: Summary; target: number }) {
  const { average, completedCount, moduleCount, isComplete } = summary;
  if (average === null) {
    return <p>Entrez T1 et T2 d’un module pour voir votre moyenne apparaître ici.</p>;
  }
  if (isComplete) {
    return (
      <p>
        Tous les modules sont remplis : c’est votre moyenne générale
        {average >= target ? <>, objectif {target} atteint.</> : "."}
      </p>
    );
  }
  const needed = neededForTarget(summary, target);
  const remaining = moduleCount - completedCount;
  const modulesLabel = remaining > 1 ? `les ${remaining} modules restants` : "le module restant";
  if (needed === null) return <p>Calculée sur les modules déjà remplis.</p>;
  if (needed <= 0) return <p>Même avec 0 dans {modulesLabel}, vous restez à {target} ou plus.</p>;
  if (needed > MAX_MARK) return <p>Pour atteindre {target}, il faudrait plus de 20 dans {modulesLabel}.</p>;
  return (
    <p>
      Pour atteindre {target}, visez{" "}
      <strong className="font-bold text-white tabular-nums">{formatMark(Math.ceil(needed * 100) / 100)}</strong> de
      moyenne dans {modulesLabel}.
    </p>
  );
}

/** A capsule-shaped gauge; the graduation cap marks the pass line. */
function Scale({ value, target }: { value: number | null; target: number }) {
  const percent = value === null ? 0 : Math.min(100, (value / MAX_MARK) * 100);
  const targetPercent = (target / MAX_MARK) * 100;
  return (
    <div aria-hidden className="pt-5">
      <div className="relative">
        <GraduationCap
          size={16}
          weight="fill"
          className="absolute -top-5 left-1/2 -translate-x-1/2 text-white/85"
        />
        <div className="relative h-3 overflow-hidden rounded-full bg-white/15 ring-1 ring-inset ring-white/25">
          <div
            className="h-full rounded-full bg-gradient-to-r from-white/80 to-white shadow-[0_0_0_1px_rgba(255,255,255,0.4)] transition-[width] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
          {/* Capsule seam */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-blue-600/40" />
        </div>
        {target !== PASS_MARK && (
          <div
            className="absolute -bottom-1 -top-1 w-0.5 -translate-x-1/2 rounded-full bg-amber-200"
            style={{ left: `${targetPercent}%` }}
          />
        )}
      </div>
      <div className="mt-1.5 grid grid-cols-3 text-[11px] font-medium tabular-nums text-white/75">
        <span>0</span>
        <span className="text-center">10</span>
        <span className="text-right">20</span>
      </div>
    </div>
  );
}

function TargetPicker({ target, onChange }: { target: number; onChange: (t: number) => void }) {
  return (
    <div role="group" aria-label="Objectif de moyenne" className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs font-medium text-white/80">
        <Target size={14} weight="bold" aria-hidden />
        Objectif
      </span>
      <div className="flex gap-1 rounded-full bg-black/10 p-0.5 ring-1 ring-inset ring-white/15">
        {TARGETS.map((value) => {
          const selected = value === target;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(value)}
              className={cn(
                "h-7 min-w-[2.25rem] rounded-full px-2 text-xs font-bold tabular-nums transition-colors focus-visible:outline-white",
                selected ? "bg-white text-blue-700 shadow-sm" : "text-white/80 hover:bg-white/15 hover:text-white"
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const ResultPanel = forwardRef<HTMLElement, PanelProps>(function ResultPanel(
  { summary, loaded, target, onTargetChange },
  ref
) {
  const { average, completedCount, moduleCount, completedCoeff, totalCoeff } = summary;
  const empty = !loaded || average === null;
  return (
    <section
      ref={ref}
      id="resultat"
      aria-labelledby="resultat-heading"
      className="relative isolate scroll-mt-24 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-5 text-white shadow-[0_18px_40px_-18px_rgba(37,99,235,0.75)] sm:p-6"
    >
      <div
        aria-hidden
        className="molecule-pattern absolute inset-0 -z-10 text-white opacity-[0.07] [mask-position:30px_-10px]"
      />
      <div className="flex items-center justify-between gap-3">
        <h2 id="resultat-heading" className="text-sm font-semibold text-white/90">
          Moyenne générale
        </h2>
        <StatusChip summary={summary} loaded={loaded} />
      </div>

      <p className="mt-3 flex items-baseline gap-2 tabular-nums" aria-live="polite">
        <span className={cn("text-6xl font-bold tracking-tight", empty && "text-white/45")}>
          {empty ? "–" : formatMark(average)}
        </span>
        <span className="text-lg font-medium text-white/75">/ 20</span>
      </p>

      <div className="mt-3">
        <Scale value={loaded ? average : null} target={target} />
      </div>

      <div className="mt-5">
        <TargetPicker target={target} onChange={onTargetChange} />
      </div>
      <div className="mt-3 min-h-[2.75rem] text-sm leading-relaxed text-white/90">
        {loaded ? <Guidance summary={summary} target={target} /> : null}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-inset ring-white/10">
          <dt className="text-xs text-white/80">Modules remplis</dt>
          <dd className="mt-0.5 font-bold tabular-nums">
            {completedCount}
            <span className="font-medium text-white/75"> / {moduleCount}</span>
          </dd>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-inset ring-white/10">
          <dt className="text-xs text-white/80">Coeff. comptés</dt>
          <dd className="mt-0.5 font-bold tabular-nums">
            {completedCoeff}
            <span className="font-medium text-white/75"> / {totalCoeff}</span>
          </dd>
        </div>
      </dl>
    </section>
  );
});

export default ResultPanel;

/** Compact summary pinned to the bottom of the screen once the full panel has scrolled out of view. */
export function ResultBar({ summary, loaded, hidden }: Props & { hidden: boolean }) {
  const { average, completedCount, moduleCount } = summary;
  return (
    <div className="pointer-events-none sticky bottom-0 z-[5] mt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 xl:hidden">
      <a
        href="#resultat"
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : undefined}
        className={cn(
          "mx-auto flex max-w-md items-center justify-between gap-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 pl-5 pr-2 text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)] transition-[opacity,transform] duration-300 ease-out",
          hidden ? "translate-y-3 opacity-0" : "pointer-events-auto translate-y-0 opacity-100"
        )}
      >
        <span className="flex items-baseline gap-2 tabular-nums">
          <span className="text-xs text-white/85">Moyenne</span>
          <span className="text-xl font-bold">{loaded && average !== null ? formatMark(average) : "–"}</span>
          <span className="text-xs text-white/85">
            · {completedCount}/{moduleCount} modules
          </span>
        </span>
        <StatusChip summary={summary} loaded={loaded} className="py-1.5" />
      </a>
    </div>
  );
}
