"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BrowseJobCard } from "@/app/components/BrowseJobCard"
import SidebarFilters, {
  type FilterSection,
  type SelectedFilters,
} from "@/app/components/SidebarFilters"
import {
  postedTime,
  salaryForSort,
  deadlineTime,
} from "@/lib/job-utils"
import type { JobData } from "@/lib/job-data"

// Sort options — values match the dropdown items below
type SortOption = "recent" | "salary-high" | "salary-low" | "deadline"

const sortContentItem =
  "cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-black focus:bg-gray-100 focus:text-black data-[highlighted]:bg-gray-100 data-[highlighted]:text-black"

/** Sort comparator; jobs with missing values always go last. */
function compareJobs(a: JobData, b: JobData, sortBy: SortOption) {
  switch (sortBy) {
    case "salary-high":
      // Highest paying first; no-salary jobs last
      return salaryForSort(b, -Infinity) - salaryForSort(a, -Infinity)

    case "salary-low":
      // Cheapest first; no-salary jobs last
      return salaryForSort(a, Infinity) - salaryForSort(b, Infinity)

    case "deadline":
      // Earliest deadline first; no-deadline jobs last
      return deadlineTime(a) - deadlineTime(b)

    default:
      // Newest post first
      return postedTime(b) - postedTime(a)
  }
}

/**
 * The interactive part of the Browse Jobs page: filter sidebar, sort
 * dropdown, and job cards. The Server Component (page.tsx) fetches the
 * jobs once and hands them over as a plain array prop — after that,
 * filtering and sorting happen instantly in the browser (no reload).
 */
export function BrowseJobsList({ jobs }: { jobs: JobData[] }) {
  // One selected value per filter section; null = no filter
  const [selected, setSelected] = useState<SelectedFilters>({
    jobType: null,
    category: null,
    workplace: null,
  })

  const [sortBy, setSortBy] = useState<SortOption>("recent")

  const hasFilters =
    selected.jobType !== null ||
    selected.category !== null ||
    selected.workplace !== null

  // Filter + sort — recomputed only when a filter or sort option changes
  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      // One filter per section, combined across sections (AND logic)
      if (
        selected.jobType &&
        (job.jobType ?? "").toLowerCase() !== selected.jobType.toLowerCase()
      ) {
        return false
      }

      if (
        selected.category &&
        (job.category ?? "").toLowerCase() !== selected.category.toLowerCase()
      ) {
        return false
      }

      if (
        selected.workplace &&
        job.remoteAllowed !== (selected.workplace === "Remote")
      ) {
        return false
      }

      return true
    })

    return result.sort((a, b) => compareJobs(a, b, sortBy))
  }, [jobs, selected, sortBy])

  // Report a selection change from the sidebar back into state
  function handleSelect(section: FilterSection, value: string | null) {
    setSelected((current) => ({ ...current, [section]: value }))
  }

  // Reset every filter section back to "no selection"
  function clearFilters() {
    setSelected({ jobType: null, category: null, workplace: null })
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[296px_1fr]">
      {/* Sidebar filters */}
      <SidebarFilters
        jobs={jobs}
        selected={selected}
        onSelect={handleSelect}
        onClear={clearFilters}
      />

      {/* Job listing */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-black">
            Found {filteredJobs.length} Professional Jobs
          </h2>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-sm font-medium text-black">
            <span>Sort by:</span>

            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy((value ?? "recent") as SortOption)
              }
            >
              <SelectTrigger
                aria-label="Sort jobs"
                className="h-10 w-[160px] rounded-lg border border-gray-300 bg-white text-sm font-medium text-black shadow-sm hover:border-gray-500 focus:ring-2 focus:ring-black"
              >
                <SelectValue placeholder="Select option" />
              </SelectTrigger>

              <SelectContent
                sideOffset={6}
                className="z-50 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1.5 text-black shadow-xl"
              >
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

        {/* Jobs */}
        <div className="mt-4 flex flex-col gap-4">
          {filteredJobs.map((job) => (
            <BrowseJobCard key={job._id ?? job.title} job={job} />
          ))}
        </div>

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-white px-4 py-14 text-center shadow-sm">
            <h3 className="text-base font-bold text-black">No Jobs Found</h3>

            <p className="mt-1 text-sm text-gray-600">
              No jobs match your selected filters.
            </p>

            {hasFilters && (
              <Button
                type="button"
                onClick={clearFilters}
                className="mt-4 h-10 rounded-lg bg-black px-5 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
