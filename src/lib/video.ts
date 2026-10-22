export type Embed = {
  /** Player URL for the iframe (privacy-enhanced YouTube domain). */
  src: string;
  thumbnail: string | null;
  isPlaylist: boolean;
};

const YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "youtu.be", "www.youtube-nocookie.com"];
const ID = /^[\w-]{11}$/;

/**
 * Turns a YouTube video or playlist link into an embeddable player URL.
 * Channel pages, searches and non-YouTube links return null and stay external.
 */
export function toEmbed(link: string): Embed | null {
  let url: URL;
  try {
    url = new URL(link.trim());
  } catch {
    return null;
  }
  if (!YOUTUBE_HOSTS.includes(url.hostname)) return null;

  let videoId: string | null = null;
  if (url.hostname === "youtu.be") videoId = url.pathname.slice(1).split("/")[0];
  else if (url.pathname === "/watch") videoId = url.searchParams.get("v");
  else {
    const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/);
    if (match) videoId = match[1];
  }
  if (videoId && !ID.test(videoId)) videoId = null;

  const list = url.searchParams.get("list");
  const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
  if (list && /^[\w-]+$/.test(list)) params.set("list", list);

  if (videoId) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${videoId}?${params}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      isPlaylist: params.has("list"),
    };
  }
  if (params.has("list")) {
    return { src: `https://www.youtube-nocookie.com/embed/videoseries?${params}`, thumbnail: null, isPlaylist: true };
  }
  return null;
}

/** Number of videos and links attached to a module, across its courses and playlists. */
export const countVideos = (module: ModuleType) =>
  module.video.length + module.cours.reduce((sum, cour) => sum + cour.video.length, 0);
