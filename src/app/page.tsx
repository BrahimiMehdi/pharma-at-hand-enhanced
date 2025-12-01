import { getYears, getPrayers } from "@/components/queries";
import DrivesCard from "@/components/DrivesCard";
import PrayerCarousel from "@/components/PrayerCarousel";
import DownloadWAP from "@/components/DownloadWAP";
export default async function Home() {
  const prayers = await getPrayers();
  const years = await getYears();
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-6 lg:px-12 p-24">
      <DownloadWAP />
      <section className="flex w-full flex-col gap-y-8">
        <div className="w-full gap-y-5 lg:flex-row flex-col flex items-center justify-between">
          <h1 className="font-bold lg:order-1 order-2 [text-wrap:balance;] sm:text-4xl lg:text-left text-center text-3xl lg:text-5xl leading-[3rem]">
            Unlock{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Boundless
            </span>{" "}
            Knowledge{" "}
          </h1>
          <img className="order-2 lg:order-2 w-40" src="/main.svg" alt="" />
        </div>
        <h2 className="max-w-5xl text-muted-foreground">
          Welcome to our student platform, your one-stop destination for academic success. Here, you'll find an
          extensive collection of resources, links, and videos curated specifically for students like you. Simplify your
          educational journey and access everything you need in one place.
        </h2>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-6 rounded-2xl px-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg text-white">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">Pharma At Hand</h3>
            <p className="text-white/90">
              Founded and maintained by{" "}
              <a href="https://www.instagram.com/brahimi__mehdi/" className="font-semibold underline hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">
                Brahimi Mehdi
              </a>
            </p>
            <p className="text-sm text-white/80">Pharmacy student platform • Est. 2023</p>
          </div>
          <div className="flex gap-3">
        
            <a href="https://www.instagram.com/brahimi__mehdi/" className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
        <h3 className="text-2xl font-bold">Prayers</h3>
        <PrayerCarousel prayers={prayers} />
        <h3 className="text-2xl font-bold">Choose your year</h3>
        <div className="grid gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(14rem,_1fr));]  sm:[grid-template-columns:_repeat(_auto-fill,_minmax(18rem,_1fr));]">
          {years?.map((year, index) => (
            <DrivesCard year={year} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
