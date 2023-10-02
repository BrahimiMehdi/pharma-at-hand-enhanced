import Image from "next/image";
import Link from "next/link";
import AuthorCard from "./AuthorCard";
type Props = {
  article: ArticleType;
};

function ArticleCard({ article }: Props) {
  return (
    <Link href={`/articles/${article.slug}`} className="h-96 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary justify-between rounded-xl shadow-sm w-full border p-4 flex flex-col gap-y-4">
      <Image
      alt={article.title}
      src={article.image.url}
      width={article.image.width}
      height={article.image.height}
       className="w-full object-cover h-40  rounded-lg" />

      <h2 className="font-bold text-2xl">{article.title}</h2>
      <p className="text-card-foreground mb-2 text-justify"> {article.description}</p>
      <AuthorCard author={article.author} />
    </Link>
  );
}

export default ArticleCard;
