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
    <article className="flex  w-full max-w-5xl flex-col gap-y-8">
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
        <h1 className="text-5xl font-bold">{article.title}</h1>
        <div className="h-full w-full relative">
          <section className="mt-4">
            <RichText
              renderers={{
                h1: ({ children }) => <h1 className="text-3xl my-10 font-bold">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl my-8 font-bold">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl my-6 font-bold">{children}</h3>,
                li:({children})=> <li className='list-item my-3 list-disc px-2 list-outside'>{children}</li>,
                p : ({children}) => <p className='my-6'>{children}</p>
              }}
              content={article.content.raw}
            />
          </section>
        </div>
      </article>
  )
}

export default ArticleDetails