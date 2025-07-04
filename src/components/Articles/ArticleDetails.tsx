import React from 'react'
import AuthorCard from "@/components/Articles/AuthorCard";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
type Props = {
    article:ArticleType
}

function ArticleDetails({article}: Props) {
  return (
    <article className="flex prose  w-full max-w-5xl flex-col gap-y-8">
        <Image
          className="w-full rounded-lg h-72 lg:h-96 object-cover"
          alt={article.title}
          src={article.image.url}
          width={article.image.width}
          height={article.image.height}
        />
        <div className="w-full flex items-center gap-x-8">
          <AuthorCard author={article.author} />
          {article.author.instagram && (
            <a href={article.author.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram strokeWidth={1.2} fill="#000" stroke="#fff" size={"42px"} className="mr-2" />
            </a>
          )}
        </div>
        <h1 className="text-5xl text-foreground font-bold">{article.title}</h1>
        <div className="h-full w-full relative">
          <section className="mt-4 prose dark:prose-invert">
            <RichText
              
              content={article.content.raw}
            />
          </section>
        </div>
      </article>
  )
}

export default ArticleDetails