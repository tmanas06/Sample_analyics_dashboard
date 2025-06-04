"use client"

import { BarChart3, Upload, TrendingUp, FileSpreadsheet } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Overview",
    icon: TrendingUp,
    id: "overview",
  },
  {
    title: "Upload Data",
    icon: Upload,
    id: "upload",
  },
  {
    title: "Revenue Charts",
    icon: BarChart3,
    id: "charts",
  },
]

interface AppSidebarProps {
  onViewChange: (view: string) => void
  selectedView: string
}

export function AppSidebar({ onViewChange, selectedView }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6" />
          <span className="font-semibold text-lg">Revenue Platform</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onViewChange(item.id)} isActive={selectedView === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
