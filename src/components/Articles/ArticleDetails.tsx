import AuthorCard from "@/components/Articles/AuthorCard";
import ArticleBody from "@/components/Articles/ArticleBody";
import { CaretDown, Clock, InstagramLogo, ListBullets } from "@/components/icons";
import { normalizeContent, readingMinutes, tableOfContents, type TocEntry } from "@/lib/rich-text";

type Props = {
  article: ArticleType;
};

function TocList({ entries }: { entries: TocEntry[] }) {
  return (
    <ol className="space-y-1 text-sm">
      {entries.map((entry) => (
        <li key={entry.id} className={entry.level === 3 ? "pl-4" : undefined}>
          <a
            href={`#${entry.id}`}
            className="block rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function ArticleDetails({ article }: Props) {
  const content = normalizeContent(article.content?.raw ?? []);
  const toc = tableOfContents(content);
  const minutes = readingMinutes(content);
  const showToc = toc.length >= 3;

  return (
    <article className="w-full">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">{article.title}</h1>
        {article.description && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.description}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {article.author && <AuthorCard author={article.author} />}
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={16} weight="duotone" aria-hidden />
            {minutes} min read
          </span>
          {article.author?.instagram && (
            <a
              href={article.author.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <InstagramLogo size={16} weight="duotone" aria-hidden />
              Instagram
            </a>
          )}
        </div>
      </header>

      {article.image?.url && (
        <img
          src={article.image.url}
          alt=""
          width={article.image.width}
          height={article.image.height}
          className="mt-8 aspect-[2/1] w-full max-w-5xl rounded-2xl border object-cover"
        />
      )}

      <div className={`mt-10 grid gap-10 ${showToc ? "xl:grid-cols-[minmax(0,1fr)_15rem]" : ""}`}>
        <div className="min-w-0">
          {showToc && (
            <details className="group mb-8 rounded-xl border bg-card xl:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <ListBullets size={18} weight="duotone" aria-hidden className="text-primary" />
                  On this page
                </span>
                <CaretDown size={16} weight="bold" aria-hidden className="text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t px-2 py-2">
                <TocList entries={toc} />
              </div>
            </details>
          )}
          <div className="prose prose-slate max-w-[70ch] dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:my-1 prose-li:marker:text-primary/70">
            <ArticleBody content={content} />
          </div>
        </div>

        {showToc && (
          <aside className="hidden xl:block">
            <nav aria-label="On this page" className="sticky top-8">
              <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">On this page</p>
              <TocList entries={toc} />
            </nav>
          </aside>
        )}
      </div>
    </article>
  );
}

export default ArticleDetails;
