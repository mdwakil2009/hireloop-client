"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export interface FilterOption {
  label: string
  /** How many jobs match this option — shown on the right, like the design. */
  count: number
}

// Shared row styling for checkbox and radio options
const rowClasses =
  "flex h-[30px] cursor-pointer items-center gap-3 text-sm text-[#A0A0AB] transition-colors hover:text-[#EDEDEF]"

// Shared selection-box styling (dark field fill, white when checked)
const boxClasses =
  "size-5 border-white/10 bg-[#1A1A1F] data-checked:border-white data-checked:bg-white data-checked:text-[#0B0B0C]"

/**
 * One filter group in the browse-jobs sidebar ("Job Type", "Category", …).
 * mode="multi" renders checkboxes (several can be selected),
 * mode="single" renders a radio group (only one option at a time).
 * The change handlers are intentionally left empty so the query wiring
 * can be added later.
 */
export function FilterGroup({
  title,
  options,
  mode = "multi",
}: {
  title: string
  options: FilterOption[]
  mode?: "multi" | "single"
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-[#EDEDEF]">{title}</h4>

      {mode === "single" ? (
        <RadioGroup
          aria-label={`Filter by ${title}`}
          onValueChange={() => {
            // TODO: wire this filter into the jobs query (searchParams / fetch)
          }}
        >
          {options.map((option) => (
            <label key={option.label} className={rowClasses}>
              <RadioGroupItem
                value={option.label}
                className={`${boxClasses} rounded-full [&_[data-slot=radio-group-indicator]>span]:bg-[#0B0B0C]`}
              />

              {option.label}

              <span className="ml-auto text-xs text-[#6E6E78]">
                {option.count}
              </span>
            </label>
          ))}
        </RadioGroup>
      ) : (
        options.map((option) => (
          <label key={option.label} className={rowClasses}>
            <Checkbox
              aria-label={`Filter by ${option.label}`}
              className={boxClasses}
              onCheckedChange={() => {
                // TODO: wire this filter into the jobs query (searchParams / fetch)
              }}
            />

            {option.label}

            <span className="ml-auto text-xs text-[#6E6E78]">
              {option.count}
            </span>
          </label>
        ))
      )}
    </div>
  )
}
