import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { ArrowUpRight, InstagramLogo, TelegramLogo } from "@/components/icons";
import { constructeMetadata } from "@/lib/utils";

export const metadata = constructeMetadata({
  title: "Pharma at hand - contact",
  description: "Contact us or leave us resources that you think we left out",
});

const channels = [
  {
    href: "https://www.instagram.com/pharma.at.hand/",
    label: "Instagram",
    handle: "@pharma.at.hand",
    icon: InstagramLogo,
    tone: "bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white",
  },
  {
    href: "https://t.me/pharma_at_hand",
    label: "Telegram",
    handle: "@pharma_at_hand",
    icon: TelegramLogo,
    tone: "bg-sky-500 text-white",
  },
];

export default function ContactPage() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-10 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title="Contact us"
        subtitle="Missing a drive, a broken link, or a resource we should add? Tell us and we’ll fix it."
      />

      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
        <ContactForm />

        <aside className="flex flex-col gap-6">
          <div className="relative isolate overflow-hidden rounded-2xl bg-blue-50 ring-1 ring-inset ring-blue-100 dark:bg-blue-500/10 dark:ring-blue-400/15">
            <span aria-hidden className="molecule-pattern absolute inset-0 -z-10 text-blue-500 opacity-[0.07]" />
            <img
              src="/illustrations/contact.webp"
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-md dark:hidden"
            />
            <img
              src="/illustrations/contact-dark.webp"
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="mx-auto hidden w-full max-w-md dark:block"
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted-foreground">Prefer a quick message?</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
              {channels.map(({ href, label, handle, icon: ChannelIcon, tone }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border bg-card p-3.5 transition-colors hover:border-primary"
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tone}`}>
                      <ChannelIcon size={22} weight="bold" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block font-semibold">{label}</span>
                      <span className="block truncate text-sm text-muted-foreground">{handle}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
