import { Code2, Megaphone, Palette, Workflow } from "lucide-react"

/**
 * Icon for a job category — used inside the violet icon boxes on the
 * Manage Jobs table and mobile cards (the box itself lives at the call
 * site so sizes can differ per layout).
 */
export function JobCategoryIcon({ category }: { category: string }) {
  const value = category.toLowerCase()

  if (value.includes("design")) {
    return <Palette className="size-4" />
  }

  if (value.includes("marketing")) {
    return <Megaphone className="size-4" />
  }

  if (value.includes("quality")) {
    return <Workflow className="size-4" />
  }

  return <Code2 className="size-4" />
}
