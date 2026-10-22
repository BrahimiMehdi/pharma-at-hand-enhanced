/** Academic year a drive covers, read from names like "2024/2025" or "2024-2025" (the later year). */
export function driveYear(name: string): number | null {
  const match = name.match(/(\d{4})\s*[/\-–]\s*(\d{2,4})/);
  if (!match) return null;
  const end = match[2].length === 2 ? Number(match[1].slice(0, 2) + match[2]) : Number(match[2]);
  return Number.isFinite(end) ? end : null;
}

/** The single drive to feature: the most recent academic year, else the one flagged as main, else none. */
export function latestDrive(drives: DriveType[]): DriveType | undefined {
  let best: DriveType | undefined;
  let bestYear = -Infinity;
  for (const drive of drives) {
    const year = driveYear(drive.name);
    if (year !== null && year > bestYear) {
      best = drive;
      bestYear = year;
    }
  }
  return best ?? drives.find((drive) => drive.isMain);
}
