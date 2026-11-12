
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export interface FilterOption {
  label: string
  count: number
}

// Filter option row styling
const rowClasses =
  "flex min-h-9 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black"

// Checkbox and radio styling
const boxClasses =
  "size-5 shrink-0 rounded-md border-2 border-gray-300 bg-white shadow-sm transition-all duration-200 data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white"

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
      <h4 className="mb-1 text-sm font-semibold text-gray-900">
        {title}
      </h4>

      {mode === "single" ? (
        <RadioGroup
          aria-label={`Filter by ${title}`}
          onValueChange={() => {
            // TODO: Connect filter with searchParams
          }}
          className="gap-1.5"
        >
          {options.map((option) => (
            <label key={option.label} className={rowClasses}>
              <RadioGroupItem
                value={option.label}
                className={`${boxClasses} rounded-full`}
              />

              <span className="font-medium">
                {option.label}
              </span>

              <span className="ml-auto rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {option.count}
              </span>
            </label>
          ))}
        </RadioGroup>
      ) : (
        <div className="flex flex-col gap-1.5">
          {options.map((option) => (
            <label key={option.label} className={rowClasses}>
              <Checkbox
                aria-label={`Filter by ${option.label}`}
                className={boxClasses}
                onCheckedChange={() => {
                  // TODO: Connect filter with searchParams
                }}
              />

              <span className="font-medium">
                {option.label}
              </span>

              <span className="ml-auto rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
