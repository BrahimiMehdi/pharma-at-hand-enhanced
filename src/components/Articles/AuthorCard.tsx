type Props = {
  author: AuthorType;
  size?: "sm" | "md";
};

function AuthorCard({ author, size = "md" }: Props) {
  const avatar = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return (
    <div className="flex min-w-0 items-center gap-3">
      {author.photo?.url ? (
        <img
          src={author.photo.url}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className={`${avatar} shrink-0 rounded-full border bg-white object-contain p-0.5`}
        />
      ) : (
        <span className={`${avatar} grid shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold`}>
          {author.name.slice(0, 1)}
        </span>
      )}
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-semibold text-foreground">{author.name}</p>
        {author.description && size === "md" && (
          <p className="truncate text-xs text-muted-foreground">{author.description}</p>
        )}
      </div>
    </div>
  );
}

export default AuthorCard;
