import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"

const menyItemByRole={
  seeker:[

  ],
  recruiter:[

  ],
  admin:[

  ]
}

export function DashboardSidebar() {
  const {data:session,ispending} = useSession()
  const role =  session?.user?.role || "seeker"
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {
          // menyItemByRole[role].map((item) => (
          //   <SidebarMenuItem key={item.id}>
          //     <SidebarMenuButton render={<a href={item.url} />}>
          //       <item.icon />
          //       <span>{item.name}</span>
          //     </SidebarMenuButton>
          //   </SidebarMenuItem>
          // ))
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
