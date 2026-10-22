import { NextResponse } from "next/server";
import { TOPIC_LABELS, contactSchema } from "@/lib/contact-schema";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best effort: each serverless instance keeps its own window, which still stops bursts from one client.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    });
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Google Sheets evaluates cells starting with these characters as formulas.
const neutralizeFormula = (value: string) => (/^[=+\-@\t\r]/.test(value) ? `'${value}` : value);

const error = (message: string, status: number) => NextResponse.json({ ok: false, error: message }, { status });

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return error("Forbidden", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return error("Unsupported media type", 415);
  }
  if (isRateLimited(clientIp(request))) return error("Too many requests, try again later", 429);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return error("Payload too large", 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return error("Invalid JSON", 400);
  }

  // Honeypot: real users never see this field, bots fill it. Pretend success.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Same schema as the client, so this only triggers for tampered or scripted requests.
    return NextResponse.json(
      { ok: false, error: "Invalid form data", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const sheetApi = process.env.SHEET_API;
  if (!sheetApi) {
    console.error("contact: SHEET_API is not configured");
    return error("Service unavailable", 503);
  }

  const { topic, name, email, message } = parsed.data;
  try {
    // The action is fixed server-side; clients can no longer choose which sheet action runs.
    const url = new URL(sheetApi);
    url.searchParams.set("action", "addContact");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "addContact",
        name: neutralizeFormula(name),
        email: neutralizeFormula(email),
        message: neutralizeFormula(`[${TOPIC_LABELS[topic]}] ${message}`),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) return error("Could not send your message", 502);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: upstream request failed", err);
    return error("Could not send your message", 502);
  }
}
