import React from 'react'
import Image from 'next/image'
type Props = {
    author:AuthorType;
    bg?:boolean
}

function AuthorCard({author,bg}: Props) {
  return (
    <div className="flex w-full gap-x-4">
        <Image
        className={`w-12 ${bg ? "bg-background dark:bg-foreground" :"bg-transparent"} rounded-full object-contain border p-1 aspect-square`}
          alt={author.name}
          src={author.photo.url}
          width={author.photo.width}
          height={author.photo.height}
        />
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">{author.name}</p>
          <p className={`italic text-xs ${bg ? "text-background dark:text-foreground" : " text-muted-foreground"}`}>{author.description}</p>
        </div>
      </div>
  )
}

export default AuthorCard