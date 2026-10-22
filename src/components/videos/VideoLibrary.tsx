"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowSquareOut, Globe, Play, Playlist, YoutubeLogo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Embed, toEmbed } from "@/lib/video";

type Props = {
  modules: ModuleType[];
  /** Show a heading per module (when the page lists several). */
  showModuleHeadings: boolean;
};

type Item = {
  key: string;
  video: VideoType;
  group: string;
  module: ModuleType;
  embed: Embed | null;
};

type Group = { title: string; items: Item[] };

const PARAM = "v";

function buildGroups(modules: ModuleType[]) {
  const all: Item[] = [];
  const byModule = modules.map((module, m) => {
    const groups: Group[] = module.cours
      .filter((cour) => cour.video.length !== 0)
      .map((cour, c) => ({
        title: cour.name,
        items: cour.video.map((video, i) => ({ key: `${m}-${c}-${i}`, video, group: cour.name, module, embed: toEmbed(video.link) })),
      }));
    if (module.video.length !== 0) {
      groups.push({
        title: "Channels & playlists",
        items: module.video.map((video, i) => ({
          key: `${m}-p-${i}`,
          video,
          group: "Channels & playlists",
          module,
          embed: toEmbed(video.link),
        })),
      });
    }
    groups.forEach((group) => all.push(...group.items));
    return { module, groups };
  });
  return { byModule, all };
}

function Flag({ english }: { english: boolean }) {
  return (
    <img
      src={english ? "/england.png" : "/france.png"}
      alt={english ? "English" : "French"}
      title={english ? "In English" : "In French"}
      width={20}
      height={14}
      className="h-3.5 w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
    />
  );
}

export default function VideoLibrary({ modules, showModuleHeadings }: Props) {
  const { byModule, all } = useMemo(() => buildGroups(modules), [modules]);
  const firstPlayable = all.find((item) => item.embed);
  const [currentKey, setCurrentKey] = useState<string | undefined>(firstPlayable?.key);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // Restore a shared link (?v=...) once on load.
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get(PARAM);
    if (key && all.some((item) => item.key === key && item.embed)) setCurrentKey(key);
  }, [all]);

  const current = all.find((item) => item.key === currentKey);

  const select = (item: Item) => {
    setCurrentKey(item.key);
    setPlaying(true);
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, item.key);
    window.history.replaceState(window.history.state, "", url);
    const player = playerRef.current;
    if (player) {
      const { top, bottom } = player.getBoundingClientRect();
      if (top < 64 || bottom > window.innerHeight) player.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (all.length === 0) {
    return <p className="text-muted-foreground">No videos yet.</p>;
  }

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)] gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
      <div ref={playerRef} className="flex scroll-mt-20 flex-col gap-4 xl:sticky xl:top-8">
        <div className="relative isolate aspect-video overflow-hidden rounded-2xl bg-slate-950 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.6)] ring-1 ring-black/5 dark:ring-white/10">
          {current?.embed && playing ? (
            <iframe
              key={current.key}
              src={`${current.embed.src}&autoplay=1`}
              title={current.video.name}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : current?.embed ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={`Play: ${current.video.name}`}
            >
              {current.embed.thumbnail ? (
                <img
                  src={current.embed.thumbnail}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                />
              ) : (
                <span aria-hidden className="molecule-pattern absolute inset-0 text-white opacity-[0.08]" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/95 text-blue-600 shadow-xl transition-transform duration-300 ease-out group-hover:scale-110">
                <Play size={28} weight="fill" className="translate-x-0.5" />
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6 text-center text-white/80">
              <span aria-hidden className="molecule-pattern absolute inset-0 text-white opacity-[0.08]" />
              <p className="relative text-sm">These resources open on their original site.</p>
            </div>
          )}
        </div>

        {current && (
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug [text-wrap:balance]">{current.video.name}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Flag english={current.video.isEnglish} />
                <span className="truncate">
                  {current.module.name} · {current.group}
                </span>
              </p>
            </div>
            <a
              href={current.video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <YoutubeLogo size={18} weight="duotone" className="text-red-500" />
              Open on YouTube
            </a>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-8">
        {byModule.map(({ module, groups }) => (
          <section key={module.name} aria-label={module.name} className="flex flex-col gap-5">
            {showModuleHeadings && (
              <h2 className="flex items-center gap-2.5 text-xl font-bold">
                <span aria-hidden className="h-3 w-[1.125rem] rounded-full" style={{ backgroundColor: module.color?.hex }} />
                {module.name}
              </h2>
            )}
            {groups.map((group) => (
              <div key={group.title} className="overflow-hidden rounded-xl border bg-card">
                <h3 className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-2.5 text-sm font-semibold">
                  <span className="truncate">{group.title}</span>
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    {group.items.length} {group.items.length > 1 ? "resources" : "resource"}
                  </span>
                </h3>
                <ol className="divide-y">
                  {group.items.map((item) => {
                    const active = item.key === currentKey && !!item.embed;
                    const body = (
                      <>
                        <span className="relative grid aspect-video w-24 shrink-0 place-items-center overflow-hidden rounded-md bg-muted">
                          {item.embed?.thumbnail ? (
                            <img src={item.embed.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
                          ) : item.embed ? (
                            <Playlist size={22} weight="duotone" className="text-primary" />
                          ) : item.video.isWeb ? (
                            <Globe size={22} weight="duotone" className="text-muted-foreground" />
                          ) : (
                            <YoutubeLogo size={22} weight="duotone" className="text-red-500" />
                          )}
                          {active && (
                            <span className="absolute inset-0 grid place-items-center bg-blue-600/70 text-white">
                              <span className="text-[10px] font-bold uppercase tracking-wide">{playing ? "Playing" : "Up next"}</span>
                            </span>
                          )}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-1">
                          <span className={cn("line-clamp-2 text-sm font-semibold leading-snug", active && "text-primary")}>
                            {item.video.name}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Flag english={item.video.isEnglish} />
                            {item.embed ? (item.embed.isPlaylist ? "Playlist" : "Video") : item.video.isWeb ? "Website" : "YouTube channel"}
                          </span>
                        </span>
                        {!item.embed && <ArrowSquareOut size={18} className="shrink-0 text-muted-foreground" aria-hidden />}
                      </>
                    );
                    const rowClass = cn(
                      "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent",
                      active && "bg-primary/[0.06]"
                    );
                    return (
                      <li key={item.key}>
                        {item.embed ? (
                          <button type="button" onClick={() => select(item)} aria-current={active ? "true" : undefined} className={rowClass}>
                            {body}
                          </button>
                        ) : (
                          <a href={item.video.link} target="_blank" rel="noopener noreferrer" className={rowClass}>
                            {body}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
