
import type { Metadata } from "next"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getJobs } from "@/lib/api/jobs"
import type { JobData } from "@/lib/job-data"
import { BrowseJobCard } from "@/app/components/BrowseJobCard"
import { FilterGroup, type FilterOption } from "@/app/components/FilterGroup"

export const metadata: Metadata = {
  title: "Browse Jobs | Hireloop",
  description: "Browse all open job posts across the network.",
}

/** Count jobs per unique value of a field. */
function buildFilterOptions(
  jobs: JobData[],
  field: "jobType" | "category"
): FilterOption[] {
  const counts = new Map<string, number>()

  for (const job of jobs) {
    counts.set(job[field], (counts.get(job[field]) || 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }))
}

/** Remote/On-site options. */
function workplaceOptions(jobs: JobData[]): FilterOption[] {
  const remote = jobs.filter((job) => job.remoteAllowed).length

  return [
    { label: "Remote", count: remote },
    { label: "On-site", count: jobs.length - remote },
  ]
}

const sortContentItem =
  "cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-black focus:bg-gray-100 focus:text-black data-[highlighted]:bg-gray-100 data-[highlighted]:text-black"

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

        <div className="mt-6 grid gap-6 lg:grid-cols-[296px_1fr]">

          {/* Sidebar filters */}
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="mb-5 text-lg font-bold text-black">
              Filters
            </h3>

            <div className="flex flex-col gap-6">
              <FilterGroup
                title="Job Type"
                mode="single"
                options={buildFilterOptions(jobs, "jobType")}
              />

              <FilterGroup
                title="Category"
                mode="single"
                options={buildFilterOptions(jobs, "category")}
              />

              <FilterGroup
                title="Workplace"
                options={workplaceOptions(jobs)}
              />
            </div>
          </aside>

          {/* Job listing */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-black">
                Found {jobs.length} Professional Jobs
              </h2>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2 text-sm font-medium text-black">
                <span>Sort by:</span>

                <Select defaultValue="recent">
                  <SelectTrigger
                    aria-label="Sort jobs"
                    className="h-10 w-[160px] rounded-lg border border-gray-300 bg-white text-sm font-medium text-black shadow-sm hover:border-gray-500 focus:ring-2 focus:ring-black"
                  >
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    sideOffset={6}
                    className="z-50 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1.5 text-black shadow-xl"
                  >
                    <SelectItem
                      value="recent"
                      className={sortContentItem}
                    >
                      Most Recent
                    </SelectItem>

                    <SelectItem
                      value="salary-high"
                      className={sortContentItem}
                    >
                      Salary: High to Low
                    </SelectItem>

                    <SelectItem
                      value="salary-low"
                      className={sortContentItem}
                    >
                      Salary: Low to High
                    </SelectItem>

                    <SelectItem
                      value="deadline"
                      className={sortContentItem}
                    >
                      Closing Soon
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Jobs */}
            <div className="mt-4 flex flex-col gap-4">
              {jobs.map((job) => (
                <BrowseJobCard
                  key={job._id ?? job.title}
                  job={job}
                />
              ))}
            </div>

            {/* Empty state */}
            {jobs.length === 0 && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-white px-4 py-14 text-center shadow-sm">
                <h3 className="text-base font-bold text-black">
                  No Jobs Found
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Try a different search or clear the filters.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
