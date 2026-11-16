/**
 * Shared types + labels for platform users (Admin → Manage Users page).
 */

/** Roles a user can have (better-auth `user.role` additional field). */
export type UserRole = "admin" | "recruiter" | "seeker"

/** Display label for each role (shared by the badge + role select). */
export const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  recruiter: "Recruiter",
  seeker: "Seeker",
}

/**
 * Shape of one row on the Admin → Manage Users page, mapped from the
 * better-auth user document (listUsers result).
 */
export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  /** ISO string of when the account was created. */
  createdAt: string
}
