import React from 'react'
import Image from 'next/image'
type Props = {
    author:AuthorType;
    bg?:boolean
}

function AuthorCard({author,bg}: Props) {
  return (
    <div className="flex items-center w-full gap-x-4">
        <Image
        className={`w-16 ${bg ? "bg-background dark:bg-foreground" :"bg-transparent"} rounded-full object-contain border p-1 aspect-square`}
          alt={author.name}
          src={author.photo.url}
          width={author.photo.width}
          height={author.photo.height}
        />
        <div className="flex flex-col justify-center gap-y-2">
          <p className="font-semibold  mt-0">{author.name}</p>
          <p className={`italic text-xs  mt-0 ${bg ? "text-background dark:text-foreground" : " text-muted-foreground"}`}>{author.description}</p>
        </div>
      </div>
  )
}

export default AuthorCard