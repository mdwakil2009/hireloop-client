import { roleLabels, type UserRole } from "@/lib/user-data"

// Role pill colors (white theme) — one entry per UserRole
const roleStyles: Record<UserRole, string> = {
  admin: "border-violet-200 bg-violet-50 text-violet-700",
  recruiter: "border-blue-200 bg-blue-50 text-blue-700",
  seeker: "border-gray-200 bg-gray-50 text-gray-600",
}

/** Colored role pill used on the Admin → Manage Users table. */
export function UserRoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${roleStyles[role]}`}
    >
      {roleLabels[role]}
    </span>
  )
}
