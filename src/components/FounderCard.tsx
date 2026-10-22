import { InstagramLogo } from "@/components/icons";

const INSTAGRAM = "https://www.instagram.com/brahimi__mehdi/";

/** Credit banner for the platform and its founder, in muted ink tones taken from the logo's navy. */
export default function FounderCard() {
  return (
    <div className="relative isolate flex w-full flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1f2a44] via-[#2a3157] to-[#3a3464] px-6 py-6 text-white shadow-[0_14px_32px_-20px_rgba(15,23,42,0.8)] ring-1 ring-inset ring-white/10 sm:flex-row">
      <div aria-hidden className="molecule-pattern absolute inset-0 -z-10 text-white opacity-[0.1]" />
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Pharma At Hand</h3>
        <p className="text-white/85">
          Founded and maintained by{" "}
          <a
            href={INSTAGRAM}
            className="font-semibold underline decoration-white/40 underline-offset-4 transition-colors hover:text-blue-200 hover:decoration-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dr Brahimi Mehdi
          </a>
        </p>
        <p className="text-sm text-white/65">Pharmacy student platform • Est. 2023</p>
      </div>
      <a
        href={INSTAGRAM}
        className="rounded-full bg-white/10 p-2 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/20"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <InstagramLogo size={24} weight="duotone" />
      </a>
    </div>
  );
}
