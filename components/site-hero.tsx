import Link from "next/link";
import { BarChart3, MapPin, Search, Star, UserSearch } from "lucide-react";

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
  { icon: Search, value: "50K", label: "Active Jobs" },
  { icon: BarChart3, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export function SiteHero() {
  return (
    <section data-slot="site-hero" className="bg-[#010103]">
      <div className="relative z-10 px-6 pt-28 md:pt-44">
        {/* Badge pill */}
        <div className="flex items-center justify-center">
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#5C53FE] opacity-60 lg:block"
          />
          <Link
            href="/jobs"
            className="mx-2 flex h-12 items-center gap-3 rounded-full bg-[#0D0D0E] px-6 ring-1 ring-white/15 transition-colors hover:bg-[#131314]"
          >
            <span
              className="text-xl leading-none"
              role="img"
              aria-label="Briefcase"
            >
              💼
            </span>
            <p className="font-space-mono text-lg text-white/90">
              <span className="font-bold">50,000+</span> new jobs this month
            </p>
          </Link>
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#5C53FE] opacity-60 lg:block"
          />
        </div>

        {/* Title + subtitle */}
        <div className="mx-auto mt-8 max-w-[784px] text-center">
          <h1 className="font-manrope text-4xl text-white font-bold leading-[1.15] sm:text-5xl md:text-[56px]">
            Find Your Dream Job Today
          </h1>
          <p className="mx-auto mt-4 max-w-[600px] font-manrope text-lg text-white/70 leading-[1.6] md:max-w-none md:text-[20px]">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* Search bar */}
        <form
          action="/jobs"
          className="mt-12 flex max-w-[784px] mx-auto h-16 items-center rounded-2xl border border-white/20 bg-[#101010] py-2 pr-2 pl-4 md:pl-6"
        >
          <label className="flex h-full min-w-0 flex-1 items-center gap-2">
            <Search className="size-5 shrink-0 text-white/60" />
            <input
              type="text"
              name="query"
              placeholder="Job title, skill or company"
              className="h-full w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/50"
            />
          </label>

          <span
            aria-hidden
            className="mx-4 hidden h-8 w-px bg-white/20 sm:block"
          />

          <label className="hidden h-full min-w-0 flex-1 items-center gap-2 sm:flex">
            <MapPin className="size-5 shrink-0 text-white/60" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="h-full w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/50"
            />
          </label>

          <button
            type="submit"
            aria-label="Search"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5C53FE] text-white transition-all outline-none hover:bg-[#5C53FE]/85 active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Search className="size-5" />
          </button>
        </form>

        {/* Trending chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="font-manrope text-base text-white">
            Trending Position
          </span>
          {trending.map((label) => (
            <Link
              key={label}
              href={`/jobs?q=${encodeURIComponent(label)}`}
              className="flex h-[33px] items-center rounded-full bg-[#1A1A1B] px-3 font-manrope text-sm text-white ring-1 ring-white/10 transition-colors outline-none hover:bg-[#2A2A2C] focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Assisting line + stats over the planet */}
        <div className="mx-auto mt-56 max-w-[1320px] md:mt-[428px]">
          <p className="mx-auto max-w-[640px] text-center font-instrument text-3xl text-white/70 font-medium leading-[1.3] md:text-[40px]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>

          <ul className="mx-auto mt-12 grid max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <li
                key={stat.value}
                className="flex h-auto flex-col rounded-2xl bg-gradient-to-b from-[#131316] to-[#0A0A0B] p-6 ring-1 ring-white/10 min-h-[254px]"
              >
                <stat.icon className="size-6 text-white" fill="none" />
                <div className="mt-auto pt-20">
                  <p className="font-jakarta text-5xl text-white font-semibold leading-[1.15] md:text-[56px]">
                    {stat.value}
                  </p>
                  <p className="mt-4 font-inter-tight text-lg text-white leading-[1.65]">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
