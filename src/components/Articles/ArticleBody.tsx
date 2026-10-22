import { Children, isValidElement, type ReactNode } from "react";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import type { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import { ArrowUpRight, Quotes } from "@/components/icons";
import { createSlugger } from "@/lib/rich-text";
import { toEmbed } from "@/lib/video";

const SITE_HOSTS = ["pharma-at-hand.app", "www.pharma-at-hand.app"];

function reactText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return reactText(node.props.children);
  return Children.toArray(node).map(reactText).join("");
}

function internalPath(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    return SITE_HOSTS.includes(url.hostname) ? `${url.pathname}${url.search}${url.hash}` : null;
  } catch {
    return null;
  }
}

type Props = { content: unknown };

export default function ArticleBody({ content }: Props) {
  // A fresh slugger per render keeps heading ids in document order, matching tableOfContents().
  const slug = createSlugger();

  const heading = (Tag: "h2" | "h3" | "h4" | "h5" | "h6") =>
    function Heading({ children }: { children: ReactNode }) {
      const id = slug(reactText(children).trim());
      return (
        <Tag id={id} className="group scroll-mt-24">
          {children}
          <a
            href={`#${id}`}
            aria-hidden
            tabIndex={-1}
            className="not-prose ml-2 font-normal text-muted-foreground no-underline opacity-0 transition-opacity group-hover:opacity-100"
          >
            #
          </a>
        </Tag>
      );
    };

  const renderers: NodeRendererType = {
    // Content headings were shifted down a level when normalising; h1 never reaches here.
    h2: heading("h2"),
    h3: heading("h3"),
    h4: heading("h4"),
    h5: heading("h5"),
    h6: heading("h6"),
    a: ({ children, href = "", title, openInNewTab }) => {
      const path = internalPath(href);
      if (path && !openInNewTab) {
        return (
          <Link href={path} title={title}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} title={title} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-0.5">
          {children}
          <ArrowUpRight size={13} weight="bold" aria-hidden className="shrink-0 self-center" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    },
    img: ({ src, altText, title, width, height }) => (
      <figure className="my-8">
        <img
          src={src}
          alt={altText ?? title ?? ""}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="my-0 w-full rounded-xl border object-cover"
        />
        {title && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{title}</figcaption>}
      </figure>
    ),
    video: ({ src, title }) => (
      <video src={src} title={title} controls preload="metadata" className="my-8 aspect-video w-full rounded-xl border bg-black" />
    ),
    iframe: ({ url = "" }) => {
      const embed = toEmbed(url);
      return (
        <div className="relative my-8 aspect-video overflow-hidden rounded-xl border bg-muted">
          <iframe
            src={embed?.src ?? url}
            title="Embedded content"
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="not-prose relative my-8 rounded-2xl bg-muted/60 px-6 py-5 text-[1.05rem] leading-relaxed text-foreground">
        <Quotes size={28} weight="fill" aria-hidden className="mb-2 text-primary/50" />
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="not-prose my-8 overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm [&_td]:border-t [&_td]:px-4 [&_td]:py-2.5 [&_th]:bg-muted/60 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold">
          {children}
        </table>
      </div>
    ),
    code_block: ({ children }) => (
      <pre className="overflow-x-auto rounded-xl border bg-muted/60 p-4 text-sm text-foreground">
        <code>{children}</code>
      </pre>
    ),
  };

  return <RichText content={content as never} renderers={renderers} />;
}
