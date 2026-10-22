export type GradeField = "T1" | "T2" | "T3" | "TP";
export type ModuleGrades = Partial<Record<GradeField, string>>;

export const PASS_MARK = 10;
export const MAX_MARK = 20;

// Storage keys predate this calculator; keep them identical so saved marks survive.
const legacyKeyPrefix: Record<GradeField, string> = { T1: "T1", T2: "T2", T3: "T3", TP: "T4" };
export const storageKey = (field: GradeField, module: Pick<ModuleType, "name" | "year">) =>
  `${legacyKeyPrefix[field]}${module.name}${module.year}`;

/** Accepts "12", "12.5" and the French "12,5". Returns undefined when empty, NaN when invalid. */
export function parseMark(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined;
  const trimmed = raw.trim().replace(",", ".");
  if (trimmed === "") return undefined;
  if (!/^\d{0,2}(\.\d*)?$/.test(trimmed)) return NaN;
  const value = Number(trimmed);
  if (Number.isNaN(value) || value < 0 || value > MAX_MARK) return NaN;
  return value;
}

export const isInvalidMark = (raw: string | undefined) => Number.isNaN(parseMark(raw));

export type ModuleResult =
  | { status: "empty" | "invalid"; formula: string }
  | {
      status: "incomplete";
      formula: string;
      /** The missing exam, and the mark it needs for the module to reach the pass mark (when computable). */
      missing: "T1" | "T2";
      neededForPass: number | null;
    }
  | { status: "complete"; average: number; weighted: number; formula: string };

/**
 * Same rules as the original calculator: T1 and T2 are required, T3 is optional
 * (two-exam modules), and when the module has a TP mark it counts for one third.
 */
export function computeModule(module: Pick<ModuleType, "coeff" | "tp">, grades: ModuleGrades): ModuleResult {
  const fields: GradeField[] = module.tp ? ["T1", "T2", "T3", "TP"] : ["T1", "T2", "T3"];
  const values = Object.fromEntries(fields.map((f) => [f, parseMark(grades[f])])) as Partial<Record<GradeField, number>>;

  if (fields.some((f) => Number.isNaN(values[f]))) {
    return { status: "invalid", formula: "Notes entre 0 et 20" };
  }
  const { T1: t1, T2: t2, T3: t3, TP: tp } = values;
  if (fields.every((f) => values[f] === undefined)) {
    return { status: "empty", formula: "Saisissez au moins T1 et T2." };
  }
  if (t1 === undefined || t2 === undefined) {
    const missing = t1 === undefined ? "T1" : "T2";
    const known = (t1 ?? t2) as number | undefined;
    let neededForPass: number | null = null;
    // Only predictable when T3 is empty and the TP situation is settled (no TP, or TP already entered).
    if (known !== undefined && t3 === undefined && (!module.tp || tp !== undefined)) {
      neededForPass = tp !== undefined ? PASS_MARK * 3 - known - tp : PASS_MARK * 2 - known;
    }
    return { status: "incomplete", formula: `Il manque ${missing}`, missing, neededForPass };
  }

  let average: number;
  let formula: string;
  if (t3 === undefined) {
    if (tp !== undefined) {
      average = (t1 + t2 + tp) / 3;
      formula = "(T1 + T2 + TP) / 3";
    } else {
      average = (t1 + t2) / 2;
      formula = "(T1 + T2) / 2";
    }
  } else if (tp !== undefined) {
    average = (((t1 + t2 + t3) / 3) * 2 + tp) / 3;
    formula = "(moy. examens × 2 + TP) / 3";
  } else {
    average = (t1 + t2 + t3) / 3;
    formula = "(T1 + T2 + T3) / 3";
  }
  return { status: "complete", average, weighted: average * module.coeff, formula };
}

/** Truncate rather than round, so 9.996 never displays as a passing 10.00. */
export const formatMark = (value: number) => (Math.floor(value * 100 + 1e-9) / 100).toFixed(2);

export type Summary = {
  totalCoeff: number;
  completedCoeff: number;
  completedCount: number;
  moduleCount: number;
  weightedSum: number;
  average: number | null;
  isComplete: boolean;
  /** Average needed across the remaining modules to reach the pass mark. */
  neededForPass: number | null;
  remainingCoeff: number;
};

/** Average the remaining modules need for the general average to reach `target`. */
export const neededForTarget = (summary: Summary, target: number) =>
  summary.isComplete || summary.remainingCoeff <= 0
    ? null
    : (target * summary.totalCoeff - summary.weightedSum) / summary.remainingCoeff;

export function summarize(modules: ModuleType[], results: ModuleResult[]): Summary {
  let totalCoeff = 0;
  let completedCoeff = 0;
  let completedCount = 0;
  let weightedSum = 0;
  modules.forEach((module, i) => {
    totalCoeff += module.coeff;
    const result = results[i];
    if (result.status === "complete") {
      completedCoeff += module.coeff;
      completedCount += 1;
      weightedSum += result.weighted;
    }
  });
  const isComplete = completedCount === modules.length && modules.length > 0;
  const remainingCoeff = totalCoeff - completedCoeff;
  return {
    totalCoeff,
    completedCoeff,
    completedCount,
    moduleCount: modules.length,
    weightedSum,
    average: completedCoeff > 0 ? weightedSum / completedCoeff : null,
    isComplete,
    neededForPass: !isComplete && remainingCoeff > 0 ? (PASS_MARK * totalCoeff - weightedSum) / remainingCoeff : null,
    remainingCoeff,
  };
}
