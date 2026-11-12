import type { Metadata } from "next"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getJobs } from "@/lib/api/jobs"
import { BrowseJobsList } from "@/app/browse-jobs/browse-jobs-list"

export const metadata: Metadata = {
  title: "Browse Jobs | Hireloop",
  description: "Browse all open job posts across the network.",
}

/**
 * Server Component: fetches the jobs once (with the ?search= query when
 * the search bar is submitted) and hands them to the Client Component,
 * which handles all interactive filtering and sorting in the browser.
 */
export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams

  const query = new URLSearchParams(
    search as Record<string, string>
  ).toString()

  const jobs = await getJobs(query)

  return (
    <main className="min-h-svh bg-white px-4 py-8 text-black md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Search bar */}
        <form
          action="/browse-jobs"
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row md:p-6"
        >
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-black" />

            <Input
              type="search"
              name="search"
              defaultValue={
                typeof search.search === "string"
                  ? search.search
                  : undefined
              }
              placeholder="Search by job title, keywords..."
              aria-label="Search jobs"
              className="h-[52px] border-gray-300 bg-white pl-11 text-base text-black placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-black md:h-[58px]"
            />
          </div>

          <Button
            type="submit"
            className="h-[52px] rounded-lg bg-black px-7 text-white transition-colors hover:bg-gray-800 md:h-[58px]"
          >
            Search Jobs
          </Button>
        </form>

        {/* Filters, sorting and job cards (Client Component) */}
        <BrowseJobsList jobs={jobs} />
      </div>
    </main>
  )
}
