"use client"

import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  Briefcase,
  Building2,
  ClipboardList,
  CreditCard,
  Home,
  LayoutDashboard,
  PlusCircle,
  Search,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { usePathname } from "next/navigation"
import Link from "next/link";

type Role = "seeker" | "recruiter" | "admin"

/**
 * A single entry in the dashboard sidebar, extracted from the hireloop.fig
 * dashboard frames (Seeker / Recruiter / Admin Console sidebars).
 */
interface MenuItem {
  /** Unique id used for keys */
  id: string
  /** Display label shown in the sidebar */
  name: string
  /** Route to navigate to */
  url: string
  /** Lucide icon component */
  icon: LucideIcon
}

/**
 * Sidebar menu per role.
 *
 * Rebuilt from the Figma sidebars ("Nav · …" items, top to bottom):
 * - Seeker:   Dashboard, Jobs, Saved Jobs, Applications, Billing, Settings
 * - Recruiter: Dashboard, My Company, Manage Jobs, Applications, Settings
 * - Admin:    Dashboard, Users, Companies, Jobs, Payments, Settings
 */
const menuItemByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: "browse-jobs", name: "Browse Jobs", url: "/jobs", icon: Search },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: "my-applications", name: "My Applications", url: "/dashboard/seeker/applications", icon: ClipboardList },
    { id: "billing", name: "Billing & Subscription", url: "/dashboard/seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/dashboard/recruiter/my-company", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
    { id: "add-jobs", name: "Add Jobs", url: "/dashboard/recruiter/add-jobs", icon: PlusCircle },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: ClipboardList },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "users", name: "Manage Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Manage Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

const dashboardRoles: readonly Role[] = ["seeker", "recruiter", "admin"]

/**
 * Role from the dashboard route segment (/dashboard/<role>/…), so the sidebar
 * matches the section you're browsing even before the session resolves.
 */
function roleFromPathname(pathname: string): Role | null {
  const segment = pathname.split("/")[2]
  return dashboardRoles.includes(segment as Role) ? (segment as Role) : null
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role =
    roleFromPathname(pathname) ?? ((session?.user?.role as Role | undefined) || "seeker")
  const items = menuItemByRole[role]

  const user = session?.user
  // Display role: prefer the signed-in user's role, fall back to the section
  // the user is browsing (derived from the pathname).
  const displayRole = (user?.role as Role | undefined) ?? role

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Identity — signed-in user's name + role */}
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          {user?.image ? (
            // Plain <img> (not next/image) so any uploaded image URL works
            // without configuring remotePatterns per domain.
            <img
              src={user.image}
              alt={user.name ?? "Profile"}
              className="size-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-600">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </span>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user?.name ?? "User"}
            </p>
            <p className="text-[10px] font-medium text-gray-500 capitalize">
              {displayRole}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            {/* Shared link back to the public home page (all roles) */}
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/" />}>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
