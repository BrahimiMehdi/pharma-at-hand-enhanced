"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowCounterClockwise, CaretDown, Info, Trash } from "@/components/icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  GradeField,
  ModuleGrades,
  MAX_MARK,
  ModuleResult,
  PASS_MARK,
  computeModule,
  formatMark,
  storageKey,
  summarize,
} from "@/lib/moyenne";
import MarkInput from "./MarkInput";
import ResultPanel, { ResultBar, TARGETS } from "./ResultPanel";

type Props = {
  modules: ModuleType[];
};

const FIELDS: GradeField[] = ["T1", "T2", "T3", "TP"];
const TARGET_KEY = "moyenne_objectif";

function readStored(key: string): string | undefined {
  const raw = window.localStorage.getItem(key);
  if (raw === null) return undefined;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" && parsed !== "" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function writeStored(key: string, value: string | undefined) {
  try {
    if (value === undefined || value === "") window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or disabled (private mode); the calculator still works in memory.
  }
}

export default function Calculator({ modules }: Props) {
  const [grades, setGrades] = useState<Record<string, ModuleGrades>>({});
  const [loaded, setLoaded] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);
  const [target, setTarget] = useState(PASS_MARK);
  const listRef = useRef<HTMLOListElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initial: Record<string, ModuleGrades> = {};
    modules.forEach((module) => {
      const entry: ModuleGrades = {};
      FIELDS.forEach((field) => {
        const value = readStored(storageKey(field, module));
        if (value !== undefined) entry[field] = value;
      });
      initial[module.name] = entry;
    });
    setGrades(initial);
    const savedTarget = Number(readStored(TARGET_KEY));
    if (TARGETS.includes(savedTarget)) setTarget(savedTarget);
    setLoaded(true);
  }, [modules]);

  // The compact bar only appears once the full result panel has scrolled away.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setPanelVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  const setMark = useCallback((module: ModuleType, field: GradeField, value: string) => {
    setGrades((prev) => ({ ...prev, [module.name]: { ...prev[module.name], [field]: value } }));
    writeStored(storageKey(field, module), value);
  }, []);

  const changeTarget = useCallback((value: number) => {
    setTarget(value);
    writeStored(TARGET_KEY, value === PASS_MARK ? undefined : String(value));
  }, []);

  const replaceAll = useCallback(
    (next: Record<string, ModuleGrades>) => {
      setGrades(next);
      modules.forEach((module) => FIELDS.forEach((field) => writeStored(storageKey(field, module), next[module.name]?.[field])));
    },
    [modules]
  );

  const results: ModuleResult[] = useMemo(
    () => modules.map((module) => computeModule(module, grades[module.name] ?? {})),
    [modules, grades]
  );
  const summary = useMemo(() => summarize(modules, results), [modules, results]);
  const hasAnyMark = Object.values(grades).some((g) => Object.values(g).some((v) => v && v.trim() !== ""));

  const clearModule = (module: ModuleType) => {
    const snapshot = grades;
    replaceAll({ ...grades, [module.name]: {} });
    toast(`Notes de ${module.name} effacées`, { action: { label: "Annuler", onClick: () => replaceAll(snapshot) } });
  };

  const clearAll = () => {
    const snapshot = grades;
    replaceAll({});
    toast("Toutes les notes ont été effacées", { action: { label: "Annuler", onClick: () => replaceAll(snapshot) } });
  };

  // Enter jumps to the next mark, like moving down a spreadsheet.
  const focusNext = (current: HTMLInputElement) => {
    const inputs = Array.from(listRef.current?.querySelectorAll<HTMLInputElement>("input[data-mark]") ?? []);
    const next = inputs[inputs.indexOf(current) + 1];
    if (next) next.focus();
    else current.blur();
  };

  return (
    <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start xl:gap-10">
      <aside className="flex flex-col gap-4 xl:sticky xl:top-8 xl:order-2">
        <ResultPanel ref={panelRef} summary={summary} loaded={loaded} target={target} onTargetChange={changeTarget} />
        <details className="group rounded-xl border bg-card p-4 text-sm">
          <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-3 font-semibold [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <Info size={18} weight="duotone" aria-hidden className="text-primary" />
              Comment la moyenne est calculée
            </span>
            <CaretDown
              size={16}
              aria-hidden
              className="text-muted-foreground transition-transform group-open:rotate-180"
            />
          </summary>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <strong className="font-semibold text-foreground">T1 et T2</strong> sont nécessaires. Laissez T3 vide si le
              module n’a que deux examens.
            </li>
            <li>
              Avec <strong className="font-semibold text-foreground">TP</strong>, la note de TP compte pour un tiers de la
              moyenne du module.
            </li>
            <li>Moyenne générale = Σ (moyenne × coeff) ÷ Σ coefficients.</li>
            <li>12.5 ou 12,5 : les deux marchent. Vos notes restent sur cet appareil.</li>
          </ul>
        </details>
      </aside>

      <section aria-labelledby="modules-heading" className="min-w-0 xl:order-1">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 id="modules-heading" className="text-lg font-semibold">
            Vos notes <span className="font-normal text-muted-foreground">sur 20</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            disabled={!hasAnyMark}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Trash size={16} weight="duotone" aria-hidden />
            Tout effacer
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card">
          <div
            aria-hidden
            className="hidden grid-cols-[minmax(0,1fr)_auto_4.75rem] items-center gap-5 border-b bg-muted/50 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground md:grid"
          >
            <span>Module</span>
            <span className="flex gap-2">
              {FIELDS.map((field) => (
                <span key={field} className="w-14 text-center">
                  {field}
                  {field === "T3" && <span className="font-medium normal-case tracking-normal opacity-70"> opt.</span>}
                </span>
              ))}
              <span className="w-9" />
            </span>
            <span className="text-right">Moyenne</span>
          </div>

          <ol ref={listRef} className="divide-y">
            {modules.map((module, index) => {
              const moduleGrades = grades[module.name] ?? {};
              const result = results[index];
              const hasValue = Object.values(moduleGrades).some((v) => v && v.trim() !== "");
              const complete = result.status === "complete";
              const passing = complete && result.average >= PASS_MARK;
              const hint =
                result.status === "empty" ? (module.tp ? "Avec TP" : null) : result.formula;
              return (
                <li key={module.name} className={cn("transition-colors", complete && "bg-primary/[0.025]")}>
                  <fieldset
                    aria-labelledby={`module-${index}`}
                    className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 px-4 py-4 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto_4.75rem] md:items-center md:gap-5"
                  >
                    <div className="col-start-1 row-start-1 min-w-0">
                      <h3 id={`module-${index}`} className="flex items-center gap-2.5 font-semibold leading-snug">
                        <Capsule color={module.color?.hex} />
                        <span className="truncate" title={module.name}>
                          {module.name}
                        </span>
                      </h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 pl-[1.625rem] text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-2 py-0.5 font-semibold tabular-nums text-foreground/80">
                          Coef. {module.coeff}
                        </span>
                        {hint && result.status !== "incomplete" && (
                          <span className={cn(result.status === "invalid" && "font-medium text-destructive dark:text-red-400")}>{hint}</span>
                        )}
                        {result.status === "incomplete" && <NeededHint result={result} />}
                      </p>
                    </div>

                    <div className="col-span-2 col-start-1 row-start-2 flex items-end gap-2 md:col-span-1 md:col-start-2 md:row-start-1 md:items-center">
                      <div className="grid flex-1 grid-cols-4 gap-2 md:flex md:flex-none">
                        {FIELDS.map((field) =>
                          field === "TP" && !module.tp ? (
                            <span
                              key={field}
                              className="hidden h-11 w-14 items-center justify-center text-xs text-muted-foreground/50 md:flex"
                            >
                              <span className="sr-only">Pas de TP</span>
                              <span aria-hidden>—</span>
                            </span>
                          ) : (
                            <MarkInput
                              key={field}
                              id={`${index}-${field}`}
                              label={field}
                              hint={field === "T3" ? "opt." : undefined}
                              value={moduleGrades[field] ?? ""}
                              disabled={!loaded}
                              onChange={(value) => setMark(module, field, value)}
                              onEnter={focusNext}
                            />
                          )
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => clearModule(module)}
                        aria-label={`Effacer les notes de ${module.name}`}
                        className={cn("h-11 w-9 shrink-0 text-muted-foreground", !hasValue && "invisible")}
                      >
                        <ArrowCounterClockwise size={16} weight="bold" aria-hidden />
                      </Button>
                    </div>

                    <div className="col-start-2 row-start-1 flex flex-col items-end tabular-nums md:col-start-3" aria-live="polite">
                      <p
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-base font-bold leading-7",
                          !complete && "text-muted-foreground/50",
                          complete && passing && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                          complete && !passing && "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                        )}
                      >
                        {complete ? formatMark(result.average) : "–"}
                        <span className="sr-only"> sur 20</span>
                      </p>
                      <p className="mt-1 h-4 pr-2 text-[11px] text-muted-foreground">
                        {complete ? `× ${module.coeff} = ${formatMark(result.weighted)}` : ""}
                      </p>
                    </div>
                  </fieldset>
                </li>
              );
            })}
          </ol>
        </div>

        <ResultBar summary={summary} loaded={loaded} hidden={panelVisible} />
      </section>
    </div>
  );
}

/** A two-tone capsule in the module's colour. */
function Capsule({ color }: { color?: string }) {
  return (
    <span
      aria-hidden
      className="relative h-3 w-[1.125rem] shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/15"
      style={{ background: color ? `linear-gradient(90deg, ${color} 50%, color-mix(in srgb, ${color} 35%, transparent) 50%)` : undefined }}
    />
  );
}

function NeededHint({ result }: { result: Extract<ModuleResult, { status: "incomplete" }> }) {
  const { neededForPass, missing } = result;
  if (neededForPass === null) return <span>Il manque {missing}</span>;
  if (neededForPass > MAX_MARK)
    return <span className="text-amber-700 dark:text-amber-300">Il manque {missing} · 10 hors d’atteinte</span>;
  if (neededForPass <= 0)
    return <span className="text-emerald-700 dark:text-emerald-300">Il manque {missing} · 10 déjà assuré</span>;
  return (
    <span>
      Visez{" "}
      <strong className="font-semibold tabular-nums text-foreground">
        {formatMark(Math.ceil(neededForPass * 100) / 100)}
      </strong>{" "}
      en {missing} pour 10
    </span>
  );
}
