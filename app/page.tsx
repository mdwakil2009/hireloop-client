import Image from "next/image";
import { SiteHero } from "@/components/site-hero";

import globeUrl from "@/app/images/globe.png";
import { SiteNavbar } from "@/components/site-navbar";

export default function Page() {
  return (
    <main className="relative min-h-svh bg-[#010103]">
      {/* Banner artwork spans the full page top, behind the navbar and hero.
          Sections below can cover it by being positioned (relative z-10). */}
      <Image
        aria-hidden
        src={globeUrl}
        alt=""
        priority
        className="pointer-events-none absolute -top-20 left-1/2 z-0 w-full max-w-[1440px] -translate-x-1/2 md:-top-[98px]"
      />
      <SiteNavbar></SiteNavbar>
      <SiteHero />
    </main>
  );
}
