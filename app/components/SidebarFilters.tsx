"use client"

import { useMemo } from "react"

import { FilterGroup } from "./FilterGroup"
import { buildFilterOptions, workplaceOptions } from "@/lib/job-utils"
import type { JobData } from "@/lib/job-data"

/** Which filter section a selection belongs to. */
export type FilterSection = "jobType" | "category" | "workplace"

/** One selected value per section; null = no filter. */
export interface SelectedFilters {
  jobType: string | null
  category: string | null
  workplace: string | null
}

/**
 * The filter sidebar. It receives the jobs and the current selection
 * from the parent (BrowseJobsList) and reports every change back up
 * through onSelect — the job list itself is rendered by the parent.
 */
const SidebarFilters = ({
  jobs,
  selected,
  onSelect,
  onClear,
}: {
  jobs: JobData[]
  selected: SelectedFilters
  onSelect: (section: FilterSection, value: string | null) => void
  onClear: () => void
}) => {
  // Options with match counts — recomputed only when the jobs change
  const jobTypeOptions = useMemo(
    () => buildFilterOptions(jobs, "jobType"),
    [jobs]
  )

  const categoryOptions = useMemo(
    () => buildFilterOptions(jobs, "category"),
    [jobs]
  )

  const workplaceFilterOptions = useMemo(
    () => workplaceOptions(jobs),
    [jobs]
  )

  const hasSelection =
    selected.jobType !== null ||
    selected.category !== null ||
    selected.workplace !== null

  return (
    <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-black">Filters</h3>

        {hasSelection && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-gray-500 transition-colors hover:text-black"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {/* Job Type — one selection at a time */}
        <FilterGroup
          title="Job Type"
          options={jobTypeOptions}
          value={selected.jobType}
          onValueChange={(value) => onSelect("jobType", value)}
        />

        {/* Category — one selection at a time */}
        <FilterGroup
          title="Category"
          options={categoryOptions}
          value={selected.category}
          onValueChange={(value) => onSelect("category", value)}
        />

        {/* Workplace — one selection at a time */}
        <FilterGroup
          title="Workplace"
          options={workplaceFilterOptions}
          value={selected.workplace}
          onValueChange={(value) => onSelect("workplace", value)}
        />
      </div>
    </aside>
  )
}

export default SidebarFilters
