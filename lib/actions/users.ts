import type { UserRole } from "@/lib/user-data"

/**
 * STUB — change a user's role on the backend.
 *
 * The client side is already fully wired (see `app/components/UserRoleSelect.tsx`):
 * it calls this action, and if it returns `{ ok: true }` it toasts success and
 * refreshes the list. Only this backend call is left to implement.
 *
 * TODO: Implement the role update, for example:
 *   1. A backend endpoint, e.g. PATCH `${BASE_URL}/users/${userId}/role`
 *      (fetch with method PATCH + JSON body `data`), or
 *   2. better-auth admin plugin, server-side:
 *      `await auth.api.setRole({ body: { userId, role: data.role }, headers })`
 *
 * Once implemented, return `{ ok: true }` (and throw / `{ ok: false, message }`
 * on failure so the UI shows an error toast).
 */
export const updateUserRole = async (
  userId: string,
  data: { role: UserRole }
): Promise<{ ok: boolean; message?: string }> => {
  console.log(
    `[stub] updateUserRole called — user ${userId} → ${data.role} (not implemented yet)`
  )

  return {
    ok: false,
    message:
      "Role updates are not wired to the backend yet — implement updateUserRole in lib/actions/users.ts.",
  }
}
