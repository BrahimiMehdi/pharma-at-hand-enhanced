import { Noto_Naskh_Arabic } from "next/font/google";

/** Arabic face for duas; Montserrat has no Arabic glyphs. Only pages that render prayers load it. */
export const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: ["400", "600"], display: "swap" });
