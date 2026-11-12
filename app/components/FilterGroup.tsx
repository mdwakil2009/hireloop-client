"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FilterOption } from "@/lib/job-utils"

// Shared row styling — the selected option is highlighted
const rowClasses =
  "flex h-[30px] cursor-pointer items-center gap-3 text-sm text-gray-700 transition-colors hover:text-black has-data-checked:font-semibold has-data-checked:text-black"

// Selection-box styling — dark dot when selected (white theme)
const boxClasses =
  "size-5 border-gray-300 bg-white data-checked:border-black data-checked:bg-black [&_[data-slot=radio-group-indicator]>span]:bg-white"

/**
 * One single-select filter group in the browse-jobs sidebar
 * ("Job Type", "Category", "Workplace").
 * The selection is controlled by the parent (SidebarFilters) so the job
 * list can react to it; selecting one option deselects the previous one.
 */
export function FilterGroup({
  title,
  options,
  value,
  onValueChange,
}: {
  title: string
  options: FilterOption[]
  /** Currently selected option label, or null when nothing is selected. */
  value: string | null
  /** Called with the newly selected label whenever the user picks an option. */
  onValueChange: (value: string | null) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-black">{title}</h4>

      <RadioGroup
        aria-label={`Filter by ${title}`}
        value={value}
        onValueChange={(next) => onValueChange(next ?? null)}
      >
        {options.map((option) => (
          <label key={option.label} className={rowClasses}>
            <RadioGroupItem
              value={option.label}
              className={`${boxClasses} rounded-full`}
            />

            {option.label}

            <span className="ml-auto text-xs text-gray-400">
              {option.count}
            </span>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
