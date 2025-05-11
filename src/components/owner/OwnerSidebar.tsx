
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
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TurfBook Owner</span>
        </div>
        <ThemeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <NavLink
                to="/owner/dashboard"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <BarChart2 className="text-primary" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Turf">
              <NavLink
                to="/owner/turfs"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <MapPin className="text-primary" />
                <span>Manage Turf</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sports">
              <NavLink
                to="/owner/sports"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <Edit className="text-primary" />
                <span>Manage Sports</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookings">
              <NavLink
                to="/owner/bookings"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <Calendar className="text-primary" />
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
