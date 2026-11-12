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

/** Count jobs per unique value of a field (for the filter checkboxes). */
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

/** Remote/On-site options derived from the remoteAllowed field. */
function workplaceOptions(jobs: JobData[]): FilterOption[] {
  const remote = jobs.filter((job) => job.remoteAllowed).length

  return [
    { label: "Remote", count: remote },
    { label: "On-site", count: jobs.length - remote },
  ]
}

const sortContentItem =
  "text-white/90 focus:bg-white/10 focus:text-white"

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams
  const query = new URLSearchParams(search as Record<string, string>).toString()
  const jobs = await getJobs(query)

  return (
    <main className="min-h-svh bg-[#010103] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Search bar — native GET submit keeps the searchParams flow working */}
        <form
          action="/browse-jobs"
          className="flex flex-col gap-3 rounded-xl bg-[#141418] p-6 ring-1 ring-white/10 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#8E9192]" />
            <Input
              type="search"
              name="search"
              defaultValue={
                typeof search.search === "string" ? search.search : undefined
              }
              placeholder="Search by job title, keywords..."
              aria-label="Search jobs"
              className="h-[52px] border-white/10 bg-[#1A1A1F] pl-11 text-base text-white placeholder:text-[#A0A0AB] md:h-[58px] md:text-base"
            />
          </div>

          <Button
            type="submit"
            className="h-[52px] rounded-lg bg-white px-6 text-[#0B0B0C] hover:bg-white/85 md:h-[58px]"
          >
            Search Jobs
          </Button>
        </form>

        <div className="mt-6 grid gap-6 lg:grid-cols-[296px_1fr]">
          {/* Sidebar filters */}
          <aside className="h-fit rounded-xl bg-[#141418] p-6 ring-1 ring-white/10">
            <h3 className="mb-5 text-lg font-semibold text-[#EDEDEF]">
              Filters
            </h3>

            <div className="flex flex-col gap-6">
              <FilterGroup
                title="Job Type"
                options={buildFilterOptions(jobs, "jobType")}
              />
              <FilterGroup
                title="Category"
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
              <h2 className="text-xl font-semibold text-[#EDEDEF]">
                Found {jobs.length} Professional Jobs
              </h2>

              <div className="flex items-center gap-2 text-sm text-[#6E6E78]">
                Sort by:
                <Select defaultValue="recent">
                  <SelectTrigger
                    aria-label="Sort jobs"
                    className="h-9 w-[150px] border-white/10 bg-[#0C0C0F] text-sm text-[#EDEDEF]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141418] text-white ring-white/10">
                    <SelectItem value="recent" className={sortContentItem}>
                      Most Recent
                    </SelectItem>
                    <SelectItem value="salary-high" className={sortContentItem}>
                      Salary: High to Low
                    </SelectItem>
                    <SelectItem value="salary-low" className={sortContentItem}>
                      Salary: Low to High
                    </SelectItem>
                    <SelectItem value="deadline" className={sortContentItem}>
                      Closing Soon
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {jobs.map((job) => (
                <BrowseJobCard key={job._id ?? job.title} job={job} />
              ))}
            </div>

            {/* Empty state */}
            {jobs.length === 0 && (
              <div className="mt-4 rounded-xl bg-[#141418] px-4 py-14 text-center ring-1 ring-white/10">
                <h3 className="text-base font-semibold text-[#EDEDEF]">
                  No Jobs Found
                </h3>
                <p className="mt-1 text-sm text-[#6E6E78]">
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
