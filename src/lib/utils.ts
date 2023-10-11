import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const extractFirstSubpath = (inputString: string) => {
  // Split the input string by '/' and take the first two parts
  const parts = inputString.trim().split("/");
  if (parts.length >= 2) {
    return "/" + parts[1];
  } else {
    return inputString;
  }
};
export function constructeMetadata({
  title = "Pharma at hand - all in one",
  description = "The Resources platform for pharmacy students",
  image = "/thumbnail.png",
  icons = "/icon.ico",
  noIndex = false,
}: { title?: string; description?: string; image?: string; icons?: string; noIndex?: boolean } = {}): Metadata {
  return {
    title,
    description,
    manifest: "/manifest.json",
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter:{
      card:"summary_large_image",
      title,
      description,
      images:[image],
      creator:"@Brahimi_mehdi"
    },
    icons,
    metadataBase:new URL("https://pharma-at-hand.vercel.app"),
    themeColor:"#FFF",
    ...(noIndex && {
      robots:{
        index:false,
        follow:false,
      }
    })
  };
}
