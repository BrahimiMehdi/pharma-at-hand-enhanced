import React from 'react'
import Image from 'next/image'
type Props = {
    author:AuthorType
}

function AuthorCard({author}: Props) {
  return (
    <div className="flex w-full gap-x-4">
        <Image
        className="w-12 rounded-full aspect-square"
          alt={author.name}
          src={author.photo.url}
          width={author.photo.width}
          height={author.photo.height}
        />
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">{author.name}</p>
          <p className="italic text-xs text-muted-foreground">{author.description}</p>
        </div>
      </div>
  )
}

export default AuthorCard