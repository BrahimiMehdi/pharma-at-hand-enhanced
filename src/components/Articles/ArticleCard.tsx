import Link from "next/link";
import AuthorCard from "./AuthorCard";
import { ArrowRight } from "@/components/icons";

type Props = {
  article: ArticleType;
  featured?: boolean;
};

function ArticleCard({ article, featured = false }: Props) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group flex h-full overflow-hidden rounded-2xl border bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary ${
        featured ? "flex-col md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "flex-col"
      }`}
    >
      <div className={`overflow-hidden bg-muted ${featured ? "aspect-[16/9] md:aspect-auto md:min-h-[18rem]" : "aspect-[16/9]"}`}>
        {article.image?.url && (
          <img
            src={article.image.url}
            alt=""
            width={article.image.width}
            height={article.image.height}
            loading={featured ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col gap-3 ${featured ? "p-6 md:p-8" : "p-5"}`}>
        <h2 className={`font-bold tracking-tight [text-wrap:balance] ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>{article.title}</h2>
        {article.description && (
          <p className={`text-muted-foreground ${featured ? "line-clamp-4" : "line-clamp-2 text-sm"}`}>{article.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          {article.author && <AuthorCard author={article.author} size={featured ? "md" : "sm"} />}
          <ArrowRight size={18} aria-hidden className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
