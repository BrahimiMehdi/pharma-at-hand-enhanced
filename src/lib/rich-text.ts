// Helpers that clean up Hygraph rich-text ASTs before rendering, and derive a table of contents
// and reading time from them. Articles are authored with stray empty paragraphs and several
// heading-one blocks; the page already owns the only <h1>, so headings are shifted down a level.

type TextNode = { text: string; [mark: string]: unknown };
type ElementNode = { type: string; children: RichNode[]; [key: string]: unknown };
type RichNode = TextNode | ElementNode;

export type RichContent = { children: ElementNode[] } | ElementNode[];
export type TocEntry = { id: string; text: string; level: 2 | 3 };

const HEADINGS = ["heading-one", "heading-two", "heading-three", "heading-four", "heading-five", "heading-six"];
const MEDIA = new Set(["image", "video", "iframe", "embed", "table"]);

const isText = (node: RichNode): node is TextNode => typeof (node as TextNode).text === "string";

export function nodeText(node: RichNode): string {
  if (isText(node)) return node.text;
  return (node.children ?? []).map(nodeText).join("");
}

function hasMedia(node: RichNode): boolean {
  if (isText(node)) return false;
  return MEDIA.has(node.type) || (node.children ?? []).some(hasMedia);
}

function isBlank(node: ElementNode) {
  return !hasMedia(node) && nodeText(node).replace(/ /g, " ").trim() === "";
}

function clean(nodes: RichNode[]): RichNode[] {
  const out: RichNode[] = [];
  for (const node of nodes) {
    if (isText(node)) {
      out.push(node);
      continue;
    }
    // Drop spacer paragraphs and empty headings/list items.
    if ((node.type === "paragraph" || HEADINGS.includes(node.type) || node.type === "list-item") && isBlank(node)) continue;
    const level = HEADINGS.indexOf(node.type);
    const type = level >= 0 ? HEADINGS[Math.min(level + 1, HEADINGS.length - 1)] : node.type;
    const children = clean(node.children ?? []);
    if ((node.type === "bulleted-list" || node.type === "numbered-list") && children.length === 0) continue;
    out.push({ ...node, type, children: children.length ? children : [{ text: "" }] });
  }
  return out;
}

export function normalizeContent(raw: RichContent): { children: ElementNode[] } {
  const children = Array.isArray(raw) ? raw : raw?.children ?? [];
  return { children: clean(children) as ElementNode[] };
}

export function slugify(text: string) {
  const slug = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

/** Gives every slug a unique suffix in document order; used by both the TOC and the heading renderer. */
export function createSlugger() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
}

export function tableOfContents(content: { children: ElementNode[] }): TocEntry[] {
  const slug = createSlugger();
  const entries: TocEntry[] = [];
  const walk = (nodes: RichNode[]) => {
    for (const node of nodes) {
      if (isText(node)) continue;
      // Every heading consumes a slug so ids stay in sync with the renderer.
      if (HEADINGS.includes(node.type)) {
        const text = nodeText(node).trim();
        const id = slug(text);
        if (node.type === "heading-two" || node.type === "heading-three") {
          entries.push({ id, text, level: node.type === "heading-two" ? 2 : 3 });
        }
        continue;
      }
      walk(node.children ?? []);
    }
  };
  walk(content.children);
  return entries;
}

export function readingMinutes(content: { children: ElementNode[] }) {
  const words = content.children.map(nodeText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
