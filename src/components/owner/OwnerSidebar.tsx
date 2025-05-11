
import { BarChart2, Calendar, Edit, MapPin, Clock } from "lucide-react";
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
      <SidebarHeader className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center">
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TurfBook Owner</span>
        </div>
        <ThemeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4 space-y-3">
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard" className="py-3 hover:bg-accent/20 hover:text-accent">
              <NavLink
                to="/owner/dashboard"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <BarChart2 className="text-primary mr-3" />
                <span className="font-medium">Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Turf" className="py-3 hover:bg-accent/20 hover:text-accent">
              <NavLink
                to="/owner/turfs"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <MapPin className="text-primary mr-3" />
                <span className="font-medium">Manage Turf</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sports" className="py-3 hover:bg-accent/20 hover:text-accent">
              <NavLink
                to="/owner/sports"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <Edit className="text-primary mr-3" />
                <span className="font-medium">Manage Sports</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Time Slots" className="py-3 hover:bg-accent/20 hover:text-accent">
              <NavLink
                to="/owner/timeslots"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <Clock className="text-primary mr-3" />
                <span className="font-medium">Time Slots</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookings" className="py-3 hover:bg-accent/20 hover:text-accent">
              <NavLink
                to="/owner/bookings"
                className={({ isActive }) => (isActive ? "bg-primary/10 border-l-4 border-primary text-primary" : "")}
              >
                <Calendar className="text-primary mr-3" />
                <span className="font-medium">Bookings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default OwnerSidebar;
