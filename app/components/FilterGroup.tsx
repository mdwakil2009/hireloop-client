"use client"

import { Checkbox } from "@/components/ui/checkbox"

export interface FilterOption {
  label: string
  /** How many jobs match this option — shown on the right, like the design. */
  count: number
}

/**
 * One checkbox group in the filter sidebar ("Job Type", "Category", …).
 * Checkboxes are uncontrolled; the onChange handler is intentionally
 * left empty so the query wiring can be added later.
 */
export function FilterGroup({ title, options }: { title: string; options: FilterOption[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-[#EDEDEF]">{title}</h4>

      {options.map((option) => (
        <label
          key={option.label}
          className="flex h-[30px] cursor-pointer items-center gap-3 text-sm text-[#A0A0AB] transition-colors hover:text-[#EDEDEF]"
        >
          <Checkbox
            aria-label={`Filter by ${option.label}`}
            className="size-5 rounded border-white/10 bg-[#1A1A1F] data-checked:border-white data-checked:bg-white data-checked:text-[#0B0B0C]"
            onCheckedChange={() => {
              // TODO: wire this filter into the jobs query (searchParams / fetch)
            }}
          />

          {option.label}

          <span className="ml-auto text-xs text-[#6E6E78]">{option.count}</span>
        </label>
      ))}
    </div>
  )
}
