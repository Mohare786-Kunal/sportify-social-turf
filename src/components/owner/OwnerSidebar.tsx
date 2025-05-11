
import { BarChart2, Calendar, Edit, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "../ThemeSwitcher";

const OwnerSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="font-bold text-xl">TurfBook Owner</span>
        </div>
        <ThemeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <NavLink
                to="/owner/dashboard"
                className={({ isActive }) => (isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "")}
              >
                <BarChart2 />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Turfs">
              <NavLink
                to="/owner/turfs"
                className={({ isActive }) => (isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "")}
              >
                <MapPin />
                <span>Manage Turfs</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sports">
              <NavLink
                to="/owner/sports"
                className={({ isActive }) => (isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "")}
              >
                <Edit />
                <span>Manage Sports</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookings">
              <NavLink
                to="/owner/bookings"
                className={({ isActive }) => (isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "")}
              >
                <Calendar />
                <span>Bookings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default OwnerSidebar;
