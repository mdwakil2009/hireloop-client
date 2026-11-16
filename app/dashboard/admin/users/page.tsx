import type { Metadata } from "next"
import type { ElementType } from "react"
import {
  Briefcase,
  ChevronDown,
  Download,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserRoleBadge } from "@/app/components/UserRoleBadge"
import { UserRoleSelect } from "@/app/components/UserRoleSelect"
import { GetUsers } from "@/lib/actions/better-auth-users"
import { roleLabels, type AdminUser, type UserRole } from "@/lib/user-data"

export const metadata: Metadata = {
  title: "User Management | Hireloop",
  description: "Review, filter, and manage platform access for all users.",
}

// Shared column-header style (small bold uppercase, same as Manage Jobs)
const headClass = "text-[10px] font-bold tracking-wide text-gray-500 uppercase"

// Shared mobile-card detail styles
const detailLabel = "text-[10px] text-gray-400"
const detailValue = "mt-0.5 text-xs font-medium text-gray-700"

// Static "Active" status pill (matches the Figma row design)
function ActivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
      <span className="size-1.5 rounded-full bg-green-500" />
      Active
    </span>
  )
}

// Avatar circle with the user's initial (Figma row layout)
function UserAvatar({ name }: { name: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-600">
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

// One bento stat card (Figma: four stat tiles above the table)
function StatCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: ElementType
  label: string
  value: number
  note: string
}) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs font-medium text-gray-500">{label}</p>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <Icon className="size-4" />
        </span>
      </div>

      <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
      <p className="mt-1 text-[10px] text-gray-400">{note}</p>
    </div>
  )
}

/** Join date from the better-auth `createdAt` (Date or ISO string). */
function formatJoinDate(value: string) {
  if (!value) return "Not specified"

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return "Not specified"

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/** Map a better-auth user document to the page's row shape. */
function toAdminUser(user: {
  id: string
  name?: string | null
  email: string
  role?: string | null
  createdAt?: string | Date | null
}): AdminUser {
  return {
    id: user.id,
    name: user.name || user.email,
    email: user.email,
    role: (roleLabels[user.role as UserRole] ? user.role : "seeker") as UserRole,
    createdAt: user.createdAt
      ? new Date(user.createdAt).toISOString()
      : "",
  }
}

export default async function AdminUsersPage() {
  let users: AdminUser[] = []
  let loadFailed = false

  try {
    // better-auth admin plugin — requires an admin session, so non-admins
    // land in the catch block and see the access message below.
    const result = await GetUsers()
    users = (result?.users ?? []).map(toAdminUser)
  } catch {
    loadFailed = true
  }

  // Stats derived from the real list so they stay correct as users sign up
  const total = users.length
  const countByRole = (role: UserRole) =>
    users.filter((user) => user.role === role).length
  const seekers = countByRole("seeker")
  const recruiters = countByRole("recruiter")
  const admins = countByRole("admin")
  const percent = (count: number) =>
    total === 0 ? "0% of total" : `${Math.round((count / total) * 100)}% of total`

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white px-3 py-4 text-gray-900 sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>Admin</span>
              <span>/</span>
              <span className="font-medium text-violet-600">
                User Management
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              User Management
            </h1>

            <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
              Review, filter, and manage platform access for all users.
            </p>
          </div>

          {/* Presentational controls from the Figma design — role filtering
              and CSV export come later */}
          <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
            <div className="flex h-9 flex-1 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-900 shadow-sm sm:w-[130px] sm:flex-none">
              All Roles
              <ChevronDown className="size-3.5 text-gray-400" />
            </div>

            <div className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-4 text-xs font-semibold text-white shadow-sm sm:flex-none">
              <Download className="size-3.5" />
              Export List
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={total}
            note="All platform accounts"
          />
          <StatCard
            icon={UserRound}
            label="Seekers"
            value={seekers}
            note={percent(seekers)}
          />
          <StatCard
            icon={Briefcase}
            label="Recruiters"
            value={recruiters}
            note={percent(recruiters)}
          />
          <StatCard
            icon={ShieldCheck}
            label="Admins"
            value={admins}
            note={percent(admins)}
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">All Users</h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Review and manage platform access
              </p>
            </div>

            <span className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
              {total} Users
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="h-10 border-b border-gray-100 bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className={`${headClass} pl-4`}>User Name</TableHead>

                <TableHead className={headClass}>Email Address</TableHead>

                <TableHead className={headClass}>Role</TableHead>

                <TableHead className={headClass}>Join Date</TableHead>

                <TableHead className={headClass}>Status</TableHead>

                <TableHead className={`${headClass} pr-3 text-right`}>
                  Change Role
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="h-[66px] border-b border-gray-100 transition-colors hover:bg-violet-50/30"
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name={user.name} />
                      <p className="max-w-[180px] truncate text-xs font-semibold text-gray-800">
                        {user.name}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="max-w-[240px] truncate text-xs text-gray-600">
                      {user.email}
                    </p>
                  </TableCell>

                  <TableCell>
                    <UserRoleBadge role={user.role} />
                  </TableCell>

                  <TableCell>
                    <p className="text-xs whitespace-nowrap text-gray-700">
                      {formatJoinDate(user.createdAt)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <ActivePill />
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end pr-3">
                      <UserRoleSelect
                        userId={user.id}
                        role={user.role}
                        userName={user.name}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {users.map((user) => (
            <div
              key={user.id}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <UserAvatar name={user.name} />

                  <div className="min-w-0">
                    <h3 className="text-sm leading-snug font-semibold break-words text-gray-800">
                      {user.name}
                    </h3>
                    <p className="mt-1 truncate text-[11px] text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <UserRoleBadge role={user.role} />
              </div>

              {/* Card Details */}
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-gray-100 pt-3">
                <div>
                  <p className={detailLabel}>Join Date</p>
                  <p className={detailValue}>
                    {formatJoinDate(user.createdAt)}
                  </p>
                </div>

                <div>
                  <p className={detailLabel}>Status</p>
                  <div className="mt-0.5">
                    <ActivePill />
                  </div>
                </div>
              </div>

              {/* Card Action — role toggle */}
              <div className="mt-3 border-t border-gray-100 pt-3">
                <p className={detailLabel}>Change Role</p>
                <div className="mt-1.5">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role}
                    userName={user.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {total === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center shadow-sm">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <Users className="size-5" />
            </div>

            <h3 className="mt-3 text-base font-semibold text-gray-800">
              {loadFailed ? "Access Denied" : "No Users Found"}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {loadFailed
                ? "Could not load users. Sign in with an admin account to view this page."
                : "No platform accounts are available yet."}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
