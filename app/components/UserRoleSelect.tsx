"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { toast } from "@/components/ui/toast"
import { updateUserRole } from "@/lib/actions/users"
import { roleLabels, type UserRole } from "@/lib/user-data"

const roleOptions: UserRole[] = ["admin", "recruiter", "seeker"]

const triggerClasses =
  "h-8 w-[130px] rounded-lg border-gray-200 bg-white text-xs font-semibold text-gray-900 shadow-sm hover:border-gray-300 focus:ring-2 focus:ring-black"

const itemClasses =
  "cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"

/**
 * Per-row role toggle on the Admin → Manage Users table: switch a user
 * between Admin / Recruiter / Seeker. Same pattern as
 * `ApplicationStatusSelect` — Base UI Select + toast + router.refresh().
 *
 * The backend call itself is a stub (`updateUserRole` in
 * lib/actions/users.ts) — wire the update logic there.
 */
export function UserRoleSelect({
  userId,
  role,
  userName,
}: {
  userId: string
  role: UserRole
  /** Used for the accessible label + success toast copy. */
  userName: string
}) {
  const router = useRouter()

  const [pending, startTransition] = useTransition()
  const [saving, setSaving] = useState(false)

  const handleChange = async (newRole: UserRole | null) => {
    if (!newRole || newRole === role) return

    setSaving(true)

    try {
      const result = await updateUserRole(userId, { role: newRole })

      if (result.ok) {
        toast.add({
          title: "Role Updated",
          description: `${userName} is now ${roleLabels[newRole]}.`,
        })

        startTransition(() => {
          router.refresh()
        })
      } else {
        // Stub action — surfaces until updateUserRole is implemented.
        toast.add({
          title: "Not Implemented",
          description: result.message ?? "Role update is not available yet.",
        })
      }
    } catch {
      toast.add({
        title: "Update Failed",
        description: "Could not update the user's role.",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Select
      value={role}
      onValueChange={handleChange}
      disabled={saving || pending}
    >
      <SelectTrigger
        aria-label={`Change role for ${userName}`}
        className={triggerClasses}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="z-50 min-w-[140px] rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
        {roleOptions.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={itemClasses}
          >
            {roleLabels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
